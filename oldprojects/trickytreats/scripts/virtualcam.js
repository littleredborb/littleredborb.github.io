function camera(x,y){
	this.x=x;
	this.y=y;
	this.cx=0;
	this.cy=0;
	this.d=0;
	this.speed=0;
	this.midX = this.x + this.width / 2;
	this.midY = this.y + this.height / 2;
	this.offx;
	this.offy;
	
	this.start = function(offx,offy){
							this.offx=offx;
							this.offy=offy;
							context.save();
							context.translate(-(this.x+offx), -(this.y+offy));
	
	}
	
	this.end = function(){
	
	context.translate((this.x+this.offx), (this.y+this.offy));
	context.restore();
	}
	
	 }