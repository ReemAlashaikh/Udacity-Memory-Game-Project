/*
 * Create a list that holds all of your cards
 */

 const deck = ['fa fa-diamond','fa fa-paper-plane-o','fa fa-anchor','fa fa-bolt','fa fa-cube','fa fa-anchor','fa fa-leaf','fa fa-bicycle','fa fa-diamond','fa fa-bomb','fa fa-leaf','fa fa-bomb','fa fa-bolt','fa fa-bicycle','fa fa-paper-plane-o','fa fa-cube'];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


const deckContainer = document.querySelector('.deck');
shuffle(deck);
start();
let openCardsArray = [];


function start(){
for (card of deck){
    
    //Displaying Cards

    const x = document.createElement('li');
    x.className = "card";
    x.innerHTML = `<i class = "${card}"></i>`;
    deckContainer.appendChild(x);
    
    //Open card when clicked

    x.addEventListener('click',function(){
        x.className = `card open show`;
        if(x !== openCardsArray[0]){
            openCardsArray.push(x);
            openCards(x);
        }
    })
    timer();
}
}

let moves = 0;
const movesElement = document.querySelector('.moves');

function openCards(card){
    
    //Check if cards match

    if(openCardsArray.length == 2){
        if(openCardsArray[0].innerHTML == openCardsArray[1].innerHTML){
            openCardsArray[0].className = 'card open show match disable'
            openCardsArray[1].className = 'card open show match disable'
            openCardsArray = [];
            if(document.querySelectorAll('.match').length == 16){
            EndOfGame();
            }
        }
        else{
            openCardsArray[0].className = 'card open show unmatched';
            openCardsArray[1].className = 'card open show unmatched';
            setTimeout(closeCard, 500);
        }
        moves++;
        movesElement.innerHTML = moves;
        rate();
    }
}

function closeCard(){
    openCardsArray[0].className = 'card';
    openCardsArray[1].className = 'card';
    openCardsArray = [];
}

const starRating = document.querySelector('.stars');

function RemoveStar(){
    starRating.removeChild(starRating.firstElementChild)
}
let rating = "3 Stars";
function rate(){
    if(moves == 12){
        RemoveStar();
        rating = "2 Stars";
    }
    if(moves == 15){
        RemoveStar();
        rating = "1 Star";
    }
    if(moves == 17){
        RemoveStar();
        rating = "No Stars";
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function EndOfGame() {
        confirm(`Congratulations! you have completed the game!
         Time: ${timerElement.innerHTML} Moves: ${moves} Rating: ${rating}! do you want to play again?`)    
}

const restart = document.querySelector('.restart')
restart.addEventListener('click',function(){
    moves = 0;
    movesElement.innerHTML = 0;
    deckContainer.innerHTML = "";
    start();
    timerElement.innerHTML = "00:00";
    openCardsArray = [];
    shuffle(deck);
})

let timerElement = document.querySelector('.timer');

function timer() {
    let minutes = 0;
    let seconds = 0;
    time = setInterval(function () {
        seconds = parseInt(seconds, 10) + 1;
        minutes = parseInt(minutes, 10);
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }

        seconds = seconds < 10 ? "0" + seconds : seconds;
        minutes = minutes < 10 ? "0" + minutes : minutes;

        timerElement.innerHTML = minutes + ":" + seconds;
    }, 1000);
}