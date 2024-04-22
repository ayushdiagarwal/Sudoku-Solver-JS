const box = document.querySelector(".box");
const startBtn = document.querySelector(".startBtn");
const genBtn = document.querySelector(".genBtn");
const size = 9 * 9;

let board = [
  [0, 1, 5, 9, 6, 0, 2, 0, 0],
  [6, 0, 0, 0, 3, 7, 1, 8, 0],
  [0, 8, 3, 0, 0, 1, 0, 0, 7],
  [0, 7, 0, 6, 0, 3, 0, 5, 2],
  [0, 2, 0, 7, 0, 9, 3, 1, 0],
  [0, 0, 8, 1, 0, 2, 0, 0, 9],
  [0, 0, 0, 0, 0, 5, 0, 2, 0],
  [0, 3, 0, 8, 9, 0, 0, 0, 0],
  [9, 0, 0, 2, 1, 6, 0, 3, 0],
];

// Making the board

function make(board){
for (let i = 0; i < size; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  let val = board[Math.floor(i / 9)][i % 9];
  if (val != 0){
    cell.textContent = val;
  }
  cell.setAttribute("index", String(i));
  box.appendChild(cell);
}
}

function updateBoard(board){
  for (let i = 0; i < size; i++) {
    const curCell = document.querySelector(`.cell[index="${i}"]`);
    curCell.textContent = "";
    let val = board[Math.floor(i / 9)][i % 9];
    if (val != 0){
      curCell.textContent = val;
    }
  }
  }

// Checking if num is even possible
function possible(x, y, n) {
  // Vertical
  for (let i = 0; i < 9; i++) {
    if (board[i][y] == n) {
      return false;
    }
  }

  // Horizontal
  for (let i = 0; i < 9; i++) {
    if (board[x][i] == n) {
      return false;
    }
  }

  // Box
  let x0 = Math.floor(x / 3) * 3;
  let y0 = Math.floor(y / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[x0 + i][y0 + j] == n) {
        return false;
      }
    }
  }

  return true;
}

// backtracking algo
async function solve() {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (board[x][y] == 0) {
        let index = 9 * x + y;

        const curCell = document.querySelector(`.cell[index="${index}"]`);

        for (let n = 1; n <= 9; n++) {
          curCell.textContent = String(n);
          curCell.classList.add("active");
          await sleep(0.03);
          if (possible(x, y, n)) {
            curCell.classList.remove("active");
            board[x][y] = n;
            if (await solve()) {
              return true;
            }
            curCell.textContent = "0";
            board[x][y] = 0; // Backtrack
          }
        }
        return false;
      }
    }
  }

  return true; // Puzzle solved
}

async function sleep(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}


startBtn.addEventListener("click", solve);


// For generating random puzzles

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

async function generate(){
fetch('https://raw.githubusercontent.com/grantm/sudoku-exchange-puzzle-bank/master/easy.txt')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Parse the response as text
    return response.text();
  })
  .then(data => {
    puzzles = data.split('\n');
    puzzle = (puzzles[getRandomInt(1,99999)]).split(" ")[1];

    let newBoard = [];
    for(let i=0;i<9;i++){
      newBoard.push([]);
      for(let j=0;j<9;j++){
        newBoard[i][j] = parseInt(puzzle[9*i+j]);
      }
    }

    // If I return the value of board, somehow it is not being properly returned, why is that?
    board = newBoard;
    updateBoard(board);
    // return newBoard;
  });
}

make(board);

genBtn.addEventListener("click", async () => {
  // I was not able to retrieve the returned value of from generate(), whyy?
  await generate();
})







// backtracking algo
async function algo() {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (board[x][y] == 0) {

        for (let n = 1; n <= 9; n++) {
          if (possible(x, y, n)) {
            board[x][y] = n;
            if (await solve()) {
              return true;
            }
            board[x][y] = 0; // Backtrack
          }
        }
        return false;
      }
    }
  }

  return true; // Puzzle solved
}