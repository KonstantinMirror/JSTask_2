//var str = ";key,value;methodName,|return true|;";
//var parseObj = parser(str);
//console.log(parseObj.methodName());
var str = ";key,value;methodName,|function (a) { return a + 1; }|;"
var parseObj = parser(str);
console.log(parseObj);
console.log(parseObj.methodName(5));



function parser(str) {
	var outObj = {};

	var elementsToObj = searchArray(str);
	for (var counter = 0; counter < elementsToObj.length; counter++) {
		var current = elementsToObj[counter].trim();
		if(current.length > 0){
			if (searchFunction(elementsToObj[counter])) {
				continue;
			}else{
				searchSimpler(elementsToObj[counter]);
			}
		}
	}
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
			return simplerElements;
		}
		return str.split(';');
	}


	function searchFunction(element){
		var patt = /[|]/ig; 
		if (patt.test(element)) {
			var elements = element.split(',')
			var nameFun = elements[0];
			var allFunc = elements[1];
			var startIndex = allFunc.indexOf('{');
			if (startIndex > 0) {
				for(++counter; counter < elementsToObj.length; counter++){
					allFunc += elementsToObj[counter];
					if (patt.test(elementsToObj[counter])) {
						break; 
					}
				}
				var varFun = selector(allFunc,'(',')');
				var bodyFun = selector(allFunc,'{', '}')
				outObj[nameFun] = new Function(varFun , bodyFun);

			}else{
				var bodyFun = selector(allFunc,'|','|')
				outObj[nameFun] = new Function(bodyFun);
			}
			return true;
		}

		function selector(select,startBound,endBound){
			var startIndex  = select.indexOf(startBound);
			var endIndex = select.indexOf(endBound);
			return select.slice(startIndex + 1,endIndex);
		}
	}

	function searchSimpler(element){
		if (current.search(',') !=-1) {
			var innerObj = current.split(',');
			outObj[innerObj[0]] = innerObj[1];
		}
	}
}