var Asteroid_List;
var Asteroid_Generator;
var Bullet_List;
var Player_Object;
var Score_Object;
var Stats_Object;
var stage;
var Game_State;
var scoreText;
var livesText;

//Overlay Containers
var Pause_Container;
var Start_Container;

var ticks = 0;

function game_init(){
	//Starts game with game building functions and switches game state
	Game_State = GAME.none;
	Game_initStage();
	Game_buildStage();
	Game_setControls();
	init_AsteroidGenerator();
	Asteroid_Generator.start();
	Asteroid_Generator.generate();
	//Game_pauseWithoutOverlay();
	Game_showStartOverlay();
}

function Game_showStartOverlay(){
	//Creating background for start screen overlay with rectangle shape
	var background = new createjs.Shape();
	background.graphics.beginFill('#666').drawRect(0,0,400,90);
	background.x = 150;
	background.y = 240;
	background.alpha = 0.8;
	//Writing text for overlay over the rectangle shape
	var text = new createjs.Text("Press 'Enter' to start.", "30px Arial", "BBB");
	text.x = 350;
	text.y = 270;
	text.textAlign = 'center';
	//Creating container to hold shape and text element
	Start_Container = new createjs.Container();
	Start_Container.addChild(background);
	Start_Container.addChild(text);
	//adding container to stage and changing game state
	stage.addChild(Start_Container);
	stage.update();
	Game_State = GAME.starting
}

function Game_createStatBox(){
	//Creating stat box with rectangle shape
	var cc = new createjs.Shape();
	cc.graphics.beginFill('#666').drawRect(0, 0, 90, 70);
	cc.x = 10;
	cc.y = 10;
	cc.alpha = 0.8;
	//Creating text object that updates for stat box
	scoreText = new createjs.Text("Score : " + Score_Object.getCurrentScore(), "15px Arial", "#fff");
	scoreText.x = 15;
	scoreText.y = 15;
	livesText = new createjs.Text("Lives : " + Player_Object.getLives(), "15px Arial", "#fff");
	livesText.x = 15;
	livesText.y = 55;
	//creating container to hold text and rectangle object
	var contain = new createjs.Container();
	contain.addChild(cc);
	contain.addChild(scoreText);
	contain.addChild(livesText);
	//Adding container to stage
	stage.addChild(contain);
	stage.update();
}

function Game_hideStartOverlay(){
	//Hides the start overlay and removes from the stage
	stage.removeChild(Start_Container);
	stage.update();
}

function Game_start(){
	//Changes game state and hides the start overlay
	Game_State = GAME.none;
	Game_hideStartOverlay();
	//Removes all the asteroids for clean slate
	Asteroid_List.removeAll();
	//Starts asteroid generator
	Asteroid_Generator.timeUntilNextAsteroid = 500;
	Asteroid_Generator.speed = 2;
	//Creates player object 
	Player_Object = new_Player( 345, 295);
	stage.addChild(Player_Object);
	stage.update();
	//Creates score object for player
	Score_Object = new_Score();
	//Creates stat box associated to Players lives and points
	Game_createStatBox();
	//Changes pause setting and game state
	Game_unpause();
	Game_State = GAME.running;
}

function Game_end(){
	//Switches game state to end game
	Game_State = GAME.ended;
	//Creates game over box rectangle
	var gameOverBox = new createjs.Shape();
	gameOverBox.graphics.beginFill("#666").drawRect(0, 0, 400, 90);
	gameOverBox.x = 150;
	gameOverBox.y = 240;
	gameOverBox.alpha = 0.8;
	//Creates game over text 
	var gameover = new createjs.Text("Game Over", "50px Arial", "#fff");
	gameover.x = 220;
	gameover.y = 260;
	//Creates container to hold text and rectangle and adds to stage
	var gameOverContainer = new createjs.Container();
	gameOverContainer.addChild(gameOverBox);
	gameOverContainer.addChild(gameover);
	stage.addChild(gameOverContainer);
	stage.update();
}

function Game_initStage(){
	//Starts stage and builds ticker
	Game_buildStage()
	createjs.Ticker.setFPS(60);
	//Sets up both lists and event listener 
	Asteroid_List = new_AsteroidList();
	Bullet_List = new_BulletList();
	//event listener for tick to update the game
	createjs.Ticker.addEventListener('tick',Game_update);
}

function Game_buildStage(){
	//Build stage with canvas from HTML and create Pause container
	stage = new createjs.Stage('canvas');
	Paused_Container = new createjs.Container();
	//Build background
	var background = new createjs.Shape();
	background.graphics.beginFill('#666').drawRect(0,0,300,120);
	background.x = 200;
	background.y = 240;
	background.alpha = 0.8;
	//Build text for Background of paused container
	var text1 = new createjs.Text("Paused", "35px Arial", "#EEE");
	text1.x = 350;
	text1.y = 260;
	text1.textAlign = 'center';
	//Second text for how to unpause
	var text2 = new createjs.Text("Press 'Enter' to continue.", "22px Arial", "BBB");
	text2.x = 350;
	text2.y = 310;
	text2.textAlign = 'center';
	//Adds children to pause box
	Paused_Container.addChild(background);
	Paused_Container.addChild(text1);
	Paused_Container.addChild(text2);
}

function Game_setControls(){
	//Setting basic control input with key codes
	window.onkeydown = handleKeyDown;
	window.onkeyup = handleKeyUp;
	var KEY = { 
		right_arrow : 39,
		up_arrow : 38,
		left_arrow : 37,
		down_arrow : 40,
		spacebar : 65,
		escape : 27,
		enter : 13

	}

	function handleKeyDown(e){
		//Checks wich key was pushed and handles key down functionality
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
		//Handles key up from initial key down 
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
	//Updates Game. 
	//We use the amount of ticks to determine what to check because we don't have to constantly be running the updates for both lists
	if(!createjs.Ticker.paused){
		ticks++
		if(Asteroid_List != null){
			checkBorder();
			Asteroid_List.update();
		}
		if(Player_Object != null)
			Player_Object.update();
		if(Bullet_List != null)
			Bullet_List.update();
		if(Game_State == GAME.running){
			updateLivesText();
			updateScoreText();
			checkAllCollisions();
		}
		//Pauses the game if users focuses on a different webpage or program
		if(!document.hasFocus() && Game_State == GAME.running){
			Game_pauseWithOverlay();
		}
		//This makes the game harder.
		if(ticks == 2400){
			Asteroid_Generator.timeUntilNextAsteroid = LEVEL.two[1];
			Asteroid_Generator.speed = LEVEL.two[0];
		}else if(ticks == 4800){
			Asteroid_Generator.timeUntilNextAsteroid = LEVEL.three[1];
			Asteroid_Generator.speed = LEVEL.three[0];
		}else if(ticks == 7200){
			Asteroid_Generator.timeUntilNextAsteroid = LEVEL.four[1];
			Asteroid_Generator.speed = LEVEL.four[0];
		}else if(ticks == 9600){
			Asteroid_Generator.timeUntilNextAsteroid = LEVEL.five[1];
			Asteroid_Generator.speed = LEVEL.five[0];
		}
	}else{

	}
	stage.update();
}

function Game_pauseWithOverlay(){
	//Pauses game with overlay
	Game_State = GAME.none;
	createjs.Ticker.paused = true;
	Asteroid_Generator.stop();
	//Adds pause overlay to stage and updates
	stage.addChild(Paused_Container);
	stage.update();
	//Updates game state to paused
	Game_State = GAME.paused;
}

function Game_pauseWithoutOverlay(){
	//Pauses ticker, generator, and the game state
	Game_State = GAME.none;
	createjs.Ticker.paused = true;
	Asteroid_Generator.stop();
	Game_State = GAME.paused;
}

function Game_unpause(){
	//unpauses the state, ticker, and generator
	Game_State = GAME.none;
	createjs.Ticker.paused = false;
	Asteroid_Generator.start();
	//removes pause container
	stage.removeChild(Paused_Container);
	stage.update();
	//Game state switch
	Game_State = GAME.running;
}

function Game_deleteAllObjects(){
	//Deletes all asteroids from list
	Asteroid_List.removeAll();
}

//Below are the different Game States for the game state machine
var GAME = {
	starting : 0,
	paused : 1,
	running : 2,
	ended : 3,
	none : 4
}

function updateLivesText(){
	//function that updates the text element of Lives in the stats box
	var x = livesText.text;
	if(x === Player_Object.getLivesString()){

	}
	else{
		livesText.text = "Lives : " + Player_Object.getLivesString();
	}
}

function updateScoreText(){
	//function that updates the text element of Score in the stats box
	var x = scoreText.text;
	if( x === Score_Object.getCurrentScoreString()){

	}
	else{
		scoreText.text = "Score : " + Score_Object.getCurrentScoreString();
	}
}


//Below are the different level stats (Asteroid speed mainly)
var LEVEL = {
	one : [2,500],
	two : [2,450],
	three : [3,450],
	four : [3,400],
	five : [4,400]
}