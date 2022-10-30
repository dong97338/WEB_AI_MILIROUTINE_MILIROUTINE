const data = require('../models/index');
const jwt = require('../token/jwt');

const token = {
  isToken: (req, res) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[1]) {
      return true;
    } else {
      return false;
    }
  },

  decode: (req, res) => {
    if (!token.isToken(req, res)) {
      return res.status(400).json({
        success: false,
        isLogin: false,
        err: '로그인을 해주세요',
      });
    }

    const jwtToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.token.decode(jwtToken);
    return decoded;
  }
};

const routine = {
  // @route POST /routine/make
  make: async (req, res) => {
	const decoded = token.decode(req, res);
    const { name, category, image, auth_cycle, auth_description_list, start_date, duration } = req.body;

    if (!name) {
      res.status(400).json({
        success: false,
        err: '이름을 입력해주세요',
      });
    } else if (!category) {
      res.status(400).json({
        success: false,
        err: '카테고리를 입력해주세요',
      });
    } else if (!image) {
      res.status(400).json({
        success: false,
        err: '이미지를 첨부해주세요',
      });
    } else if (!auth_cycle) {
      res.status(400).json({
        success: false,
        err: '주기 횟수를 입력해주세요',
      });
    } else if (!auth_description_list) {
      res.status(400).json({
        success: false,
        err: '인증 방법을 입력해주세요',
      });
    } else if (!start_date) {
      res.status(400).json({
        success: false,
        err: '시작일을 입력해주세요',
      });
    } else if (!duration) {
      res.status(400).json({
        success: false,
        err: '진행기간을 입력해주세요',
      });
    }

    const host = await data.user.get('id', decoded.id);
    const auth_description = JSON.stringify(auth_description_list);

    const param = [host[0].no, name, category, image, auth_cycle, auth_description, start_date, duration];
    data.routine.add(param);

    const routine_id = await data.routine.getWithItems(host[0].no, name);
    const type = 'join';
    const param2 = [host[0].no, routine_id[0].no, type];
    data.user_routine.add(param2);

    res.json({
      success: true,
      routine: param,
    });
  },
  
  // @route GET /routine/:routineId
  output: async (req, res) => {
    const routineId = req.params.routineId;
	if(!routineId){
		return res.status(400).json({
			success : false,
			err : 'routine Id를 입력해주세요'
		})
	}

	const param = await data.routine.get('id', routineId);

	if(param.length === 0){
		return res.status(400).json({
			success : false,
			err : '없는 루틴입니다 루틴 아이디를 다시 입력해주세요'
		})
	}
	
    const routine = param[0];
    routine.hostName = (await data.user.get('no', routine.host))[0].nickname;
    routine.participants = (await data.user_routine.getParticipantsById(routine.id))[0].count;
	  
	if(!token.isToken(req, res)){
	  return res.json({
		  success: true,
		  routine_id: routineId,
		  routine: routine,
      });
	}
	
	const decoded = token.decode(req, res);
	const userRoutine = await data.user_routine.getMyRoutine(routine.id, decoded.no);
	  
	if(userRoutine.length != 0){
		return res.json({
			success : true,
			routine_id : routineId,
			routine : routine,
			isJoin : true
		})
	}
	else{
		return res.json({
			success : true,
			routine_id : routineId,
			routine : routine,
			isJoin : false
		})
	}
    
  },

  // @route POST /routine/:routineId
  join: async (req, res) => {
    const decoded = token.decode(req, res);
	  
	const userRoutine = await data.user_routine.getMyRoutine(req.params.routineId, decoded.no);

	if(userRoutine.length != 0){
		return res.status(400).json({
			success : false,
			err : '이미 참여한 루틴입니다!'
		})
	}
	  
    try {
      data.user_routine.add([decoded.no, req.params.routineId, 'join']);
    } catch (e) {
      res.status(400).json({
        success: false,
        err: String(e),
      });
    }

    res.json({
      success: true
    });
  },
};

module.exports = {
  routine,
};
