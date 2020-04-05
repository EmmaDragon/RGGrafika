const btnSumbit=document.getElementById("submition");
const contentOfPage= document.getElementById("divContent");
const psDiv = document.getElementById("PS_div");
const okBtn = document.getElementById("okButton");


btnSumbit.onclick = (ev) => checkAnswers(ev);
okBtn.onclick = (ev) => refreshPage(ev);

function refreshPage(ev)
{
    location.reload();
}
function checkAnswers(ev)
{
    let trueAnswers = document.querySelectorAll("input[name='trueAnswer']:checked");
    let points=trueAnswers.length;
    let content = "";
    let psContent="";
    if(points<5)
    {
        content +="<p style='font-size:large;'>Poštovani, <br>Niste baš najbolje savladali predviđeno gradivo. <br> Osvojili ste ukupno <strong style='color:red'> "+points+"/10</strong> poena.</p>"
        psContent +="PS: Obratite <strong style='color:red'>više</strong> pažnje na rasterizaciju grafičkih primitivi!";
    }
    else if(points == 5)
    {
        content +="<p style='font-size:large;'>Poštovani, <br>Solidno ste savladali predviđeno gradivo.<br> Osvojili ste ukupno <strong style='color:orange'> "+points+"/10</strong> poena.</p>";
        psContent += "PS: Nije loše, ali obratite <strong style='color:orange'>malo više</strong> pažnje na rasterizaciju grafičkih primitivi.";
    }
    else
    {
        content +="<p style='font-size:large;'>Poštovani, <br>Uspešno ste savladali predviđeno gradivo.<br> Osvojili ste ukupno <strong style='color:#78f542'> "+points+"/10</strong> poena.</p>";
        psContent +="PS: <strong style='color:#78f542'>Veoma uspešno</strong> ste savladali ovu oblast.";
    }
    contentOfPage.innerHTML =content;
    psDiv.innerHTML = psContent;
    $("#myModal").modal('show');
    
}
