function new_Bullet( xP, yP, xV, yV){
	var shape = new createjs.Shape();
	shape.graphics.beginFill('#ffffff');
	shape.graphics.drawCircle(0, 0, 3);
	//Adds extra properties to bullet
	shape.x = xP;
	shape.y = yP;
	shape.xVelocity = xV;
	shape.yVelocity = yV;

	//Gets current location of bullet
	shape.getLocation = function(){
		return { x : this.x, y : this.y};
	}
	//Updates bullet
	shape.update = function(){
		this.x += this.xVelocity;
		this.y += this.yVelocity;
	}

	return shape;
}
