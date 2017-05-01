function new_Asteroid(x,y,xVel,yVel,type){
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
      
    

    ast.x = x;
    ast.y = y;
    ast.rotate = 0;
    ast.asteroidType = type;
    ast.xVelocity = xVel;
    ast.yVelocity = yVel;
    ast.height = size * 2;
    ast.width = size * 2;
    ast.type = type;

    ast.getBounds = function(){
        var thresh = 4;
        return { left : this.x + thresh, right : this.x + this.width - thresh, top : this.y + thresh, bottom : this.y + this.height - thresh, width : this.width, height : this.height, size : this.size } 
    }

    ast.getCenterLocation = function(){
        return { x : (this.x + (this.x + this.width)) / 2, y : (this.y + (this.y + this.width)) / 2  }
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
    }

    return ast;
}

var ASTEROID = {
    small : 10,
    medium : 20,
    large : 40
}