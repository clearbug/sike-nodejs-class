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
	}
	for(var prop in child){
		if(prop !== 'initialize'){
			result.prototype[prop] = child[prop];
		}
	}
	
	return result;
}
