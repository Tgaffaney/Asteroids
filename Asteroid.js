function new_Asteroid(x,y,xVel,yVel,type){
    const color = "#EEE";
    var size = 0;
    switch(type){
      case ASTEROID.small:
        size = ASTEROID.small;
        break;
      case ASTEROID.medium:
        size = ASTEROID.medium;
        break;
      case ASTEROID.large:
        size = ASTEROID.large;
        break;
      }
      
    var ast = new createjs.Shape();
    ast.x = x;
    ast.y = y;
    ast.graphics.beginFill(color).drawCircle(0,0,size);
    ast.asteroidType = type;
    ast.xVelocity = xVel;
    ast.yVelocity = yVel;
    ast.height = size;
    ast.width = size;
    ast.type = type;

    ast.getBounds = function(){
        return { left : this.x, right : this.x + this.width, top : this.y, bottom : this.y + this.height } 
    }

    ast.getCenterLocation = function(){
        return { x : this.x + this.width / 2, y : this.y + this.width / 2  }
    }

    ast.getAsteroidType = function(){
        return this.type;
    }

    ast.getVelocity = function(){
        return { xVelocity : this.xVelocity, yVelocity : this.yVelocity }
    }

    ast.update = function(){
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        stage.update(this);
    }

    ast.render = function(){

    }

    return ast;
}

var ASTEROID = {
    small : 10,
    medium : 36,
    large : 72
}