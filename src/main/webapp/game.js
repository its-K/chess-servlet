
var game=new Board();
game.initializeGame();
var container = document.querySelector("#chessContainer");

var view=new HtmlGame();
view.createBoard(container);


window.addEventListener("resize",function(){
    view.setWindowHeightWidth(window.innerHeight,window.innerWidth);
    view.createBoard(container);
});

function doCastling(targetPiece,sourcePiece){
    view.doCastlingSwap(targetPiece,sourcePiece);
}

function doEnpassant(targetPos){
    view.doEnpassantMove(targetPos);
}

function setPiece(targetPiece){
    view.setPiece(targetPiece);
}

function removePiece(i,j){
    view.removePiece(i,j);
}