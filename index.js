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
		var funcName = arguments[0];
		var funcArgu = Array.prototype.slice.call(arguments, 1); 
		return result.__super__.prototype[funcName].apply(this, funcArgu);
	};
	
	return result;
}
