const jwt = require('../token/jwt');
const data = require('../models/index');
const popular = require('./popular.ctrl');
const http = require('http');

const NUMOFRECOMMEND = 10;
const NUMOFJOINED = 4;
const MINRANK = 1;
const MAXRANK = 10;

async function getUserName(userNo) {
  const userInfo = await data.user.get('no', userNo);
  const name = userInfo[0].nickname;
  return name;
}

async function getParticipants(routineId) {
  var participants = 0;

  const userRoutines = await data.user_routine.get('routine_id', routineId);
  for (const routine of userRoutines) {
    if (routine.type == 'join') {
      participants++;
    }
  }

  return participants;
}

const ai = {
  recommendRoutine: (userNo, res) => {
    return new Promise((resolve, reject) => {
      var options = {
        // host:'20.214.203.40',
        // port:'8080',
        host: 'ai',
        port: '8081',
        path: '/?no=' + userNo + '',
      };

      var req = http.get(options, function (res) {
        var resData = '';
        res.on('data', function (chunk) {
          resData += chunk;
        });

        res.on('end', function () {
          resolve(resData);
        });
      });
    });
  },

  recommendRefresh: (userNo, refreshNum, res) => {
    return new Promise((resolve, reject) => {
      var options = {
        // host:'20.214.203.40',
        // port:'8080',
        host: 'ai',
        port: '8081',
        path: '/?no=' + userNo + '&refresh=' + refreshNum + '',
      };

      var req = http.get(options, function (res) {
        var resData = '';
        res.on('data', function (chunk) {
          resData += chunk;
        });

        res.on('end', function () {
          resolve(resData);
        });
      });
    });
  },
};

const token = {
  isToken: (req, res) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[1]) {
      return true;
    } else {
      return false;
    }
  },

  decode: (req, res) => {
    const jwtToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.token.decode(jwtToken);
    return decoded;
  },
};

const routine = {
	getRecommendRoutine : async (res, refresh, userNo) =>{
		if(!refresh){
			var recommendNo = await ai.recommendRoutine(userNo, res);
		}
		else{
			var recommendNo = await ai.recommendRefresh(userNo, refresh, res);
		}
		
		recommendNo = recommendNo.substr(1, recommendNo.length - 3);
		recommendNo = recommendNo.split(',');

		for (var i = 0; i < recommendNo.length; ++i) {
		  recommendNo[i] = Number(recommendNo[i]);
		}
		
		var recommendRoutine = [];
		for (const no of recommendNo) {
		  const aiRoutine = await data.routine.get('id', no);
		  const hostName = await data.user.get('no', aiRoutine[0].host);
		  aiRoutine[0].hostName = hostName[0].nickname;
		  aiRoutine[0].participants = await getParticipants(no);

		  recommendRoutine.push(aiRoutine[0]);
		}
		
		return recommendRoutine;
	},
	
	getRandomRoutine : async () => {
	  const randomRoutine = await data.routine.getRandom(NUMOFRECOMMEND);

      for (const item of randomRoutine) {
        item.hostName = await getUserName(item.host);
        item.participants = await getParticipants(item.id);
      }
		
	  return randomRoutine;
	},
	
	getCurrentRoutine : async (userNo) => {
		const authRoutine = await data.auth.getOrderByDate('user_no', userNo, NUMOFJOINED);

		var currentRoutines = [];
		var routineIdList = [];
		var isId;
		for (const item of authRoutine) {
		  isId = false;
		  for(const id of routineIdList){
			  if(item.routine_id === id){
				  isId = true;
				  break;
			  }
		  }

		  if(isId){
			  continue;
		  }

		  const currentRoutine = await data.routine.get('id', item.routine_id);
		  routineIdList.push(item.routine_id);
		  currentRoutines.push(currentRoutine[0]);
		}
		
		return currentRoutines;
	},
	
	getRankedRoutine : async (res, JoinedRoutine) => {
		var rankedRoutine = [];

		for (var rank = MINRANK; rank <= MAXRANK; ++rank) {
		  const routine = await data.routine.get('id', JoinedRoutine[rank - 1][0]);
		  routine[0].participants = JoinedRoutine[rank - 1][1];

		  const userInfo = await data.user.get('no', routine[0].host);
		  if(userInfo.length === 0){
			  return res.status(400).json({
				success : false,
				err : '해당 아이디의 host가 없습니다'
			})
		  }
		  routine[0].hostName = userInfo[0].nickname;
		  rankedRoutine.push(routine[0]);
		}
		return rankedRoutine;
	}
}

const output = {
  // @route GET /
  home: async (req, res) => {
	const userRoutines = await data.user_routine.getAll();
	if(userRoutines.length === 0){
		return res.status(400).json({
			success : false,
			err : 'user routine이 없습니다'
		})
	}
    const JoinedRoutine = popular.process.sortRank(userRoutines);

    // 인기 루틴
	const rankedRoutine = await routine.getRankedRoutine(res, JoinedRoutine);

    if (!token.isToken(req, res)) {
      const randomRoutine = await routine.getRandomRoutine();

      return res.json({
        success: true,
        isLogin: false,
        rankedRoutine: rankedRoutine,
        recommendRoutine: randomRoutine,
      });
    }

    //로그인 되었을 때
    const decoded = token.decode(req, res);
    const userInfo = await data.user.get('id', decoded.id);

    // 추천 routine
	const recommendRoutine = await routine.getRecommendRoutine(res, req.query.refresh, decoded.no);
   
	// 참여한 루틴
    const currentRoutines = await routine.getCurrentRoutine(decoded.no);

    res.json({
      success: true,
      isLogin: true,
      user: userInfo[0],
      rankedRoutine: rankedRoutine,
      recommendRoutine: recommendRoutine,
      currentRoutine: currentRoutines,
    });
  },
};

module.exports = {
  output,
};
