

var testObj = {
	inc : function(body){
		return (body + 1);
	},
	i: 10
}

console.log(testObj);
dabehavioriz(testObj);
console.log(testObj);


function dabehavioriz(obj, isBehaviorSeparate) {
	for(var name in obj){
		if (obj.hasOwnProperty(name)) {
			if (typeof obj[name] == 'object') {
				dabehavioriz(obj[name])
			}
			else if(typeof obj[name] == 'function' ){
				try{
					delete obj[name]
				} catch(ex){

				}
			}
		}
	}
}