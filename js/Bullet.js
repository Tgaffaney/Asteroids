function new_Bullet( xP, yP, xV, yV){
	var shape = new createjs.Shape();
	shape.graphics.beginFill('#ffffff');
	shape.graphics.drawCircle(0, 0, 5);

	shape.x = xP;
	shape.y = yP;
	shape.xVelocity = xV;
	shape.yVelocity = yV;

	return shape;
}

function Bullet_GetLocation(e){

}

function Bullet_Update(e){

}

function Bullet_Render(e){

}

function Bullet_Delete(e){

}
