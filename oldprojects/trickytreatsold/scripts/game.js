var c1Img = document.createElement('img');
	c1Img.src = 'img/c1.png';
var c2Img = document.createElement('img');
	c2Img.src = 'img/c2.png';
var c3Img = document.createElement('img');
	c3Img.src = 'img/c3.png';
var c4Img = document.createElement('img');
	c4Img.src = 'img/c4.png';
	
var sapImg = document.createElement('img');
	sapImg.src = 'img/sap.png';
	
var throwImg = document.createElement('img');
	throwImg.src = 'img/throw.png';
var consImg = document.createElement('img');
	consImg.src = 'img/cons.png';
	
var rImg = document.createElement('img');
	rImg.src = 'img/r.png';
var gImg = document.createElement('img');
	gImg.src = 'img/g.png';
var bImg = document.createElement('img');
	bImg.src = 'img/b.png';
var oImg = document.createElement('img');
	oImg.src = 'img/o.png';
	
var baseImg = document.createElement('img');
	baseImg.src = 'img/base.png';
	
var glowImg = document.createElement('img');
	glowImg.src = 'img/glow.png';
	
var ooohImg = document.createElement('img');
	ooohImg.src = 'img/oooh.png';

var EgImg = document.createElement('img');
	EgImg.src = 'img/Eg.png';
var EbImg = document.createElement('img');
	EbImg.src = 'img/Eb.png';
var ErImg = document.createElement('img');
	ErImg.src = 'img/Er.png';
var EoImg = document.createElement('img');
	EoImg.src = 'img/Eo.png';
	
var sRImg = document.createElement('img');
	sRImg.src = 'img/sR.png';
var sBImg = document.createElement('img');
	sBImg.src = 'img/sB.png';
var sGImg = document.createElement('img');
	sGImg.src = 'img/sG.png';
var sOImg = document.createElement('img');
	sOImg.src = 'img/sO.png';

var offImg = document.createElement('img');
	offImg.src = 'img/off.png';
var onImg = document.createElement('img');
	onImg.src = 'img/on.png';

var s1Img = document.createElement('img');
	s1Img.src = 'img/normal.png';
var s2Img = document.createElement('img');
	s2Img.src = 'img/scared.png';
var s3Img = document.createElement('img');
	s3Img.src = 'img/insane.png';
	
var playerImg = document.createElement('img');
	playerImg.src = 'img/player.png';
	
var zombieImg = document.createElement('img');
	zombieImg.src = 'img/zombie.png';
var werewolfImg = document.createElement('img');
	werewolfImg.src = 'img/m2.png';
var mummyImg = document.createElement('img');
	mummyImg.src = 'img/m3.png';
var bobImg = document.createElement('img');
	bobImg.src = 'img/m4.png';
	
var canImg = document.createElement('img');
	canImg.src = 'img/canvas.png';
var barImg = document.createElement('img');
	barImg.src = 'img/bar.png';
var bgm = document.createElement('audio');
	bgm.src = 'sounds/bgm.mp3';
	
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var player1;
var mousex = 0;
var mousey = 0;
var dx = 0;
var dy = 0;
var potions = new Array();
var zombies = new Array();
var plants = new Array();
var eyes = new Array();
var friends = new Array();

var activateA = false;
var activateB = false;
var activateC = false;
var activateD = false;
var timer=0;
var musicOn = true;
var actNum=0;
var currTimeOut;
var tutorialstate;

function resetAll(){
	zomb = 175;
	were = 190;
	mum = 196;
	kills = 0;
	killed = null;
	currCoolDown = 0;
	timer=0;
	zombies = [];
	plants = [];
	if(eyes.length != 0){
		eyes.splice(0, eyes.length);
	}
	friends = [];
	insanity = false;
	potions = [];
	mousex = 0;
    mousey = 0;
    dx = 0;
	dy = 0;
	actNum=0;
}

//Initialize
function init(initstate){
	if(initstate == 1)
		tutorialstate = 0;
	else
		tutorialstate = 10;
	player1 = new rectangle(99,300,200,50,50,playerImg,3,300,"none");
	resetAll();
	resetAllBoolean();
	resetStats();
	player1.speed = 3;
	loop();
}

//tutorial
//Click anywhere to walk
//Walk over an ingredient to pick up
//Press A to select the ingredient
//Press C to make a potion
//Hover mouse on the enemy
//Press Q to throw
//Different combinations will make new potion
//play
function tutorialupdate(){
	document.onkeydown = keydown;
	canvas.onmousemove = mouseMove;	
	canvas.onmousedown = mouseClick;
	
	
	managePotion();
	manageZombie();
	managePlayer();
	manageFriends();
	pickUpIngredient();
	moveBox();
	randomSpawnEye();
	
		if(currCoolDown>0){
			currCoolDown--;
		}
		
		if(currUpdate>0){
			currUpdate--;
		}
		else{
			player1.speed = 3;
			resetStats();
		}
	
	//Spawners go here
	if(tutorialstate == 10){
		if (Math.abs(timer - Math.floor(timer)) < 0.01) {
			randomSpawnZombies();
			randomSpawnPlants();
		}
	}
	else if(tutorialstate == 1){
		if (Math.abs(timer - Math.floor(timer)) < 0.01) {
			randomSpawnPlants();
		}
	}
	else if(tutorialstate == 3){
		if (Math.abs(timer - Math.floor(timer)) < 0.01) {
			randomSpawnPlants();
		}
		if (zombies.length == 0 && kills == 0) {
			spawnZombie(new rectangle(1,0,0,50,50,zombieImg,spdZ,300, "jellybean"));
			spawnZombie(new rectangle(1,600,600,50,50,zombieImg,spdZ,300, "jellybean"));
		}
	}


	switch(tutorialstate){
		case 0 : context.fillStyle = "white";
				 context.font = "15px verdana";
				 context.fillText("Click anywhere to walk", 120, 270);
				 if(timer > 3){
				 	tutorialstate = 1;
				 }
				break;
		case 1 : context.fillStyle = "white";
				 context.font = "15px verdana";
				 context.fillText("Walk over an ingredient to pick up", 120, 270);
				 if(player1.plant >= 5){
				 	tutorialstate = 2;
				 }
				break;
		case 2: context.fillStyle = "white";
				 context.font = "15px verdana";
				 context.fillText("Press [A] to select ingredient", 20, 450);
				 context.fillText("You need 2 ingredients to make a potion", 20, 470);
				 if(player1.potions.length >= 1){
				 	tutorialstate = 3;
				 }
		break;
		case 3: context.fillStyle = "white";
				 context.font = "15px verdana";
				 context.fillText("Hover your mouse on the target", 20, 270);
				 context.fillText("and press [Q] to throw potion", 20, 300);
				 if(player1.potions.length == 0){
				 	tutorialstate = 4;
				 }
				 break;
		case 4:  context.fillStyle = "white";
				 context.font = "15px verdana";
				 context.fillText("Different combinations of ingredients", 20, 380);
				 context.fillText("will make new potions.", 20, 400);
				 context.fillText("Throw pink potions at yourself", 20, 420);
				 context.fillText("Throw green potions at enemy", 20, 440);
				 if(kills == 2){
				 	tutorialstate = 10;
				 	timer=0;
				 	kills = 0;
				 	player1.currHp = player1.maxHp;

				 }
				 break;
		case 10: break;
	}

}


//Enter game loop
function loop(){
	refresh();
	tutorialupdate();
	timer+=1/100;
	draw();

	if(player1.currHp <= 0 ){
		drawEndScreen();
	}
	else
		setTimeout(loop,10);
		
	
}

function update(){
	document.onkeydown = keydown;
	canvas.onmousemove = mouseMove;	
	canvas.onmousedown = mouseClick;
	
	
	
	//Managers go here
	
	managePotion();
	manageZombie();
	managePlayer();
	manageFriends();
	pickUpIngredient();
	moveBox();
	randomSpawnEye();
	
		if(currCoolDown>0){
			currCoolDown--;
		}
		
		if(currUpdate>0){
			currUpdate--;
		}
		else{
			player1.speed = 3;
			resetStats();
		}
	
	//Spawners go here
	if (Math.abs(timer - Math.floor(timer)) < 0.01) {
		randomSpawnZombies();
		randomSpawnPlants();
	}
	
}

function resetStats(){
	for(var i=0; i<zombies.length; i++){
		if(zombies[i].id == 1){
			zombies[i].speed = spdZ;
		}
		else if(zombies[i].id == 2){
			zombies[i].speed = spdW;
		}
		else if(zombies[i].id == 3){
			zombies[i].speed = spdM;
		}
	}
}

function draw(){
					
	for(var i=0; i<potions.length; i++){
		potions[i].Draw(context);
		
		if(potions[i].explode == true)
			potions[i].DrawShard(context);
		else
			potions[i].DrawPot(context);
			
	}
	
	for(var i=0; i<plants.length; i++){
		plants[i].Draw(context);
	}
	
	for(var i=0; i<eyes.length; i++){
		eyes[i].Draw(context);
	}
	
	for(var i=0; i<friends.length; i++){
		drawrec(friends[i], friends[i].angle);
	}
	
	for(var i=0; i<zombies.length; i++){
		drawrec(zombies[i], zombies[i].angle);
		context.fillStyle = "red";
		context.fillRect(zombies[i].x+5, zombies[i].y-5, zombies[i].currHp / zombies[i].maxHp * 40, 5);
		
	}
	
	drawrec(player1, player1.angle);
	
	drawInventory();
	if(tutorialstate == 10){
		drawTimer();
		drawLabel();
	}
	
	insanityManager();
}


function drawrec(object,angle){
	var xpos = object.x+object.width/2;
	var ypos = object.y+object.height/2;
	context.save();
	context.translate(xpos, ypos);
	context.rotate(angle * Math.PI / 180);
	context.translate(-xpos, -ypos);
	
	context.drawImage(object.source, object.x, object.y, object.width, object.height);
	
	
	context.restore();

}


function drawEndScreen(){
	context.fillStyle = "black"; 
	context.fillRect(0, 200, canvas.width,250);
	context.fillStyle = "gray";
	context.font = "30px verdana";
	context.fillText("Game Over", 120, 270);
	context.font = "20px verdana";
	context.fillText("Score: " + kills * parseInt(timer), 140, 300);
	context.font = "18px verdana";
	context.fillText("press [R] to replay", 100, 400);
	context.fillText("press [Q] to quit", 450, 400);
	
}

function refresh(){
	context.drawImage(canImg,0,0,canvas.width,canvas.height);
}

function keydown(event){
	
	var ascii=event.keyCode;
	var pKeys = [81,87,69,82,84];
	
	//new code
	if(player1.currHp > 0){
		for(j=0; j<5; j++){
			if(ascii == pKeys[j]&& player1.potions[j]!=null){
				/*if(player1.potions[j].isThrowable == false){
					player1.potions[j].consume();
					potions.splice(j,1);
					player1.potions.splice(j,1);
				}
				else*/
					throwpotion(j);	
				}
		}
	}
	
	//toggle ingredients
	if(ascii == 65 && player1.plant>0){
		if(activateA == true){
			activateA = false;
			actNum--;
		}
		else if(activateA == false){
			activateA = true;
			actNum++;
		}
	}
//COMMENT THIS OUT :)))
	if(ascii == 79){
		player1.plant = 9;
		player1.teeth = 9;
		player1.eye = 9;
		player1.choc = 9;
	}
	
	if(ascii == 83&& player1.eye>0){
		if(activateB == true){
			activateB = false;
			actNum--;
		}
		else if(activateB == false){
			activateB = true;
			actNum++;
		}
	}
	
	if(ascii == 68&& player1.teeth>0){
		if(activateC == true){
			activateC = false;
			actNum--;
		}
		else if(activateC == false){
			activateC = true;
			actNum++;
		}
	}
	
	if(ascii == 70&& player1.choc>0){
		if(activateD == true){
			activateD = false;
			actNum--;
		}
		else if(activateD == false){
			activateD = true;
			actNum++;
		}
	}

	//new code
	if(ascii == 67 && player1.potions.length!=5){
		if(currCoolDown == 0){
		if(actNum==1){
			if(activateA == true && player1.plant >= 2){
				player1.plant -=2;
				craftPotion(3,0,EbImg,bImg,true,"damage");
			}
			else if(activateB == true && player1.eye >= 2){
				player1.eye -=2;
				craftPotion(0,0,EoImg,sOImg,false,"regenHealth");
			}
			else if(activateC == true && player1.teeth >= 2){
				player1.teeth -=2;
				craftPotion(3,3,ErImg,rImg,true,"damageS");
			}
			else if(activateD == true && player1.choc >= 2){
				player1.choc -=2;
				craftPotion(2,0,EgImg,sGImg,true,"vacuum");
			}
		}
		else if(actNum==2){
			getCombi(activateA, activateB, activateC, activateD);
		}
		resetAllBoolean();
		}
	}
	
	if(ascii == 82 && player1.currHp <= 0){
		init();
		
	}
	
	if(ascii == 81 && player1.currHp <= 0){
		context.fillStyle = "black"; 
		context.fillRect(0, 200, canvas.width,250);
		context.fillStyle = "gray";
		context.font = "18px verdana";
		context.fillText("Returning to main menu...", 220, 330);
		mainMenu();
	}
	
	if(ascii == 71){
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

function resetAllBoolean(){
	activateA = false;
	activateB = false;
	activateC = false;
	activateD = false;
	actNum = 0;
}
//Labels
function drawLabel(){
	context.fillStyle = "white";
	context.font = "10px Lucida Console";
	context.fillText("TIME", 735, 15);
	context.fillText("KILLS", 680, 15);
	context.font = "20px Lucida Console";
	context.fillText(kills, 690, 35);
}


//Timer
function drawTimer(){
	context.fillStyle = "white";
	context.font = "20px Lucida Console";
	context.fillText(parseInt(timer), 740, 35);
}
function drawInventory(){
	if(player1.currHp <= player1.maxHp && player1.currHp > player1.maxHp * .60){
		
	}
	else if( player1.currHp <= player1.maxHp * .60 && player1.currHp > player1.maxHp / 4){
		
		context.drawImage(ooohImg,0,0,800,550);
	}
	else{
		context.drawImage(ooohImg,0,0,800,550);
		context.drawImage(ooohImg,0,0,800,550);
	}

	//HP
	if(player1.currHp <= player1.maxHp && player1.currHp > player1.maxHp * .60)
		context.fillStyle = "green";
	else if( player1.currHp <= player1.maxHp * .60 && player1.currHp > player1.maxHp / 4)
		context.fillStyle = "yellow";
	else
		context.fillStyle = "red";
	context.fillRect(65, 20, player1.currHp / player1.maxHp * 200, 10);
	
	
	
	
	//Cooldown
	
		context.fillStyle = "yellow";
		context.fillRect(65, 33, 170, 10);
		context.fillStyle = "red";
		context.fillRect(235, 33, -(currCoolDown / coolDownTime * 170), 10);
	
	
	//Beckground
	context.drawImage(barImg,0,470,800,80);
	
	//Base
	if(activateA == true){
		context.drawImage(glowImg,16,490,50, 50);
	}
	if(activateB == true){
		context.drawImage(glowImg,71,490,50, 50);
	}
	//Base
	if(activateC == true){
		context.drawImage(glowImg,126,490,50, 50);
	}
	if(activateD == true){
		context.drawImage(glowImg,181,490,50, 50);
	}
	
	context.drawImage(c1Img,20,495,40,40);
	context.drawImage(c2Img,75,495,40,40);
	context.drawImage(c3Img,130,495,40,40);
	context.drawImage(c4Img,185,495,40,40);
	
	if(musicOn == true)
		context.drawImage(onImg,240,495,40,40);
	else
		context.drawImage(offImg,240,495,40,40);
	
		
	//Potions
	for(j=0; j<player1.potions.length; j++){
		if(player1.potions[j].isThrowable == true)
			context.drawImage(throwImg, 470+((j+1)*50)+(j*5),490,50,50);
		else
			context.drawImage(consImg, 470+((j+1)*50)+(j*5),490,50,50);
		context.drawImage(baseImg, 470+((j+1)*50)+(j*5),490,50,50);
		context.drawImage(player1.potions[j].bottleImg,470+((j+1)*50)+(j*5),490,50,50);
	}
	
	
	//Labels:Quantity
	context.fillStyle = "white";
	context.font = "10px Lucida Console";
	context.fillText(player1.plant, 55, 535);
	context.fillText(player1.eye, 110, 535);
	context.fillText(player1.teeth, 165, 535);
	context.fillText(player1.choc, 220, 535);
	
	//Labels:Hotkeys/*
	
	context.fillText("A", 20, 500);
	context.fillText("S", 75, 500);
	context.fillText("D", 130, 500);
	context.fillText("F", 185, 500);
	context.fillText("G", 240, 500);
	
	//context.fillText(currUpdate, 200, 200);
	
	
	
	context.fillText("Q", 525, 500);
	context.fillText("W", 580, 500);
	context.fillText("E", 635, 500);
	context.fillText("R", 690, 500);
	context.fillText("T", 745, 500);
	
	context.font = "15px Lucida Console";
	if(actNum > 0 )
		context.fillText("PRESS [C] TO COMBINE", 310, 520);
	
	
}

function insanityManager(){
	if (insanity == false && zombies.length < 15){
		coolDownTime = 100;
		context.drawImage(s1Img,0,0,80,50);
	}
	else if (zombies.length >= 15 && zombies.length < 30 && insanity == false){
		coolDownTime = 300;
		player1.speed -= 1;
		context.drawImage(s2Img,0,0,80,50);
	}
	else{
		insanity = true;
		coolDownTime = 600;
		player1.speed += 2;
		context.drawImage(s3Img,0,0,80,50);
	}
}


function mouseMove(event){
	if(!event.offsetX) {
		mousex = event.offsetX?event.offsetX:(event.pageX - event.target.offsetLeft); 
		mousey = event.offsetY?event.offsetY:(event.pageY - event.target.offsetTop);
		console.log("X: "+mousex+", Y: "+mousey);

	}
	else{
		mousex = event.offsetX;
		mousey = event.offsetY;
	}
}

function mouseClick(event){
	if(!event.offsetX) {
		player1.mx = event.offsetX?event.offsetX:(event.pageX - event.target.offsetLeft); 
		player1.my = event.offsetY?event.offsetY:(event.pageY - event.target.offsetTop);

	}
	else{
		player1.mx = event.offsetX;
		player1.my = event.offsetY;
	}
	
	dx = player1.mx - player1.midX;
	dy = player1.my - player1.midY;
	player1.d = Math.sqrt( (dx *dx) + (dy*dy) );
	player1.cx = dx / player1.d;
	player1.cy = dy / player1.d;
}



