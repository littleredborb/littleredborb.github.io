var zomb = 175;
var were = 190;
var mum = 196;
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
		plant = new ingredient(1,random(40, 700), random(40, 450),30,30,sapImg);
		plants.push(plant);
}

//random spawn plants
function randomSpawnPlants(){
	
	if(timer < 10){
		if(player1.plant != 9){
			if(random(0, 199) > 9){
				spawnPlant();
			}
		}
	}
	else{
		if(player1.plant != 9){
			if(random(0, 199) > 99){
				spawnPlant();
			}
		}
	}
		
		
}

function randomSpawnEye(){
	if(kills % 2 == 0 && killed != null){
		
		if(killed.drop == "jellybean"){
			var eye = new ingredient(2,killed.x, killed.y,30,30,c2Img);
		}
		else if(killed.drop == "candycorn"){
			var eye = new ingredient(3,killed.x, killed.y,30,30,c3Img);
			
		}
		else if(killed.drop == "choc"){
			var eye = new ingredient(4,killed.x, killed.y,30,30,c4Img);
			
		}
		eyes.push(eye);
		killed = null;
	}
}

function spawnSpecSide(x,y){
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
}

//randomly spawn zombies
function randomSpawnZombies(){
	
	
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
		spawnSpecSide(random(800, 850),random(550, 600));
}