function Piece(type){
    this.coinType;
    this.position;
    this.white=type;
}
Piece.prototype.isWhite=function(){
    return this.white;
}

Piece.prototype.getPossibleMoves=function(){};

Piece.prototype.checkKingUnderCheck=function(isWhite){
    var king;
    for(key in game.matrix){
        ele=game.matrix[key];
        if(ele.coinType=="King" && ele.isWhite()==isWhite){
            king=ele;
        }
    }
    if(isCheck(king.position[0],king.position[1])) return true;
    return false;
}

Piece.prototype.checkMoveValid=function(i,j){
    var oppPiece=game.matrix[i+","+j];
    var selectedPiecePos=game.selectedPiece.position;

    game.selectedPiece.position=[i,j];
    game.matrix[i+","+j]=game.selectedPiece;
    delete game.matrix[selectedPiecePos[0]+","+selectedPiecePos[1]];
    var canMove=true;
    if(this.checkKingUnderCheck(game.selectedPiece.isWhite())) canMove=false;
    if(oppPiece!=undefined) game.matrix[i+","+j]=oppPiece;
    else delete game.matrix[i+","+j];
    game.selectedPiece.position=selectedPiecePos;
    game.matrix[selectedPiecePos[0]+","+selectedPiecePos[1]]=game.selectedPiece;
    return canMove;
}