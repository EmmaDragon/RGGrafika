const btnSumbit=document.getElementById("submition");
const contentOfPage= document.getElementById("divContent");


btnSumbit.onclick = (ev) => checkAnswers(ev);

function checkAnswers(ev)
{
    let trueAnswers = document.querySelectorAll("input[name='trueAnswer']:checked");
    let points=trueAnswers.length;
    let content = "";
    if(points<5)
    {
        //tuzan coveculjak
        content += "<h4 class='subcontent-title' id='quickstart'><span>Rezultati testa znanja</span></h4>";
        content +="<p style='font-size:large;'>Poštovani, <br> Osvojili ste ukupno <strong> "+points+"</strong> poena.<br> PS: Obratite malo više pažnje na rasterizaciju grafičkih primitivi.</p>"

    }
    else if(points == 5)
    {
        //onako
        content += "<h4 class='subcontent-title' id='quickstart'><span>Rezultati testa znanja</span></h4>";
        content +="<p style='font-size:large;'>Poštovani, <br> Osvojili ste ukupno <strong> "+points+"</strong> poena.<br>PS: Nije loše, ali obratite malo više pažnje na rasterizaciju grafičkih primitivi.</p>"

    }
    else
    {
        //srecan coveculjak
        content += "<h4 class='subcontent-title' id='quickstart'><span>Rezultati testa znanja</span></h4>";
        content +="<p style='font-size:large;'>Poštovani, <br> Osvojili ste ukupno <strong> "+points+"</strong> poena.<br> PS: Odlično ste savladali ovu oblast.</p>"
    }
    contentOfPage.innerHTML =content;
    
    
}
