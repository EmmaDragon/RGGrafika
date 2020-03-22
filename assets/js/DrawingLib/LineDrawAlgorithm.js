const btnGenerate = document.getElementById("generate");
const startPointX = document.getElementById("startPointX");
const startPointY = document.getElementById("startPointY");
const endPointX = document.getElementById("endPointX");
const endPointY = document.getElementById("endPointY");
const myCanvas = document.getElementById("myCanvas");

btnGenerate.onclick = (ev) => drawLine(ev);

function drawLine(ev)
{
    if(!validation())
    {
        alert("Koordinate početne i krajnje tačke moraju biti celi brojevi!");
    }
    else
    {
        alert("Ok!");

    }
}
function validation()
{
    
}