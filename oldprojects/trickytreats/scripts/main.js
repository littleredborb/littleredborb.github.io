var pbtn = new Image();
	pbtn.src = "img/pbtn.png";
var tbtn = new Image();
	tbtn.src = "img/tbtn.png";
var cbtn = new Image();
	cbtn.src = "img/cbtn.png";
var xbtn = new Image();
	xbtn.src = "img/xbtn.png";

var musicOn = true;
var titleImg = document.createElement('img');
	titleImg.src = 'img/bgScreen.png';
var creditsImg = document.createElement('img');
	creditsImg.src = 'img/credits.png';

function drawBG(){
	context.drawImage(titleImg, 0, 0, 800, 550);
	//showControls();
}

function drawCredits(){
	context.drawImage(creditsImg,0,0,800,550);
	context.fillStyle = "gray";
	context.font = "20px qarmic";
	context.fillText("Developed by", 500, 400);
	context.fillText("Jana Austria", 530, 430);
	context.fillText("Music by", 450, 470);
	context.fillText("Andrew Laron", 480, 500);
}

var options = new Array();

function addOption(x,y,w,h,Img,varName){
	var op = new button(x,y,w,h,Img,varName);
	
	options.push(op);
}

function inCoordinates(b, mousePos){
	if(mousePos.x >= b.x && mousePos.x <= b.x + b.w && mousePos.y >= b.y-10 && mousePos.y <= b.y + b.h)
		return true;
	else 
		return false;
}
	
function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
}

function drawMenu(undraw){
	var i;
	for(i=0; i<options.length; i++){
		if(i != undraw)
			options[i].draw();
	}
}

function button(x,y,w,h,bgImg,varName){
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.bgImg = varName;
	this.bgImgHover = new Image();
	this.bgImgHover.src = "img/" + bgImg + "-h.png";

	this.draw = function(){
		context.drawImage(this.bgImg, this.x, this.y, this.w, this.h);
	}

	this.drawHover = function(){
		context.drawImage(this.bgImgHover, this.x, this.y, this.w, this.h);
	}
}

// INIT THINGS FOR MAIN
function initMain(){
	options = [];
	drawBG();
	
	addOption(280,250,255,64,"pbtn", pbtn);
	addOption(280,330,255,64,"tbtn", tbtn);
	addOption(280,410,255,64,"cbtn", cbtn);
	drawMenu();
	bgm.loop = true;
	if(musicOn)
		bgm.play();
	canvas.addEventListener('mousemove', hoverEvent, false);
	canvas.addEventListener('mousedown', clickEvent, false);
}

function clickEvent(evt) {
        var mousePos = getMousePos(canvas, evt);
		if(inCoordinates(options[0],mousePos)){
			//charSelection();
			clicky.play();
			init();
			removeListeners();
		}
		else if(inCoordinates(options[1],mousePos)){
			//charSelection();
			clicky.play();
			init(1);
			removeListeners();
		}
		else if(inCoordinates(options[2],mousePos)){
			//charSelection();
			clicky.play();
			credits();
			removeListeners();
		}
}
var options2 = [];

function hoverEvent(evt) {
	var mousePos = getMousePos(canvas, evt);
	var s = false;
	for(i=0; i<options.length; i++){
		if(inCoordinates(options[i],mousePos)){
			drawBG();
			options[i].drawHover();
			drawMenu(i);
			s = true;
		}
	}
	if(!s){
	drawBG();
	drawMenu();
	}
	
}
function drawcredMenu(undraw){
	var i;
	for(i=0; i<options2.length; i++){
		if(i != undraw)
			options2[i].draw();
	}
}

function removeListeners(){
	canvas.removeEventListener('mousemove', hoverEvent);
	canvas.removeEventListener('mousedown', clickEvent);
}
function credits(){
	options2.push(new button(730,0,53,46,"xbtn", xbtn));
	drawCredits();
	drawcredMenu();
	canvas.addEventListener('mousedown', credclickEvent, false);
	canvas.addEventListener('mousemove', credhoverEvent, false);
}

function credclickEvent(evt) {
	var mousePos = getMousePos(canvas, evt);
		if(inCoordinates(options2[0],mousePos)){
			//charSelection();
			clicky.play();
			
			canvas.removeEventListener('mousemove', credhoverEvent);
			canvas.removeEventListener('mousedown', credclickEvent);
			initMain();
		}
}

function credhoverEvent(evt) {
	var mousePos = getMousePos(canvas, evt);
	var s = false;
	for(i=0; i<options2.length; i++){
		if(inCoordinates(options2[i],mousePos)){
			drawCredits();
			options2[i].drawHover();
			drawcredMenu(i);
			s = true;
		}
	}
	if(!s){
	drawCredits();
	drawcredMenu();
	}
	
}

