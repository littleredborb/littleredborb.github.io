var crack = document.createElement('audio');
	crack.src = 'sounds/crack.mp3';
	
	
//zombie id - 1 
//werewolf id - 2 
//spirit id - 3 
//zombie id - 1 

var coolDownTime = 100;
var insanity = false;
var currCoolDown = 0;
var updateTime = 100;
var currUpdate = 0;
var spd = 4;
var spdZ = 0.7;
var spdW = 1.2;
var spdM = 0.8;

//Potion object
function potion(x,y,width,height,effectImg, damage, multiplier, bottle, t, type){
	this.type = type;
	this.mx=0
	this.my=0
	this.sx=x
	this.sy=y
	this.x=x;
	this.y=y;
	this.r = width / 2;
	this.width=width;
	this.height=height;
	this.cx=0;
	this.cy=0;
	this.d=0;
	this.timer=2000;
	this.rate=4;
	this.speed=10;
	this.duration=0;
	this.spreadRate=1;
	this.damage = damage;
	this.explode = false;
	this.multiplier = multiplier;
	this.source = effectImg;
	this.bottleImg = bottle;
	this.isThrowable = t;
	this.crack = document.createElement('audio');
	this.crack.src = 'sounds/crack.mp3';
	this.pot = document.createElement('img');
	this.pot.src = 'img/base.png'; 
	this.shard = document.createElement('img');
	this.shard.src = 'img/shard.png'; 
	this.vcm = false;
	
	this.consume = function(){
		if(this.type == "increaseHp"){
			player1.currHp += 50;
			if(player1.currHp > player1.maxHp)
				player1.currHp = player1.maxHp;
		}
		
		else if(this.type == "increaseSpeed"){
			spd = player1.speed;
			player1.speed = 7;
			currUpdate = 200;
			
		}
		
		else if(this.type == "cureInsanity"){
			insanity = false;
			
		}
		
		else if(this.type == "fullRestore"){
			insanity = false;
			player1.currHp = player1.maxHp;
		}
		
	}
	
	this.summon = function(){
		var friend = new rectangle(98,this.x,this.y,50,50,bobImg,1,300, "none")
		friend.dx = friend.mx - friend.x;
		friend.dy = friend.my - friend.y;
		friends.push(friend);
		console.log("summon bob");
		//currUpdate = updateTime;
	}
	
	this.effect = function(monster){
		
		if(this.type == "regenHealth"){
			monster.currHp++;
			if(monster.currHp > monster.maxHp)
				monster.currHp = monster.maxHp;
		}
		
		if(this.type == "damageS"){
			if(monster.id == 3 || monster.id == 99){
				monster.currHp -= damage * 2;
			}
		}
		
		if(this.type == "damage"){
			if(monster.id == 3){
				monster.currHp = monster.currHp;
			}
			else if(multiplier == monster.id){
				monster.currHp -= damage * 2;
			}
			else
				monster.currHp-= damage;
		}
		
		else if(this.type == "slow"){
			if(monster.id == 99)
				spd = player1.speed;
			monster.speed = 0.3;
			currUpdate = updateTime;
		}
		
		else if(this.type == "speedy"){
			if(monster.id == 99){
				monster.speed = 7;
			}
			else
				monster.speed = 3;
			currUpdate = updateTime;
		}
		
		else if(this.type == "stun"){
			monster.speed = 0;
			currUpdate = updateTime;
		}
		
		else if(this.type == "fullHeal"){
			monster.currHp = monster.maxHp;
		}
		
		else if(this.type == "insanity"){
			if(monster.id == 99){
				insanity = false;
			}
			else
				monster.speed = 3;
			currUpdate = updateTime;
		}
		
	}
	
	this.Draw = function(context){
		context.drawImage(this.source, this.x, this.y, this.width, this.height);
		}
	this.DrawPot = function(context){
		context.drawImage(this.pot, this.x-10, this.y-10, 40, 40);
		}
	this.DrawShard = function(context){
		context.drawImage(this.shard, this.x, this.y, this.width, this.height);
		
	}
}


//new code
function craftPotion(dmg, m, EImg, Img, t, type){
	pot = new potion(0,0,20,20,EImg, dmg, m, Img, t, type);
	player1.potions.push(pot);
	currCoolDown = coolDownTime;
}


function consumePotion(){

}

//throw potion
function throwpotion(x){

	player1.potions[x].x = player1.x;
	player1.potions[x].y = player1.y;

	player1.potions[x].mx = mousex-player1.potions[x].width/2.0;
	player1.potions[x].my = mousey-player1.potions[x].height/2.0;
	
	
	dx = player1.potions[x].mx - player1.potions[x].x;
	dy = player1.potions[x].my - player1.potions[x].y;
	
	player1.potions[x].d = Math.sqrt( (dx *dx) + (dy*dy) );
	
	player1.potions[x].cx = dx / player1.potions[x].d;
	player1.potions[x].cy = dy / player1.potions[x].d;
	
	
	
	player1.potions[x].x=player1.x;
	player1.potions[x].y=player1.y;
	potions.push(player1.potions[x]);

	player1.potions.splice(x,1);
	
}
//effectImg, damage, multiplier, bottle, t, type
function getCombi(a, b, c, d){
	if(a == true){
		if(b == true){
			craftPotion(3,1,EgImg,gImg,true,"damage");
			player1.plant--;
			player1.eye--;
		}
		else if(c == true){
			craftPotion(3,2,EoImg,oImg,false,"bob");
			player1.teeth--;
			player1.plant--;
		}
		else if(d == true){
			craftPotion(0,0,ErImg,sRImg,false,"speedy");
			player1.plant--;
			player1.choc--;
			
		}
	}
	if(b == true){
		if(c == true){
			craftPotion(0,0,EgImg,gImg,true,"slow");
			player1.eye--;
			player1.teeth--;
			
		}
		else if(d == true){
			craftPotion(0,0,EbImg,sBImg,false,"insanity");
			player1.eye--;
			player1.choc--;
		}
	}
	if(c == true){
		if(d==true){
			craftPotion(0,0,EoImg,sOImg,true,"stun");
			player1.teeth--;
			player1.choc--;
		}
	}
}
