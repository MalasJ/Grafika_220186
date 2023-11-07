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
    bx=(y-x)*Math.sqrt(3)/2+ maxX/2;
    by=-(z-(x+y)/2) + maxY/2;
    if (pen==1){
        ctx.lineTo(bx,by);
        ctx.stroke();
        //ctx.fillText(d+" "+(180/Math.PI*azim).toFixed(2)+" "+(180/Math.PI*zenith).toFixed(2),bx,by);
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
    x=0;
    y=0;
    z=0;
    ctx.moveTo(bx,by);
    zenith=Math.PI/2;
    azim=0;
    changeColor("#000000");
}
function drawAxes(len,offset){
    ctx.beginPath();
    reset();
    penDown();
    forward(len);
    penUp();
    forward(10);
    ctx.fillText("x",bx,by);
    turn(Math.PI,0);
    forward(10);
    penDown();
    forward(len+offset);
    ///
    reset();
    penDown();
    turn(Math.PI/2,0);
    forward(len);
    penUp();
    forward(10);
    ctx.fillText("y",bx,by);
    turn(Math.PI,0);
    forward(10);
    penDown();
    forward(len+offset);
    ///
    reset();
    penDown();
    turn(0,-Math.PI/2);
    forward(len);
    penUp();
    forward(10);
    ctx.fillText("z",bx,by);
    turn(0,Math.PI);
    forward(10);
    penDown();
    forward(len+offset);

}
drawAxes(200,70);

ctx.beginPath();
reset();
forward(100);
penDown();

changeColor("blue");
forward(50);
turn(Math.PI/2,Math.PI/4);
forward(50);
turn(Math.PI/2,-Math.PI/4);
forward(50);
turn(Math.PI/2,-Math.PI/4);
forward(50);

ctx.beginPath();
reset();
turn(Math.PI*2/3,-Math.PI/12);
forward(10);
penDown();
changeColor("green");
forward(20);
for (let i=0;i<60;i++){
    turn(Math.PI/6,0);
    forward(10);
}