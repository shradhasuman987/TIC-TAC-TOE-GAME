// Selecting all cells, status message, and reset button
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const resetButton = document.querySelector("#reset");

// Variables to track the game state
let currentPlayer = "X"; // Player X starts the game
let gameBoard = ["", "", "", "", "", "", "", "", ""]; // Empty board
let gameActive = true; // Game status

// Winning combinations (rows, columns, diagonals)
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]  // Diagonals
];

// Function to handle a cell click
const cellClicked = (event) => {
    const cell = event.target;
    const cellIndex = cell.getAttribute("data-index");

    // If cell is already filled or game is over, do nothing
    if (gameBoard[cellIndex] !== "" || !gameActive) {
        return;
    }

    // Update board state and UI
    gameBoard[cellIndex] = currentPlayer;
    cell.innerText = currentPlayer;
    cell.classList.add("taken"); // Prevents further clicks

    // Check for a winner or draw
    checkResult();
};

// Function to check for a winner or draw
const checkResult = () => {
    let roundWon = false;

    // Check all winning combinations
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];

        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.innerText = `Player ${currentPlayer} Wins! 🎉`;
        gameActive = false;
        return;
    }

    // Check for a draw
    if (!gameBoard.includes("")) {
        statusText.innerText = "It's a Draw! 😐";
        gameActive = false;
        return;
    }

    // Switch player if no win or draw
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Player ${currentPlayer}'s turn`;
};

// Function to reset the game
const resetGame = () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""]; // Reset board state
    gameActive = true; // Reactivate game
    currentPlayer = "X"; // Set player X to start

    // Clear UI
    statusText.innerText = "Player X's turn";
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("taken");
    });
};

// Add event listeners to all cells
cells.forEach(cell => cell.addEventListener("click", cellClicked));

// Add event listener to reset button
resetButton.addEventListener("click", resetGame);
