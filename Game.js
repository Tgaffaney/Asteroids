var Asteroid_List;
var Asteroid_Generator;
var Bullet_List;
var Player_Object;
var Score_Object;
var Stats_Object;
var stage;
var astr;

function game_init(){
	Game_initStage();
	Game_buildStage();
	Game_setControls();
	init_AsteroidGenerator();
	Asteroid_Generator.start();
	Asteroid_Generator.generate();
}

function Game_start(){

}

function Game_reset(){

}

function Game_end(){

}

function Game_initStage(){
	stage = new createjs.Stage('canvas');
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener('tick',Game_tick);

	astr = new_Asteroid(100,100,0,0,ASTEROID.small);
	Player_Object = new_Player( 200, 200);
	Asteroid_List = new_AsteroidList();
	stage.addChild(Player_Object);
	stage.update();

}

function Game_buildStage(){}

function Game_setControls(){}

function Game_tick(){
	astr.update();
	
}

function Game_update(){

}

function Game_render(){

}

function Game_deleteAllObjects(){

}