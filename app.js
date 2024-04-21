const box = document.querySelector(".box");
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

for (let i = 0; i < size; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.textContent = board[Math.floor(i / 9)][i % 9];
  cell.setAttribute("index", String(i));
  box.appendChild(cell);
}

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

async function solve() {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (board[x][y] == 0) {
        let index = 9 * x + y;
        console.log(x, y, index);

        const curCell = document.querySelector(`.cell[index="${index}"]`);

        for (let n = 1; n <= 9; n++) {
          curCell.textContent = String(n);
          // curCell.style.color = "red";
          curCell.classList.add("active");
          await sleep(0.03);
          if (possible(x, y, n)) {
            curCell.style.color = "black";
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

solve();
console.log(board);

// Reflecting the change on the file
const cells = document.querySelectorAll(".cell");

for (let i = 0; i < size; i++) {
  cells[i].textContent = board[Math.floor(i / 9)][i % 9];
}





// this is the actual working algorithm

function solveBoard() {
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (board[x][y] == 0) {
        let index = 9 * y + x;
        for (let n = 1; n <= 9; n++) {
          if (possible(x, y, n)) {
            board[x][y] = n;
            if (solve()) {
              return true;
            }
            board[x][y] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}