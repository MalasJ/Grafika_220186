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
var polygonDegree=3;
var polygonRadius=100;
var fractalDegree=1;
var fractalRadius=100;
var kochBaseDegree=3;
function forward(d){
    x=x+d*Math.cos(alfa);
    y=y+d*Math.sin(alfa);
    if (pen==1){
        ctx.lineTo(x,y);
        ctx.stroke();
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
function naprzod(){
    forward(document.getElementById("distance").value);
}
function obroc(){
    turn(document.getElementById("listenAngle").value*Math.PI/180);
}
function restart(){
    ctx.clearRect(0,0,maxX,maxY);
    ctx.beginPath();
    reset();
    penDown();
}
function zmienKolor(){
    ctx.beginPath();
    changeColor(document.getElementById("pickedColor").value);
    forward(0);
}
function regPolygon(n,side,color){
    //clockwise
    angle=(n-2)*Math.PI/n;
    changeColor(color);
    penDown();
    for (let i=0; i<n; i++){
        forward(side);
        turn(Math.PI-angle);
    }
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
function zmniejszStopien(){
    if (polygonDegree>3){
        polygonDegree--;
        document.getElementById("stopień wielokąta").innerHTML = "stopień wielokąta = " + polygonDegree;
    }
}
function zwiekszStopien(){
    polygonDegree++;
    document.getElementById("stopień wielokąta").innerHTML = "stopień wielokąta = " + polygonDegree;
}
function zmniejszRozmiarWielokata(){
    if (polygonRadius>50){
        polygonRadius-=50;
        document.getElementById("rozmiar wielokąta").innerHTML = "rozmiar wielokąta = " + polygonRadius;
    }
}
function zwiekszRozmiarWielokata(){
    polygonRadius+=50;
    document.getElementById("rozmiar wielokąta").innerHTML = "rozmiar wielokąta = " + polygonRadius;
}
function rysujWielokat(){
    ctx.clearRect(0,0,maxX,maxY);
    document.getElementById("stopień wielokąta").innerHTML = "stopień wielokąta = " + polygonDegree;
    document.getElementById("rozmiar wielokąta").innerHTML = "rozmiar wielokąta = " + polygonRadius;
    drawRegularPolygon(polygonDegree,polygonRadius*Math.sin(1/polygonDegree*Math.PI),document.getElementById("pickedColor").value);
}
/////////////
function zmniejszStopienFraktala(){
    if (fractalDegree>1){
        fractalDegree--;
        document.getElementById("stopień fraktala").innerHTML = "stopień fraktala = " + fractalDegree;
    }
}
function zwiekszStopienFraktala(){
    fractalDegree++;
    document.getElementById("stopień fraktala").innerHTML = "stopień fraktala = " + fractalDegree;
}
function zmniejszRozmiarFraktala(){
    if (fractalRadius>50){
        fractalRadius-=50;
        document.getElementById("rozmiar fraktala").innerHTML = "rozmiar fraktala = " + fractalRadius;
    }
}
function zwiekszRozmiarFraktala(){
    fractalRadius+=50;
    document.getElementById("rozmiar fraktala").innerHTML = "rozmiar fraktala = " + fractalRadius;
}
function zmniejszStopienPodstawyKocha(){
    if (kochBaseDegree>2){
        kochBaseDegree--;
        document.getElementById("stopień podstawy Kocha").innerHTML = "stopień podstawy Kocha = " + kochBaseDegree;
    }
}
function zwiekszStopienPodstawyKocha(){
    kochBaseDegree++;
    document.getElementById("stopień podstawy Kocha").innerHTML = "stopień podstawy Kocha = " + kochBaseDegree;
}
function rysujKocha(){
    ctx.clearRect(0,0,maxX,maxY);
    document.getElementById("stopień fraktala").innerHTML = "stopień fraktala = " + fractalDegree;
    document.getElementById("rozmiar fraktala").innerHTML = "rozmiar fraktala = " + fractalRadius;
    drawKoch(fractalDegree,fractalRadius,kochBaseDegree);
}
function rysujSierp(){
    ctx.clearRect(0,0,maxX,maxY);
    document.getElementById("stopień fraktala").innerHTML = "stopień fraktala = " + fractalDegree;
    document.getElementById("rozmiar fraktala").innerHTML = "rozmiar fraktala = " + fractalRadius;
    drawSierp(fractalDegree,fractalRadius);
}
function fullGraph(degree,size=20,color=turtleColor){
    reset();
    startPositionRegPolygon(degree,size);
    regPolygon(degree,size,color);
    for (let i=2;i<=Math.floor(degree/2);i++){
        changeColor(color);
        ctx.beginPath();
        forward(0); //beginPath needs some moving first to start rendering
        polygonAngle=(degree-2)*Math.PI/degree;
        diagAngle=Math.PI/degree*(i-1); //angle of current jump diagonal
        if (degree % i == 0){
            //draw i regular polygons of degree/i degree, each offset by one side
            //jump=i
            for (let k=0;k<i;k++){
                turn(diagAngle);
                regPolygon(degree/i,size*Math.sin(i/degree*Math.PI)/Math.sin(Math.PI/degree),color);
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
function rysujGraf(){
    restart();
    color=document.getElementById("pickedColor").value;
    n=parseInt(document.getElementById("fullGraphDegree").value);
    m=parseInt(document.getElementById("biGraphDegree").value);
    size=parseInt(document.getElementById("size").value);
    if (isNaN(m) || m==0){
        fullGraph(n,size,color);
    }
    else{
        biPartFullGraph(n,m,size,color);
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
function drawKoch(degree,size,n){
    //max 6, starts to lag after that
    penUp();
    reset();
    changeColor(document.getElementById("pickedColor").value);
    ctx.beginPath();
    startPositionRegPolygon(n,size);
    penDown();
    angle=(n-2)*Math.PI/n;
    for (let i=0; i<n; i++){
        koch(degree,size);
        turn(Math.PI-angle);
    }
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
    changeColor(document.getElementById("pickedColor").value);
    ctx.beginPath();
    startPositionRegPolygon(3,size);
    sierpinski(degree,size);
}

//lista2


function LsystemKoch(degree){
    //generate nth word
    if(degree==1){
        return "F";
    }
    else{
        degree-=1;
        return LsystemKoch(degree) + "-" + LsystemKoch(degree) + "++" + LsystemKoch(degree) + "-" +LsystemKoch(degree);
    }
}
function readLsystemKoch(degree,size){
    //forward(1),turn(-60),turn(60)
    reset();
    x=0;
    y=maxY-10;
    ctx.moveTo(x,y);
    ctx.beginPath();
    penDown();
    forward(0);
    var sentence=LsystemKoch(degree);
    size=size/3**(degree-1);
    Array.from(sentence).forEach(word => { 
        if (word=="F"){forward(size);}
        else if (word=="+"){turn(1/3*Math.PI);}
        else if (word=="-"){turn(-1/3*Math.PI);}
        else {console.log(word);}
    });
}
const mapString = (str, fn) => str.split('').map((c) => fn(c,str)).join('');
function LsystemCantor(word){
    //substitutions
    if (word=="A"){
        return "ABA";
    }
    else if (word=="B"){
        return "BBB";
    }
    else{console.log(word);}
}
function readLsystemCantor(degree,size){
    var sentence="A";
    for (let i=1; i<degree;i++){
        sentence=mapString(sentence,c=>LsystemCantor(c));
    }
    ctx.beginPath();
    penDown();
    forward(0);
    size=size/3**(degree-1);
    Array.from(sentence).forEach(word => { 
        if (word=="A"){
            penDown();
            forward(size);
        }
        else if (word=="B"){
            penUp();
            forward(size);
        }
        else {console.log(word);}
    });
}
function drawCantors(){
    degree=fractalDegree;
    offset=20;
    ctx.clearRect(0,0,maxX,maxY);
    document.getElementById("stopień fraktala").innerHTML = "stopień fraktala = " + fractalDegree;
    for (let i=1; i<=degree; i++){
        reset();
        x=offset;
        y=maxY/(degree+1)*i;
        ctx.moveTo(x,y);
        readLsystemCantor(i,maxX-2*offset);
    }
    
}
function drawKochSystem(){
    ctx.clearRect(0,0,maxX,maxY);
    document.getElementById("stopień fraktala").innerHTML = "stopień fraktala = " + fractalDegree;
    readLsystemKoch(fractalDegree,maxX);
}
