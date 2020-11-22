'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const name0E1 = document.querySelector('#name--0');
const name1E1 = document.querySelector('#name--1');

var scores, roundScores, activePlayer, playing;

newGame();

function newGame() {
    playing = true;
    scores = [0, 0];
    roundScores = 0;
    activePlayer = 0;
    diceEl.style.display = "none";
    score0El.textContent = scores[0];
    score1El.textContent = scores[1];
    current1El.textContent = roundScores;
    current0El.textContent = roundScores;
    name0E1.textContent = 'Player 1';
    name1E1.textContent = 'Player 2';
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.remove('player--active');
    player1El.classList.remove('player--active');
    player0El.classList.add('player--active');

}

function dieRoll() {
    if (playing) {
        var dice = Math.floor(Math.random() * 6) + 1;
        diceEl.style.display = "block";
        console.log(dice);
        diceEl.setAttribute('src', "dice-" + dice + ".png");
        if (dice == 1) {
            nextPlayer();
        }
        else {
            roundScores += dice;
            document.querySelector('#current--' + activePlayer).textContent = roundScores;
        }
    }
}

function hold() {
    if (playing) {
        scores[activePlayer] += roundScores;
        document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 100) {
            playing = false;
            diceEl.style.display = "none";
            document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
            if (activePlayer === 0)
                player1El.classList.add('player--winner');
            else
                player0El.classList.add('player--winner');

        }
        else
            nextPlayer();
    }
}

function nextPlayer() {
    roundScores = 0;
    document.querySelector('#current--' + activePlayer).textContent = roundScores;
    document.querySelector('.player--' + activePlayer).classList.remove('player--active');
    activePlayer = activePlayer == 0 ? 1 : 0;
    document.querySelector('.player--' + activePlayer).classList.add('player--active');
    diceEl.style.display = "none";
}