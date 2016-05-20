
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
					var args = allArgs.slice(1);
					console.log("1")
				}
				if (!memory[allArgs[0]]) {
					console.log("2")
					memory[allArgs[0]] = args;
				}else{
					console.log("3")
					var params = memory[allArgs[0]];
					params.push(args);
				}
				console.log(args);
				console.log(allArgs);
				console.log(memory);

				memory[allArgs[0]][args] = allArgs[0].apply(this,args);
				return memory[allArgs[0]][args];
			};
		};		
	}
}

var b = advancedMemorized();
console.log(b(factorial,5));
