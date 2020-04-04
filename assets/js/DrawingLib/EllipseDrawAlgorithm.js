const btnGenerate = document.getElementById("generate");
const radiusX = document.getElementById("radiusX");
const radiusY = document.getElementById("radiusY");
const myCanvas = document.getElementById("myCanvas");
const algorithm = document.getElementById("selectAlgorithm");
const width = document.getElementById("width");
const height = document.getElementById("height");
const legend = document.getElementById("legend");
const colorOfEllipse = document.getElementById("colorOfEllipse");
const btnClearCanvas = document.getElementById("clearCanvas");
const PI = 3.141592653589;
let legendOfEllipse=[0,0,0,0];

width.innerHTML+="<strong>"+parseInt(myCanvas.width/4)+"</strong>";
height.innerHTML+="<strong>"+parseInt(myCanvas.height/4)+"</strong>";

btnGenerate.onclick = (ev) => drawEllipse(ev);
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
        if(legendOfEllipse[0]!=0)
          {
            colorOfEllipse.value=legendOfEllipse[0];
            colorOfEllipse.disabled=true;
          } 
        else
            colorOfEllipse.disabled=false;
            
         
    }
    else if(algorithm.value=="PA")
    {
        if(legendOfEllipse[1]!=0)
          {
            colorOfEllipse.value=legendOfEllipse[1];
            colorOfEllipse.disabled=true;
          } 
        else
            colorOfEllipse.disabled=false;
    }
    else if(algorithm.value=="DA1")
    {
        if(legendOfEllipse[2]!=0)
          {
            colorOfEllipse.value=legendOfEllipse[2];
            colorOfEllipse.disabled=true;
          } 
        else
            colorOfEllipse.disabled=false;
    }
    else if(algorithm.value=="DA2")
    {
        if(legendOfEllipse[3]!=0)
          {
            colorOfEllipse.value=legendOfEllipse[2];
            colorOfEllipse.disabled=true;
          } 
        else
            colorOfEllipse.disabled=false;
    }
    
}
function drawEllipse(ev)
{
    if(!validation())
    {
        $("#myModal").modal("show");
    }
    else
    {
        if(algorithm.value == "TA")
           TA_Algorithm(radiusX.valueAsNumber, radiusY.valueAsNumber);
            else if(algorithm.value == "PA")
                    PA_Algorithm(radiusX.valueAsNumber, radiusY.valueAsNumber);
                else if(algorithm.value == "DA1")
                        DA1_Algorithm(radiusX.valueAsNumber, radiusY.valueAsNumber);
                        else if(algorithm.value == "DA2")
                            DA2_Algorithm(radiusX.valueAsNumber, radiusY.valueAsNumber);
                        
    }
}
function editLegend(algorithm)
{
    const el=document.createElement("div");
    el.style="color:"+colorOfEllipse.value;
    el.innerHTML+="<strong>___ "+algorithm+"</strong>";
    legend.appendChild(el);
}
function validation()
{
    if(Number.isInteger(radiusX.valueAsNumber) && Number.isInteger(radiusY.valueAsNumber))
        return true;
    else
        return false;
}
function TA_Algorithm(a, b)
{
    let t, tend, tstep;
    let dvapi = 2*PI; 
    let x, y;
    t = 0.0;
    tend = PI/2; 
    tstep = dvapi / (7 * Math.max(a,b));
    while (t <= tend) 
    { 
        x = parseInt(a*Math.cos(t) + 0.5); 
        y = parseInt(b*Math.sin(t) + 0.5); 
        Write4Pixel(x, y);
        t += tstep;
    } 
    
    checkColorStatus(0, "Trigonometrijski algoritam");
}
function PA_Algorithm(a, b)
{
    let x; 
    let y,a2;
    a2=a*a; 
    for(x=0; x<a; x++)
    { 
        y=parseInt(b*Math.sqrt(1-x*x/a2)+0.5); 
        Write4Pixel(x,y);
    }
    checkColorStatus(1, "Polinomni algoritam");
    
}
function DA1_Algorithm(a, b)
{
    let ba,ab,x0,x1,y0,y1;
    let Dphi;
    Dphi=PI/180.0; 
    ba=Dphi*b/a; 
    ab=Dphi*a/b; 
    x0=a; 
    y0=0; 
    for (let j=0; j<90;j++)
    { 
        x1=x0-ab*y0; 
        y1=y0+ba*x0; 
        BresenhamLine(x0,y0,x1,y1);
        BresenhamLine(-x0,y0,-x1,y1); 
        BresenhamLine(x0,-y0,x1,-y1); 
        BresenhamLine(-x0,-y0,-x1,-y1); 
        x0=x1; y0=y1; 
    }
    checkColorStatus(2, "Diferencijalni algoritam I reda");
    
}
function DA2_Algorithm(a, b)
{
    let x0,x1,y0,y1,k; 
    k=PI/180.0; 
    x0=a; 
    y0=0; 
    x1=a*Math.cos(k); 
    y1=b*Math.sin(k); 
    k=2-k*k;
    for(let j=0; j<90;j++)
    { 
        BresenhamLine(x0,y0,x1,y1);
        BresenhamLine(-x0,y0,-x1,y1);
        BresenhamLine(x0,-y0,x1,-y1);
        BresenhamLine(-x0,-y0,-x1,-y1);
        let tmp_x=x0;
        let tmp_y=y0;
        x0=x1;
        y0=y1;
        x1=k*x1-tmp_x;
        y1=k*y1-tmp_y;
    }
    checkColorStatus(3, "Diferencijalni algoritam II reda"); 
}
function BresenhamLine(x0,y0,x1,y1)
{
    if(x0==x1)
        PlotLineVertical(x0,y0,y1);
    else
    {
        if (Math.abs(y1 - y0) < Math.abs(x1 - x0))
            if (x0 > x1)
                PlotLineLow(x1, y1, x0, y0);
            else
                PlotLineLow(x0, y0, x1, y1);
        else
            if (y0 > y1)
                PlotLineHigh(x1, y1, x0, y0);
            else
                PlotLineHigh(x0, y0, x1, y1);  
    }  
    
}
function PlotLineVertical(x0,y0,y1)
{
    let ystart,yend;
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

}
function PlotLineHorizontal(x0,x1,y0)
{
    let xstart,xend;
    if(x0<x1)
    {
        xstart=x0;
        xend=x1;
    }
    else
    {
        xstart=x1;
        xend=x0;
    }
    for (xstart; xstart <= xend; xstart++)   
    {      
        WritePixel(xstart, y0);   
    } 
}
function PlotLineHigh(x0,y0, x1,y1)
{
    let dx = x1 - x0;
    let dy = y1 - y0;
    let xi = 1;
    if (dx < 0)
    {    
        xi = -1;
        dx = -dx;
    }
    let D = 2*dx - dy;
    let x = x0;

    for (let y=y0; y<=y1; y++)
    {   
        WritePixel(x, parseInt(y));
        if (D > 0)
        {      
            x = x + xi;
            D = D - 2*dy;
        }
        D = D + 2*dx;
    }
}
function PlotLineLow(x0,y0, x1,y1)
{   let dx = x1 - x0;
    let dy = y1 - y0;
    let yi = 1
    if (dy < 0)
    {
        yi = -1
        dy = -dy
    }
    
    let D = 2*dy - dx
    let y = y0

    for(x=x0; x<=x1;x++)
    {
        WritePixel(x,parseInt(y));
        if (D > 0)
        {       
            y = y + yi;
            D = D - 2*dx;
        }
        D = D + 2*dy;
    }
}
function checkColorStatus(index, algorithm)
{
    if(legendOfEllipse[index]==0)
    {
        editLegend(algorithm);
        legendOfEllipse[index]=colorOfEllipse.value;
        colorOfEllipse.disabled=true;
    }

}
function Write4Pixel(x,y)
{
    WritePixel(x,y);
    WritePixel(-x,y);
    WritePixel(x,-y);
    WritePixel(-x,-y);

}
function WritePixel(x, y)
{
    var ctx = myCanvas.getContext("2d");
    ctx.beginPath();
    ctx.translate(myCanvas.width/2+(x-1),myCanvas.height/2-(y-1));
    ctx.rect((x-1),-(y-1),2,2);
    ctx.fillStyle = colorOfEllipse.value;
    ctx.fill();
    ctx.strokeStyle = colorOfEllipse.value;
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



