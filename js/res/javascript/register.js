$(function () {
    $("#Province").change(function () {
        $("#District").next("span").empty();
        $("#District").valid();
    });
    $("#City").change(function () {
        $("#District").next("span").empty();
        $("#District").valid();
    });
    $("#District").change(function () {
        $("#District").next("span").empty();
        $("#District").valid();
    });
				$("#register_btn").click(function() {
					if ($("#register_form").valid()) {
						$("#register_form").submit();
					}
				});
				var validator = $("#register_form").validate({
					rules: {
						realName: {
							required: true
						},
						realPass: {
							required: true
						},
						realPass2: {
							required: true
						},
						District: {
							isProvince:true,
							isCity: true,
							isDistrict: true
						},
						Phone: {
							required: true
						},
						Email: {
							required: true
						}
					},
					messages: {
						realName: {
							required: "用户名不能为空"
						},
						realPass: {
							required: "密码不能为空"
						},
						realPass2: {
							required: "密码不能为空"
						},
						
						Phone: {
							required: "电话不能为空"
						},
						Email: {
							required: "邮箱不能为空"
						}
					},
					errorPlacement: function(error, element) {
						//						error.appendTo($('#errorPlacement'));
						if (element.is(":radio")) {
							error.appendTo(element.next().next());
						} else if (element.is(":checkbox")) {
							error.appendTo(element.next());
						} else {
							error.appendTo(element.next());
						}
					},
					submitHandler: function(form) {
						form.submit();
					},
					success: function(lable) {
						lable.html("&nbsp;").addClass("checked");
					},
					highlight: function(element, errorClass) {
						$(element).next().find("." + errorClass).removeClass("checked");
					}
				});
			});