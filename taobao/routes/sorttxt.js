const express = require('express');
const https = require('https')
const router = express.Router();
const mongo=require('./mongo');

//fs模块
const fs = require("fs");

//fs.readdir('data',function(err,files){
//	if(err){
//		console.log('文件夹读取失败');
//	}else{
//		console.log(files);
//	}
//})


// readFile()
fs.readFile("./data/sort1.json",function(err,res){
	if(err){
		console.log("a.txt读取失败")
		return false;
	}else{
//		console.log(JSON.parse(JSON.parse(res.toString()).Result).firstLevelList)
		const list=JSON.parse(JSON.parse(res.toString()).Result).firstLevelList

		for(var i=0;i<list.length;i++){
			console.log(list[i].secondLevelList)
			var listobj={};
				listobj.firstLevelName=list[i].firstLevelName			
				listobj.secondLevelList=list[i].secondLevelList			
//			var sublist=list[i].modularDataList
//			var sublistarr=[]
//			for(var j=0 ;j<sublist.length;j++){
//				var sublistobj={}			
//				sublistobj.advertisementId=sublist[j].advertisementId
//				sublistobj.linkId=sublist[j].linkId
//				sublistobj.bannerUrl=sublist[j].bannerUrl
//				sublistarr.push(sublistobj)
//				listobj.modularDataList=sublistarr	
//			}
//			console.log(listobj)


			//添加商品到数据库
			mongo("add","sortdata",listobj,function(data){
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