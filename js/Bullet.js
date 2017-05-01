function new_Bullet( xP, yP, xV, yV){
	var shape = new createjs.Shape();
	shape.graphics.beginFill('#ffffff');
	shape.graphics.drawCircle(0, 0, 3);

	shape.x = xP;
	shape.y = yP;
	shape.xVelocity = xV;
	shape.yVelocity = yV;

	shape.getLocation = function(){
		return { x : this.x, y : this.y};
	}
	shape.update = function(){
		this.x += this.xVelocity;
		this.y += this.yVelocity;
	}

	return shape;
}
