var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
var maxX=c.width;
var maxY=c.height;
var pallette=[];

var xres=2;
var yres=2;
for(x=0;x<8;x++) // this loop populates the color pallette array
{
    color=(31*x).toString(16); // convert the number to hex
    if(color.length==1) color='0'+color;  // add a zero in front if only one hex digit
    pallette[x]="#"+color+color+'ff'; // colors 0-8: the Red and Green components change, Blue=FF
    pallette[x+8]='#00ff'+color;      // colors 8-16: the Blue component changes, Red and Green=FF
    pallette[16+x]="#"+color+'0000';  // colors 17-25: the Red component changes, Green and Blue=0
}
/*for(x=0;x<256;x++) // the loop that creates the pallette
{
if(x<85)        // colors 0-84
        {
        r=x*3;
        g=0;
        b=0;
        }
if(x>84&&x<171)        // colors 85-170
        {
        r=0;
        g=3*(x-84);
        b=0;
        }
if(x>170)        // colors 170-255
        {
        r=0;
        g=0;
        b=3*(x-170);
        }

r=r.toString(16); // conversion to hex
g=g.toString(16);
b=b.toString(16);        

if (r.length==1) r="0"+r; // add a zero in front to change single-digit to double digit
if (g.length==1) g="0"+g;
if (b.length==1) b="0"+b;

pallette[x]="#"+r+g+b; // final hex string
}*/

xlimit=maxX/xres;
ylimit=maxY/yres;
var R=2;
var xdiv=xlimit/4;
var ydiv=ylimit/4;
//console.log(pallette);
function julia(){
    ctx.clearRect(0,0,maxX,maxY);
    var real=parseFloat(document.getElementById("real").value); //-.8;
    var imag=parseFloat(document.getElementById("imag").value); //.156;
    //https://en.wikipedia.org/wiki/Julia_set#Quadratic_polynomials
    //console.log(real + "" + imag);
    //var real=-0.70176;
    //var imag=-0.3842;
    //console.log(pallette);
    for(let y=0;y<ylimit;y++){
        for(let x=0;x<xlimit;x++){
            var cx= -R + x/xdiv;
            var cy= -R + y/ydiv;
            //console.log(x + " " + y +" r "+ R + " cx " + cx + " cy " +cy );
            var iter=0;
            x2=cx*cx;
            y2=cy*cy;
            do{
                cy=(cx+cx)*cy + imag;
                cx=(x2-y2) + real;
                x2=cx*cx;
                y2=cy*cy;
                iter+=1;
            }
            while ((x2+y2<=4) && iter<23);
            //console.log(cx + " " + cy + " iter " + iter);
            //console.log(iter);
            //iter=iter.toString(16);
            ctx.beginPath();
            ctx.rect(x*xres, y*yres, xres, yres);
            ctx.fillStyle=pallette[iter];
            //ctx.fillStyle ='#'+iter+iter+iter;
            ctx.fill();
        }
    }
}

//-0.70176 -0.3842