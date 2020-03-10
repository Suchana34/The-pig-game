/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var totalScore, player, currentScore, gamePlaying=true;

function new_game() {
  totalScore = [0, 0];
  currentScore = 0;
  player = 0;

  document.getElementById("popup").style.display = 'none';
  
  document.querySelector("#score-0").textContent = 0;
  document.querySelector("#score-1").textContent = 0;
  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;
  document.querySelector(".dice").style.display = "none";

  document.getElementById("name-0").textContent = "PLAYER 1";
  document.getElementById("name-1").textContent = "PLAYER 2";
  document.getElementById("alertround").textContent = "LET'S BEGIN";
}

function switchPlayer() {
  currentScore = 0;
  document.querySelector("#current-" + player).textContent = 0;

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.getElementById("alertround").textContent =
    "PLAYER-" + (player + 1) + " TURN OVER";
  player === 0 ? (player = 1) : (player = 0);
}

new_game();

document.querySelector(".btn-new").addEventListener("click", new_game);

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    var dice = Math.floor(Math.random() * 6) + 1; //generates integer from 1 to 6
    var diceDOM = document.querySelector(".dice");

    document.querySelector("#current-" + player).textContent = dice;
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    if (dice !== 1) {
      document.getElementById("alertround").textContent = "";
      currentScore += dice;
      document.querySelector("#current-" + player).textContent = currentScore;
      checkWinner();
    } else {
      //turn for the next player
      switchPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    totalScore[player] += currentScore;
    document.querySelector("#score-" + player).textContent = totalScore[player];

    if (totalScore[player] >= 100) {
      document.getElementById("alertround").textContent =
        "WINNER IS PLAYER-" + (player + 1) + " CONGRATS. START A NEW GAME";
      document.getElementById("name-" + player).textContent = "WINNER !!";
      gamePlaying = false;

    } else {
      switchPlayer();
    }
  }
});

document.querySelector(".btn-rules").addEventListener("click", function(){
    var popup = document.getElementById("popup");
    
    popup.style.display = 'block';
    popup.classList.add("popup","wrapper","show");

});


document.querySelector(".btn-close").addEventListener("click", function(){
    var popup = document.getElementById("popup");
    popup.style.display = 'none';

    popup.classList.remove("popup","wrapper","show");
});
