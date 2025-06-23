var c1Img = document.createElement('img');
	c1Img.src = 'img/c1.png';
var c2Img = document.createElement('img');
	c2Img.src = 'img/c2.png';
var c3Img = document.createElement('img');
	c3Img.src = 'img/c3.png';
var c4Img = document.createElement('img');
	c4Img.src = 'img/c4.png';

function addClickableInventory(){
	options = [];
	
	addOption(20,495,40,40,"c1", c1Img);
	addOption(75,495,40,40,"c2", c2Img);
	addOption(130,495,40,40,"c3", c3Img);
	addOption(185,495,40,40,"c4", c4Img);
	drawItems();
	canvas.addEventListener('mousemove', ingamehoverEvent, false);
	canvas.addEventListener('mousedown', ingameclickEvent, false);
}
function drawItems(undraw){
	var i;
	for(i=0; i<options.length; i++){
		if(i != undraw)
			options[i].draw();
	}
}

function ingameclickEvent(evt){
        var mousePos = getMousePos(canvas, evt);
		if(inCoordinates(potions[0],mousePos) && player1.eye>0){
			if(activateB == true){
				activateB = false;
				actNum--;
			}
			else if(activateB == false){
				activateB = true;
				actNum++;
			}
		}
		else if(inCoordinates(options[1],mousePos)){
			//charSelection();
		}
}
var s = true;


function ingamehoverEvent(evt) {
	var mousePos = getMousePos(canvas, evt);
	for(i=0; i<options.length; i++){
		if(inCoordinates(options[i],mousePos)){
			options[i].drawHover();
			drawMenu(i);
			s = true;
		}
		else
			s = false;
	}
	//if(s==false){
	//drawBG();
	//drawMenu();
	//}
	
}