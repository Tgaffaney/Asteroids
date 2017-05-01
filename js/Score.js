function new_Score(){
	//Creates score object for player
	var a = new createjs.DisplayObject();
	a.score = 0;

	//Adds score to current score and returns the string version of score for the text object
	a.addScore = function(){
		this.score += 10;
		var r = this.score.toString();
		return r;
	}

	//Returns current score in string form
	a.getCurrentScoreString = function(){
		var r = this.score.toString();
		return r;
	}

	//Gets current score in int form
	a.getCurrentScore = function(){
		return this.score;
	}

	//Sets score to zero
	a.setToZero = function(){
		this.score = 0;
	}

	return a;
}