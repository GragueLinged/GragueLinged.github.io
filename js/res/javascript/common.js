var commonSys = {};
commonSys.ServerIp = "http://localhost:9003/";
//jQuery中的Ajax方法
function PostDataFromJson(url, callbackFunction, data) {
	$.ajax({
		type: 'POST',
		url: url,
		dataType: 'json',
		data: data,
		success: callbackFunction
	})
}

function GetDataFromJson(url, callbackFunction) {
	$.ajax({
		type: 'GET',
		url: url,
		dataType: 'json',
		success: callbackFunction
	})
}

function GetDataFromJsonP(url, callbackFunction) {
	$.ajax({
		type: 'GET',
		contentType: 'application/x-www-form-urlencoded',
		url: url,
		dataType: 'jsonp',
		timeout: 1500,
		jsonpCallback: callbackFunction
	})
}

function GetDataFromJsonPWithPara(url, queryParam, callbackFunction) {
	$.ajax({
		type: 'GET',
		contentType: 'application/x-www-form-urlencoded',
		url: url,
		dataType: 'jsonp',
		data: queryParam,
		timeout: 1500,
		jsonpCallback: callbackFunction
	})
}


function esriDateTypeToExt(type) {
	switch (type) {
		case "esriFieldTypeString":
			return "string";
			break;
		case "esriFieldTypeInteger":
			return "int";
			break;
		case "esriFieldTypeDouble":
			return "float";
			break;
		case "esriFieldTypeDate":
			return "date";
			break;
		default:
			return "string";
	}
}

function GetFieldList(data, addId) {
	if (data == null) return null;
	var fieldList = [];
	addId && (fieldList.push({
		name: 'id',
		type: 'int'
	}));
	var len = data.fields.length;
	for (var i = 0; i < len; i++) {
		fieldList.push({
			name: data.fields[i].name,
			type: data.fields[i].type
		});
	}
	return fieldList;
}

function GetDataList(data, addId) {
	if (data == null) return null;
	var dataList = [];
	var len = data.features.length;
	for (var i = 0; i < len; i++) {
		var att = data.features[i];
		addId && (att.id = i + 1);
		dataList.push(att);
	}
	return dataList;
}

//数组扩展，包括根据值查找索引、删除和判断是否包含
Array.prototype.indexOf = function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val)
			return i;
	}
	return -1;
};
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};
Array.prototype.contains = function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val) {
			return true;
		}
	}
	return false;
}
Date.prototype.pattern = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份           
		"d+": this.getDate(), //日           
		"h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时           
		"H+": this.getHours(), //小时           
		"m+": this.getMinutes(), //分           
		"s+": this.getSeconds(), //秒           
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度           
		"S": this.getMilliseconds() //毫秒           
	};
	var week = {
		"0": "/u65e5",
		"1": "/u4e00",
		"2": "/u4e8c",
		"3": "/u4e09",
		"4": "/u56db",
		"5": "/u4e94",
		"6": "/u516d"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}

var date = new Date();


//Jquery 扩展

jQuery.validator.addMethod("alnum", function(value, element) {
	return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
}, "只能包括英文字母和数字");

jQuery.validator.addMethod("isPhone", function(value, element) {
	var length = value.length;

	var mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;
	var tel = /^\d{3,4}-?\d{7,9}$/;
	return this.optional(element) || (tel.test(value) || mobile.test(value));

}, "请正确填写您的联系电话");

jQuery.validator.addMethod("isIdCardNo", function(value, element) {
	return this.optional(element) || /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(value) || /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/.test(value);
}, "请正确输入您的身份证号码");
jQuery.validator.addMethod("isFloatGtZero", function(value, element) {
	value = parseFloat(value);
	return this.optional(element) || value > 0;
}, "浮点数必须大于0");
jQuery.validator.addMethod("isFloatGtMoney", function(value, element) {
	value = parseFloat(value);
	return this.optional(element) || value >= 0;
}, "浮点数可以等于0");

jQuery.validator.addMethod("isProvince", function(value, element) {
	if ($.trim($("#Province").val()) != "请选择省份") {
		return $.trim(value);
	}
}, "省份不能为空");

jQuery.validator.addMethod("isCity", function(value, element) {
	if ($.trim($("#City").val()) != "请选择城市") {
		return $.trim(value);
	}
}, "城市不能为空");

jQuery.validator.addMethod("isDistrict", function(value, element) {
	if ($.trim($("#District").val()) != "请选择区县") {
		return $.trim(value);
	}
}, "区县不能为空");

// 比较两个数字的大小
jQuery.validator.addMethod("isBiger", function(value, element, param) {
	value = parseInt(value);
	return this.optional(element) || value < $(param).val();
});


//获取URL参数
function request(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}


//回车登陆
function keydownEvent(id) {

	var e = window.event || arguments.callee.caller.arguments[0];

	if (e && e.keyCode == 13) {
		if ($("#" + id).valid()) {
			$("#" + id).submit();
		}
	}
}