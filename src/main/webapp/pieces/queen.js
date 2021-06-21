
function Queen(type,position){
    Piece.call(this,type);
    this.coinType=COIN_TYPE.QUEEN;
    this.position=position;
}
Queen.prototype.getPossibleMoves=function(){
    var xpos=this.position[0];
    var ypos=this.position[1]; 
    moves=[];
    Rook.prototype.checkDownToUpAndAdd.call(this,moves,xpos,ypos);
    Rook.prototype.checkLeftToRightAndAdd.call(this,moves,xpos,ypos);
    Bishop.prototype.checkRightDiagonalAndAdd.call(this,moves,xpos,ypos);
    Bishop.prototype.checkLeftDiagonalAndAdd.call(this,moves,xpos,ypos);
    return moves;
}

Queen.prototype=Object.assign({},Piece.prototype,Queen.prototype)