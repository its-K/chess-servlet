
var game=new Board();
game.initializeGame();
var container = document.querySelector("#chessContainer");

var view=new CanvasGame();
view.createBoard(container);


window.addEventListener("resize",function(){
    view.setWindowHeightWidth(window.innerHeight,window.innerWidth);
    view.createBoard(container);
});

function doCastling(targetPiece,sourcePiece){
    view.createBoard(container);
}

function doEnpassant(targetPos){
    view.createBoard(container);
}

function setPiece(targetPiece){
    view.createBoard(container);
}

function removePiece(i,j){
    view.createBoard(container);
}