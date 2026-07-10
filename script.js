let score = 0;

const size = 8;

let board = [];

let selectedPiece = null;

let selectedElement = null;


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

homeScreen.classList.add("hidden");

gameScreen.classList.remove("hidden");


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

placePiece(
Number(cell.dataset.row),
Number(cell.dataset.col)
);

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



drawPiece(piece,shape);




piece.addEventListener("dragstart",(e)=>{


selectedPiece=shape;

selectedElement=piece;



// Stop browser shrinking preview

let ghost=document.createElement("div");

ghost.style.width="70px";

ghost.style.height="70px";


e.dataTransfer.setDragImage(
ghost,
35,
35
);


});




piece.addEventListener("dragend",()=>{

selectedPiece=null;

selectedElement=null;

});



area.appendChild(piece);


}

}






function drawPiece(piece,shape){


piece.innerHTML="";


piece.style.gridTemplateColumns=
`repeat(${shape[0].length},22px)`;


shape.forEach(row=>{


row.forEach(block=>{


let square=document.createElement("div");


square.className =
block ? "miniBlock":"emptyBlock";


piece.appendChild(square);


});


});


}







function canPlace(row,col,shape){


for(let r=0;r<shape.length;r++){

for(let c=0;c<shape[r].length;c++){


if(shape[r][c]){


if(
row+r>=size ||
col+c>=size ||
board[row+r][col+c]
){

return false;

}


}

}

}


return true;

}








function placePiece(row,col){


if(!selectedPiece)return;



// Center piece under cursor

row -= Math.floor(selectedPiece.length/2);

col -= Math.floor(selectedPiece[0].length/2);



if(!canPlace(row,col,selectedPiece)){

return;

}





for(let r=0;r<selectedPiece.length;r++){

for(let c=0;c<selectedPiece[r].length;c++){


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



removeSelected();

clearLines();

checkGameOver();

updateScore();


}






function removeSelected(){


if(selectedElement){

selectedElement.remove();

}


if(document.querySelectorAll(".piece").length===0){

generatePieces();

}


selectedPiece=null;

selectedElement=null;


}






function clearLines(){


let cleared=[];


// rows

for(let r=0;r<size;r++){


let full=true;


for(let c=0;c<size;c++){

if(!board[r][c]) full=false;

}


if(full) cleared.push(["row",r]);


}



// columns

for(let c=0;c<size;c++){


let full=true;


for(let r=0;r<size;r++){

if(!board[r][c]) full=false;

}


if(full) cleared.push(["col",c]);


}




cleared.forEach(line=>{


if(line[0]=="row"){


let r=line[1];


for(let c=0;c<size;c++){

board[r][c]=0;

document
.querySelectorAll(".cell")[r*size+c]
.classList.remove("placedBlock");

}


}



else{


let c=line[1];


for(let r=0;r<size;r++){

board[r][c]=0;


document
.querySelectorAll(".cell")[r*size+c]
.classList.remove("placedBlock");

}


}



score+=100;


});


}








function checkGameOver(){


let pieces=document.querySelectorAll(".piece");


for(let piece of pieces){


for(let r=0;r<size;r++){

for(let c=0;c<size;c++){


if(canPlace(r,c,piece.shape)){

return;

}


}


}


}



alert("Game Over!");



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
