// 合并多个空白为一个空白  
String.prototype.ResetBlank = function() { //对字符串扩展
	var regEx = /\s+/g;
	return this.replace(regEx, ' ');
};