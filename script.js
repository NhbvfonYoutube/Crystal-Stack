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



function startGame(){

document.getElementById("homeScreen")
.classList.add("hidden");

document.getElementById("gameScreen")
.classList.remove("hidden");


score=0;

createBoard();

generatePieces();

updateScore();

}




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

function drawPiece(element,shape){

element.innerHTML="";

element.style.gridTemplateColumns =
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


element.appendChild(square);


});

});


}

piece.addEventListener("dragstart",()=>{

selectedPiece = shape;

piece.style.opacity="0.5";

});


piece.addEventListener("dragend",()=>{

piece.style.opacity="1";

});

area.appendChild(piece);


}


}





function drawPiece(element,shape){


element.style.gridTemplateColumns=
`repeat(${shape[0].length},25px)`;


shape.forEach(row=>{


row.forEach(block=>{


let square=document.createElement("div");


if(block){

square.className="miniBlock";

}

else{

square.className="emptyBlock";

}


element.appendChild(square);


});


});


}





function placePiece(row,col){


if(!selectedPiece)return;



let height=selectedPiece.length;

let width=selectedPiece[0].length;



for(let r=0;r<height;r++){

for(let c=0;c<width;c++){


if(selectedPiece[r][c]){


if(
row+r>=size ||
col+c>=size ||
board[row+r][col+c]
){

return;

}


}

}

}




for(let r=0;r<height;r++){

for(let c=0;c<width;c++){


if(selectedPiece[r][c]){


board[row+r][col+c]=1;


let index=(row+r)*size+(col+c);


document.querySelectorAll(".cell")[index]
.classList.add("placedBlock");


score+=10;


}

}

}


removeUsedPiece();

updateScore();

selectedPiece=null;


}





function removeUsedPiece(){

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

document.getElementById("score")
.innerText=score;

}




function openSettings(){

document.getElementById("homeScreen")
.classList.add("hidden");

document.getElementById("settingsScreen")
.classList.remove("hidden");

}



function goHome(){

document.getElementById("settingsScreen")
.classList.add("hidden");


document.getElementById("gameScreen")
.classList.add("hidden");


document.getElementById("homeScreen")
.classList.remove("hidden");

}
