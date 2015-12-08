module.exports = function(argObj){
	if(argObj.initialize){
		return argObj.initialize;
	}else{
		return function(){};
	}
}
