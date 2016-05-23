

var testObj = {
	inc : function(arg){
		return (arg + 1);
	},
	i: 10
}

var full = {
	inc : function(arg){
		return (arg + 1);
	},
	i: 10
}

console.log("------------");
var copyObj = dabehaviorizer(testObj,true);
console.log("copy -> ");
console.log(testObj);
console.log("exist -> ");
console.log(testObj);
console.log("------------");
console.log("exist -> ");
dabehaviorizer(testObj);
console.log(testObj);
console.log("------------");
haviorizer(testObj, full);
console.log("exist -> ");
console.log(testObj);

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


