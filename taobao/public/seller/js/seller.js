//添加按钮
$("#addbtn").click(function(){
	$("#modetit").html('添加商品')
	$("#addpro").html("确认添加")
	$("#addpro").attr("action","add");
	
	//清空样式
	$("#pid").val('')
	$("#panme").val('')
	$("#price").val('')
	$("#imgsrc").val('')
	$("#fenlei").val('1')
	$("#color").val('')
	$.each($("#size_wrap input"), function(indcheck,elecheck) {
			elecheck.checked=false;
	});
	$("#kucun").val('')
	$("#gonglv").val('')
	$("#bigimg").val('')
	
})
//确认按钮
$("#addpro").click(function(){
	var sizearr=[];
	$.each($("#size_wrap input"), function(ind,ele) {
		if(ele.checked){
			sizearr.push($(ele).next().text())
		}
	});
	var sendData={
		pid:$("#pid").val(),
		action:$(this).attr("action"),
		pname:$("#panme").val(),		
		price:$("#price").val(),
		imgsrc:$("#imgsrc").val(),
		fenlei:$("#fenlei").val(),
		color:$("#color").val(),
		size:JSON.stringify(sizearr),
		kucun:$("#kucun").val(),
		gonglv:$("#gonglv").val(),
		bigimg:$("#bigimg").val(),
	}
	console.log(sendData);
	$.ajax({
		type:"post",
		url:"/pro/addproduct",
		async:true,
		dataType:'json',
		data:sendData
	}).done(function(res){
		console.log(res);
		if(res.success){
			alert(res.success);
			//隐藏模态
			$('#myModal').modal('hide');
			LoadPro();
		}
		if(res.err){
			alert(res.err)
		}
	}).fail(function(err){
		console.log(err);
	});
	
})

//加载数据方法
function LoadPro(){
	$.ajax({
		type:"post",
		url:"/pro/product",
		async:true,
		dataType:"json",
		data:{}
	}).done(function(res){
//		console.log(res);
		if(res.err){
			alert(res.err);
			$("#prolist").html('');
		}else{
			var str='';
			$.each(res,function(ind,ele){
				str+='<tr pid="'+ele.pid+'" gonglv="'+ele.info.gonglv+'" bigimg="'+ele.info.bigimg+'" fenlei="'+ele.fenlei+'">'
					+'<th scope="row"><input type="checkbox" name="" id="" value="" /></th>'
				    +'<td><img style="width: 100px; height: 100px;" src="../images/'+ele.imgsrc+'"/></td>'
				    +'<td>'+ele.pname+'</td>'
				    +'<td>'+ele.price+'</td>'
				    +'<td style="background: '+ele.color+';"></td>'
				    +'<td>'+ele.size+'</td>'
				    +'<td>'+ele.kucun+'</td>'
				    +'<td><button  class="btn btn-primary edit" id="edit">编辑</button><button class="btn btn-danger del">删除</button></td>'
				    +'</tr>'
			})
			$("#prolist").html(str);
		}
		
		//颜色转换方法
		function zero_fill_hex(num, digits) {
		  var s = num.toString(16);
		  while (s.length < digits)
		    s = "0" + s;
		  return s;
		}
		function rgb2hex(rgb) {
		  if (rgb.charAt(0) == '#')
		    return rgb; 
		  var ds = rgb.split(/\D+/);
		  var decimal = Number(ds[1]) * 65536 + Number(ds[2]) * 256 + Number(ds[3]);
		  return "#" + zero_fill_hex(decimal, 6);
		  
		}
		//编辑商品按钮
		$(".edit").on('click',function(){
			$("#pid").val($(this).parent().parent().attr("pid"))
			$("#panme").val($(this).parent().parent().children().eq(2).text())
			$("#price").val($(this).parent().parent().children().eq(3).text())
			$("#imgsrc").val($(this).parent().parent().children().find('img').attr('src').substr(10))
			$("#fenlei").val($(this).parent().parent().attr("fenlei"))
			$("#color").val(rgb2hex($(this).parent().parent().children().eq(4).css("background-color")))
			
			var sizearr=JSON.parse($(this).parent().parent().children().eq(5).text());
			$.each(sizearr, function(ind,ele) {
				$.each($("#size_wrap input"), function(indcheck,elecheck) {
					if(elecheck.nextElementSibling.innerText==ele){
						elecheck.checked=true;
					}
				});
			});
			
			$("#kucun").val($(this).parent().parent().children().eq(6).text())
			$("#gonglv").val($(this).parent().parent().attr("gonglv"))
			$("#bigimg").val($(this).parent().parent().attr("bigimg"))
			
			$("#modetit").html('编辑商品')
			$("#addpro").html("确认修改")
			$("#addpro").attr("action","edit")
			$('#myModal').modal('show');
		})
		
		//删除按钮
		$(".del").on('click',function(){
			$.ajax({
				type:"post",
				url:"/pro/del",
				async:true,
				dataType:'json',
				data:{
					pid:Number($(this).parent().parent().attr("pid"))
				}
			}).done(function(res){
				if(res.success){
					alert(res.success);
					LoadPro();
				}
				if(res.err){
					alert(res.err)
				}
			}).fail(function(err){
				console.log(err);
			});
		})
	});
}
LoadPro();




