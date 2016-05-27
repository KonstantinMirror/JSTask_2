



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


