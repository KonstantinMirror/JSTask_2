''
var STKit = require('./STKit');
console.log(STKit);

//*******************************************************************************

console.log('********************');
console.log('Is Array test');
var memSimle = STKit.isArrayLike;
console.log(memSimle({}));
console.log(memSimle({length:5}));
console.log('********************');

//*******************************************************************************

var str_1 = ";key,value;methodName,|function (a) { return a + 1; }|;";
var str_2 = ";key,value;methodName,|return true|;";
console.log('********************');
console.log('parser test');
console.log(STKit.parser(str_1));
console.log(STKit.parser(str_2));
console.log('********************');




//*******************************************************************************
console.log('********************');
console.log('dabehaviorizer test');
var testObj = {
	inc : function(arg){
		return (arg + 1);
	},
	i: 10
}

var testObj_2 = {
	inc : function(arg){
		return (arg + 1);
	},
	i: 10
}

console.log(STKit.dabehaviorizer(testObj));
console.log(testObj);
console.log('---------------------');
console.log(STKit.dabehaviorizer(testObj_2,true));
console.log(testObj_2);
console.log('********************');


//*******************************************************************************

console.log('********************');
console.log('memorized test');
var mem = STKit.memorized();
var memAdv = STKit.advancedMemorized();
console.log(mem(factorial,10));
console.log(memAdv(factorial,20));
console.log(memAdv(factorial,20));

function factorial (n){
	var res = 1;
	while(n!==1){
		res *= n--;
	}
	return res;
}

console.log('********************');

