function new_BulletList(){
	var blist = new createjs.Shape();
	blist.arr = [];

	//Adds bullet to bullet list
	blist.add = function(bullet){
		this.arr.push(bullet);
		stage.addChildAt(bullet,0);
		stage.update();
	}
	//returns the list of the bullet list object
	blist.getAll = function(){
		return this.arr;
	}
	//Removes certain bullet from bullet list
	blist.remove = function(child){
		var index = this.arr.indexOf(child);
		if(index !== -1) {
		  this.arr.splice(index, 1);
		}
		stage.removeChild(child);
		stage.update();
	}
	//removes all bullets from bullet list
	blist.removeAll = function(){
		for(var i = 0; i < this.arr.length; i++){
			stage.removeChild(this.arr[i]);
		}
		stage.update();
		this.arr = [];
	}
	//Checks if bullet list is empty
	blist.isEmpty = function(){
		return this.arr.length == 0;
	}
	//Gets amount of children in bullet list
	blist.count = function(){
		return this.arr.length;
	}
	//Updates the bullet list
	blist.update = function(){
		for(var x = 0; x < this.arr.length; x++){
			this.arr[x].update();
		}
	}

	return blist;
}