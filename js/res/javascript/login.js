$(window).resize(function() {
	var height = $(".bgstretcher").height();
	var halfheight = (height - 292) / 3;
	$(".login dl").css("margin-top", halfheight)
});
document.onkeydown = function(e) {
	var ev = document.all ? window.event : e;
	if (ev.keyCode == 13) {
		login()
	}
};
function login() {
	if ("" == $("#usernamespan").html() && "" == $("#passwordspan").html()) {
		$.post("loginController/login.do", {
			username : $("#username").val(),
			password : $("#password").val()
		}, function(data) {
			if ("true" == data) {
				window.location = "loginController/toIndex.do"
			} else {
				if ("false" == data) {
					$("#passwordspan").html("<font color='red'>用户名或密码错误！</font>")
				} else {
					$("#passwordspan").html("<font color='red'>对不起，服务器内部错误，请稍候重试</font>")
				}
			}
		}, "text")
	}
}
function init() {
    var wH=	$(window).height();
    var wW= $(window).width();
	$(document).bgStretcher(
			{
				images : [ "images/bg1.jpg", "images/bg2.jpg",
						"images/bg3.jpg" ],
				imageWidth : wW,
				imageHeight : wH
			});
	$("#username").focus(function() {
		if ("admin" == $(this).val()) {
			$(this).val("")
		}
	});
	$("#password").focus(function() {
		if ("1234" == $(this).val()) {
			$(this).val("")
		}
	});
	$("#username").blur(function() {
		if ("" == $.trim($(this).val())) {
			$(this).val("");
			$("#usernamespan").html("<font color='red'>用户名不能为空……</font>")
		} else {
			$("#usernamespan").html("")
		}
	});
	$("#password").blur(function() {
		if ("" == $.trim($(this).val())) {
			$(this).val("");
			$("#passwordspan").html("<font color='red'>密码不能为空……</font>")
		} else {
			$("#passwordspan").html("")
		}
	});
	$("#login").click(function() {
		login()
	})
};