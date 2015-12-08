module.exports = function(child, parent){
	var result;
	if(child.initialize){
		result = child.initialize;
	}else{
		result = function(){};
	}
	if(parent){
		result.prototype = new parent();
		result.prototype.constructor = result;
		result.__super__ = parent;
	}else{
		result.__super__ = Object;
	}
	for(var prop in child){
		if(prop !== 'initialize'){
			result.prototype[prop] = child[prop];
		}
	}
	result.prototype.super = function(){
		var cur_class = result;
		return function(){
			var funcName = arguments[0];
			var funcArgu = Array.prototype.slice.call(arguments, 1); 
			var tmp = cur_class;
			cur_class = cur_class.__super__;
			var rst = cur_class.prototype[funcName].apply(this, funcArgu);
			cur_class = tmp;
			return rst;
		};
	}();
	
	return result;
}
