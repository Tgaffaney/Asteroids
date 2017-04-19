function new_BulletList(bu){
	var blist = new createjs.Shape();
	blist.arr = [bu];

	return blist;
}

function BulletList_Add(e, bu){
	e.arr.push(bu);
}

function BulletList_GetAll(e){

}

function BulletList_DeleteAll(e){
	for(var i = 0; i < e.arr.length; i++){
		e.arr.pop();
	}
}

function BulletList_IsEmpty(e){
	if(e.arr.length == 0)
		return true;
	else
		return false;
}

function BulletList_Count(e){
	return e.arr.length;
}

function BulletList_Remove(e, bu){
	
}