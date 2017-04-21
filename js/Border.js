function checkBorder(){
	var leftBorder = -50;
	var rightBorder = 750;
	var topBorder = -50;
	var bottomBorder = 550;

	var asteroids = Asteroid_List.getAll();
	for(var a = 0; a < asteroids.length; a++){
		var x = asteroids[a].getCenterLocation().x;
		var y = asteroids[a].getCenterLocation().y;

		if(x < leftBorder && x > rightBorder && y < topBorder && y > bottomBorder){
			var ast = asteroids[a];
			Asteroid_List.remove(ast);
		}
	}

	var bullets = Bullet_List.getAll();
	for(var a = 0; a < bullets.length; a++){
		var x = bullets[a].getLocation().x;
		var y = bullets[a].getLocation().y;
		if(x < leftBorder && x > rightBorder && y < topBorder && y > bottomBorder)
			Bullet_List.remove(bullets[a]);
	}
}