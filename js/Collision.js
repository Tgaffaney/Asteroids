function checkAllCollisions(){
	checkPlayerCollisions();
	checkBulletCollisions();
}

function checkPlayerCollisions(){
	var Asts = Asteroid_List.getAll();

	for(var i = 0; i < Asts.length; i++){
		if(checkPlayerToAsteroid( Player_Object, Asts[i]))
			alert('fuck');
	}
}

function checkBulletCollisions(){

}

function checkPlayerToAsteroid( Pla, Ast){
	var Pbounds = Pla.getCenter();
	var Abounds = Ast.getBounds();
	var Acenter = Ast.getCenterLocation();

	if( (Pbounds.x <= Abounds.right) && (Pbounds.x >= Abounds.left) && (Pbounds.y >= Abounds.top) && (Pbounds.y <= Abounds.bottom))
		return true;
}

function checkBulletToAsteroid( Bul, Ast){

}