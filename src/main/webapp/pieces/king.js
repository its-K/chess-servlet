
function King(type,position){
    Piece.call(this,type);
    this.coinType=COIN_TYPE.KING;
    this.position=position;
    this.isMoved=false;
    this.isCastingAllowed=false;
}
King.prototype.getPossibleMoves=function(){
    var xpos=this.position[0];
    var ypos=this.position[1];
    moves=[];
    this.allPosibilities(moves,xpos,ypos);
    return moves;
}

King.prototype.checkRightDownAndAdd=function(moves,i,j){
    if(i+1<8 &&j+1<8){
        if(game.matrix[(i+1)+","+(j+1)]==undefined) {
            if(this.checkMoveValid(i+1,j+1)) moves.push([i+1,j+1]);
        }
        else if(game.matrix[((i+1)+","+(j+1))].isWhite()!=game.matrix[(i+","+j)].isWhite()){
            if(this.checkMoveValid(i+1,j+1)) moves.push([i+1,j+1]);
        }
    }
}

King.prototype.checkLeftUpAndAdd=function(moves,i,j){
    if(i-1>=0 &&j-1>=0){
        if(game.matrix[(i-1)+","+(j-1)]==undefined){
            if(this.checkMoveValid(i-1,j-1)) moves.push([i-1,j-1]);
        }
        else if(game.matrix[((i-1)+","+(j-1))].isWhite()!=game.matrix[(i+","+j)].isWhite()) {
            if(this.checkMoveValid(i-1,j-1)) moves.push([i-1,j-1]);
        }
    }
}

King.prototype.checkRightUpAndAdd=function(moves,i,j){
    if(i-1>=0 && j+1<8){
        if(game.matrix[(i-1)+","+(j+1)]==undefined) {
            if(this.checkMoveValid(i-1,j+1)) moves.push([i-1,j+1]);
        }
        else if(game.matrix[((i-1)+","+(j+1))].isWhite()!=game.matrix[(i+","+j)].isWhite()) {
            if(this.checkMoveValid(i-1,j+1)) moves.push([i-1,j+1]);
        }
    }
}

King.prototype.checkLeftDownAndAdd=function(moves,i,j){
    if(i+1<8 && j-1>=0){
        if(game.matrix[(i+1)+","+(j-1)]==undefined){
            if(this.checkMoveValid(i+1,j-1)) moves.push([i+1,j-1]);
        }
        else if(game.matrix[((i+1)+","+(j-1))].isWhite()!=game.matrix[(i+","+j)].isWhite()){
            if(this.checkMoveValid(i+1,j-1)) moves.push([i+1,j-1]);
        }
    }
}

King.prototype.checkDownAndAdd=function(moves,i,j){
    if(i+1<8){
        if(game.matrix[(i+1)+","+j]==undefined){
            if(this.checkMoveValid(i+1,j)) moves.push([i+1,j]);
        }
        else if(game.matrix[((i+1)+","+j)].isWhite()!=game.matrix[(i+","+j)].isWhite()) {
            if(this.checkMoveValid(i+1,j)) moves.push([i+1,j]);
        }
    }
}

King.prototype.checkUpAndAdd=function(moves,i,j){
    if(i-1>=0){
        if(game.matrix[(i-1)+","+j]==undefined){
            if(this.checkMoveValid(i-1,j)) moves.push([i-1,j]);
        }
        else if(game.matrix[((i-1)+","+j)].isWhite()!=game.matrix[(i+","+j)].isWhite()) {
            if(this.checkMoveValid(i-1,j)) moves.push([i-1,j]);
        }
    }
}

King.prototype.checkRightAndAdd=function(moves,i,j){
    if(j+1<8){
        if(game.matrix[i+","+(j+1)]==undefined){
            if(this.checkMoveValid(i,j+1)) moves.push([i,j+1]);
        }
        else if(game.matrix[(i+","+(j+1))].isWhite()!=game.matrix[(i+","+j)].isWhite()) {
            if(this.checkMoveValid(i,j+1)) moves.push([i,j+1]);
        }
    }
}

King.prototype.checkLeftAndAdd=function(moves,i,j){
    if(j-1>=0){
        if(game.matrix[i+","+(j-1)]==undefined){
            if(this.checkMoveValid(i,j-1)) moves.push([i,j-1]);
        }
        else if(game.matrix[(i+","+(j-1))].isWhite()!=game.matrix[(i+","+j)].isWhite()) {
            if(this.checkMoveValid(i,j-1)) moves.push([i,j-1]);
        }
    }
}

King.prototype.checkCastling=function(moves,i,j){
    if(!this.isMoved){
        //for short castling
        if(game.matrix[i+","+(j+3)]!=undefined && game.matrix[i+","+(j+3)].coinType=="Rook"){
            if(game.matrix[i+","+(j+1)]==undefined && game.matrix[i+","+(j+2)]==undefined){
                if(this.checkMoveValid(i,j+2)){
                    moves.push([i,j+2]);
                    this.isCastingAllowed=true;
                }
            }
        }
        //for long castling
        if(game.matrix[i+","+(j-4)]!=undefined && game.matrix[i+","+(j-4)].coinType=="Rook"){
            if(game.matrix[i+","+(j-1)]==undefined && game.matrix[i+","+(j-2)]==undefined && game.matrix[i+","+(j-3)]==undefined){
                if(this.checkMoveValid(i,j-2)){
                    moves.push([i,j-2]);
                    this.isCastingAllowed=true;
                }
            }
        }
    }
    else this.isCastingAllowed=false;
}

King.prototype.allPosibilities=function(moves,i,j){
    this.checkRightDownAndAdd(moves,i,j);
    this.checkLeftUpAndAdd(moves,i,j);
    this.checkRightUpAndAdd(moves,i,j);
    this.checkLeftDownAndAdd(moves,i,j);
    this.checkDownAndAdd(moves,i,j);
    this.checkUpAndAdd(moves,i,j);
    this.checkRightAndAdd(moves,i,j);
    this.checkLeftAndAdd(moves,i,j);
    this.checkCastling(moves,i,j);
    return moves;
}

King.prototype=Object.assign({},Piece.prototype,King.prototype)
