const jwt = require('../token/jwt');
const data = require('../models/index');
const popular = require('./popular.ctrl');
const {PythonShell} = require('python-shell');

const NUMOFRECOMMEND = 10;
const MINRANK = 1;
const MAXRANK = 10;

const ai = {
	recommendRoutine : (userNo) => {
		return new Promise((resolve, reject) => {
			var options = {
				mode: 'text',
				pythonOptions : ['-u'],
				scriptPath: '../AI',
				args : [userNo, NUMOFRECOMMEND]
			}
			
			// 경로의 기준이 WEB(BE) 폴더
			PythonShell.run('r12n.py',options, async function(err, data){
				resolve(data.toString());
			})
		})
	}
}


const token = {
	isToken : (req, res) => {
		if(req.headers.authorization && req.headers.authorization.split(' ')[1]){
			return true;
		}

		else{
			return false;
		}
	},
	
	decode : (req, res) => {
		const jwtToken = req.headers.authorization.split(' ')[1];
		const decoded = jwt.token.decode(jwtToken)
		return decoded;
	}
}



const output = {
	home : async (req, res) => {
		const userRoutines = await data.user_routine.getAll();
		const JoinedRoutine = popular.process.sortRank(userRoutines);
		
		var rankedRoutine = [];
		
		for(var rank = MINRANK; rank <= MAXRANK; ++rank){
			const routine = await data.routine.get('id', JoinedRoutine[rank-1][0]);
			routine[0].participants = JoinedRoutine[rank-1][1];
			const userInfo = await data.user.get('no', routine[0].host);
			routine[0].hostName = userInfo[0].nickname;
			rankedRoutine.push(routine[0]);
		}
		
		if(!token.isToken(req, res)){
			return res.json({
				success : true,
				isLogin : false,
				rankedRoutine : rankedRoutine
			})
		}
		const decoded = token.decode(req, res);
		const userInfo = await data.user.get('id', decoded.id);
		
		try{
			var recommendNo = await ai.recommendRoutine(decoded.no);
		}
		catch(e){
			return res.status(400).json({
				success : false,
				err : String(e)
			})
		}
		
		recommendNo = recommendNo.substr(1, recommendNo.length-2);
		recommendNo = recommendNo.split(",");
		
		for(var i=0; i<recommendNo.length; ++i){
			recommendNo[i] = Number(recommendNo[i]);
		}
		
		var recommendRoutine = [];
		for(const no of recommendNo){
			const aiRoutine = await data.routine.get('id', no);
			recommendRoutine.push(aiRoutine);
		}
		
		res.json({
			success : true,
			isLogin : true,
			user : userInfo[0],
			rankedRoutine : rankedRoutine,
			recommendRoutine : recommendRoutine
		})
	}
}


module.exports = {
	output
};