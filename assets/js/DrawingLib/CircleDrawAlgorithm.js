const btnGenerate = document.getElementById("generate");
const radius = document.getElementById("radius");
const myCanvas = document.getElementById("myCanvas");
const algorithm = document.getElementById("selectAlgorithm");
const width = document.getElementById("width");
const height = document.getElementById("height");
const legend = document.getElementById("legend");
const colorOfCircle = document.getElementById("colorOfCircle");
const btnClearCanvas = document.getElementById("clearCanvas");
const PI = 3.141592653589;
let legendOfCircle=[0,0,0];

width.innerHTML+="<strong>"+parseInt(myCanvas.width/4)+"</strong>";
height.innerHTML+="<strong>"+parseInt(myCanvas.height/4)+"</strong>";

btnGenerate.onclick = (ev) => drawCircle(ev);
algorithm.onchange= (ev) => checkColor(ev);
btnClearCanvas.onclick = (ev) => clearCanvasElement(ev);



DrawCoordSystem();



function clearCanvasElement(ev)
{
    var context = myCanvas.getContext('2d');
    context.clearRect(0, 0, myCanvas.width, myCanvas.height);
    var w = myCanvas.width;
    myCanvas.width = 1;
    myCanvas.width = w;
    DrawCoordSystem();
}
function checkColor(ev)
{
    if(algorithm.value=="TA")
    {
        if(legendOfCircle[0]!=0)
          {
            colorOfCircle.value=legendOfCircle[0];
            colorOfCircle.disabled=true;
          } 
        else
            colorOfCircle.disabled=false;
            
         
    }
    else if(algorithm.value=="PA")
    {
        if(legendOfCircle[1]!=0)
          {
            colorOfCircle.value=legendOfCircle[1];
            colorOfCircle.disabled=true;
          } 
        else
            colorOfCircle.disabled=false;
    }
    else if(algorithm.value=="BA")
    {
        if(legendOfCircle[2]!=0)
          {
            colorOfCircle.value=legendOfCircle[2];
            colorOfCircle.disabled=true;
          } 
        else
            colorOfCircle.disabled=false;
    }
    
}
function drawCircle(ev)
{
    if(!validation())
    {
        $("#myModal").modal("show");
    }
    else
    {
        if(algorithm.value == "TA")
           TA_Algorithm(radius.valueAsNumber);
            else if(algorithm.value == "PA")
                    PA_Algorithm(radius.valueAsNumber);
                else if(algorithm.value == "BA")
                        BA_Algorithm(radius.valueAsNumber);
                        
    }
}
function editLegend(algorithm)
{
    const el=document.createElement("div");
    el.style="color:"+colorOfCircle.value;
    el.innerHTML+="<strong>___ "+algorithm+"</strong>";
    legend.appendChild(el);
}
function validation()
{
    if(Number.isInteger(radius.valueAsNumber))
        return true;
    else
        return false;
}
function TA_Algorithm(radius)
{
    let alfa;
    let step=(2*PI)/(7*radius);
    let endAngle=PI/4;
    let x,y;
    for(alfa=0;alfa<endAngle;alfa+=step)
    {
        x = parseInt(radius*Math.cos(alfa) + 0.5); 
        y = parseInt(radius*Math.sin(alfa) + 0.5);
        Write8Pixel(x,y); 
    }
    
    checkColorStatus(0, "Trigonometrijski algoritam");
}
function PA_Algorithm(radius)
{
    let x, y, xend;
    xend = parseInt(radius/Math.sqrt(2)+0.5);
    for(x=0;x<xend;x++)
    {
        y=parseInt(Math.sqrt(radius*radius-x*x)+ 0.5);
        Write8Pixel(x,y);
    } 
    
    checkColorStatus(1, "Polinomni algoritam");
}
function BA_Algorithm(radius)
{
    let x, y, d;
    x=radius;
    y=0;
    d= 3-2*radius;
    while(x>y)
    { 
        Write8Pixel(x,y);
        if(d<0)
            d+=4*y+6;
        else
        { 
            d+=4*(y-x)+10;
            x--;
        }
        y++;
    }
    if(x==y) 
        Write8Pixel(x, y);

    checkColorStatus(2, "Bresenham-ov algoritam");
}

function checkColorStatus(index, algorithm)
{
    if(legendOfCircle[index]==0)
    {
        editLegend(algorithm);
        legendOfCircle[index]=colorOfCircle.value;
        colorOfCircle.disabled=true;
    }

}
function Write8Pixel(x,y)
{
    WritePixel(x,y);
    WritePixel(y,x);
    WritePixel(-y,x);
    WritePixel(-x,y);
    WritePixel(-x,-y);
    WritePixel(-y,-x);
    WritePixel(y,-x);
    WritePixel(x,-y);
}
function WritePixel(x, y)
{
    var ctx = myCanvas.getContext("2d");
    ctx.beginPath();
    ctx.translate(myCanvas.width/2+(x-1),myCanvas.height/2-(y-1));
    ctx.rect((x-1),-(y-1),2,2);
    ctx.fillStyle = colorOfCircle.value;
    ctx.fill();
    ctx.strokeStyle = colorOfCircle.value;
    ctx.stroke();
    ctx.translate(-myCanvas.width/2-(x-1),-myCanvas.height/2+(y-1));
}
function DrawCoordSystem()
{
    var ctx = myCanvas.getContext("2d");
    ctx.beginPath();
    ctx.translate(myCanvas.width / 2, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, myCanvas.height);
    ctx.strokeStyle = '#ff0000';
    ctx.stroke();
    ctx.translate(-myCanvas.width / 2, 0);
    ctx.beginPath();
    ctx.translate(0, myCanvas.height/2);
    ctx.moveTo(0, 0);
    ctx.lineTo(myCanvas.width,0);
    ctx.strokeStyle = '#00ff00';
    ctx.stroke();
    ctx.translate(0, -myCanvas.height/2);

}



