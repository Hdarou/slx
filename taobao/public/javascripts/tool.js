var mytools = {
	isLogin: function() {
		var data = null;
		$.ajax({
			type: "get",
			url: "/users/isLogin",
			async: false,
			dataType: 'json'
		}).done(function(res) {
			data=res
		})
		return data
	}
}