var kills = 0;
var killed;
var step = new Audio("sounds/s.mp3");
	step.loop = false;
var vac = false;
	
function manageFriends(){
	for(var i=0; i<friends.length; i++){
		if(friends[i].timer >0){
			friends[i].midX = friends[i].x + friends[i].width / 2;
			friends[i].midY = friends[i].y + friends[i].height / 2;
			
			//get distance x1 to x2 and y1 to y2
			if(zombies.length != 0){
				dx = zombies[0].midX - friends[i].midX;
				dy = zombies[0].midY - friends[i].midY;
				friends[i].d = Math.sqrt( (dx *dx) + (dy*dy) );
				
				//get unit vector xy
				friends[i].cx = dx / friends[i].d;
				friends[i].cy = dy / friends[i].d;
				
			
				friends[i].angle = Math.atan2(friends[i].cy, friends[i].cx) * (180 / Math.PI);
				
				
				if(friends[i].d >= 1){
					friends[i].x += friends[i].cx* friends[i].speed;
					friends[i].y += friends[i].cy* friends[i].speed;
				}
			}
			
			friends[i].timer--;
			console.log(friends[i].timer);
				
		}
		else
			friends.splice(i,1);
			
		
	}
}
	
//Zombies chasing player
function manageZombie(){
	var targetX = player1.midX
	var targetY = player1.midY
	for(var i=0; i<zombies.length; i++){
	
		if(vac == false){
			zombies[i].midX = zombies[i].x + zombies[i].width / 2;
			zombies[i].midY = zombies[i].y + zombies[i].height / 2;
			
			//get distance x1 to x2 and y1 to y2
			dx = targetX - zombies[i].midX;
			dy = targetY - zombies[i].midY;
			zombies[i].d = Math.sqrt( (dx *dx) + (dy*dy) );
			
			//get unit vector xy
			zombies[i].cx = dx / zombies[i].d;
			zombies[i].cy = dy / zombies[i].d;
			

			zombies[i].angle = Math.atan2(zombies[i].cy, zombies[i].cx) * (180 / Math.PI);

			
			if(zombies[i].d >= 1){
				zombies[i].x += zombies[i].cx* zombies[i].speed;
				zombies[i].y += zombies[i].cy* zombies[i].speed;
			}
		}
	
		else if(vac == true){
			zombies[i].midX = zombies[i].x + zombies[i].width / 2;
			zombies[i].midY = zombies[i].y + zombies[i].height / 2;
			
			for(var j=0; j<potions.length; j++){
				if(potions[j].vcm == true){
					var Dx = potions[j].x - zombies[i].midX;
					var Dy = potions[j].y - zombies[i].midY;
				}
			}
			zombies[i].d = Math.sqrt( (dx *dx) + (dy*dy) );
			
			zombies[i].cx = Dx / zombies[i].d;
			zombies[i].cy = Dy / zombies[i].d;
			
			//zombies[i].angle = Math.atan2(zombies[i].cy, zombies[i].cx) * (180 / Math.PI);
			
			if(zombies[i].d >= 1){
				zombies[i].x += zombies[i].cx* zombies[i].speed;
				zombies[i].y += zombies[i].cy* zombies[i].speed;
			}
		}
		
		if(checkCollision(player1,zombies[i])){
			player1.currHp--;
		}
		
		for(var j=0; j<potions.length; j++){
			
			if(checkCollision(potions[j], zombies[i])&&potions[j].d<=0){
				//potion effects
				potions[j].effect(zombies[i]);
			}
		}
		for(var j=0; j<friends.length; j++){
			if(checkCollision(friends[j], zombies[i])){
				zombies[i].currHp-=2;
			}
		}
		
		if(zombies[i].currHp<= 0){
			killed = zombies[i];
			zombies.splice(i,1);
			kills++;
		}
	}
}

function managePlayer(){
	for(var j=0; j<potions.length; j++){
		if(checkCollision(potions[j], player1)&&potions[j].d<=0){
				//potion effects
				potions[j].effect(player1);
		}
	}
}


//throw potion
function managePotion(){
	for(var i=0; i<potions.length; i++){
		
		
		if(potions[i].d >= 0){
		
			
			potions[i].x += potions[i].cx* potions[i].speed;
			potions[i].y += potions[i].cy* potions[i].speed;
			potions[i].d-=potions[i].speed;
			
			
		}
		else if(potions[i].timer>0){
		//break potion
		if(potions[i].timer == 2000){
			potions[i].explode = true;
			potions[i].crack.play();
			if(potions[i].type == "bob"){
				potions[i].summon();
			}
			if(potions[i].type == "vacuum"){
				potions[i].vcm = true;
				vac = true;
			}
			//potions[i].drawPot(context);
		}
		
		
		
		potions[i].timer-=10;
		potions[i].height+=potions[i].rate;
		potions[i].width+=potions[i].rate;
		
		
		potions[i].x-=(potions[i].rate/2);
		potions[i].y-=(potions[i].rate/2);
		
		potions[i].rate*=(95/100);
		

		
		}
		else{
			potions.splice(i,1);
			vac = false;
		}
		
	}
}

//Move Player
function moveBox(){
	
	player1.midX = player1.x + player1.width / 2;
	player1.midY = player1.y + player1.height / 2;
	
	dx = player1.mx - player1.midX;
	dy = player1.my - player1.midY;
	
	
	player1.angle = Math.atan2(player1.cy, player1.cx) * (180 / Math.PI);
	
	
	if(player1.d >= 1){
		player1.x += player1.cx* player1.speed;
		player1.y += player1.cy* player1.speed;
		player1.d -=player1.speed; 
		step.play();
	}else{
	}
}

function pickUpIngredient(){
	for(var i=0; i<plants.length; i++){
		if(checkCollision(player1,plants[i])){
			if(player1.plant<9){
				plants.splice(i,1);
				player1.plant+=1;
			}
		
		}
	}
	for(var i=0; i<eyes.length; i++){
		if(checkCollision(player1,eyes[i])){
			if(eyes[i].id==2){
				if(player1.eye<9){
					eyes.splice(i,1);
					player1.eye+=1;
				}
			}
			else if(eyes[i].id==3){
				if(player1.teeth<9){
					eyes.splice(i,1);
					player1.teeth+=1;
				}
			}
			else if(eyes[i].id==4){
				if(player1.choc<9){
					eyes.splice(i,1);
					player1.choc+=1;
				}
			}
			
		
		}
	}
	
}






