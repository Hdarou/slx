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
fs.readFile("./data/home4.json",function(err,res){
	if(err){
		console.log("a.txt读取失败")
		return false;
	}else{
		const list=JSON.parse(JSON.parse(res.toString()).Result).homeDataList
		console.log(list)

		for(var i=0;i<list.length;i++){
//			var listobj={};
//				listobj.modularId=list[i].modularId			
//			var sublist=list[i].modularDataList
//			console.log(sublist)
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
//
//
			//添加商品到数据库
			mongo("add","homedata",list[i],function(data){
				if(data.result.n==1){
					console.log("商品添加成功")
				}else{
					console.log("商品添加失败")
				}
			})	
//
//
//
//
//
//			
//		}
	}
	}
})



//			mongo("find","homedata",{},function(data){
//				console.log(data[0].modularDataList)
//			})






















//const data = fs.readFileSync('../public/data/homedata.json');
//console.log(data)
//fs.readFile('./data/homedata.json',function(err,data){
//		if(err){
//			console.log('文件读取失败');
//		}else{
//			console.log(data)		
//		}
//	})	

//https.get('../public/data/homedata.json', res => {
//     console.log(res)     
//})
//		$.ajax({
//			type:"get",
//			url:"../data/homedata.json",
//			async:true,
//			dataType:'json'
//		}).done(function(res){
//			console.log(res);
//		})


module.exports = router;