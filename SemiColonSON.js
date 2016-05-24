//var str = ";key,value;methodName,|return true|;";
//var parseObj = parser(str);
//console.log(parseObj.methodName());
var str = ";key,value;methodName,|function (a) { return a + 1; }|;"
var parseObj = parser(str);
//console.log(parseObj.methodName(3));


function parser(str) {
	var outObj = {};
	searchFunction(str);
	console.log(outObj);
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
				var bodyFunc = elements[1];
				bodyFunc += elementsArray[i];
				var startIndex = bodyFunc.indexOf('{');
				if (startIndex > 0) {
					for(++i; i < elementsArray.length; i++){
						bodyFunc += elementsArray[i + 1];
						if (patt.test(elementsArray[i])) {
							break; 
						}
					}
				}
				console.log('name is --  ' + nameFun);
				console.log('body Func is ---' +  bodyFunc);

				//outObj[nameFun] = new Function(bodyFunc);
			}
		}

		function selector(select){


		
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