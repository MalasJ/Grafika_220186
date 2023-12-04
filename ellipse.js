var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
var maxX=c.width;
var maxY=c.height;
function testTime(testSize,x0,y0,x1,y1){
    //zamiana kolejności testowania bardzo zmienia wyniki?????????
    var start2=performance.now();
    for (let j=0; j<testSize; j++){
        ctx.clearRect(x0-1,y0-1,x1-x0+2,y1-y0+2);
        drawEllipseBresenham(x0,y0,x1,y1,"#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0"));
        //console.log(performance.now());
    }
    var bresenhamTime=performance.now();
    x0+=x1;
    x1+=x1;
    var start1=performance.now();
    for (let i=0; i<testSize; i++){
        ctx.clearRect(x0-1,y0-1,x1-x0+2,y1-y0+2);
        drawEllipseNaive(x0,y0,x1,y1,"#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0"));
        //console.log(performance.now());
    }
    var naiveTime=performance.now();
    //console.log("naive:"+start1+" "+naiveTime+" "+(naiveTime-start1) + " bresenham:" +start2+" "+bresenhamTime+" "+(bresenhamTime-start2));
    //console.log("naive:"+naiveTime/testSize + " bresenham:" + bresenhamTime/testSize);
    console.log("naive:"+(naiveTime-start1) + " bresenham:" + (bresenhamTime-start2));
}
function drawEllipseBresenham(x0,y0,x1,y1,color){
    //draws ellipse inside rectangle specified by down left and upper right corner
    //diameters
    var a=Math.abs(x1-x0);
    var b=Math.abs(y1-y0);
    var b1= b & 1;
    //increments
    var dx=4*(1-a)*b*b;
    var dy=4*(b1+1)*a*a;
    //errors
    var err=dx+dy+b1*a*a;
    var e2;
    //swap if needed
    if (x0>x1){x0=x1;x1+=a;}
    if (y0>y1){y0=y1;}
    y0+=Math.floor((b+1)/2);
    y1=y0-b1;
    a*=8*a;
    b1=8*b*b;
    ctx.beginPath();
    ctx.strokeStyle=color;
    do{
        ctx.rect(x1, y0, 1, 1);
        ctx.rect(x0, y0, 1, 1);
        ctx.rect(x0, y1, 1, 1);
        ctx.rect(x1, y1, 1, 1);
        e2=2*err;
        if (e2<=dy){
            y0++; 
            y1--; 
            dy += a;
            err += dy;
        } 
        if (e2>=dx || 2*err > dy){
            x0++; 
            x1--; 
            dx+=b1;
            err+=dx;
        }
    }while(x0<=x1);
    //in case a=1
    while (y0-y1<b){
       ctx.rect(x0-1, y0, 1, 1);
       ctx.rect(x1+1, y0++, 1, 1); 
       ctx.rect(x0-1, y1, 1, 1);
       ctx.rect(x1+1, y1--, 1, 1);
    }
    ctx.stroke();
}
function drawEllipseNaive(x0,y0,x1,y1,color){
    //draws ellipse inside rectangle specified by down left and upper right corner
    //semi-diameters
    const a=Math.abs(x1-x0)/2; const a2=a**2; 
    const b=Math.abs(y1-y0)/2; const b2=b**2;
    const xstop=a2/Math.sqrt(a2+b2);
    var m=b/a;
    //swap if needed
    if (x0>x1){x0=x1;}//x1+=a;
    if (y0>y1){y0=y1;}
    const tx=x0+a;
    const ty=y0+b;
    ctx.beginPath();
    ctx.strokeStyle=color;
    var y;
    var x=0;
    for (;x<=xstop;x++){
        y=m*Math.sqrt(a2-x**2);
        ctx.rect(x+tx, y+ty, 1, 1);
        ctx.rect(x+tx, -y+ty, 1, 1);
        ctx.rect(-x+tx, y+ty, 1, 1);
        ctx.rect(-x+tx, -y+ty, 1, 1);
    }
    //when tangent is 45 degrees, switch to f(y)=x
    m=a/b;
    for (;y>=0;y--){
        x=m*Math.sqrt(b2-y**2);
        ctx.rect(x+tx, y+ty, 1, 1);
        ctx.rect(x+tx, -y+ty, 1, 1);
        ctx.rect(-x+tx, y+ty, 1, 1);
        ctx.rect(-x+tx, -y+ty, 1, 1);
    }
    ctx.stroke();
}
console.clear();
//drawEllipseNaive(10,10,140,500,"red");
//dziwne wyniki dla 100
testSize=100;

console.log("wysokie");
testTime(testSize,10,100,70,440); //1.411 1.727
console.log("duże");
testTime(testSize,200,200,700,500); //1.707 2.074
console.log("płaskie");
testTime(testSize,10,10,700,50); //2.118 2.765


/*testSize=100;
testTime(testSize,10,100,70,540); //0.16 0.29
testTime(testSize,200,200,700,500); //3.46 0.39
testTime(testSize,10,10,700,50); // 4.3 0.44*/

//drawEllipseBresenham(10,10,700,50,"#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0"));
