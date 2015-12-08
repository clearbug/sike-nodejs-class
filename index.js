module.exports = function(parent){
	var child;
	if(parent.initialize){
		child = parent.initialize;
	}else{
		child = function(){};
	}
	for(var prop in parent){
		if(prop !== 'initialize'){
			child.prototype[prop] = parent[prop];
		}
	}
	return child;
}
