

var testObj = {
	inc : function(arg){
		return (arg + 1);
	},
	i: 10
}


console.log("------------");
console.log(dabehavioriz(testObj,true));
console.log(testObj);
console.log("------------");
console.log(dabehavioriz(testObj)[0](2));
console.log(testObj);



function dabehavioriz(obj, isBehaviorSeparate) {
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