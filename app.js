const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const inp1 = document.querySelector('#userInput');
const inp2 = document.querySelector('#userInput2');
const inp3 = document.querySelector('#userInput3');
const inp4 = document.querySelector('#userInput4');
const facts = document.querySelector('div ul');

BASE_URL = 'http://numbersapi.com/';

btn1.addEventListener("click", async function (e) {
    const number = e.target.parentElement.children[2].value;
    console.log("before request");
    const prom = await axios.get(BASE_URL + number + '/trivia?json');
    console.log("After request wich is:", prom)
    let newLi = document.createElement("li");
    newLi.innerText = prom.data.text
    facts.append(newLi)
    let newhr = document.createElement("hr");
    facts.append(newhr);
});




btn2.addEventListener("click", async function (e) {
    const number1 = e.target.parentElement.children[2].value;
    const number2 = e.target.parentElement.children[3].value;
    const prom = await axios.get(BASE_URL + number1 + '..' + number2);
    console.log(prom);
    for (let fact in prom.data) {
        let newLi = document.createElement("li");
        newLi.innerText = prom.data[fact];
        facts.append(newLi);
    }
    let newhr = document.createElement("hr");
    facts.append(newhr);
});




btn3.addEventListener("click", async function (e) {
    let fourNumberfacts = [];
    console.log(e.target.parentElement.children[2].value);
    const number = e.target.parentElement.children[2].value;
    for (let i = 1; i < 5; i++) {
        console.log(`${BASE_URL}${number}`)
        fourNumberfacts.push(await axios.get(`${BASE_URL}${number}?json`))
    }

    Promise.all(fourNumberfacts)
        .then((factsArray) => {
            factsArray.forEach(p => {
                let newLi = document.createElement("li");
                newLi.innerText = p.data.text;
                facts.append(newLi);
            })

        })
        .catch(err => console.log(err));
    let newhr = document.createElement("hr");
    facts.append(newhr);

});



let BASE_URL2= "http://deckofcardsapi.com/api/deck/"
let btn4 = document.getElementById("newDeck");
let btn5 = document.getElementById("newCard");
let cardDiv = document.getElementById("cards");

btn4.addEventListener("click", async function(e){
    localStorage.removeItem("deck_id");
    let promise1 = await axios.get(BASE_URL2 + "new/shuffle/?deck_count=1");
    console.log(promise1.data.deck_id);
    let deckId = promise1.data.deck_id;
    localStorage.setItem("deck_id", deckId);
    btn4.style.display = "none";
    btn5.style.display = "inline";
    let promise12 = await axios.get(BASE_URL2 + deckId + "/draw/?count=1")
    console.log(promise12);
    console.log(`your card is ${promise12.data.cards[0].value} of ${promise12.data.cards[0].suit}, from deck ${promise12.data.deck_id}`);
    let img = document.createElement("img");
    img.setAttribute("src", promise12.data.cards[0].image);
    cardDiv.appendChild(img);

    })
    


btn5.addEventListener("click", async function (){
    let deckId = localStorage.getItem("deck_id");
    let p = await axios.get(BASE_URL2 + deckId + "/draw/?count=1");
    console.log(`your card is ${p.data.cards[0].value} of ${p.data.cards[0].suit}, from deck ${p.data.deck_id}`);
    let img = document.createElement("img");
    img.setAttribute("src", p.data.cards[0].image);
    cardDiv.appendChild(img);
    });

