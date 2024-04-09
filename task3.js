const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
const submitButton = document.getElementById('submitButton');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const scoreDraw = document.getElementById('scoreDraw');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let scores = {
  X: 0,
  O: 0,
  draw: 0
};
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
function handleCellClick(event) {
  const clickedCell = event.target;
  const cellIndex = parseInt(clickedCell.getAttribute('id').substring(5));
  if (gameState[cellIndex] !== '' || !gameActive) {
    return;
  }
  gameState[cellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  checkWin();
  checkDraw();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
}
function checkWin() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] === gameState[b] && gameState[a] === gameState[c] && gameState[a] !== '') {
      status.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
      scores[currentPlayer]++;
      updateScores();
      handleRestart();
      return;
    }
  }
}
function checkDraw() {
  let draw = !gameState.includes('');
  if (draw && gameActive) {
    status.textContent = 'It\'s a draw!';
    gameActive = false;
    scores.draw++;
    updateScores();
    handleRestart();
  }
}
function handleRestart() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = '';
  });
}
function handleSubmit() {
  console.log(scores);
}
function updateScores() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
  scoreDraw.textContent = scores.draw;
}
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});
restartButton.addEventListener('click', handleRestart);
submitButton.addEventListener('click', handleSubmit);