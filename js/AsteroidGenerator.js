function init_AsteroidGenerator(){
	Asteroid_Generator = new createjs.DisplayObject();

	Asteroid_Generator.isRunning = false;
	Asteroid_Generator.timeUntilNextAsteroid = 500;
	Asteroid_Generator.margin = 40;
	Asteroid_Generator.speed = 2;

	Asteroid_Generator.stop = function(){
		Asteroid_Generator.isRunning = false;
	}

	Asteroid_Generator.generateRandomAsteroid = function(){
		var sideInt = Math.floor(Math.random() * 4 + 1);
		var height = 500;
		var width = 700;
		var speed = this.speed;
		var margin = this.margin;
		var x;
		var y;
		var xv;
		var yv;
		var type;
		switch(sideInt){
			case 1: //Left
				var XandY = getRandomXYForLeftWall(speed);
				x = -1 * margin;
				y = Math.floor(Math.random() * height);
				xv = XandY.x;
				yv = XandY.y;
				var typeInt = Math.floor(Math.random() * 3); //Math.ceil(Math.random(0,3));
				switch(typeInt){
					case 0:
						type = ASTEROID.small;
						break;
					case 1:
						type = ASTEROID.medium;
						break;
					case 2:
						type = ASTEROID.large;
						break;
				}
				break;
			case 2: //Top
				var XandY = getRandomXYForTopWall(speed);
				x = Math.floor(Math.random() * width);
				y = -1 * margin;
				xv = XandY.x;
				yv = XandY.y;
				var typeInt = Math.floor(Math.random() * 3); //Math.ceil(Math.random(0,3));
				switch(typeInt){
					case 0:
						type = ASTEROID.small;
						break;
					case 1:
						type = ASTEROID.medium;
						break;
					case 2:
						type = ASTEROID.large;
						break;
				}
				break;
			case 3: //Right
				var XandY = getRandomXYForRightWall(speed);
				x = width + margin;
				y = Math.floor(Math.random() * height);
				xv = XandY.x;
				yv = XandY.y;
				var typeInt = Math.floor(Math.random() * 3);
				switch(typeInt){
					case 0:
						type = ASTEROID.small;
						break;
					case 1:
						type = ASTEROID.medium;
						break;
					case 2:
						type = ASTEROID.large;
						break;
				}
				break;
			case 4: //Bottom
				var XandY = getRandomXYForBottomWall(speed);
				x = Math.floor(Math.random() * width);
				y = height + margin;
				xv = XandY.x;
				yv = XandY.y;
				var typeInt = Math.floor(Math.random() * 3); //Math.ceil(Math.random(0,3));
				switch(typeInt){
					case 0:
						type = ASTEROID.small;
						break;
					case 1:
						type = ASTEROID.medium;
						break;
					case 2:
						type = ASTEROID.large;
						break;
				}
				break;
		}
		var ast = new_Asteroid(x,y,xv,yv,type);
		Asteroid_List.add(ast);
	}

	Asteroid_Generator.generate = function(){
		if(Asteroid_Generator.isRunning){
			Asteroid_Generator.generateRandomAsteroid();
		}
		setTimeout(function(){
			Asteroid_Generator.generate();
		},Asteroid_Generator.timeUntilNextAsteroid);
	}

	Asteroid_Generator.start = function(){
		Asteroid_Generator.isRunning = true;
	}

}