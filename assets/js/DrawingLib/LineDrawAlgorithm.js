const btnGenerate = document.getElementById("generate");
const startPointX = document.getElementById("startPointX");
const startPointY = document.getElementById("startPointY");
const endPointX = document.getElementById("endPointX");
const endPointY = document.getElementById("endPointY");
const myCanvas = document.getElementById("myCanvas");
const algorithm = document.getElementById("selectAlgorithm");

btnGenerate.onclick = (ev) => drawLine(ev);
DrawCoordSystem();

function drawLine(ev)
{
    if(!validation())
    {
        alert("Koordinate početne i krajnje tačke moraju biti celi brojevi!");
    }
    else
    {
        if(algorithm.value == "NA")
           NA_Algorithm(startPointX.valueAsNumber,startPointY.valueAsNumber,endPointX.valueAsNumber,endPointY.valueAsNumber);
            else if(algorithm.value == "IA")
                    IA_Algorithm();
                else if(algorithm.value == "BA")
                        BA_Algorithm();
                        else if(algorithm.value == "MA")
                                MA_Algorithm();

    }
}
function validation()
{
    if(Number.isInteger(startPointX.valueAsNumber) && Number.isInteger(startPointY.valueAsNumber) && Number.isInteger(endPointX.valueAsNumber) && Number.isInteger(endPointY.valueAsNumber))
        return true;
    else
        return false;
}

function NA_Algorithm(x0,y0,x1,y1)
{
    let dx, dy, m, y, b;
    let xend;   
    let x; 
    dx=x1-x0;
    dy=y1-y0;
    if(x0<x1)
    {
        x=x0;
        xend=x1;
    } 
    else if(x0>x1)
    {
        x=x1;
        xend=x0;
    }
    else
    {
        var ystart,yend;
        if(y0<y1)
        {
            ystart=y0;
            yend=y1;
        }
        else
        {
            ystart=y1;
            yend=y0;
        }
        for (ystart; ystart <= yend; ystart++)   
        {      
            WritePixel(x0, ystart);   
        } 
        return;

    }  
    m  = dy/dx;  
    b  = y1 -m*x1;
    for (xend; xend >= x; xend--)   
    {    
        y = m*xend + b;    
        WritePixel(xend, parseInt(y));   
    } 
   
}

function IA_Algorithm()
{
    
}

function BA_Algorithm()
{
    
}

function MA_Algorithm()
{
    
}
function WritePixel(x, y)
{
    var ctx = myCanvas.getContext("2d");
    ctx.beginPath();
    ctx.translate(myCanvas.width/2+(x-1),myCanvas.height/2-(y-1));
    ctx.rect((x-1),-(y-1),2,2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.strokeStyle = 'blue';
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