
function Knight(type,position){
    Piece.call(this,type);
    this.coinType=COIN_TYPE.KNIGHT;
    this.position=position;
}

Knight.prototype.getPossibleMoves=function(){
    var xpos=this.position[0];
    var ypos=this.position[1];
    moves=[];
    moves=this.getPossibleLSpots(moves,xpos,ypos);
    return moves;
}

Knight.prototype.getPossibleLSpots=function(moves,i,j){
    if(i+2<8 && j+1<8){
        if(game.matrix[(i+2)+","+(j+1)]==undefined || game.matrix[((i+2)+","+(j+1))].isWhite()!=game.matrix[(i+","+j)].isWhite()){
            if(this.checkMoveValid(i+2,j+1)) moves.push([i+2,j+1]);
        }
    }
    if(i+2<8 && j-1>=0){
        if(game.matrix[(i+2)+","+(j-1)]==undefined || game.matrix[((i+2)+","+(j-1))].isWhite()!=game.matrix[(i+","+j)].isWhite()){
            if(this.checkMoveValid(i+2,j-1)) moves.push([i+2,j-1]);
        }
    }
    if(i-2>=0 && j+1<8){
        if(game.matrix[(i-2)+","+(j+1)]==undefined || game.matrix[((i-2)+","+(j+1))].isWhite()!=game.matrix[(i+","+j)].isWhite()){
            if(this.checkMoveValid(i-2,j+1)) moves.push([i-2,j+1]);
        }
    }
    if(i-2>=0 && j-1>=0){
        if(game.matrix[(i-2)+","+(j-1)]==undefined || game.matrix[((i-2)+","+(j-1))].isWhite()!=game.matrix[(i+","+j)].isWhite()){
            if(this.checkMoveValid(i-2,j-1)) moves.push([i-2,j-1]);
        }
    }

    if(i+1<8 && j+2<8){
        if(game.matrix[(i+1)+","+(j+2)]==undefined || game.matrix[((i+1)+","+(j+2))].isWhite()!=game.matrix[(i+","+j)].isWhite()){
            if(this.checkMoveValid(i+1,j+2)) moves.push([i+1,j+2]);
        }
    }
    if(i-1>=0 && j+2<8){
        if(game.matrix[(i-1)+","+(j+2)]==undefined || game.matrix[((i-1)+","+(j+2))].isWhite()!=game.matrix[(i+","+j)].isWhite()){
            if(this.checkMoveValid(i-1,j+2)) moves.push([i-1,j+2]);
        }
    }
    if(i+1<8 && j-2>=0){
        if(game.matrix[(i+1)+","+(j-2)]==undefined || game.matrix[((i+1)+","+(j-2))].isWhite()!=game.matrix[(i+","+j)].isWhite()){
            if(this.checkMoveValid(i+1,j-2)) moves.push([i+1,j-2]);
        }
    }
    if(i-1>=0 && j-2>=0){
        if(game.matrix[(i-1)+","+(j-2)]==undefined || game.matrix[((i-1)+","+(j-2))].isWhite()!=game.matrix[(i+","+j)].isWhite()){
            if(this.checkMoveValid(i-1,j-2)) moves.push([i-1,j-2]);
        }
    }
    return moves;
}

Knight.prototype=Object.assign({},Piece.prototype,Knight.prototype)
