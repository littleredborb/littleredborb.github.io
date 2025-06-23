var zomb = 100;
var were = 190;
var mum = 196;
var MAXTIME = 100;
function random(min, max){
	return Math.floor(Math.random() * (max - min * 1)) + min;
}

//spawns one zombie on random location
function spawnZombie(mon){
	zombie = mon;
	zombie.dx = zombie.mx - zombie.x;
	zombie.dy = zombie.my - zombie.y;
	zombies.push(zombie);
}

//spawn plants
function spawnPlant(){
		plant = new ingredient(1,random(170, 220), random(100, 150),30,30,sapImg,MAXTIME);
		plants.push(plant);
}

//random spawn plants
function randomSpawnPlants(){
	
	if(timer < 10){
		if(plants.length <= 1){
			if(random(0, 199) > 9){
				spawnPlant();
			}
		}
		
	}
	else{
		if(plants.length <= 1){
			if(random(0, 199) > 99){
				spawnPlant();
			}
		}
	}
		
		
}

function randomSpawnEye(){
	if(kills % 2 == 0 && killed != null){
		
		if(killed.drop == "jellybean"){
			var eye = new ingredient(2,killed.x, killed.y,30,30,c2Img,MAXTIME);
		}
		else if(killed.drop == "candycorn"){
			var eye = new ingredient(3,killed.x, killed.y,30,30,c3Img,MAXTIME);
			
		}
		else if(killed.drop == "choc"){
			var eye = new ingredient(4,killed.x, killed.y,30,30,c4Img,MAXTIME);
			
		}
		eyes.push(eye);
		killed = null;
	}
}
function spawnHard(){
	
}

function spawnSpecSide(){
	var dX = random(400, 450);
	var dY = 600;
	var uX = random(400, 450);
	var uY = 0;
	var lX = 0;
	var lY = random(200, 250);
	var rX = 900;
	var rY = random(200, 250);
	
	if(kills<5){
		if(zombies.length < 1){
			spawnZombie(new rectangle(1,rX,rY,50,50,zombieImg,spdZ,300, "jellybean"));
		}
	}
	else if(kills<10){
		if(zombies.length < 2){
			if(random(0, 199) < zomb){
				spawnZombie(new rectangle(1,dX,dY,50,50,zombieImg,spdZ,300, "jellybean"));
				spawnZombie(new rectangle(1,uX,uY,50,50,zombieImg,spdZ,300, "jellybean"));
			}
		}
	}
	else if(kills<20){
		if(zombies.length < 2){
			if(random(0, 199) < zomb){
				spawnZombie(new rectangle(1,dX,dY,50,50,zombieImg,spdZ,300, "jellybean"));
				spawnZombie(new rectangle(1,rX,rY,50,50,zombieImg,spdZ,300, "jellybean"));
			}
		}
	}
	else if(kills<25){
		if(zombies.length < 2){
			if(random(0, 199) < zomb){
				spawnZombie(new rectangle(1,lX,lY,50,50,zombieImg,spdZ,300, "jellybean"));
				spawnZombie(new rectangle(2,dX,dY,50,50,werewolfImg,spdW,200, "candycorn"));
			}
		}
	}
	else if(kills<30){
		if(zombies.length < 2){
			if(random(0, 199) < zomb){
				spawnZombie(new rectangle(1,dX,dY,50,50,zombieImg,spdZ,300, "jellybean"));
				spawnZombie(new rectangle(2,uX,uY,50,50,werewolfImg,spdW,200, "candycorn"));
			}
		}
	}
	else if(kills<35){
		if(zombies.length < 3){
			if(random(0, 199) < zomb){
				spawnZombie(new rectangle(1,dX,dY,50,50,zombieImg,spdZ,300, "jellybean"));
				spawnZombie(new rectangle(1,lX,lY,50,50,zombieImg,spdZ,300, "jellybean"));
				spawnZombie(new rectangle(2,rX,rY,50,50,werewolfImg,spdW,200, "candycorn"));
			}
		}
	}
	else if(kills<40){
		if(zombies.length < 3){
			if(random(0, 199) < zomb){
				spawnZombie(new rectangle(1,dX,dY,50,50,zombieImg,spdZ,300, "jellybean"));
				spawnZombie(new rectangle(2,uX,uY,50,50,werewolfImg,spdW,200, "candycorn"));
				spawnZombie(new rectangle(2,lX,lY,50,50,werewolfImg,spdW,200, "candycorn"));
			}
		}
	}
	else if(kills<45){
		if(zombies.length < 3){
			if(random(0, 199) < zomb){
				spawnZombie(new rectangle(1,lX,lY,50,50,zombieImg,spdZ,300, "jellybean"));
				spawnZombie(new rectangle(2,rX,rY,50,50,werewolfImg,spdW,200, "candycorn"));
				spawnZombie(new rectangle(1,uX,uY,50,50,zombieImg,spdZ,300, "jellybean"));
			}
		}
	}
	else if(kills<50){
		if(zombies.length < 3){
			if(random(0, 199) < zomb){
				spawnZombie(new rectangle(1,lX,lY,50,50,zombieImg,spdZ,300, "jellybean"));
				spawnZombie(new rectangle(3,rX,rY,50,50,mummyImg,spdM,300, "choc"));
				spawnZombie(new rectangle(1,dX,dY,50,50,zombieImg,spdZ,300, "jellybean"));
			}
		}
	}
	else if(kills<60){
		if(zombies.length < 4){
			if(random(0, 199) < zomb){
				spawnZombie(new rectangle(1,rX,rY,50,50,zombieImg,spdZ,300, "jellybean"));
				spawnZombie(new rectangle(3,lX,lY,50,50,mummyImg,spdM,300, "choc"));
				spawnZombie(new rectangle(1,dX,dY,50,50,zombieImg,spdZ,300, "jellybean"));
				spawnZombie(new rectangle(2,uX,uY,50,50,werewolfImg,spdW,200, "candycorn"));
			}
		}
	}
	else if(kills<70){
		if(zombies.length < 5){
			if(random(0, 199) < zomb){
				spawnZombie(new rectangle(1,rX,rY,50,50,zombieImg,spdZ,300, "jellybean"));
				spawnZombie(new rectangle(3,lX,lY,50,50,mummyImg,spdM,300, "choc"));
				spawnZombie(new rectangle(1,dX,dY,50,50,zombieImg,spdZ,300, "jellybean"));
				spawnZombie(new rectangle(2,uX,uY,50,50,werewolfImg,spdW,200, "candycorn"));
				spawnZombie(new rectangle(1,uX,uY,50,50,zombieImg,spdZ,300, "jellybean"));
			}
		}
	}
	else if(kills<80){
		if(zombies.length < 5){
			if(random(0, 199) < zomb){
				spawnZombie(new rectangle(1,uX,uY,50,50,zombieImg,spdZ,300, "jellybean"));
				spawnZombie(new rectangle(3,dX,dY,50,50,mummyImg,spdM,300, "choc"));
				spawnZombie(new rectangle(1,lX,lY,50,50,zombieImg,spdZ,300, "jellybean"));
				spawnZombie(new rectangle(2,rX,rY,50,50,werewolfImg,spdW,200, "candycorn"));
				spawnZombie(new rectangle(1,rX,rY,50,50,zombieImg,spdZ,300, "jellybean"));
			}
		}
	}
	else if(kills<100){
		if(zombies.length < 6){
			if(random(0, 199) < zomb){
				spawnZombie(new rectangle(1,dX,dY,50,50,zombieImg,spdZ,300, "jellybean"));
				spawnZombie(new rectangle(3,lX,lY,50,50,mummyImg,spdM,300, "choc"));
				spawnZombie(new rectangle(1,rX,rY,50,50,zombieImg,spdZ,300, "jellybean"));
				spawnZombie(new rectangle(2,lX,lY,50,50,werewolfImg,spdW,200, "candycorn"));
				spawnZombie(new rectangle(1,uX,uY,50,50,zombieImg,spdZ,300, "jellybean"));
				spawnZombie(new rectangle(2,rX,rY,50,50,werewolfImg,spdW,200, "candycorn"));
			}
		}
	}
	else if(kills<200){
		if(zombies.length < 7){
			if(random(0, 199) < zomb){
				spawnZombie(new rectangle(1,lX,lY,50,50,zombieImg,spdZ,300, "jellybean"));
				spawnZombie(new rectangle(3,lX,lY,50,50,mummyImg,spdM,300, "choc"));
				spawnZombie(new rectangle(1,rX,rY,50,50,zombieImg,spdZ,300, "jellybean"));
				spawnZombie(new rectangle(2,lX,lY,50,50,werewolfImg,spdW,200, "candycorn"));
				spawnZombie(new rectangle(1,uX,uY,50,50,zombieImg,spdZ,300, "jellybean"));
				spawnZombie(new rectangle(2,uX,uY,50,50,werewolfImg,spdW,200, "candycorn"));
				spawnZombie(new rectangle(1,dX,dY,50,50,zombieImg,spdZ,300, "jellybean"));
			}
		}
	}
	else {
		if(zombies.length < 10){
			if(random(0, 199) < zomb){
				spawnZombie(new rectangle(1,lX,lY,50,50,zombieImg,spdZ,300, "jellybean"));
				spawnZombie(new rectangle(3,dX,dY,50,50,mummyImg,spdM,300, "choc"));
				spawnZombie(new rectangle(1,rX,rY,50,50,zombieImg,spdZ,300, "jellybean"));
				spawnZombie(new rectangle(2,lX,lY,50,50,werewolfImg,spdW,200, "candycorn"));
				spawnZombie(new rectangle(1,uX,uY,50,50,zombieImg,spdZ,300, "jellybean"));
				spawnZombie(new rectangle(2,dX,dY,50,50,werewolfImg,spdW,200, "candycorn"));
				spawnZombie(new rectangle(1,uX,uY,50,50,zombieImg,spdZ,300, "jellybean"));
				spawnZombie(new rectangle(3,lX,lY,50,50,mummyImg,spdM,300, "choc"));
				spawnZombie(new rectangle(1,rX,rY,50,50,zombieImg,spdZ,300, "jellybean"));
				spawnZombie(new rectangle(2,uX,uY,50,50,werewolfImg,spdW,200, "candycorn"));
			}
		}
	}
	

	/*
	if(timer>5){
		if(random(0, 199) > zomb){
			spawnZombie(new rectangle(1,x,y,50,50,zombieImg,spdZ,300, "jellybean"));
		}
	}
	if(timer>30){
		if(random(0, 199) > were){
			spawnZombie(new rectangle(2,x,y,50,50,werewolfImg,spdW,200, "candycorn"));
		}
	}
	
	if(timer>60){
		if(random(0, 199) > mum){
			spawnZombie(new rectangle(3,x,y,50,50,mummyImg,spdM,300, "choc"));
		}
	}
	*/
}

//randomly spawn zombies
function randomSpawnZombies(){

	if(timer>5)
		spawnSpecSide();
	
	/*
	if(kills >= 50){
		zomb = 170;
		were = 186;
		mum = 193;
	}
	else if(kills >= 100){
		zomb = 165;
		were = 182;
		mum = 190;
	}
	
	
		spawnSpecSide(random(0, 600),random(550, 600));
		spawnSpecSide(random(0, 600),random(0, 0));
		spawnSpecSide(random(-50, 0),random(550, 600));
		spawnSpecSide(random(800, 850),random(550, 600));*/

}