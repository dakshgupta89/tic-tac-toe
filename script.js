const cells = document.querySelectorAll('[data-cell]');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

let xTurn = true;
let gameActive = true;

const WIN_COMBINATIONS = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleClick(e) {
  const cell = e.target;
  const currentClass = xTurn ? 'X' : 'O';

  if (cell.textContent !== '' || !gameActive) return;

  cell.textContent = currentClass;

  if (checkWin(currentClass)) {
    messageElement.textContent = `${currentClass} Wins! 🎉`;
    gameActive = false;
  } else if (isDraw()) {
    messageElement.textContent = `It's a Draw! 🤝`;
    gameActive = false;
  } else {
    xTurn = !xTurn;
    messageElement.textContent = `${xTurn ? "X" : "O"}'s Turn`;
  }
}

function checkWin(player) {
  return WIN_COMBINATIONS.some(combination => {
    return combination.every(index => cells[index].textContent === player);
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

function restartGame() {
  cells.forEach(cell => cell.textContent = '');
  xTurn = true;
  gameActive = true;
  messageElement.textContent = "X's Turn";
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);

messageElement.textContent = "X's Turn";
