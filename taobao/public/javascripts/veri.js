		<div id="v_container" style="width: 200px;height: 50px;"></div>
		<input type="text" id="code_input" value="" /><button id="my_button">验证</button>
	</body>
	<script src="js/gVerify.js"></script>
	<script>
		var verifyCode = new GVerify("v_container");

		document.getElementById("my_button").onclick = function(){
			var res = verifyCode.validate(document.getElementById("code_input").value);
			if(res){
				alert("验证正确");
			}else{
				alert("验证码错误");
			}
		}
	</script>
