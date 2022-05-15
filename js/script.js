let score = sessionStorage.getItem("score")
  ? sessionStorage.getItem("score")
  : 0;
const scoreContainer = $(".header-score-value");
const rulesCloseButtons = $(".rules-close");
const rulesOpenButton = $(".footer-button");
const rules = $(".rules");
const choosingOptions = ["rock", "paper", "scissors"];
let userChoice;
let computerChoice;
let winner;

rulesOpenButton.on("click", function () {
  rules.css("display", "flex").hide().fadeIn();
});

rulesCloseButtons.on("click", function () {
  rules.fadeOut();
});

function computerChooses() {
  let random = Math.floor(Math.random() * 3);
  computerChoice = choosingOptions[random];
}

function resetGame() {
  $(".result").fadeOut(500, function () {
    $(this).remove();

    $(".header").after(function () {
      return `<div class="game">
            <div class="game-button-container">
                <button class="game-button paper" id="paper">
                    <img src="img/icon-paper.svg" alt="paper">
                </button>
            </div>
            <div class="game-button-container">
                <button class="game-button scissors" id="scissors">
                    <img src="img/icon-scissors.svg" alt="paper">
                </button>
            </div>
            <div class="game-button-container">
                <button class="game-button rock" id="rock">
                    <img src="img/icon-rock.svg" alt="paper">
                </button>
            </div>
            <div class="game-line">
                <img src="img/bg-triangle.svg" alt="" class="game-line-pic">
            </div>
        </div>`;
    });
    $(".game").hide().fadeIn(400, activateButtons);
  });
}

function determineTheWinner() {
  if (userChoice === computerChoice) {
    winner = "draw";
  } else if (userChoice === "rock" && computerChoice === "scissors") {
    winner = "user";
  } else if (userChoice === "rock" && computerChoice === "paper") {
    winner = "computer";
  } else if (userChoice === "paper" && computerChoice === "scissors") {
    winner = "computer";
  } else if (userChoice === "paper" && computerChoice === "rock") {
    winner = "user";
  } else if (userChoice === "scissors" && computerChoice === "rock") {
    winner = "computer";
  } else if (userChoice === "scissors" && computerChoice === "paper") {
    winner = "user";
  }
}

function changeScore() {
  if (winner === "user") {
    score++;
    scoreContainer.fadeOut(500, function () {
      $(this).text(score).fadeIn(500);
    });
  } else if (winner === "computer") {
    score ? score-- : score;
    scoreContainer.fadeOut(500, function () {
      $(this).text(score).fadeIn(500);
    });
  }
  sessionStorage.setItem("score", score);
}

function showResult() {
  $(".game").fadeOut(500, function () {
    $(this).remove();
    let onScreenText;
    if (winner === "user") {
      onScreenText = "You win";
    } else if (winner === "computer") {
      onScreenText = "You lose";
    } else {
      onScreenText = "Draw!";
    }
    $(".header").after(function () {
      return `        <div class="result">
            <div class="result-picked">
                <div class="result-picked-icon ${userChoice}">
                    <img src="img/icon-${userChoice}.svg" alt="${userChoice}">
                </div>
                <p class="result-picked-text">You picked</p>
            </div>
            <div class="result-picked">
                <div class="result-picked-icon ${computerChoice}">
                    <img src="img/icon-${computerChoice}.svg" alt="${computerChoice}">
                </div>
                <p class="result-picked-text">The house picked</p>
            </div>
            <div class="result-text">
                <h2 class="result-text-announcement">${onScreenText}</h2>
                <button class="result-text-again">Play Again</button>
            </div>
        </div>
`;
    });
    $(".result")
      .hide()
      .fadeIn(400, function () {
        $(".result-text-again").on("click", startGame);
      });
  });
}

function activateButtons() {
  $(".game-button").on("click", function (event) {
    computerChooses();
    userChoice = event.currentTarget.id;
    determineTheWinner();
    changeScore();
    console.log("winner is", winner);
    console.log("user choise is", userChoice);
    console.log("computer choice is", computerChoice);
    showResult();
  });
}

function startGame() {
  resetGame();
  scoreContainer.text(score);
  activateButtons();
}

startGame();
