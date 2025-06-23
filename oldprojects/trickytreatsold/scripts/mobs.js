//mx : mouseX
//my : mouseY
//dx dy distance of x and y
//cx cy unit vector
//r radius


function rectangle(id,x,y,width,height,source, speed, hp, drop){
	this.id = id;
	this.maxHp = hp;
	this.currHp = hp;
	this.r = width / 2;
	this.mx=0
	this.my=0
	this.sx=x
	this.sy=y
	this.x=x;
	this.y=y;
	this.width=width;
	this.height=height;
	this.cx=0;
	this.cy=0;
	this.d=0;
	this.speed= speed;
	this.angle=0;
	this.midX = this.x + this.width / 2;
	this.midY = this.y + this.height / 2;
	this.source = source;
	this.drop=drop; 
	this.timer=2000;
	
	this.potions= new Array();
	this.plant = 0;
	this.teeth = 0;
	this.eye = 0;
	this.choc = 0;
	
	this.Draw = function(context){
		context.drawImage(this.source, this.midX, this.midY, this.width, this.height);
	}
}