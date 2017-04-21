var Asteroid_List;
var Asteroid_Generator;
var Bullet_List;
var Player_Object;
var Score_Object;
var Stats_Object;
var stage;
var Game_State;

//Overlay Containers
var Pause_Container;
var Start_Container;

var ticks = 0;

var speedLbl;
var generLbl;

function game_init(){
	Game_State = GAME.none;
	Game_initStage();
	Game_buildStage();
	Game_setControls();
	init_AsteroidGenerator();
	Asteroid_Generator.start();
	Asteroid_Generator.generate();

	speedLbl = document.getElementById('speedLbl');
	generLbl = document.getElementById('generLbl');

	//Game_pauseWithoutOverlay();
	Game_showStartOverlay();
}

function Game_showStartOverlay(){
	var background = new createjs.Shape();
	background.graphics.beginFill('#666').drawRect(0,0,400,90);
	background.x = 150;
	background.y = 240;
	background.alpha = 0.8;

	var text = new createjs.Text("Press 'Enter' to start.", "30px Arial", "BBB");
	text.x = 350;
	text.y = 270;
	text.textAlign = 'center';

	Start_Container = new createjs.Container();
	Start_Container.addChild(background);
	Start_Container.addChild(text);

	stage.addChild(Start_Container);
	stage.update();
	Game_State = GAME.starting
}

function Game_hideStartOverlay(){
	stage.removeChild(Start_Container);
	stage.update();
}

function Game_start(){
	Game_State = GAME.none;
	Game_hideStartOverlay();

	Asteroid_List.removeAll();

	Asteroid_Generator.timeUntilNextAsteroid = 700;
	Asteroid_Generator.speed = 2;

	Player_Object = new_Player( 345, 295);
	stage.addChild(Player_Object);
	stage.update();

	Game_unpause();
	Game_State = GAME.running;
}

function Game_reset(){

}

function Game_end(){
	Game_State = GAME.none;

	Game_State = GAME.ended;
}

function Game_initStage(){
	Game_buildStage()
	createjs.Ticker.setFPS(60);
	Asteroid_List = new_AsteroidList();
	Bullet_List = new_BulletList();
	createjs.Ticker.addEventListener('tick',Game_update);
}

function Game_buildStage(){
	stage = new createjs.Stage('canvas');
	Paused_Container = new createjs.Container();

	var background = new createjs.Shape();
	background.graphics.beginFill('#666').drawRect(0,0,300,120);
	background.x = 200;
	background.y = 240;
	background.alpha = 0.8;

	var text1 = new createjs.Text("Paused", "35px Arial", "#EEE");
	text1.x = 350;
	text1.y = 260;
	text1.textAlign = 'center';

	var text2 = new createjs.Text("Press 'Enter' to continue.", "22px Arial", "BBB");
	text2.x = 350;
	text2.y = 310;
	text2.textAlign = 'center';

	Paused_Container.addChild(background);
	Paused_Container.addChild(text1);
	Paused_Container.addChild(text2);
}

function Game_setControls(){
	window.onkeydown = handleKeyDown;
	window.onkeyup = handleKeyUp;
	var KEY = { 
		right_arrow : 39,
		up_arrow : 38,
		left_arrow : 37,
		down_arrow : 40,
		spacebar : 16,
		escape : 27,
		enter : 13

	}

	function handleKeyDown(e){
		switch(e.keyCode){
			case KEY.right_arrow :
				Player_Object.rotate = MOVE.right;
				break;
			case KEY.left_arrow :
				Player_Object.rotate = MOVE.left;
				break;
			case KEY.up_arrow :
				Player_Object.moveForward = true;
				break;
			case KEY.down_arrow : 
				break;
			case KEY.escape : 
				break;
			case KEY.spacebar : 
				switch(Game_State){
					case GAME.none :
						break;
					case GAME.starting :
						
						break;
					case GAME.paused :
						
						break;
					case GAME.running :
						Player_Object.isShooting = true;
						Player_Object.shootStartTime = (ticks + 1) % Player_Object.firing_rate;
						break;
					case GAME.ended :
						break;
				}
				break;
			case KEY.enter :
				switch(Game_State){
					case GAME.none :
						break;
					case GAME.starting :
						Game_start();
						break;
					case GAME.paused :
						Game_unpause();
						break;
					case GAME.running :
						Game_pauseWithOverlay();
						break;
					case GAME.ended :
						break;
				}
				break;
		}
	}

	function handleKeyUp(e){
		switch(e.keyCode){
			case KEY.right_arrow :
				if(Player_Object.rotate == MOVE.right)
						Player_Object.rotate = MOVE.none;
				break;
			case KEY.left_arrow :
				if(Player_Object.rotate == MOVE.left)
					Player_Object.rotate = MOVE.none;
				break;
			case KEY.up_arrow :
				Player_Object.moveForward = false;
				break;
			case KEY.down_arrow :
				break;
			case KEY.escape : 
				break;
			case KEY.spacebar :
				switch(Game_State){
					case GAME.none :
						break;
					case GAME.starting :
						break;
					case GAME.paused :
						break;
					case GAME.running :
						Player_Object.isShooting = false;
						Player_Object.shootStartTime = 0;
						break;
					case GAME.ended :
						break;
				}
				break;
			case KEY.enter :
				break;
		}
	}
}

function Game_update(){
	ticks++;

	if(!createjs.Ticker.paused){
		if(Asteroid_List != null){
			checkBorder();
			Asteroid_List.update();
		}
		if(Player_Object != null)
			Player_Object.update();
		if(Bullet_List != null)
			Bullet_List.update();

		//Pauses the game if users focuses on a different webpage or program
		if(!document.hasFocus() && Game_State == GAME.running){
			Game_pauseWithOverlay();
		}

	}else{

	}

	stage.update();
}

function Game_pauseWithOverlay(){
	Game_State = GAME.none;
	createjs.Ticker.paused = true;
	Asteroid_Generator.stop();

	stage.addChild(Paused_Container);
	stage.update();
	Game_State = GAME.paused;
}

function Game_pauseWithoutOverlay(){
	Game_State = GAME.none;
	createjs.Ticker.paused = true;
	Asteroid_Generator.stop();
	Game_State = GAME.paused;
}

function Game_unpause(){
	Game_State = GAME.none;
	createjs.Ticker.paused = false;
	Asteroid_Generator.start();

	stage.removeChild(Paused_Container);
	stage.update();

	Game_State = GAME.running;
}

function Game_deleteAllObjects(){
	Asteroid_List.removeAll();
}

function button1(e){
	if(createjs.Ticker.paused)
		Game_unpause();
	else
		Game_pauseWithOverlay();
}

function button2(e){
	if(createjs.Ticker.paused)
		Game_unpause();
	else
		Game_pauseWithoutOverlay();
}



function button3(e){
	Asteroid_Generator.stop();
}

function button4(e){
	Asteroid_Generator.start();
}

function button5(e){
	Asteroid_List.removeAll();
}
function button6(e){
	Asteroid_Generator.speed += .25;
	speedLbl.innerHTML = "Speed : " + Asteroid_Generator.speed;
}
function button7(e){
	if(Asteroid_Generator.timeUntilNextAsteroid > 51)
		Asteroid_Generator.timeUntilNextAsteroid -= 50;
	generLbl.innerHTML = "Generation Delay : " + Asteroid_Generator.timeUntilNextAsteroid;
}
function button8(e){
	Asteroid_Generator.timeUntilNextAsteroid += 50;
	generLbl.innerHTML = "Generation Delay : " + Asteroid_Generator.timeUntilNextAsteroid;
}
function button9(e){
	Asteroid_Generator.speed -= .25;
	speedLbl.innerHTML = "Speed : " + Asteroid_Generator.speed;
}

var GAME = {
	starting : 0,
	paused : 1,
	running : 2,
	ended : 3,
	none : 4
}