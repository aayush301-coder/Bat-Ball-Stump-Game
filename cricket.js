let score = JSON.parse(localStorage.getItem("Score")) || {
  win: 0,
  lost: 0,
  tie: 0
};

updateScoreDisplay();

function generateComputerChoice() {
  const choices = ["Bat", "Ball", "Stump"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function getResult(userMove, computerMove) {

  if (userMove === computerMove) {
    score.tie++;
    return "It's a Tie!";
  }

  const winConditions = {
    Bat: "Ball",
    Ball: "Stump",
    Stump: "Bat"
  };

  if (winConditions[userMove] === computerMove) {
    score.win++;
    return "You Won!";
  } else {
    score.lost++;
    return "Computer Won!";
  }
}

function showResult(userMove, computerMove, resultMsg) {

  document.querySelector("#user-move").innerText =
    `You chose: ${userMove}`;

  document.querySelector("#computer-move").innerText =
    `Computer chose: ${computerMove}`;

  document.querySelector("#result").innerText = resultMsg;

  localStorage.setItem("Score", JSON.stringify(score));
  updateScoreDisplay();
}

function updateScoreDisplay() {
  document.querySelector("#score").innerText =
    `Wins: ${score.win} | Losses: ${score.lost} | Ties: ${score.tie}`;
}

function resetScore() {
  score = { win: 0, lost: 0, tie: 0 };
  localStorage.setItem("Score", JSON.stringify(score));
  updateScoreDisplay();

  document.querySelector("#user-move").innerText = "";
  document.querySelector("#computer-move").innerText = "";
  document.querySelector("#result").innerText = "";
}
document.querySelectorAll(".choice-button").forEach(button => {
  button.addEventListener("click", () => {
    const userMove = button.dataset.choice;
    const computerChoice = generateComputerChoice();
    const result = getResult(userMove, computerChoice);
    showResult(userMove, computerChoice, result);
  });
});

document.getElementById("reset").addEventListener("click", resetScore);