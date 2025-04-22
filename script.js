let statusDisplay = document.querySelector('.gameStatus');
let button = document.querySelector('.restartGame');
let currentPlayer = 'X';
let gameInput = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let winList = document.getElementById('winList');

// Message templates
const winningMessage = () => `Player ${currentPlayer} has won`;
const drawMessage = () => `The game is a draw`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerText = currentPlayerTurn();

// Add event listeners to each cell and restart button
document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener('mousedown', handleMouseDown); // Highlight on press
    cell.addEventListener('mouseup', handleMouseUp);     // Revert color on release
    cell.addEventListener('click', handleCellClick);     // Handle move
});
button.addEventListener('click', handleButtonClick);

// Temporary visual feedback when mouse is pressed
function handleMouseDown(e) {
    const cell = e.target;
    if (cell.innerHTML === "" && gameActive) {
        cell.style.backgroundColor = "grey";
    }
}

// Revert background color after releasing the mouse
function handleMouseUp(e) {
    const cell = e.target;
    if (cell.innerHTML === "" && gameActive) {
        cell.style.backgroundColor = "black";
    }
}

// Handles each player's move
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameInput[clickedCellIndex] !== "" || !gameActive) {
        return; // Ignore if already filled or game over
    }

    handlePlayedCell(clickedCell, clickedCellIndex);
    handleGameResult();
}

// Updates the cell and game state
function handlePlayedCell(clickedCell, clickedCellIndex) {
    gameInput[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

// All winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

// Checks win/draw/continue logic
function handleGameResult() {
    let roundWon = false;

    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameInput[winCondition[0]];
        let b = gameInput[winCondition[1]];
        let c = gameInput[winCondition[2]];

        if (a === "" || b === "" || c === "") continue;

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        statusDisplay.innerText = winningMessage();
        handleWinList(); // Update win history
        return;
    }

    // If board is full, it's a draw
    let roundDraw = !gameInput.includes("");
    if (roundDraw) {
        statusDisplay.innerText = drawMessage();
        gameActive = false;
        return;
    }

    // No win/draw yet, switch turn
    handlePlayerChange();
}

// Adds the winner to the result list
function handleWinList() {
    const listItem = document.createElement('li');
    listItem.textContent = `Player ${currentPlayer}`;
    winList.appendChild(listItem);
}

// Switches player
function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerText = currentPlayerTurn();
}

// Restarts the game
function handleButtonClick() {
    gameActive = true;
    gameInput = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = 'X';
    statusDisplay.innerText = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}
