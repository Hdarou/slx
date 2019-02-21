var express = require('express');
var router = express.Router();
var mongo=require('./mongo');
/* GET home page. */
router.get('/getuser', function(req, res, next) {
//	console.log(req.session.userL);
//	var userL=req.session.userL;
//	if(userL[0].length!=0){
//		res.send('{"sueecss":'+userL+'}')
//	}else{
//		res.send('{"err":"无用户登录"}')
//	}

});

module.exports = router;
