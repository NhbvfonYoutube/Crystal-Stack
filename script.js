let score = 0;

const boardSize = 8;

let board = [];


// START GAME

function startGame() {

    document.getElementById("homeScreen").classList.add("hidden");

    document.getElementById("gameScreen").classList.remove("hidden");

    createBoard();

    score = 0;

    updateScore();
}



// SETTINGS

function openSettings(){

    document.getElementById("homeScreen").classList.add("hidden");

    document.getElementById("settingsScreen").classList.remove("hidden");

}



function goHome(){

    document.getElementById("settingsScreen").classList.add("hidden");

    document.getElementById("gameScreen").classList.add("hidden");

    document.getElementById("homeScreen").classList.remove("hidden");

}



// CREATE BOARD

function createBoard(){

    const boardElement = document.getElementById("board");

    boardElement.innerHTML = "";

    board = [];


    for(let row = 0; row < boardSize; row++){

        board[row] = [];


        for(let col = 0; col < boardSize; col++){


            let cell = document.createElement("div");

            cell.className = "cell";


            cell.onclick = function(){

                placeBlock(row,col);

            };


            boardElement.appendChild(cell);


            board[row][col] = false;

        }

    }

}



// PLACE TEST BLOCK

function placeBlock(row,col){


    if(board[row][col] === false){


        board[row][col] = true;


        let index = row * boardSize + col;


        document.querySelectorAll(".cell")[index].style.background =
        "cyan";


        score += 10;


        updateScore();


    }

}



// TEST PIECE BUTTON

function placePiece(){

    let emptySpaces = [];


    for(let r=0;r<boardSize;r++){

        for(let c=0;c<boardSize;c++){

            if(board[r][c] === false){

                emptySpaces.push([r,c]);

            }

        }

    }


    if(emptySpaces.length > 0){


        let spot =
        emptySpaces[Math.floor(Math.random()*emptySpaces.length)];


        placeBlock(spot[0],spot[1]);

    }

}



// SCORE

function updateScore(){

    document.getElementById("score").innerText = score;

}
