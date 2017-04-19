function new_AsteroidList(ast){
	var alist = new createjs.Shape();
	alist.arr = [ast];
	return alist;
}

function AsteroidList_Add(e, ast){
	e.arr.push(ast);
}

function AsteroidList_GetAll(e){

}

function AsteroidList_DeleteAll(e){
	for(var i = 0; i < e.arr.length; i++){
		e.arr.pop();
	}
}

function AsteroidList_IsEmpty(e){
	if(e.arr.length < 1)
		return true;
	else
		return false;
}

function AsteroidList_Count(e){
	return e.arr.length;
}

function AsteroidList_Remove(e, ast){
	e.arr.splice(ast);
}