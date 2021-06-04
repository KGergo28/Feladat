const eredmeny = document.getElementById('eredmeny');
function berak(elem){
    const p = document.createElement('p');
    p.innerText = elem.nev + ": " + elem.szavazatok;
    eredmeny.appendChild(p);
}

function oldalgener(stat){
    console.log(stat);

    stat.forEach(berak);
}

fetch('/stat')
    .then(function(válasz){
        válasz.json().then(oldalgener);
    })
