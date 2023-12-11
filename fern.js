var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
var maxX=c.width;
var maxY=c.height;
function mult(A,B){
    lenA=A.length;
    lenB=B[0].length;
    if (typeof(lenB) === "undefined"){return multPoint(A,B);}
    else{
        lenK=A[0].length;
        answer=[];
        for (let i=0; i<lenA;i++){
            answer[i]=[];
            for (let j=0; j<lenB; j++){
                suma=0;
                for(let k=0; k<lenK;k++){
                    suma+=A[i][k]*B[k][j];
                }
                answer[i][j]=suma;
            }
        }
    return answer;
    }
}
function multPoint(A,B){
    lenA=A.length;
    lenB=B.length;
    answer=[];
    for (let i=0; i<lenA;i++){
        suma=0;
        for (let j=0; j<lenB; j++){
            suma+=A[i][j]*B[j];
        }
        answer[i]=suma;
    }
    return answer;
}
function expandPoint(A){
    return [A[0],A[1],1]
}
function expandMatrix(A){
    return [[A[0][0],A[0][1],0],[A[1][0],A[1][1],0],[0,0,1]]
}
function translationMatrix(v){
    return[[1,0,v[0]],[0,1,v[1]],[0,0,1]]
}
function generateBarnsleyFern(transformations,probabilities,iterations,startPoint,scale=50,color="green"){
    scale*=-1;
    var P=expandPoint([0,0]);
    ctx.beginPath();
    ctx.strokeStyle=color;
    ctx.rect(scale*P[0]+startPoint[0],scale*P[1]+startPoint[1],1,1);
    lenProb=probabilities.length;
    for (let n=0;n<iterations;n++){
        random=Math.random();
        sum=probabilities[0];
        var index=0;
        for (;random>sum;index++){
            sum+=probabilities[index+1];
        }
        P=mult(transformations[index],P);
        ctx.rect(scale*P[0]+startPoint[0],scale*P[1]+startPoint[1],1,1);
        //console.log(P);
    }
    ctx.stroke();
}
function og(){
    ctx.clearRect(0,0,maxX,maxY);
    m1=[[0,0],[0,0.16]];
    m21=[[0.85,0.04],[-0.04,0.85]];
    m22=[0,1.6];
    m31=[[0.2,-0.26],[0.23,0.22]];
    m32=[0,1.6];
    m41=[[-0.15,0.28],[0.26,0.24]];
    m42=[0,0.44];
    transf=[mult(translationMatrix(m22),expandMatrix(m21)),
        mult(translationMatrix(m32),expandMatrix(m31)),
        mult(translationMatrix(m42),expandMatrix(m41)),
        expandMatrix(m1)];
    probs=[0.85,0.07,0.07,0.01];
    generateBarnsleyFern(transf,probs,10**document.getElementById("iterations").value,[maxX/2,0.95*maxY],
    document.getElementById("size").value,document.getElementById("pickedColor").value);
}
function mutant1(){
    ctx.clearRect(0,0,maxX,maxY);
    m11=[[0,0],[0,0.25]];
    m12=[0,-0.4];
    m21=[[0.95,0.005],[-0.005,0.93]];
    m22=[-0.002,0.5];
    m31=[[0.035,-0.2],[0.16,0.04]];
    m32=[-0.09,0.02];
    m41=[[-0.04,0.2],[0.16,0.04]];
    m42=[0.083,0.12];
    transf=[mult(translationMatrix(m22),expandMatrix(m21)),
        mult(translationMatrix(m32),expandMatrix(m31)),
        mult(translationMatrix(m42),expandMatrix(m41)),
        mult(translationMatrix(m12),expandMatrix(m11))];
    probs=[0.84,0.07,0.07,0.02];
    generateBarnsleyFern(transf,probs,10**document.getElementById("iterations").value,[maxX/2,0.95*maxY],
    document.getElementById("size").value,document.getElementById("pickedColor").value);
}
/*function sortArrays(arrays, comparator = (a, b) => (a < b) ? -1 : (a > b) ? 1 : 0) {
    let arrayKeys = Object.keys(arrays);
    let sortableArray = Object.values(arrays)[0];
    let indexes = Object.keys(sortableArray);
    let sortedIndexes = indexes.sort((a, b) => comparator(sortableArray[a], sortableArray[b]));

    let sortByIndexes = (array, sortedIndexes) => sortedIndexes.map(sortedIndex => array[sortedIndex]);

    if (Array.isArray(arrays)) {
        return arrayKeys.map(arrayIndex => sortByIndexes(arrays[arrayIndex], sortedIndexes));
    } else {
        let sortedArrays = {};
        arrayKeys.forEach((arrayKey) => {
            sortedArrays[arrayKey] = sortByIndexes(arrays[arrayKey], sortedIndexes);
        });
        return sortedArrays;
    }
}*/