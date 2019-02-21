const express = require('express');
const https = require('https')
const router = express.Router();
const mongo=require('./mongo');

//fs模块
const fs = require("fs");

// readFile()
fs.readFile("./data/secondsortdata1.json",function(err,res){
	if(err){
		console.log("a.txt读取失败")
		return false;
	}else{
		//第二次处理数据的放法
//		console.log(JSON.parse(res.toString()))
		const list=JSON.parse(res.toString())
		for(var i=0;i<list.length;i++){
			console.log(JSON.parse(list[i]))
			//添加商品到数据库
			mongo("add","secondsortdata",JSON.parse(list[i]).firstLevelList[0],function(data){
				if(data.result.n==1){
					console.log("商品添加成功")
				}else{
					console.log("商品添加失败")
				}			
			})
		}
		//第一次处理数据的方法
//		const list=JSON.parse(JSON.parse(res.toString()).Result).firstLevelList[0]
//		//添加商品到数据库
//		mongo("add","secondsortdata",list,function(data){
//			if(data.result.n==1){
//				console.log("商品添加成功")
//			}else{
//				console.log("商品添加失败")
//			}
//		})	
	}
})
module.exports = router;