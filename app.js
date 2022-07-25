"use strict";
// Establishing the elements
const player0 = document.querySelector(".player0");
const player1 = document.querySelector(".player1");
const score0 = document.getElementById("score0");
const score1 = document.getElementById("score1");
const current0 = document.getElementById("current0");
const current1 = document.getElementById("current1");
const modal = document.querySelector(".rules_container");
const overlay = document.querySelector(".overlay");
// Btn
const diceEl = document.querySelector(".dice");
const newGame = document.querySelector(".new_game");
const diceBtn = document.querySelector(".dice-btn");
const hold = document.querySelector(".hold");
const rules = document.querySelector(".rules_container");
const btnShowModal = document.querySelector(".btn_rules");
const btnCloseModal = document.querySelector(".btn_close");

let activePlayer, current, scores, playing;
// Values per deffect
const init = function () {
  scores = [0, 0];
  current = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  diceEl.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  player0.style.border = "2px solid #000";
  player1.style.border = "2px solid transparent";
};
init();
// Switch the Player
const switchPlayer = () => {
  document.getElementById(`current${activePlayer}`).textContent = 0;
  current = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  const player0Styles = player0.classList.toggle("player--active");
  const player1Styles = player1.classList.toggle("player--active");
  if (player0Styles) {
    player0.style.border = "2px solid #000";
  } else {
    player0.style.border = "2px solid transparent";
  }
  if (player1Styles) {
    player1.style.border = "2px solid #000";
  } else {
    player1.style.border = "2px solid transparent";
  }
};
// Btn Roll Dice
diceBtn.addEventListener("click", () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `./img/dice-${dice}.png`;

    if (dice !== 1) {
      current += dice;
      document.getElementById(`current${activePlayer}`).textContent = current;
    } else {
      diceEl.classList.add("hidden");
      switchPlayer();
    }
  }
});

// Hold btn - Keep the value and change the player
hold.addEventListener("click", () => {
  if (playing) {
    scores[activePlayer] += current;
    document.getElementById(`score${activePlayer}`).textContent =
      scores[activePlayer];
    diceEl.classList.add("hidden");

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player${activePlayer}`)
        .classList.remove("player--winner");
      document
        .querySelector(`.player_${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

// BTN RULES
const showModal = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
btnShowModal.addEventListener("click", showModal);
btnCloseModal.addEventListener("click", closeModal);

// New game
newGame.addEventListener("click", init);
