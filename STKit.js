 var STKit = (function(){
	return{
		memorized : memorized,
		advancedMemorized : advancedMemorized,
		isArrayLike : isArrayLike,
		dabehaviorizer : dabehaviorizer,
		haviorizer : haviorizer,
		parser : parser
	};
})();

module.exports.STKit = STKit;


function parser(str) {
	var outObj = {};
	searchArray(str);
	searchSimpler(str);
	return outObj;

	function searchArray(){
		var position = str.search(':');
		if( position != -1 ){
			var simplerElements = str.substring(0,position).split(';');
			var elementsArray = str.substring(position + 1,str.length).split(';');
			var nameArray = simplerElements.pop().trim();
			searchSimpler(simplerElements);
			outObj[nameArray] = [];
			for(var i = 0 ; i < elementsArray.length; i++){
				var current = elementsArray[i].split(',');
				var currentArray = [];
				currentArray[current[0].trim()] = current[1].trim();
				outObj[nameArray].push(currentArray);
			}
		}else{
			searchSimpler(str.split(';'))
		}
	}


	function searchFunction(){
		var elementsArray = str.split(';')
		var patt = /[|]/ig; 
		for(var i = 0; i < str.length ; i ++ ){
			if (patt.test(elementsArray[i])) {
				var elements = elementsArray[i].split(',')
				var nameFun = elements[0];
				var allFunc = elements[1];
				var startIndex = allFunc.indexOf('{');
				if (startIndex > 0) {
					for(++i; i < elementsArray.length; i++){
						allFunc += elementsArray[i];
						if (patt.test(elementsArray[i])) {
							break; 
						}
					}
					var varFun = selector(allFunc,'(',')');
					console.log(varFun);
					var bodyFun = selector(allFunc,'{', '}')
					console.log(bodyFun);
					outObj[nameFun] = new Function(varFun , bodyFun);
				}else{
					var bodyFun = selector(allFunc,'|','|')
					outObj[nameFun] = new Function(bodyFun);
				}
			}
		}


		function selector(select,startBound,endBound){
			var startIndex  = select.indexOf(startBound);
			var endIndex = select.indexOf(endBound);
			return select.slice(startIndex + 1,endIndex);
		}



	}



	function searchSimpler(elements){
		for(var i=0; i<elements.length; i++){
			var current = elements[i].trim();
			if(current.length > 0){
				if (current.search(',') !=-1) {
					var innerObj = current.split(',');
					outObj[innerObj[0]] = innerObj[1];
				}
			}
		}
	}
}


function dabehaviorizer(obj, isBehaviorSeparate) {
	if (null == obj || "object" != typeof obj) return obj;

	var delFunction = [];
	if (isBehaviorSeparate) {
		var copyObj = (JSON.parse(JSON.stringify(obj)));
		deleteBehavior(copyObj);
		return copyObj;
	}else{
		deleteBehavior(obj)
		return delFunction;
	}

	function deleteBehavior (currentStateObj) {
		for(var name in currentStateObj){
			if (currentStateObj.hasOwnProperty(name)) {
				if (typeof currentStateObj[name] == 'object') {
					deleteBehavior(currentStateObj[name])
				}
				else if(typeof currentStateObj[name] == 'function' ){
					delFunction.push(currentStateObj[name])
					try{
						delete currentStateObj[name]
					} catch(ex){

					}
				}
			}
		}
	}
}


function haviorizer(toObj,fromObject){

	if (null == toObj || "object" != typeof toObj){
		return toObj;
	}
	if (null == fromObject || "object" != typeof fromObject){
		return toObj;
	}
	for ( var addFunc in fromObject){
		if (typeof fromObject[addFunc] == 'function') {
			if (!toObj.hasOwnProperty(addFunc)) {
				toObj[addFunc] = fromObject[addFunc];
			}
		}
	}
}


function isArrayLike(somObj) {
	if (somObj && 
		typeof somObj === "object" && 
		isFinite(somObj.length) && 
		somObj.length >= 0 && 
		somObj.length===Math.floor(somObj.length) && 
		somObj.length < 4294967296) 
		return true; 
	else
		return false; 
}


function memorized (){
	var memory = [];
	return function (fun,param){
		if (memory[fun] && memory[fun][param] ){
			console.log("buffered arg  is " +  param);
			return memory[fun][param];
		}else {
			console.log("calculate arg  is"  + param);
			if (! memory[fun]) {
				memory[fun] = [param];
			}else{
				var params = memory[fun];
				params.push(param);
			}
			memory[fun][param] = fun(param);
			return memory[fun][param];
		}		
	}
}

function advancedMemorized (){
	var memory = [];
	var memoryFun = [];
	var memoryArg = [];
	return function (){
		if (arguments.length > 1) {
			var allArgs = Array.prototype.slice.call(arguments);
			var currentFun = allArgs[0];
			if (typeof currentFun == 'function') {
				var param = [];
				if (allArgs.length > 1) {
					param = allArgs.slice(1);
				}
				if (! memory[currentFun]) {
					memory[currentFun] = [];
					memory[currentFun].push(param); 
				}else{
					var temp = [];
					for(temp in memory[currentFun]){
						if(temp.toString() == param.toString()){
							console.log("buffered arg");
							return memory[currentFun][temp];
						}
					}
					memory[currentFun].push(param);
				}
				memory[currentFun][param] = currentFun.apply(this,param);
				console.log("calculate arg");
				return memory[currentFun][param]
			}
		}	
	}
}