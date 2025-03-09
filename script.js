// script.js
const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');
const resultScreen = document.getElementById('resultScreen');
const resultMessage = document.getElementById('resultMessage');
const newGameButton = document.getElementById('newGameButton');
const gameContainer = document.getElementById('gameContainer');

let currentPlayer = 'X';
let gameBoard = Array(9).fill('');

function renderBoard() {
    board.innerHTML = '';
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => makeMove(index));
        if (cell) cellElement.classList.add('taken');
        board.appendChild(cellElement);
    });
}

function makeMove(index) {
    if (gameBoard[index] === '') {
        gameBoard[index] = currentPlayer;
        renderBoard();
        if (checkWinner()) {
            showResult(`${currentPlayer} wins!`);
        } else if (gameBoard.every(cell => cell !== '')) {
            showResult("It's a draw!");
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function showResult(result) {
    resultMessage.textContent = result;
    gameContainer.style.display = 'none';
    resultScreen.style.display = 'block';
}

function resetGame() {
    gameBoard.fill('');
    currentPlayer = 'X';
    message.textContent = '';
    renderBoard();
    resultScreen.style.display = 'none';
    gameContainer.style.display = 'block';
}

resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', resetGame);
document.addEventListener('DOMContentLoaded', renderBoard);
