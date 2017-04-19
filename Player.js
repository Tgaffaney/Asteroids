
function new_Player(xpos, ypos){
	var shape = new createjs.Shape();
	shape.graphics.beginFill('#ffffff');
	shape.graphics.beginStroke('#C0C0C0');
	shape.graphics.moveTo(0, 0).lineTo(20, 0).lineTo(10, 30).lineTo(0, 0);

	shape.lives = 3;
	shape.width = 60;
	shape.height = 90;
	shape.turning = 0;
	shape.isThrusting = false;
	shape.direction = 0;
	shape.yVelocity = 0.0;
	shape.xVelocity = 0.0;
	shape.slowDown = 0.0;
	shape.x = xpos;
	shape.y = ypos;

	return shape;
}

function Player_getPosition(e){
	var x = [e.x, e.y];
	return x;
}

function Player_getNextBounds(e){

}

function Player_getBounds(e){
	var arr = [e.x,e.y,e.x + e.width,e.y+e.height];
	return arr;
}

function Player_getLives(e){
	return e.lives;
}

function Player_setTurning(e, i){
	e.turning = i;
}

function Player_setPosition(e, xx, yy){
	e.x = xx;
	e.y = yy;
}

function Player_setVelocity(e, xV, yV){
	e.xVelocity = xV;
	e.yVelocity = yV;
}

function Player_changeLife(e, i){
	e.lives = i;
}

function Player_update(e){

}

function Player_render(e){

}

function Player_delete(e){
	e = null;
}

function DEAD(e){

}