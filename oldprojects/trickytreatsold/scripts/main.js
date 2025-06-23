var musicOn = true;
var titleImg = document.createElement('img');
	titleImg.src = 'img/titleScreen.png';

function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
}

function drawBG(){
	
	context.drawImage(titleImg, 0, 0, 800, 550);
	context.fillStyle = "#666633";
		context.font = "12px Lucida Console";
		context.fillText("Game & Art by Jana Jane Austria", 550,540);
		//context.fillText("'Carnival Rides' by Ecrivain", 550,540);
}

function drawMenu(){
	context.fillStyle = "#666633";
		context.font = "15px Lucida Console";
		context.fillText("Survival Mode", 600,400);
		context.fillText("Tutorial", 650,350);
		if(musicOn == true)
			context.fillText("Music Off", 550,450);
		else if(musicOn == false)
			context.fillText("Music On", 550,450);
	
}

function hoverEvent(evt) {
	var mousePos = getMousePos(canvas, evt);
	if(mousePos.x >= 600 && mousePos.x <= 716 && mousePos.y >= 388 && mousePos.y <= 399){
		drawBG();
		context.fillStyle = "#ffff66";
		context.font = "20px Lucida Console";
		context.fillText("Survival Mode", 600,400);
		context.fillStyle = "#666633";
		context.font = "15px Lucida Console";
		context.fillText("Tutorial", 650,350);
		if(musicOn == true)
			context.fillText("Music Off", 550,450);
		else if(musicOn == false)
			context.fillText("Music On", 550,450);
	}
	else if(mousePos.x >= 650 && mousePos.x <= 776 && mousePos.y >= 340 && mousePos.y <= 360){
		drawBG();
		context.fillStyle = "#ffff66";
		context.font = "20px Lucida Console";
		
		context.fillText("Tutorial", 650,350);
		context.fillStyle = "#666633";
		context.font = "15px Lucida Console";
		context.fillText("Survival Mode", 600,400);
		if(musicOn == true)
			context.fillText("Music Off", 550,450);
		else if(musicOn == false)
			context.fillText("Music On", 550,450);
			
	}
	else if(mousePos.x >= 550 && mousePos.x <= 676 && mousePos.y >= 440 && mousePos.y <= 460){
		drawBG();
		context.fillStyle = "black";
		context.font = "15px Lucida Console";
		context.fillStyle = "#666633";
		context.fillText("Survival Mode", 600,400);
		context.fillText("Tutorial", 650,350);
		context.font = "20px Lucida Console";
		context.fillStyle = "#ffff66";
		if(musicOn == true)
			context.fillText("Music Off", 550,450);
		else if(musicOn == false)
			context.fillText("Music On", 550,450);
		
	}
	else{
		drawBG();
		drawMenu();
	}
}

function clickEvent(evt) {
        var mousePos = getMousePos(canvas, evt);
		if(mousePos.x >= 600 && mousePos.x <= 716 && mousePos.y >= 388 && mousePos.y <= 399){
			init();
			canvas.removeEventListener('mousemove', hoverEvent);
			canvas.removeEventListener('mousedown', clickEvent);
		}
		if(mousePos.x >= 650 && mousePos.x <= 776 && mousePos.y >= 340 && mousePos.y <= 360){
			init(1);
			canvas.removeEventListener('mousemove', hoverEvent);
			canvas.removeEventListener('mousedown', clickEvent);
		}
		if(mousePos.x >= 550 && mousePos.x <= 676 && mousePos.y >= 440 && mousePos.y <= 540){
			if(musicOn == true){
				bgm.pause();
				musicOn = false;
			}
			else{
				bgm.play();
				musicOn = true;
			}
		}
}

function mainMenu(){
	drawBG(); 
	//drawMenu(); 
	canvas.addEventListener('mousemove', hoverEvent, false);
	canvas.addEventListener('mousedown', clickEvent, false);
	context.fillStyle = "black";
		context.font = "15px Lucida Console";
		context.fillText("Survival Mode", 600,400);
		context.fillText("Tutorial", 650,350);
		if(musicOn == true)
			context.fillText("Music Off", 550,450);
		else if(musicOn == false)
			context.fillText("Music On", 550,450);
	bgm.loop = true;
	bgm.play();
	
}
