var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
var maxX=c.width;
var maxY=c.height;
var x=0;
var y=0;
var alfa=0;
var pen=0;
//kąt jest skierowany w prawo!
var turtleColor="#000000";

function forward(d){
    x=x+d*Math.cos(alfa);
    y=y+d*Math.sin(alfa);
    if (pen==1){
        ctx.lineTo(x,y);
        ctx.stroke();
        //ctx.fillText(d,x-d*Math.cos(alfa)/2,y-d*Math.sin(alfa)/2);
    }
    else{ctx.moveTo(x,y);}
}
function penUp(){pen=0;}
function penDown(){pen=1;}
function turn(angle){alfa=alfa+angle;}
function changeColor(c){
    turtleColor=c;
    ctx.fillStyle=turtleColor;
    ctx.strokeStyle=turtleColor;
}
function reset(){
    penUp();
    x=maxX/2;
    y=maxY/2;
    ctx.moveTo(x,y);
    alfa=0;
    changeColor("#000000");
}
function regPolygon(n,side,color){
    //clockwise
    angle=(n-2)*Math.PI/n;
    changeColor(color);
    penDown();
    for (let i=0; i<n; i++){
        //ctx.fillText("i "+i +" n "+n+" x "+x+" y "+y,20,20+20*i);
        forward(side);
        turn(Math.PI-angle);
        //ctx.fillText("i "+i +" n "+n+" x "+x+" y "+y,400,20+20*i);
    }
    //ctx.closePath();
}
function startPositionRegPolygon(n,side){
    //centered at wherever we are
    angle=(n-2)*Math.PI/n;
    //go to the starting point to draw the first line parallel to the current angle
    turn(angle/2);
    forward(side/(2*Math.sin(1/n*Math.PI)));
    turn(Math.PI-angle/2);
}
function returnPositionPolygon(n,side){
    angle=(n-2)*Math.PI/n;
    //return from the starting position
    turn(angle/2);
    forward(side/(2*Math.sin(1/n*Math.PI)));
    turn(Math.PI-angle/2);
}
function drawRegularPolygon(n,side,color){
    //centered in the middle of the screen
    reset();
    ctx.beginPath();
    startPositionRegPolygon(n,side);
    regPolygon(n,side,color);
    reset();
}
function fullGraph(degree,size=20,color=turtleColor){
    reset();
    startPositionRegPolygon(degree,size);
    regPolygon(degree,size,color);
    for (let i=2;i<=Math.floor(degree/2);i++){
        //reset();
        changeColor(color);
        ctx.beginPath();
        //startPositionRegPolygon(degree,size);
        forward(0); //beginPath needs some moving first to start rendering
        polygonAngle=(degree-2)*Math.PI/degree;
        diagAngle=Math.PI/degree*(i-1); //angle of current jump diagonal
        if (degree % i == 0){
            //draw i regular polygons of degree/i degree, each offset by one side
            //jump=i
            for (let k=0;k<i;k++){
                turn(diagAngle);
                regPolygon(degree/i,size*Math.sin(i/degree*Math.PI)/Math.sin(Math.PI/degree),color);
                //ctx.fillText("i "+i +" k "+k+" color "+turtleColor,20+20*k,20+20*i+20*k);
                //move one side forward
                turn(-diagAngle);
                penUp();
                forward(size);
                turn(Math.PI-polygonAngle);
            }
        }
        else{
            //draw star polygon jumping i vertices
            penDown();
            turn(diagAngle);
            for (let k=0; k<degree; k++){
                forward(size*Math.sin(i/degree*Math.PI)/Math.sin(Math.PI/degree));
                turn(Math.PI-polygonAngle+2*Math.PI/degree*(i-1));
            }
            turn(-diagAngle);
            penUp();
        }
    }
}
function biPartFullGraph(m,n,size=20,color=turtleColor,color1="green",color2="red"){
    degree=m+n;
    polygonAngle=(degree-2)*Math.PI/degree;
    diagAngle=Math.PI/degree;
    grain=20;
    dotSize=1;
    reset();
    ctx.beginPath();
    startPositionRegPolygon(degree,size);
    turn(polygonAngle);
    dotColor=color1;
    penUp();
    for (let i=0; i<degree; i++){
        if (i>=m){
            dotColor=color2;
        }
        ctx.beginPath();
        startPositionRegPolygon(grain,dotSize);
        penDown();
        regPolygon(grain,dotSize,dotColor);
        penUp();
        returnPositionPolygon(grain,dotSize);
        forward(size);
        turn(Math.PI+polygonAngle);
    }
    changeColor(color);
    ctx.beginPath();
    turn(-polygonAngle);
    for (let i=0; i<m; i++){
        //for each vertex i<m draw edges to vertices v<n
        penDown();
        turn(diagAngle*i);
        for (let v=0; v<n; v++){
            forward(size*Math.sin((i+v+1)/degree*Math.PI)/Math.sin(Math.PI/degree));
            turn(Math.PI);
            forward(size*Math.sin((i+v+1)/degree*Math.PI)/Math.sin(Math.PI/degree));
            turn(Math.PI+diagAngle);
        }
        //turn to go a side
        turn((degree-i-n-2)*diagAngle);
        penUp();
        forward(size);
        turn(Math.PI);
    }
}
function koch(degree,size){
    //koch curve
    if(degree==1){
        forward(size);
    }
    else{
        degree-=1;
        size/=3;
        koch(degree,size);
        turn(-1/3*Math.PI);
        koch(degree,size);
        turn(2/3*Math.PI);
        koch(degree,size);
        turn(-1/3*Math.PI);
        koch(degree,size);
    }
}
function drawKoch(degree,size){
    //max 6, starts to lag after that
    penUp();
    startPositionRegPolygon(3,size);
    penDown();
    koch(degree,size);
    turn(2/3*Math.PI);
    koch(degree,size);
    turn(2/3*Math.PI);
    koch(degree,size);
}
function sierpinski(degree,size){
    //starts to lag beyond deg 6
    if (degree==1){
        regPolygon(3,size);
    }
    else{
        degree-=1;
        size/=2;
        sierpinski(degree,size);
        forward(2*size);
        turn(2/3*Math.PI);
        sierpinski(degree,size);
        forward(2*size);
        turn(2/3*Math.PI);
        sierpinski(degree,size);
        forward(2*size);
        turn(2/3*Math.PI);
    }
}
function drawSierp(degree,size){
    reset();
    startPositionRegPolygon(3,size);
    sierpinski(degree,size);
}
reset();
forward(100);
drawKoch(5,400);
//turn(Math.PI);
//drawSierp(7,400);
//changeColor("#FF00FF");
//fullGraph(5,80,"#7fddd4");
//biPartFullGraph(4,5,80,"blue");

//drawRegularPolygon(4,51,"#00ff00"); //#7fddd4 #dcff00
//reset();
/*x=maxX/2;
y=maxY/2;
ctx.moveTo(x,y);
turn(Math.PI/4);*/
//regPolygon(5,100,"#00ff00");
//penDown();
//changeColor("#dcff00");
//forward(60);
//drawRegularPolygon(5,21,"#000000");

















//some testing
/*penUp();
turn(1/4*Math.PI);
forward(200);
penDown();
changeColor("#dcff00");
turn(Math.PI/6);
forward(80);*/
/*turn(1/4*Math.PI);
forward(200

start();
changeColor("#dcff00");
ctx.font="12px ComicSansMS";
//ctx.fillText("kąt "+alfa+"x "+x+"y "+y,20,20);
var temp=Math.sin(4*Math.PI);
ctx.fillText("kątrgrgrgr "+temp,20,20);*/