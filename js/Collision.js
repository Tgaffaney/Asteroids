function checkAllCollisions(){
	checkPlayerCollisions();
	checkBulletCollisions();
}

function checkPlayerCollisions(){
	var Asts = Asteroid_List.getAll();

	for(var i = 0; i < Asts.length; i++){
		if(checkPlayerToAsteroid( Player_Object, Asts[i]))
			alert('asdf0');
	}
}

function checkBulletCollisions(){

}

function checkPlayerToAsteroid( Pla, Ast){
	var Pbounds = Pla.getCenter();
	var Abounds = Ast.getBounds();

	if( (Pbounds.x >= Abounds.left) && (Pbounds.x <= Abounds.right)){
		if( (Pbounds.y <= Abounds.top) && (Pbounds.y >= Abounds.bottom) )
			return true;
	} 

	else if( (Pbounds.y <= Abounds.top) && (Pbounds.y >= Abounds.bottom) )
		console.log("yep");
}

function checkBulletToAsteroid( Bul, Ast){
	
}