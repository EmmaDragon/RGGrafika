const btnGenerate = document.getElementById("generate");
const startPointX = document.getElementById("startPointX");
const startPointY = document.getElementById("startPointY");
const endPointX = document.getElementById("endPointX");
const endPointY = document.getElementById("endPointY");
const myCanvas = document.getElementById("myCanvas");
const algorithm = document.getElementById("selectAlgorithm");
const width = document.getElementById("width");
const height = document.getElementById("height");

width.innerHTML+="<strong>"+parseInt(myCanvas.width/4)+"</strong>";
height.innerHTML+="<strong>"+parseInt(myCanvas.height/4)+"</strong>";

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
                    IA_Algorithm(startPointX.valueAsNumber,startPointY.valueAsNumber,endPointX.valueAsNumber,endPointY.valueAsNumber);
                else if(algorithm.value == "BA")
                        BA_Algorithm(startPointX.valueAsNumber,startPointY.valueAsNumber,endPointX.valueAsNumber,endPointY.valueAsNumber);
                        else if(algorithm.value == "MA")
                                MA_Algorithm(startPointX.valueAsNumber,startPointY.valueAsNumber,endPointX.valueAsNumber,endPointY.valueAsNumber);

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
        PlotLineVertical(x0,y0,y1);
    }  
    m  = dy/dx;  
    b  = y1 -m*x1;
    for (xend; xend >= x; xend--)   
    {    
        y = m*xend + b;    
        WritePixel(xend, parseInt(y));   
    } 
   
}
function IA_Algorithm(x0,y0,x1,y1)
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
        y=y0;
    } 
    else if(x0>x1)
    {
        x=x1;
        xend=x0;
        y=y1;
    }
    else
    {
        PlotLineVertical(x0,y0,y1); 
    }  
    m  = dy/dx;  
    for (x; x<=xend; x++)   
    {       
        WritePixel(x, parseInt(y)); 
        y += m;   
    } 
    
}
function BA_Algorithm(x0,y0,x1,y1)
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
function PlotLineMidpoint(x0,y0,x1,y1)
{
	let	y,x,dy,dx,sx,sy;
	let	decision,incE,incNE;

	dx = x1 - x0;
	dy = y1 - y0;

	sx = Math.sign(dx);
	sy = Math.sign(dy);

	dx = Math.abs(dx);
	dy = Math.abs(dy);

	if(dy > dx)
	{	
		incE = 2 * dx;
		incNE = 2 * dx - 2 * dy;
		decision = 2 * dy - dx;

		x = x0;
		y = y0;
		do{
			WritePixel(x, parseInt(y));
			if(decision <= 0)
				decision += incE;
			else{
				decision += incNE;
				x += sx;	
			}
			y += sy;
		}while(y != y1);
    }
    else
    {
		incE = 2 * dy;
		incNE = 2 * dy - 2 * dx;
		decision = 2 * dy - dx;

		x = x0;
		y = y0;
		do{
			WritePixel(x,parseInt(y));
			if(decision <= 0)
				decision += incE;
			else{
				decision += incNE;
				y += sy;
			}
			x += sx;
		}while(x != x1);
	}
}
function MA_Algorithm(x0,y0,x1,y1)
{
    if(x0==x1)
        PlotLineVertical(x0,y0,y1);
    else if(y0==y1) 
        PlotLineHorizontal(x0,x1,y0);
    else
        PlotLineMidpoint(x0,y0,x1,y1);
  
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



