const express = require('express');
const https = require('https')
const router = express.Router();
const mongo=require('./mongo');

//fs模块
const fs = require("fs");

// readFile()
fs.readFile("./data/all.json",function(err,res){
	if(err){
		console.log("a.txt读取失败")
		return false;
	}else{
		console.log(JSON.parse(JSON.parse(res.toString()).Result).localItems)
		const list=JSON.parse(JSON.parse(res.toString()).Result).localItems
//		console.log(list)
		for(var i=0;i<list.length;i++){
//		console.log(list[i])
			//添加商品到数据库
			mongo("add","alldata",list[i],function(data){
				if(data.result.n==1){
					console.log("商品添加成功")
				}else{
					console.log("商品添加失败")
				}
			})	
		}
	}
})

//			mongo("find","homedata",{},function(data){
//				console.log(data[0].modularDataList)
//			})

module.exports = router;