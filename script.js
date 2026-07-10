let score = 0;

const size = 8;

let board = [];

let selectedPiece = null;



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




// START

function startGame(){

homeScreen.classList.add("hidden");

gameScreen.classList.remove("hidden");


score=0;

createBoard();

generatePieces();

updateScore();

}



// BOARD

function createBoard(){

let element=document.getElementById("board");

element.innerHTML="";

board=[];



for(let r=0;r<size;r++){

board[r]=[];


for(let c=0;c<size;c++){


let cell=document.createElement("div");


cell.className="cell";


cell.dataset.row=r;

cell.dataset.col=c;



cell.addEventListener("dragover",e=>{

e.preventDefault();

});



cell.addEventListener("drop",()=>{

placePiece(r,c);

});



element.appendChild(cell);


board[r][c]=0;


}

}

}





// CREATE PIECES

function generatePieces(){

let area=document.getElementById("pieces");


area.innerHTML="";



for(let i=0;i<3;i++){


let shape =
shapes[Math.floor(Math.random()*shapes.length)];



let piece=document.createElement("div");


piece.className="piece";

piece.draggable=true;


piece.shape=shape;



drawPiece(piece,shape);



piece.addEventListener("dragstart",()=>{

selectedPiece=shape;

});



area.appendChild(piece);


}


}




function drawPiece(piece,shape){

piece.style.gridTemplateColumns =
`repeat(${shape[0].length},22px)`;


shape.forEach(row=>{

row.forEach(block=>{


let square=document.createElement("div");


if(block){

square.className="miniBlock";

}

else{

square.className="emptyBlock";

}


piece.appendChild(square);


});


});


}





// PLACE

function placePiece(row,col){

if(!selectedPiece)return;



let h=selectedPiece.length;

let w=selectedPiece[0].length;



for(let r=0;r<h;r++){

for(let c=0;c<w;c++){


if(selectedPiece[r][c]){


if(row+r>=size ||
col+c>=size ||
board[row+r][col+c]){

return;

}


}


}

}




for(let r=0;r<h;r++){

for(let c=0;c<w;c++){


if(selectedPiece[r][c]){


board[row+r][col+c]=1;


let index=(row+r)*size+(col+c);


document
.querySelectorAll(".cell")[index]
.classList.add("placedBlock");


score+=10;


}


}

}


removePiece();

updateScore();


selectedPiece=null;


}





function removePiece(){

let pieces=document.querySelectorAll(".piece");


for(let p of pieces){

if(p.shape===selectedPiece){

p.remove();

break;

}

}


if(document.querySelectorAll(".piece").length===0){

generatePieces();

}


}





function updateScore(){

document.getElementById("score").innerText=score;

}




function openSettings(){

homeScreen.classList.add("hidden");

settingsScreen.classList.remove("hidden");

}




function goHome(){

settingsScreen.classList.add("hidden");

gameScreen.classList.add("hidden");

homeScreen.classList.remove("hidden");

}
