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

jQuery.divselect = function(divselectid, inputselectid) {
	var inputselect = $(inputselectid);
	var selectvalue;
	$(divselectid + " cite").click(function(e) {
		e.stopPropagation();
		var ul = $(divselectid + " ul");
		console.log(typeof ul.css("display") + ":" + ul.css("display"));
		console.log(ul);
		if (ul.css("display") == "none") {
			ul.slideDown();
		} else {
			ul.slideUp();
		}
	});
	$(divselectid + " ul li a").click(function() {
		var txt = $(this).text();
		$(divselectid + " cite").html(txt);
		var value = $(this).attr("selectid");
		inputselect.val(value);
		selectvalue = inputselect.val();
		console.log("本次点击的是:" + selectvalue);
		$(divselectid + " ul").hide();
		var myDate = new Date;
		var currMonth=myDate.getMonth();
		var currQuarter = Math.floor((currMonth%3==0?(currMonth/3):(currMonth/3+1)));
		switch (selectvalue) {
			case '1':
				myDate = new Date(myDate.getTime());
				$('#StartDate1').val(myDate.pattern("yyyy-MM-dd"));
				$('#EndDate1').val(myDate.pattern("yyyy-MM-dd"));
				console.log("本次点击的是今天");
				break;
			case '2':
				myDate.setDate(myDate.getDate() - 1);
				$('#StartDate1').val(myDate.pattern("yyyy-MM-dd"));
				$('#EndDate1').val(myDate.pattern("yyyy-MM-dd"));
				console.log("本次点击的是昨天");
				break;
			case '3':
				var WeekFirstDay = new Date(myDate - (myDate.getDay() - 1) * 86400000);
				var WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);
				$('#StartDate1').val(WeekFirstDay.pattern("yyyy-MM-dd"));
				$('#EndDate1').val(WeekLastDay.pattern("yyyy-MM-dd"));
				console.log("本次点击的是本周");
				break;
			case '4':
				var WeekFirstDay = new Date(myDate - (myDate.getDay() - 1) * 86400000);
				WeekFirstDay.setDate(WeekFirstDay.getDate() - 7);
				var WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);
				$('#StartDate1').val(WeekFirstDay.pattern("yyyy-MM-dd"));
				$('#EndDate1').val(WeekLastDay.pattern("yyyy-MM-dd"));
				console.log("本次点击的是上周");
				break;
			case '5':
				var MonthFirstDay = new Date(myDate.getFullYear(), myDate.getMonth(), 1);
				var MonthNextFirstDay = new Date(myDate.getFullYear(), myDate.getMonth() + 1, 1);
				var MonthLastDay = new Date(MonthNextFirstDay - 86400000);
				$('#StartDate1').val(MonthFirstDay.pattern("yyyy-MM-dd"));
				$('#EndDate1').val(MonthLastDay.pattern("yyyy-MM-dd"));
				console.log("本次点击的是本月");
				break;
			case '6':
				var MonthFirstDay = new Date(myDate.getFullYear(), myDate.getMonth() - 1, 1);
				var MonthNextFirstDay = new Date(myDate.getFullYear(), myDate.getMonth(), 1);
				var MonthLastDay = new Date(MonthNextFirstDay - 86400000);
				$('#StartDate1').val(MonthFirstDay.pattern("yyyy-MM-dd"));
				$('#EndDate1').val(MonthLastDay.pattern("yyyy-MM-dd"));
				console.log("本次点击的是上月");
				break;
			case '7':
				var YearFirstDay = new Date(myDate.getFullYear(), 0, 1);
				var YearLastDay = new Date(myDate.getFullYear(), 11, 31);
				$('#StartDate1').val(YearFirstDay.pattern("yyyy-MM-dd"));
				$('#EndDate1').val(YearLastDay.pattern("yyyy-MM-dd"));
				console.log("本次点击的是今年");
				break;
			case '8':
				var YearFirstDay = new Date(myDate.getFullYear() - 1, 0, 1);
				var YearLastDay = new Date(myDate.getFullYear() - 1, 11, 31);
				$('#StartDate1').val(YearFirstDay.pattern("yyyy-MM-dd"));
				$('#EndDate1').val(YearLastDay.pattern("yyyy-MM-dd"));
				console.log("本次点击的是去年");
				break;
			case '9':	
				var YearFirstDay = new Date(myDate.getFullYear() , Math.floor(currMonth/3)*3, 01);
				var YearLastDay = new Date(myDate.getFullYear(), Math.floor(currMonth/3+1)*3-1, 01);
				$('#StartDate1').val(YearFirstDay.pattern("yyyy-MM-dd"));
				$('#EndDate1').val(YearLastDay.pattern("yyyy-MM-dd"));
			    console.log(currMonth);
				break;
			default:
		
						var YearFirstDay = new Date(myDate.getFullYear() , Math.floor(currMonth/3)*3-3, 01);
					    var YearLastDay = new Date(myDate.getFullYear(), Math.floor(currMonth/3)*3-1, 01);
					    $('#StartDate1').val(YearFirstDay.pattern("yyyy-MM-dd"));
					    $('#EndDate1').val(YearLastDay.pattern("yyyy-MM-dd"));
					    console.log(currMonth);
					
				break;
		}
	});


	$(document).click(function() {
		$(divselectid + " ul").hide();
	});

};