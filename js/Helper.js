function special_sqrt(a){
	if(a < 0)
		return Math.sqrt(a * -1) * -1;
	return Math.sqrt(a);
}

function getRandomXYForLeftWall(speed){
	var xt = Math.abs( special_sqrt( (Math.random() * 2 * speed * speed) - (speed * speed) ) );
	var yt = special_sqrt( (speed * speed) - (xt * xt) );
	return { x : xt, y : yt };
}

function getRandomXYForRightWall(speed){
	var xt = -1 * Math.abs( special_sqrt( (Math.random() * 2 * speed * speed) - (speed * speed) ) );
	var yt = special_sqrt( (speed * speed) - (xt * xt) );
	return { x : xt, y : yt };
}

function getRandomXYForTopWall(speed){
	var xt = special_sqrt( (Math.random() * 2 * speed * speed) - (speed * speed) );
	var yt = Math.abs( special_sqrt( (speed * speed) - (xt * xt) ) );
	return { x : xt, y : yt };
}

function getRandomXYForBottomWall(speed){
	var xt = special_sqrt( (Math.random() * 2 * speed * speed) - (speed * speed) );
	var yt = -1 * Math.abs( special_sqrt( (speed * speed) - (xt * xt) ) );
	return { x : xt, y : yt };
}