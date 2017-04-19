//This function shows an alert with the text 'text' for 'time' seconds
function AlertMessage(text,time){
	createjs.Ticker.paused = true;

	var container = new createjs.Container();

	var box = new createjs.Shape();
	box.x = 100;
	box.y = 500;
	box.graphics.beginFill("#AAA").drawRect(0,0,500,100);
	container.addChild(box);

	text = spliceText(text);

	var textLine1 = new createjs.Text(text, "20px Arial", "#111");
	textLine1.x = 110, textLine1.y = 510;
	container.addChild(textLine1);

	stage.addChild(container);
	stage.update(container);

	setTimeout(function(){

		stage.removeChild(container);
		stage.update();
		createjs.Ticker.paused = false;
	}, time*1000);
}

//This function shows alerts for all strings in the 'textArray'
//Each one pops up for 'time' seconds
function AlertAllMessages(textArray,time){
	var seconds = time * 1000;
	if(textArray.length > 0){

		AlertMessage(textArray[0],time);

		setTimeout(function(){
			textArray.splice(0, 1);
			AlertAllMessages(textArray,time);
		},seconds);
	}
}

//This function adds line breaks to alert messages.
function spliceText(text){
	var lineLimit = 45;
	var arrayOfChars = text.split("");
	var newString = "";
	var enterAfterNextSpace = false;

	for(var x = 0; x < arrayOfChars.length; x++){
		if((x % lineLimit == 0 && x != 0)  || enterAfterNextSpace){
			if(arrayOfChars[x] == ' '){
				newString += '\n';
				enterAfterNextSpace = false;
			}else{
				enterAfterNextSpace = true;
				newString += arrayOfChars[x];
			}
			if(enterAfterNextSpace && arrayOfChars[x] == ' '){
				newString += '\n';
				enterAfterNextSpace = false;
			}
			
		}else{
			newString += arrayOfChars[x];
		}
	}
	return newString;
}