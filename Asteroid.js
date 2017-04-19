function new_Asteroid(x,y,xVel,yVel,type){
    const color = "#EEE";
    var size = 0;
    switch(type){
      case 'small':
        size = 12;
        break;
      case 'medium':
        size = 36;
        break;
      case 'large':
        size = 72;
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
    return ast;
}
 
function Asteroid_getBounds(e){
      
}

function Asteroid_getCenterLocation(e){
      
}

function Asteroid_getAsteroidType(e){
      
}

function Asteroid_getVelocity(e){
      
}

function Asteroid_update(e){
      
}

function Asteroid_render(e){
      
}

function Asteroid_delete(e){

}