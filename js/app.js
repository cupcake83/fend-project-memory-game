const deck = document.getElementById("card-deck");
let card = document.getElementsByClassName("card");
let cards = [...card];
let cardsOpen = [];


//
// MOVES && STARS
const stars = document.querySelectorAll(".fa-star");
let score = document.getElementsByClassName("score-panel");
let moves = 0;
let counter = document.querySelector(".moves");

function moveCounter () {
    moves++;
    counter.innerHTML = moves;
    if (moves === 1) {
        second = 0;
        minute = 0;
        hour = 0;
        beginTimer();
    }
    if (moves > 7 && moves < 13){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
                }
            }
        }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
    }
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


// congratulations
let modal = document.getElementById("complete-modal");
let closeicon = document.querySelector(".close");
 
function congratulations(){
  if (cardMatch.length == 16){
      clearInterval(interval);
      finalTime.innerText = timer.innerHTML;
      counter.innerHTML = moves;
      finalStars.innerHTML = starRating;
      modal.classList.add("show");

      let starRating = document.querySelector(".stars").innerHTML;
        //showing move, rating, time on modal
      document.getElementById("counter").innerHTML = moves;
      document.getElementById("starRating").innerHTML = starRating;
      document.getElementById("timer").innerHTML = finalTime;

        //closeicon on modal
      closeModal();
  };
}
function closeModal(){
  closeicon.addEventListener("click", function(){
    modal.classList.remove("show");
    startGame();
  });
}


 function playAgain(){
  modal.classList.remove("show");
  startGame();
}


// TIMER
let second = 0;
let minute = 0;
let hour = 0;
let timer = document.querySelector(".timer");
let interval;

function beginTimer() {
  let interval = setInterval(function () {
    timer.innerHTML = minute + "mins " +second + "secs";
    second++;
    if (second == 60) {
        minute++;
        second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  },1000);
}


// START GAME
document.body.onload = startGame();


function startGame(){
  cards = shuffle(cards);
  for (let i = 0; i < cards.length; i++) {
    deck.innerHTML = "";
    [].forEach.call(cards, function(item) {
      deck.appendChild(item);
    });
    cards[i].classList.remove("show", "open", "match", "disabled");
  }
    moves = 0;
    counter.innerHTML = moves;
    // reset rating
  for (let i= 0; i < stars.length; i++){
      stars[i].style.color = "#FFD700";
      stars[i].style.visibility = "visible";
  }
  second = 0;
  minute = 0;
  hour = 0;
  let timer = document.querySelector(".timer");
  timer.innerHTML = "0 mins 0 secs";
  clearInterval(interval);
}
  let showCard = function (){
  this.classList.toggle("show");
};


// MATCHED/UNMATCHED
let cardMatch = document.getElementsByClassName("match");


function matched(){
  cardsOpen[0].classList.add("match");
  cardsOpen[1].classList.add("match");
  cardsOpen[0].classList.remove("open", "show");
  cardsOpen[1].classList.remove("open", "show");
  cardsOpen = [];
}


function unmatched(){
  cardsOpen[0].classList.add("unmatched");
  cardsOpen[1].classList.add("unmatched");
  setTimeout(function(){
      cardsOpen[0].classList.remove("unmatched","show","open","no-click");
      cardsOpen[1].classList.remove("unmatched","show","open","no-click");
      cardsOpen = [];
  },700);
}


// OPEN SHOW DISABLED
function openCard() {
  cardsOpen.push(this);
  let len = cardsOpen.length;
  this.classList.add("open","show","no-click");
  if(len === 2) {
    moveCounter();
    if(cardsOpen[0].isEqualNode(cardsOpen[1])){
      matched();
    } else {
      unmatched();
    }
  }
};


function enable(){
Array.prototype.filter.call(cards, function(card){
   card.classList.remove('disabled');
       
    for(let i = 0; i < cardMatch.length; i++){
        cardMatch[i].classList.add("disabled");
    }
  });
}
function disable(){
Array.prototype.filter.call(cards, function(card){
    card.classList.add('disabled');
    });
}


// LISTENERS
for (let i = 0; i < cards.length; i++) {
    card = cards[i];
    cards[i].addEventListener("click", showCard);
    cards[i].addEventListener("click", openCard);
    cards[i].addEventListener("click",congratulations);
};


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
