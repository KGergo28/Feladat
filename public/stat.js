function oldalgener(stat){
    console.log(stat);
}

fetch('/stat')
    .then(function(válasz){
        válasz.json().then(oldalgener);
    })
