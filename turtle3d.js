var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
var maxX=c.width;
var maxY=c.height;
var x=0;
var y=0;
var z=0;
var zenith=0; // kąt do OZ
var azim=0; //OXY
var pen=0;
var turtleColor="#000000";
var bx=0;
var by=0;
function forward(d){
    x=x+d*Math.sin(zenith)*Math.cos(azim);
    y=y+d*Math.sin(zenith)*Math.sin(azim);
    z=z+d*Math.cos(zenith);
    bx=(x-z)*Math.sqrt(1/2);
    by=x+2*y+z;
    if (pen==1){
        ctx.lineTo(bx,by);
        ctx.stroke();
        //ctx.fillText(d,x-d*Math.cos(alfa)/2,y-d*Math.sin(alfa)/2);
    }
    else{ctx.moveTo(bx,by);}
}
function penUp(){pen=0;}
function penDown(){pen=1;}
function turn(angle1,angle2){
    azim=azim+angle1;
    zenith=zenith+angle2;    
}
function changeColor(c){
    turtleColor=c;
    ctx.fillStyle=turtleColor;
    ctx.strokeStyle=turtleColor;
}
function reset(){
    penUp();
    bx=maxX/2;
    by=maxY/2;
    ctx.moveTo(bx,by);
    zenith=0;
    azim=0;
    changeColor("#000000");
}
reset();
//turn(Math.PI/4, Math.PI/6);
penDown();
forward(10000);