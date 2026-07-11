let score = 0;

const size = 8;

let board = [];

let selectedPiece = null;

let selectedElement = null;

let ghostCells = [];



const shapes = [

[
[1,1,1,1]
],

[
[1,1],
[1,1]
],

[
[1,0],
[1,0],
[1,1]
],

[
[1,1,1],
[0,1,0]
],

[
[0,1,1],
[1,1,0]
],

[
[1,1,0],
[0,1,1]
],

[
[0,1],
[0,1],
[1,1]
]

];





// START GAME

function startGame(){

document.getElementById("homeScreen")
.classList.add("hidden");


document.getElementById("gameScreen")
.classList.remove("hidden");


score = 0;


document
.getElementById("gameOverScreen")
.classList.add("hidden");


createBoard();

generatePieces();

updateScore();

}





// CREATE BOARD

function createBoard(){

let boardElement =
document.getElementById("board");


boardElement.innerHTML="";


board=[];



for(let r=0;r<size;r++){


board[r]=[];


for(let c=0;c<size;c++){


let cell=document.createElement("div");


cell.className="cell";


cell.dataset.row=r;

cell.dataset.col=c;



cell.addEventListener(
"dragover",
function(e){

e.preventDefault();


showGhost(
Number(cell.dataset.row),
Number(cell.dataset.col)
);

});




cell.addEventListener(
"drop",
function(){


clearGhost();


placePiece(
Number(cell.dataset.row),
Number(cell.dataset.col)
);


});



boardElement.appendChild(cell);


board[r][c]=0;


}


}


}







// CREATE PIECES

function generatePieces(){


let area =
document.getElementById("pieces");


area.innerHTML="";



for(let i=0;i<3;i++){


let shape =
shapes[
Math.floor(Math.random()*shapes.length)
];



let piece =
document.createElement("div");


piece.className="piece";

piece.draggable=true;


piece.shape=shape;



drawPiece(piece,shape);



piece.addEventListener(
"dragstart",
function(e){


selectedPiece=shape;

selectedElement=piece;



let ghost =
document.createElement("div");


ghost.style.width="1px";

ghost.style.height="1px";


e.dataTransfer.setDragImage(
ghost,
0,
0
);


});





piece.addEventListener(
"dragend",
function(){


clearGhost();


selectedPiece=null;

selectedElement=null;


});



area.appendChild(piece);


}


}







// DRAW PIECES

function drawPiece(piece,shape){


piece.innerHTML="";


piece.style.gridTemplateColumns =
`repeat(${shape[0].length},22px)`;



shape.forEach(row=>{


row.forEach(block=>{


let square =
document.createElement("div");



square.className =
block ?
"miniBlock":
"emptyBlock";



piece.appendChild(square);


});


});


}







// CHECK PLACEMENT

function canPlace(row,col,shape){


for(let r=0;r<shape.length;r++){


for(let c=0;c<shape[r].length;c++){



if(shape[r][c]){


if(

row+r < 0 ||

col+c < 0 ||

row+r >= size ||

col+c >= size ||

board[row+r][col+c]

){

return false;

}


}


}


}


return true;

}








// PLACE PIECE

function placePiece(row,col){


if(!selectedPiece)
return;



row -= Math.floor(selectedPiece.length/2);

col -= Math.floor(selectedPiece[0].length/2);



if(!canPlace(row,col,selectedPiece))
return;




for(let r=0;r<selectedPiece.length;r++){


for(let c=0;c<selectedPiece[r].length;c++){



if(selectedPiece[r][c]){


board[row+r][col+c]=1;


}


}


}



score += 10;


refreshBoard();


removePiece();


clearLines();


updateScore();


setTimeout(checkGameOver,100);


}







// REMOVE PIECE

function removePiece(){


if(selectedElement){

selectedElement.remove();

}



selectedPiece=null;

selectedElement=null;



if(
document.querySelectorAll(".piece").length===0
){

generatePieces();

}


}







// GHOST

function showGhost(row,col){


clearGhost();


if(!selectedPiece)
return;



row -= Math.floor(selectedPiece.length/2);

col -= Math.floor(selectedPiece[0].length/2);



if(!canPlace(row,col,selectedPiece))
return;



for(let r=0;r<selectedPiece.length;r++){


for(let c=0;c<selectedPiece[r].length;c++){


if(selectedPiece[r][c]){


let index =
(row+r)*size+(col+c);


let cell =
document.querySelectorAll(".cell")[index];


cell.classList.add("ghostBlock");


ghostCells.push(cell);


}


}


}


}





function clearGhost(){


ghostCells.forEach(cell=>{


cell.classList.remove("ghostBlock");


});


ghostCells=[];


}








// CLEAR LINES

function clearLines(){


let rows=[];

let cols=[];



for(let r=0;r<size;r++){


let full=true;


for(let c=0;c<size;c++){


if(board[r][c]===0){

full=false;

}


}


if(full)
rows.push(r);


}




for(let c=0;c<size;c++){


let full=true;


for(let r=0;r<size;r++){


if(board[r][c]===0){

full=false;

}


}


if(full)
cols.push(c);


}






rows.forEach(r=>{


for(let c=0;c<size;c++){

board[r][c]=0;

}


});




cols.forEach(c=>{


for(let r=0;r<size;r++){

board[r][c]=0;

}


});





if(rows.length || cols.length){


score +=
(rows.length + cols.length) * 100;


}



refreshBoard();


}







// UPDATE BOARD

function refreshBoard(){


let cells =
document.querySelectorAll(".cell");



for(let r=0;r<size;r++){


for(let c=0;c<size;c++){



let index =
r*size+c;



cells[index]
.classList.toggle(
"placedBlock",
board[r][c]
);



}


}


}








// GAME OVER

function checkGameOver(){


let pieces =
document.querySelectorAll(".piece");



for(let piece of pieces){


for(let r=0;r<size;r++){


for(let c=0;c<size;c++){



if(canPlace(r,c,piece.shape)){


return;


}


}


}


}





document
.getElementById("finalScore")
.innerText=score;



document
.getElementById("gameOverScreen")
.classList.remove("hidden");


}








// RESTART

function restartGame(){


document
.getElementById("gameOverScreen")
.classList.add("hidden");


score=0;


createBoard();

generatePieces();

updateScore();


}







// SCORE

function updateScore(){

document
.getElementById("score")
.innerText=score;

}







// SETTINGS

function openSettings(){


document
.getElementById("homeScreen")
.classList.add("hidden");



document
.getElementById("settingsScreen")
.classList.remove("hidden");


}





function goHome(){


document
.getElementById("settingsScreen")
.classList.add("hidden");


document
.getElementById("gameScreen")
.classList.add("hidden");



document
.getElementById("homeScreen")
.classList.remove("hidden");


}
