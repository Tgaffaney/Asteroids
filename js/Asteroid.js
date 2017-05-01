function new_Asteroid(x,y,xVel,yVel,type){
    //Decides type and size of asteroid
    const color = "#EEE";
    var size = 0;
    switch(type){
      case ASTEROID.small:
        size = ASTEROID.small;
        ast = new createjs.Bitmap('Asteroid-sm.png');
        break;
      case ASTEROID.medium:
        size = ASTEROID.medium;
        ast = new createjs.Bitmap('Asteroid-md.png');
        break;
      case ASTEROID.large:
        size = ASTEROID.large;
        ast = new createjs.Bitmap('Asteroid-lg.png');
        break;
      } 
      //Adds extra properties to the asteroid
    ast.x = x;
    ast.y = y;
    ast.rotate = 0;
    ast.asteroidType = type;
    ast.xVelocity = xVel;
    ast.yVelocity = yVel;
    ast.height = size * 2;
    ast.width = size * 2;
    ast.type = type;

    //Gets current bounds of the asteroid
    ast.getBounds = function(){
        var thresh = 4;
        return { left : this.x + thresh, right : this.x + this.width - thresh, top : this.y + thresh, bottom : this.y + this.height - thresh, width : this.width, height : this.height, size : this.size } 
    }

    //Gets center X and Y from Asteroid
    ast.getCenterLocation = function(){
        return { x : (this.x + (this.x + this.width)) / 2, y : (this.y + (this.y + this.width)) / 2  }
    }

    //Gets asteroid Type/Size
    ast.getAsteroidType = function(){
        return this.type;
    }

    //Gets current velocity of asteroid
    ast.getVelocity = function(){
        return { xVelocity : this.xVelocity, yVelocity : this.yVelocity }
    }

    //Updates asteroid
    ast.update = function(){
        this.x += this.xVelocity;
        this.y += this.yVelocity;
    }

    return ast;
}

//Values for different types of asteroids
var ASTEROID = {
    small : 10,
    medium : 20,
    large : 40
}