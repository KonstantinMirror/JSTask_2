
//	var a = memorized();
//	console.log(a(factorial,3));
//	console.log(a(factorial,10));
//	console.log(a(factorial,3));
//	console.log(a(factorial,10));
//	console.log(a(factorial,3));
//	console.log(a(factorial,11));
//	console.log(a(factorial,5));
//	console.log(a(factorial,5));




function factorial (n){
	var res = 1;
	while(n!==1){
		res *= n--;
	}
	return res;
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
	return function (){
		if (arguments.length > 1) {
			var allArgs = Array.prototype.slice.call(arguments);
			if (typeof allArgs[0] == 'function') {
				var args = [];
				if (allArgs.length > 1) {
					args = allArgs.slice(1);
				}
				if (memory[allArgs[0][args]]) {
					console.log(memory);
					console.log("buffered arg  is " +  args);
					return memory[allArgs[0][args]]
				}
				if (!memory[allArgs[0]]) {
					memory[allArgs[0]] = args;
				}else{
					var params = memory[allArgs[0]].push(args);
				}
				console.log("calculate arg  is "  + args);
				var result = allArgs[0].apply(this,args);
				memory[allArgs[0][args]] = result;
				return memory[allArgs[0][args]];
			}
		}	
	}
}

var b = advancedMemorized();
console.log(b(factorial,10));
console.log(b(factorial,11));
console.log(b(factorial,10));
console.log(b(factorial,11));
console.log(b(factorial,3));