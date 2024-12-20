const board = document.getElementById('board');  
const resetButton = document.getElementById('resetButton');  
const message = document.getElementById('message');  

let currentPlayer = 'X';  
let gameState = ['', '', '', '', '', '', '', '', ''];  
let gameActive = true;  

// Function to handle cell click  
function handleCellClick(event) {  
    const clickedCell = event.target;  
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));  

    if (gameState[clickedCellIndex] !== '' || !gameActive) {  
        return;  
    }  

    handlePlayerPlay(clickedCell, clickedCellIndex);  
    checkWinner();  
}  

// Function to handle player play  
function handlePlayerPlay(clickedCell, clickedCellIndex) {  
    gameState[clickedCellIndex] = currentPlayer;  
    clickedCell.innerText = currentPlayer;  
}  

// Function to check the winner  
function checkWinner() {  
    const winningConditions = [  
        [0, 1, 2],  
        [3, 4, 5],  
        [6, 7, 8],  
        [0, 3, 6],  
        [1, 4, 7],  
        [2, 5, 8],  
        [0, 4, 8],  
        [2, 4, 6],  
    ];  

    let roundWon = false;  
    for (let i = 0; i < winningConditions.length; i++) {  
        const [a, b, c] = winningConditions[i];  
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {  
            continue;  
        }  
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {  
            roundWon = true;  
            break;  
        }  
    }  

    if (roundWon) {  
        message.innerText = `Player ${currentPlayer} wins!`;  
        gameActive = false;  
        return;  
    }  

    if (!gameState.includes('')) {  
        message.innerText = "It's a draw!";  
        gameActive = false;  
        return;  
    }  

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';  
}  

// Function to reset the game  
function resetGame() {  
    gameActive = true;  
    currentPlayer = 'X';  
    gameState = ['', '', '', '', '', '', '', '', ''];  
    message.innerText = '';  

    const cells = document.querySelectorAll('.cell');  
    cells.forEach(cell => {  
        cell.innerText = '';  
    });  
}  

// Create the cells for the board  
function createBoard() {  
    for (let i = 0; i < 9; i++) {  
        const cell = document.createElement('div');  
        cell.classList.add('cell');  
        cell.setAttribute('data-cell-index', i);  
        cell.addEventListener('click', handleCellClick);  
        board.appendChild(cell);  
    }  
}  

createBoard();  
resetButton.addEventListener('click', resetGame);
