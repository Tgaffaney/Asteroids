function new_AsteroidList(){
	var a = new createjs.DisplayObject();
	a.list = [];
	a.add = function(e){
		this.list.push(e);
		stage.addChildAt(e, 0);
	}

	a.count = function(){
		return this.list.length;
	}

	a.isEmpty = function(){
		return this.list.length == 0;
	}

	a.getAll = function(){
		return this.list;
	}

	a.removeAll = function(){
		for(var x = 0; x < this.list.length; x++){
			stage.removeChild(this.list[x]);
		}
		stage.update();

		this.list = [];
	}

	a.remove = function(e){
		var index = this.list.indexOf(e);
		if(index !== -1) {
		  this.list.splice(index, 1);
		}
		stage.removeChild(e);
		stage.update();
	}

	a.update = function(){
		for(var x = 0; x < this.list.length; x++){
			this.list[x].update();
		}
	}

	return a;
}