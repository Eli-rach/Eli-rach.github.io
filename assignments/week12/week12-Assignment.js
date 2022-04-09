document.getElementById('js-new-quote').addEventListener('click', generateQuote);
const endpoint = "https://www.dnd5eapi.co/api/monsters";

function generateQuote(){
    
    console.log("Monster button was clicked");
    fetch(endpoint)
    .then((data) => data.json())
    .then((data) => {
        let randomNum =  Math.floor(Math.random() * data.count);
        let choice = data.results[randomNum];
        console.log(choice);
        fetch("https://www.dnd5eapi.co"+choice.url)
        .then((monster)=> monster.json())
        .then((monster)=>{
            document.getElementById("js-quote-text").innerHTML = monster.name;
        }).catch((error)=>{
            console.log(error);
        })
    }).catch((error)=>{
        console.log(error);
    });    
}

function displayQuote(quote){
    const quoteTExt = document.getElementById("js-quote-text");
    quoteTExt.textContent = quote;
}