function init_AsteroidGenerator(){
	Asteroid_Generator = new createjs.DisplayObject();

	Asteroid_Generator.isRunning = false;
	Asteroid_Generator.timeUntilNextAsteroid = 5000;

	Asteroid_Generator.stop = function(){
		Asteroid_Generator.isRunning = false;
	}

	Asteroid_Generator.generateRandomAsteroid = function(){
		AlertMessage('boom',1);
	}

	Asteroid_Generator.generate = function(){
		if(Asteroid_Generator.isRunning){
			Asteroid_Generator.generateRandomAsteroid();
			setTimeout(function(){
				Asteroid_Generator.generate();
			},Asteroid_Generator.timeUntilNextAsteroid);
		}
	}

	Asteroid_Generator.start = function(){
		Asteroid_Generator.isRunning = true;
	}

}