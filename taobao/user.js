var mongo=require('./mongo');
//增加
//mongo('add','user',{"name":"小李","age":23},function(res){
//	console.log(res);
//})
//删除
//mongo('del','user',{"age":23},function(res){
//	console.log(res);
//})
//修改
//mongo('update','user',[{"name":"xiaow"},{"name":"小李"}],function(res){
//	console.log(res);
//})
//查找
mongo('find','user',{"sex":"男"},function(res){
	console.log(res);
})
//添加多条
//mongo('addMany','user',[
//{"name":"六六","age":69,"sex":"男"},
//{"name":"aa","age":33,"sex":"女"},
//{"name":"哈哈","age":55,"sex":"男"}
//],function(res){
//	console.log(res);
//})
//删除多条
//mongo('delMany','user',{age:69},function(res){
//	console.log(res);
//})

//修改多条
//mongo('updateMany','user',[{age:19},{sex:"男",like:"足球"}],function(res){
//	console.log(res);
//})

