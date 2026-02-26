const buttons = document.querySelectorAll(".choice-button");
const userMoveText = document.getElementById("user-move");
const computerMoveText = document.getElementById("computer-move");
const resultText = document.getElementById("result");
const scoreText = document.getElementById("score");
const resetBtn = document.getElementById("reset");

let score = JSON.parse(localStorage.getItem("Score")) || {
  win: 0,
  lost: 0,
  tie: 0
};

updateScoreDisplay();

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const userMove = button.dataset.choice;
    playGame(userMove);
  });
});

resetBtn.addEventListener("click", () => {
  localStorage.clear();
  score = { win:0, lost:0, tie:0 };
  updateScoreDisplay();
  resultText.textContent = "";
  userMoveText.textContent = "";
  computerMoveText.textContent = "";
});

function playGame(userMove) {
  const computerMove = generateComputerChoice();
  const result = getResult(userMove, computerMove);

  userMoveText.textContent = `You chose: ${userMove}`;
  computerMoveText.textContent = `Computer chose: ${computerMove}`;
  resultText.textContent = result;

  localStorage.setItem("Score", JSON.stringify(score));
  updateScoreDisplay();
}

function generateComputerChoice() {
  const choices = ["Bat", "Ball", "Stump"];
  return choices[Math.floor(Math.random() * 3)];
}

function getResult(user, comp) {

  if (user === comp) {
    score.tie++;
    return "It's a Tie!";
  }

  if (
    (user === "Bat" && comp === "Ball") ||
    (user === "Ball" && comp === "Stump") ||
    (user === "Stump" && comp === "Bat")
  ) {
    score.win++;
    return "You Won!";
  } else {
    score.lost++;
    return "Computer Won!";
  }
}

function updateScoreDisplay() {
  scoreText.textContent = `Wins: ${score.win} | Losses: ${score.lost} | Ties: ${score.tie}`;
}