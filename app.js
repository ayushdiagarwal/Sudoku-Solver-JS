const box = document.querySelector(".box");
const size = 9*9;

let board = [[0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]];

for(let i=0;i<size;i++){
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = board[Math.floor(i/9)][i%9];
    cell.setAttribute("index", String(i));
    box.appendChild(cell)
}

// coordinates ek peeche

function possible(x,y,n){
    // Vertical
    for(let i=0;i<9;i++){
        if(board[x][i] == n){
            return false;
        }
    }

    // Horizontal 
    for(let i=0;i<9;i++){
        if(board[i][y] == n){
            return false;
        }
    }

    // Box
    let x0 = Math.floor(x/3)*3;
    let y0 = Math.floor(y/3)*3;

    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(board[i][j] == n){
                return false;
            }
        }
    }

    return true;

}