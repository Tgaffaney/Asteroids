
function new_Player(xpos, ypos){
	var shape = new createjs.Shape();
	shape.graphics.beginFill('red');
	shape.graphics.moveTo(0, 0).lineTo(20, 0).lineTo(10, 30).lineTo(0, 0);

	shape.lives = 3;
	shape.width = 60;
	shape.height = 90;
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
	
	shape.getPosition = function(){
		var obj = { x:this.x, y:this.y }
		return obj;
	}

	shape.getNextBounds = function(){

	}

	shape.getBounds = function(){
		var obj = { 
			left : this.x,
			right : this.x + this.width,
			top : this.y,
			bottom : this.y + this.height
		}
		return obj;
	}

	shape.getCenter = function(){
		nX = (this.x + (this.x + this.width))/2;
		nY = ((this.y + (this.y + this.height))/2) + 20;
		return obj = {x: nX, y: nY};
	}

	shape.getLivesString = function(){
		var r = this.lives.toString();
		return r;
	}

	shape.getLives = function(){
		return this.lives;
	}

	shape.setPosition = function(x,y){
		this.x = x;
		this.y = y;
	}

	shape.setVelocity = function(xv,yv){
		this.xVelocity = xv,
		this.yVelocity = yv
	}

	shape.changeLife = function(i){
		this.lives -= i;
	}

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

	shape.shoot = function(){
		var curX = this.x;
		var curY = this.y;
		var xVel = Math.sin(this.direction / 180 * Math.PI) * this.bulletSpeed;
		var yVel = -Math.cos(this.direction / 180 * Math.PI) * this.bulletSpeed;
		var bullet = new_Bullet(curX, curY, xVel, yVel);
		Bullet_List.add(bullet);
	}

	shape.rotateFunc = function(x){
		this.rotation += x;

		if(this.direction + x < 0)
			this.direction = 359;
		else if(this.direction + x > 359)
			this.direction = 0;
		else
			this.direction += x;		
	}

	shape.getNextXY = function(){
		var curX = this.x;
		var curY = this.y;
		var nexX;
		var nexY;

		nexX = curX + Math.sin(this.direction / 180 * Math.PI) * this.movementSpeed;
		nexY = curY - Math.cos(this.direction / 180 * Math.PI) * this.movementSpeed;
		
		return { x : nexX, y : nexY };
	}

	shape.died = function(){
		if(this.lives > 0){
			this.visible = false;
			this.x = 345;
			this.y = 295;
			Asteroid_List.removeAll();
			this.visible = true;
			this.lives--;
		}
		else{
			stage.removeChild(this);
			Game_end();
		}
	}

	return shape;
}

var MOVE = {
	right : 0,
	left : 1,
	none : 2
}