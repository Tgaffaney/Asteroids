function new_AsteroidList(){
	var a = new createjs.DisplayObject();
	a.list = [];

	//Adds asteroid to asteroid list
	a.add = function(e){
		this.list.push(e);
		stage.addChildAt(e, 0);
	}

	//Gets current amount of children in asteroid list
	a.count = function(){
		return this.list.length;
	}

	//Checks if list is empty
	a.isEmpty = function(){
		return this.list.length == 0;
	}

	//returns list of the asteroid list object
	a.getAll = function(){
		return this.list;
	}

	//Removes all children form asteroid list
	a.removeAll = function(){
		for(var x = 0; x < this.list.length; x++){
			stage.removeChild(this.list[x]);
		}
		stage.update();
		this.list = [];
	}

	//Removes specific child from asteroid list
	a.remove = function(e){
		var index = this.list.indexOf(e);
		if(index !== -1) {
		  this.list.splice(index, 1);
		}
		stage.removeChild(e);
		stage.update();
	}

	//Updates Asteroid list
	a.update = function(){
		for(var x = 0; x < this.list.length; x++){
			this.list[x].rotation += this.list[x].rotate;
			this.list[x].update();
		}
	}

	return a;
}