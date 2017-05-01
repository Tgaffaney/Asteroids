function checkAllCollisions(){
	//Calls both Player and Bullet Collisions
	checkPlayerCollisions();
	checkBulletCollisions();
}

function checkPlayerCollisions(){
	//Checks all Asteroids in Asteroid List and Kills player if its hit
	var Asts = Asteroid_List.getAll();
	for(var i = 0; i < Asts.length; i++){
		if(checkPlayerToAsteroid( Player_Object, Asts[i]))
			Player_Object.died();
	}
}

function checkBulletCollisions(){
	//Checks All asteroids and if bullet hits, it is removed from the list
	var Asts = Asteroid_List.getAll();
	var Bulls = Bullet_List.getAll();
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
	//Grabs both bounds of The player and Asteroids to check for collisions
	var rect1 = Pla.getBounds();
	var rect2 = Ast.getBounds();
	if(rect1.left < rect2.left + rect2.width && rect1.left + rect1.width > rect2.left && rect1.top < rect2.top + rect2.height && rect1.height + rect1.top > rect2.top){
		return true;
	}
}

function checkBulletToAsteroid( Bul, Ast){
	//Grabs both bounds of the bullet and asteroid to check for collisions
	var Bullet = Bul.getLocation();
	var Abounds = Ast.getBounds();
	if( (Bullet.x <= Abounds.right) && (Bullet.x >= Abounds.left) && (Bullet.y >= Abounds.top) && (Bullet.y <= Abounds.bottom))
		return true;
}