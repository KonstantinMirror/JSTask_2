var str = ";key,value;methodName,|return true|;"
parser(str);



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
			for(var i = 0 ;i<elementsArray.length; i++){
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
				console.log(elementsArray[i]);
			}
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