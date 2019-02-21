var mongo=require("mongodb");

var MongoClient=mongo.MongoClient;

var url="mongodb://127.0.0.1:27017";

var dbName='qq';

//添加方法
var add=function(client,collections,selector,fn){
	var db=client.db(dbName);
	var collection=db.collection(collections);
	collection.insertOne(selector,function(err,result){
		if(err) throw err;
		console.log('插入成功');
		fn(result);
	})
}

//添加多条方法
var addMany=function(client,collections,selector,fn){
	var db=client.db(dbName);
	var collection=db.collection(collections);
	collection.insertMany(selector,function(err,result){
		if(err) throw err;
		console.log('插入多条成功');
		fn(result);
	})
}
//删除方法
var del=function(client,collections,selector,fn){
	var db=client.db(dbName);
	var collection=db.collection(collections);
	collection.deleteOne(selector,function(err,result){
		if(err) throw err;
		console.log('删除成功');
		fn(result);
	})
}
//删除多条方法
var delMany=function(client,collections,selector,fn){
	var db=client.db(dbName);
	var collection=db.collection(collections);
	collection.deleteMany(selector,function(err,result){
		if(err) throw err;
		console.log('删除多条成功');
		fn(result);
	})
}
//修改方法
var update=function(client,collections,selector,fn){
	var db=client.db(dbName);
	var collection=db.collection(collections);
	collection.updateOne(selector[0],{$set:selector[1]},function(err,result){
		if(err) throw err;
		console.log('修改成功');
		fn(result);
	})
}
//修改多条方法
var updateMany=function(client,collections,selector,fn){
	var db=client.db(dbName);
	var collection=db.collection(collections);
	collection.updateMany(selector[0],{$set:selector[1]},function(err,result){
		if(err) throw err;
		console.log('修改多条成功');
		fn(result);
	})
}
//查询方法                    
var find=function(client,collections,selector,fn){
	var db=client.db(dbName);
	var collection=db.collection(collections);
	collection.find(selector[0]).limit(selector[1]).skip(selector[2]).toArray(function(err,result){
		if(err) throw err;
		console.log('查询成功');
		fn(result);
	})
}

var methodType={
	add:add,
	del:del,
	update:update,
	find:find,
	addMany:addMany,
	delMany:delMany,
	updateMany:updateMany
}

module.exports=function(type,collections,selector,fn){
	
	MongoClient.connect(url,function(err,client){
		//添加
		methodType[type](client,collections,selector,fn)
	})
}
