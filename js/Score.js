function new_Score(){
	var a = new createjs.DisplayObject();
	a.score = 10;
	a.addScore = function(){
		this.score += 10;
		var r = this.score.toString();
		return r;
	}

	a.removeScore = function(){
		this.score -= 10;
	}

	a.levelBonus = function(){
		this.score += 100;
	}

	a.getCurrentScore = function(){
		var r = this.score.toString();
		return r;
	}

	a.setToZero = function(){
		this.score = 0;
	}

	return a;
}