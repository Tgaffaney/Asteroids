function new_BulletList(){
	var blist = new createjs.Shape();
	blist.arr = [];

	blist.add = function(bullet){
		this.arr.push(bullet);
		stage.addChildAt(bullet,0);
		stage.update();
	}
	blist.getAll = function(){
		return this.arr;
	}
	blist.remove = function(child){
		var index = this.arr.indexOf(child);
		if(index !== -1) {
		  this.arr.splice(index, 1);
		}
		stage.removeChild(child);
		stage.update();
	}
	blist.removeAll = function(){
		for(var i = 0; i < this.arr.length; i++){
			stage.removeChild(this.arr[i]);
		}
		stage.update();
		this.arr = [];
	}
	blist.isEmpty = function(){
		return this.arr.length == 0;
	}
	blist.count = function(){
		return this.arr.length;
	}
	blist.update = function(){
		for(var x = 0; x < this.arr.length; x++){
			this.arr[x].update();
		}
	}

	return blist;
}