function checkAllCollisions(){
	checkPlayerCollisions();
	checkBulletCollisions();
}

function checkPlayerCollisions(){
	var Asts = Asteroid_List.getAll();

	for(var i = 0; i < Asts.length; i++){
		if(checkPlayerToAsteroid( Player_Object, Asts[i]))
			Player_Object.died();
	}
}

function checkBulletCollisions(){
	var Asts = Asteroid_List.getAll();
	var Bulls = Bullet_List.getAll();
	console.log(Asts.length + " " + Bulls.length);
	for(var a = 0; a < Asts.length; a++){
		for(var b = 0; b < Bulls.length; b++){
			if(checkBulletToAsteroid(Bulls[b], Asts[a])){
				Asteroid_List.remove(Asts[a]);
				Bullet_List.remove(Bulls[b]);
				Score_Object.addScore();
			}

		}
	}
}

function checkPlayerToAsteroid( Pla, Ast){
	var rect1 = Pla.getBounds();
	var rect2 = Ast.getBounds();

	if(rect1.left < rect2.left + rect2.width && rect1.left + rect1.width > rect2.left && rect1.top < rect2.top + rect2.height && rect1.height + rect1.top > rect2.top){

		return true;
	}
}

function checkBulletToAsteroid( Bul, Ast){
	var Bullet = Bul.getLocation();
	var Abounds = Ast.getBounds();

	if( (Bullet.x <= Abounds.right) && (Bullet.x >= Abounds.left) && (Bullet.y >= Abounds.top) && (Bullet.y <= Abounds.bottom))
		return true;
}