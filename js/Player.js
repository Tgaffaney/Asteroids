
function new_Player(xpos, ypos){
	//Building shapes to create Player object
	var triangle = new createjs.Shape();
	triangle.graphics.beginFill('#fff');
	triangle.graphics.moveTo(0, 0).lineTo(20, 0).lineTo(10, 30).lineTo(0, 0);
	var win = new createjs.Shape();
	win.graphics.beginFill("#b3ecff");
	win.graphics.drawRect(8, 5, 5, 10);
	//Creating container and adding shapes to container
	var shape = new createjs.Container();
	shape.addChild(triangle);
	shape.addChild(win);
	//Adding extra properties to the player shape
	shape.lives = 3;
	shape.width = 20;
	shape.height = 30;
	shape.isThrusting = false;
	shape.direction = 180;
	shape.yVelocity = 0.0;
	shape.xVelocity = 0.0;
	shape.slowDown = 0.0;
	shape.x = xpos;
	shape.y = ypos;
	shape.regX = shape.regY = 10;
	shape.movementSpeed = 2;
	shape.bulletSpeed = 4;
	shape.moveForward = false;
	shape.rotate = MOVE.none;
	shape.isShooting = false;
	shape.shootStartTime = 0;
	shape.player_rotation_speed = 6;
	shape.firing_rate = 15;
	
	//Gets current position of player
	shape.getPosition = function(){
		var obj = { x:this.x, y:this.y }
		return obj;
	}

	//Gets current bounds of player
	shape.getBounds = function(){
		var obj = { 
			left : this.x,
			right : this.x + this.width,
			top : this.y,
			bottom : this.y + this.height,
			width : this.width,
			height : this.height
		}
		return obj;
	}

	//Returns the center x and y of the player
	shape.getCenter = function(){
		nX = (this.x + (this.x + this.width))/2;
		nY = ((this.y + (this.y + this.height))/2);
		return obj = {x: nX, y: nY};
	}

	//Returns string version of lives property
	shape.getLivesString = function(){
		var r = this.lives.toString();
		return r;
	}

	//returns int version of lives property
	shape.getLives = function(){
		return this.lives;
	}

	//Sets position of player
	shape.setPosition = function(x,y){
		this.x = x;
		this.y = y;
	}

	//Sets velocity of player
	shape.setVelocity = function(xv,yv){
		this.xVelocity = xv,
		this.yVelocity = yv
	}

	//Changes amount of lives player has
	shape.changeLife = function(i){
		this.lives -= i;
	}

	//Updates the player object
	shape.update = function(){
		if(this.moveForward){
			var obj = this.getNextXY();
			this.x = obj.x;
			this.y = obj.y;
		}
		if(this.rotate == MOVE.right)
			this.rotateFunc(this.player_rotation_speed);
		else if(this.rotate == MOVE.left)
			this.rotateFunc(-1 * this.player_rotation_speed);
		else
			this.rotateFunc(0);

		if(this.isShooting && (ticks % this.firing_rate == this.shootStartTime % this.firing_rate)){
			this.shoot();
		}
	}

	//Allows player to shoot bullets
	shape.shoot = function(){
		var curX = this.x;
		var curY = this.y;
		var xVel = Math.sin(this.direction / 180 * Math.PI) * this.bulletSpeed;
		var yVel = -Math.cos(this.direction / 180 * Math.PI) * this.bulletSpeed;
		var bullet = new_Bullet(curX, curY, xVel, yVel);
		Bullet_List.add(bullet);
	}

	//Rotates player object
	shape.rotateFunc = function(x){
		this.rotation += x;

		if(this.direction + x < 0)
			this.direction = 359;
		else if(this.direction + x > 359)
			this.direction = 0;
		else
			this.direction += x;		
	}

	//Gets the next X and Y coordinates of the player
	shape.getNextXY = function(){
		var curX = this.x;
		var curY = this.y;
		var nexX;
		var nexY;

		nexX = curX + Math.sin(this.direction / 180 * Math.PI) * this.movementSpeed;
		nexY = curY - Math.cos(this.direction / 180 * Math.PI) * this.movementSpeed;
		
		return { x : nexX, y : nexY };
	}

	//Handles what happens when the player dies (Sets him back to middle and removes asteroids from the list)
	shape.died = function(){
		if(this.lives > 0){
			Asteroid_List.removeAll();
			Game_pauseWithoutOverlay();
			this.lives--;
			createjs.Tween.get(this).to({x: 345, y: 295}, 700).addEventListener("change", handleChange);
			function handleChange(){
				Asteroid_List.removeAll();
			}
			Game_unpause();	
		}
		else{
			stage.removeChild(this);
			Game_end();
		}
	}
	return shape;
}

//Different values for player movement
var MOVE = {
	right : 0,
	left : 1,
	none : 2
}