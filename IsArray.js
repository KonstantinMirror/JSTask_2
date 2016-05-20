function isArrayLike(somObj) {
	if (somObj && 
		typeof somObj === "object" && 
		isFinite(somObj.length) && 
		somObj.length >= 0 && 
		somObj.length===Math.floor(somObj.length) && 
		somObj.length < 4294967296) 
		return true; 
	else
		return false; 
}