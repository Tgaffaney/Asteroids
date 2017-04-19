var Asteroid_List;
var Asteroid_Generator;
var Bullet_List;
var Player_Object;
var Score_Object;
var Stats_Object;
var stage;

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

	var a = new_Asteroid(100,100,2,2,'small');
	var b = new_Player( 200, 200);
	stage.addChild(b);
	stage.addChild(a);
	stage.update();

}

function Game_buildStage(){}

function Game_setControls(){}

function Game_tick(){
	stage.update();
}

function Game_update(){

}

function Game_render(){

}

function Game_deleteAllObjects(){

}