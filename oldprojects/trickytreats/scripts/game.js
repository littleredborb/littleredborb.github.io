var c1Img = document.createElement('img');
	c1Img.src = 'img/c1.png';
var c2Img = document.createElement('img');
	c2Img.src = 'img/c2.png';
var c3Img = document.createElement('img');
	c3Img.src = 'img/c3.png';
var c4Img = document.createElement('img');
	c4Img.src = 'img/c4.png';

var topbarImg = document.createElement('img');
	topbarImg.src = 'img/topbar.png';

var emptyImg = document.createElement('img');
	emptyImg.src = 'img/00.png';
var fullImg = document.createElement('img');
	fullImg.src = 'img/01.png';
	
var sapImg = document.createElement('img');
	sapImg.src = 'img/sap.png';
	
var throwImg = document.createElement('img');
	throwImg.src = 'img/throw.png';
var consImg = document.createElement('img');
	consImg.src = 'img/cons.png';
var crosImg = document.createElement('img');
	crosImg.src = 'img/crosshair.png';
	
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
var bar2Img = document.createElement('img');
	bar2Img.src = 'img/bar2.png';
var bgm = document.createElement('audio');
	bgm.src = 'sounds/trickywaltz.mp3';
	bgm.volume = 0.5;
	
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
var actNum=0;
var currTimeOut;
var tutorialstate;
var isPaused = false;
var hardmode = false;
var tutimer = 0;

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

var basket;
function createBasket(){
	basket = new AnimatedSprite('img/pumpkin.png',50,50,3);
}

function drawBasket(){
	basket.draw(context,370,460,50,50,1,1);
	basket.update(200);
}

//Initialize
function init(initstate){
	if(initstate == 1)
		tutorialstate = 0;
	else
		tutorialstate = 10;
	player1 = new rectangle(99,300,200,50,50,playerImg,3,300,"none");
	createBasket();
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
	potionChecker();

	
		if(currCoolDown>0){
			currCoolDown--;
			drawBasket();
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
			spawnZombie(new rectangle(1,900,230,50,50,zombieImg,spdZ,300, "jellybean"));
		}
	}
	else if(tutorialstate == 4){
		if (Math.abs(timer - Math.floor(timer)) < 0.01) {
			randomSpawnPlants();
		}
		
		

	}
	else if(tutorialstate == 8){
		if (Math.abs(timer - Math.floor(timer)) < 0.01) {
			randomSpawnPlants();
		}
		player1.eye = 2;
		

	}


	switch(tutorialstate){
		case 0 : context.fillStyle = "white";
				 context.font = "15px qarmic";
				 context.fillText("Click anywhere to walk", 320, 430);
				 tutimer++;
				 if(tutimer==300){
				 	tutorialstate = 1;
				 	tutimer=0;
				 }
				break;
		case 1 : context.fillStyle = "white";
				 context.font = "15px qarmic";
				 context.fillText("Walk over the bush to harvest blueberries", 260, 430);
				 if(player1.plant >= 2){
				 	tutorialstate = 2;
				 }
				break;
		case 2: context.fillStyle = "white";
				 context.font = "15px qarmic";
				 context.fillText("Press [A] to select blueberries", 20, 450);
				 context.fillText("Then press [C] to brew a potion", 20, 470);
				 if(player1.plant <= 0){
				 	tutorialstate = 5;
				 }
		break;
		case 5: context.fillStyle = "white";
				 context.font = "15px qarmic";
				 context.fillText("Wait for it to finish...", 300, 430);
				 if(player1.potions.length >= 1){
				 	tutorialstate = 6;
				 }
		break;
		case 6: context.fillStyle = "white";
				 context.font = "15px qarmic";
				 context.fillText("Green glowing potions are deadly", 500, 430);
				 context.fillText("Do not make contact with it", 500, 450);
				 tutimer++;
				 if(tutimer==300){
				 	tutimer=0;
				 	tutorialstate = 3;
				 }
				 break;
		case 3: context.fillStyle = "white";
				 context.font = "15px qarmic";
				 context.fillText("Move the mouse to position the target", 20, 270);
				 context.fillText("and press [Q] to throw potion", 20, 300);
				 if(zombies.length==0){
				 	tutorialstate = 7;
				 	player1.currHp = player1.maxHp - player1.maxHp/3;
				 }
				 break;
		case 7: context.fillStyle = "white";
				 context.font = "15px qarmic";
				 context.fillText("Watch out for your health", 5, 90);
				 tutimer++;
				 if(tutimer==300){
				 	player1.eye = 2;
				 	tutimer=0;
				 	tutorialstate = 4;
				 }
				 break;			 
		case 4:  context.fillStyle = "white";
				 context.font = "15px qarmic";
				 context.fillText("Press [S] to select jellybrains", 20, 430);
				 context.fillText("to make a healing potion", 20, 450);
				 //context.fillText("Then throw it at yourself", 20, 450);
				 //context.fillText("Pink glowing potions are helpful to you", 400, 430);
				 //context.fillText("Do not let monsters make contact with it", 400, 450);
				 //context.fillText("Try mixing two ingredients together to discover their effects", 20, 440);
				 if(player1.eye == 0)
				 	tutorialstate = 9;
				 /*
				 if(player1.currHp>=player1.maxHp){
				 	tutorialstate = 10;
				 	timer=0;
				 	kills = 0;
				 	player1.currHp = player1.maxHp;

				 }*/
				 break;
		case 9: context.fillStyle = "white";
				 context.font = "15px qarmic";
				 
				 context.fillText("Pink glowing potions are helpful to you", 430, 430);
				 context.fillText("Do not let monsters make contact with it", 420, 450);
				 tutimer++;
				 if(tutimer==500){
				 	tutimer=0;
				 	tutorialstate = 8;
				 	
				 }
				 break;			 
		case 8: context.fillStyle = "white";
				 context.font = "15px qarmic";
				 context.fillText("Throw the potion at yourself", 20, 450);
				 
				 if(player1.currHp>=player1.maxHp - player1.maxHp/4){
				 	tutorialstate = 11;
				 }
				 break;	
		case 11 : context.fillStyle = "white";
				 context.font = "15px qarmic";
				 context.fillText("Try mixing two ingredients together and discover their effects", 200, 400);
				 context.fillText("Survive as much as you can!", 260, 430);
				 tutimer++;
				 if(tutimer>=500){
				 	timer=0;
				 	kills = 0;
				 	player1.currHp = player1.maxHp;
				 	tutorialstate = 10;
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
	if(player1.currHp <= 0){
		drawEndScreen();
	}
	/*
	else if(isPaused==1){
		drawPaused();
	}
	*/
	else
		setTimeout(loop,10);
		
	
}
/*
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

	
	
}*/

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
var curX, curY;

function computeDistance(){
	var mx, my, dx, dy, d, vx, vy;

	mx = mousex - 25/2;
	my = mousey - 25/2;
	
	
	dx = mx - player1.x;
	dy = my - player1.y;
	
	d = Math.sqrt( (dx *dx) + (dy*dy) );

	var shotrange = Math.min(d,200);
	

	//console.log(shotrange);
	
	//player1.potions[x].cx = dx / player1.potions[x].d;
	//player1.potions[x].cy = dy / player1.potions[x].d;

	//vectors
	vx = dx / d;
	vy = dy / d;
	//console.log(player1.potions[x].cx);
	
	//console.log(player1.potions[x].cy);
	d = shotrange;

	curX = player1.x + vx * d;
	curY = player1.y + vy * d;
}

function drawCursor(x,y){
	//context.fillStyle = "white";
	//context.fillRect(x,y,10,10);
	context.drawImage(crosImg,x,y,25,25);
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
		

		context.fillStyle = "#5d2200";
		context.fillRect(zombies[i].x+4, zombies[i].y-4, 40 , 7);
		context.fillStyle = "red";
		context.fillRect(zombies[i].x+4, zombies[i].y-4, zombies[i].currHp / zombies[i].maxHp * 40, 5);
		
	}
	
	drawrec(player1, player1.angle);
	managePoofs();
	computeDistance();
	drawCursor(curX, curY);
	
	drawInventory();
	if(tutorialstate == 10){
		drawTimer();
		drawLabel();
	}
	if(currCoolDown>0){
			drawBasket();
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

function drawPaused(){
	context.fillStyle = "black"; 
	context.fillRect(0, 200, canvas.width,250);
	context.fillStyle = "gray";
	context.font = "30px qarmic";
	context.fillText("Paused", 120, 270);
	
}


function drawEndScreen(){
	context.fillStyle = "black"; 
	context.fillRect(0, 200, canvas.width,250);
	context.fillStyle = "gray";
	context.font = "30px qarmic";
	context.fillText("Game Over", 120, 270);
	bgm.volume=0.32;
	context.font = "20px qarmic";
	context.fillText("Score: " + kills, 140, 300);
	context.font = "18px qarmic";
	context.fillText("press [R] to replay", 100, 400);
	context.fillText("press [Q] to quit", 450, 400);
	
}

function drawInfo(){

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
		if(currCoolDown <= 0){
		if(actNum==1){
			if(activateA == true && player1.plant >= 2){
				player1.plant -=2;
				coolDownTime = 200;
				currCoolDown = coolDownTime;
				crafting=true;
				craftPotion(3,0,EbImg,bImg,true,"damage");
			}
			else if(activateB == true && player1.eye >= 2){
				player1.eye -=2;
				coolDownTime = 200;
				currCoolDown = coolDownTime;
				crafting=true;
				craftPotion(0,0,EoImg,sOImg,false,"regenHealth");
			}
			else if(activateC == true && player1.teeth >= 2){
				player1.teeth -=2;
				coolDownTime = 200;
				currCoolDown = coolDownTime;
				crafting=true;
				craftPotion(3,3,ErImg,rImg,true,"damageS");
			}
			else if(activateD == true && player1.choc >= 2){
				player1.choc -=2;
				coolDownTime = 500;
				currCoolDown = coolDownTime;
				crafting=true;
				craftPotion(2,0,EgImg,sGImg,true,"vacuum");
			}
		}
		else if(actNum==2){
			getCombi(activateA, activateB, activateC, activateD);
			
				crafting=true;
		}
		resetAllBoolean();
		}
	}
	
	if(ascii == 82 && player1.currHp <= 0){
		bgm.volume=0.5;
		init();
		
	}
/*
	if(ascii == 80){
		if(isPaused)
			isPaused = false;
		else
			isPaused = true;
	}
*/
	if(ascii == 81 && player1.currHp <= 0){
		bgm.volume=0.5;
		initMain();
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
var crafting = false;
function potionChecker(){
	//console.log(currCoolDown + " " + crafting);
	if(currCoolDown== 0 && crafting == true){
		player1.potions.push(temppot);
		crafting=false;
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
	context.font = "10px qarmic";
	context.fillText("TIME", 735, 15);
	context.fillText("SCORE", 660, 15);
	context.font = "20px qarmic";
	context.fillText(kills, 670, 35);
}


//Timer
function drawTimer(){
	context.fillStyle = "white";
	context.font = "20px qarmic";
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

	context.drawImage(topbarImg,0,0,800,75);

	//HP
	if(player1.currHp <= player1.maxHp && player1.currHp > player1.maxHp * .60)
		context.fillStyle = "#C3F12E";
	else if( player1.currHp <= player1.maxHp * .60 && player1.currHp > player1.maxHp / 4)
		context.fillStyle = "yellow";
	else
		context.fillStyle = "red";
	context.fillRect(65, 26, player1.currHp / player1.maxHp * 125, 12);
	
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
	

	//drawItems();
	//console.log(s);
	
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
	
	context.drawImage(bar2Img,0,470,800,80);
	
	//Labels:Quantity
	context.fillStyle = "white";
	context.font = "10px qarmic";
	context.fillText(player1.plant, 55+1, 537);
	context.fillText(player1.eye, 110+1, 537);
	context.fillText(player1.teeth, 165+1, 537);
	context.fillText(player1.choc, 220+1, 537);
	
	//Labels:Hotkeys/*
	
	context.fillText("A", 20-2, 500);
	context.fillText("S", 75-2, 500);
	context.fillText("D", 130-2, 500);
	context.fillText("F", 185-2, 500);
	context.fillText("G", 240-2, 500);
	
	//context.fillText(currUpdate, 200, 200);
	
	
	
	context.fillText("Q", 525-5, 500);
	context.fillText("W", 580-5, 500);
	context.fillText("E", 635-3, 500);
	context.fillText("R", 690-3, 500);
	context.fillText("T", 745-3, 500);
	
	context.font = "15px qarmic";
	if(actNum > 0 ){
		context.drawImage(fullImg,370,460,50,50);
		context.font = "9px qarmic";
		context.fillText("[C] to craft", 370, 516);
	}
	else
		context.drawImage(emptyImg,370,460,50,50);

	
	//Cooldown
	
		context.fillStyle = "#C3F12E";
		context.fillRect(315, 520, 170, 10);
		context.fillStyle = "#5d2200";
		context.fillRect(315+170, 520, -(currCoolDown / coolDownTime * 170), 10);
	
}

function insanityManager(){
	if(player1.currHp <= player1.maxHp && player1.currHp > player1.maxHp * .60)
		context.drawImage(s1Img,0,5,80,50);
	else if( player1.currHp <= player1.maxHp * .60 && player1.currHp > player1.maxHp / 4)
		context.drawImage(s2Img,0,5,80,50);
	else
		context.drawImage(s3Img,0,5,80,50);
	if(kills<25 && kills>=20){
		context.drawImage(s2Img,0,5,80,50);
		player1.speed = 2.2;
	}
	else if(kills<50 && kills>=45){
		context.drawImage(s2Img,0,5,80,50);
		player1.speed = 2.2;
	}
	else 
		player1.speed = 3;

	/*
	if (insanity == false && zombies.length < 15){
		//coolDownTime = 100;
		context.drawImage(s1Img,0,0,80,50);
	}
	else if (zombies.length >= 15 && zombies.length < 30 && insanity == false){
		//coolDownTime = 300;
		//player1.speed -= 1;
		context.drawImage(s2Img,0,0,80,50);
	}
	else{
		//insanity = true;
		//coolDownTime = 600;
		//player1.speed += 2;
		context.drawImage(s3Img,0,0,80,50);
	}*/
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

//the part where you move
function mouseClick(event){
	if(!event.offsetX) {
		player1.mx = event.offsetX?event.offsetX:(event.pageX - event.target.offsetLeft); 
		player1.my = event.offsetY?event.offsetY:(event.pageY - event.target.offsetTop);

	}
	else{
		player1.mx = event.offsetX;
		player1.my = event.offsetY;
	}
	
	if(mousey<=480 && mousey>=50){
		dx = player1.mx - player1.midX;
		dy = player1.my - player1.midY;
		player1.d = Math.sqrt( (dx *dx) + (dy*dy) );

		player1.cx = dx / player1.d;
		player1.cy = dy / player1.d;
	}
	
}



