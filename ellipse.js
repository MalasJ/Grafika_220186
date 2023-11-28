function testTime(testSize){
    start=Date.now();
    for (let i=0; i<testSize; i++){drawEllipseNaive();}
    naiveTime=(Date.now()-start)/testSize;
    start=Date.now();
    for (let i=0; i<testSize; i++){drawEllipseBresenham();}
    bresenhamTime=(Date.now()-start)/testSize;
    console.log(naiveTime,bresenhamTime);
}
function drawEllipseBresenham(){
    setTimeout(function(){;},100);
}
function drawEllipseNaive(){
    setTimeout(function(){;},200);
}
testTime(1000);