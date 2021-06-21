
function Rook(type,position){
    Piece.call(this,type);
    this.coinType=COIN_TYPE.ROOK;
    this.position=position;
}
Rook.prototype.getPossibleMoves=function(){
    var xpos=this.position[0];
    var ypos=this.position[1];
    moves=[];
    this.checkDownToUpAndAdd(moves,xpos,ypos);
    this.checkLeftToRightAndAdd(moves,xpos,ypos);
    return moves;
}

Rook.prototype.checkDownToUpAndAdd=function(moves,i,j){
    for(let a=i-1;a>=0;a--){
        if(game.matrix[a+","+j]==undefined){
            if(this.checkMoveValid(a,j)) moves.push([a,j]);
        }
        else if(game.matrix[a+","+j].isWhite()!=game.matrix[i+","+j].isWhite()){
            if(this.checkMoveValid(a,j)) moves.push([a,j]);
            break;
        }
        else break;
    }
    for(let a=i+1;a<8;a++){
        if(game.matrix[a+","+j]==undefined){
            if(this.checkMoveValid(a,j)) moves.push([a,j]);
        }
        else if(game.matrix[(a+","+j)].isWhite()!=game.matrix[(i+","+j)].isWhite()){
            if(this.checkMoveValid(a,j)) moves.push([a,j]);
            break;
        }
        else break;
    }
    return moves;
}

Rook.prototype.checkLeftToRightAndAdd=function(moves,i,j){
    for(let a=j-1;a>=0;a--){
        if(game.matrix[i+","+a]==undefined){
            if(this.checkMoveValid(i,a)) moves.push([i,a]);
        }
        else if(game.matrix[(i+","+a)].isWhite()!=game.matrix[(i+","+j)].isWhite()){
            if(this.checkMoveValid(i,a)) moves.push([i,a]);
            break;
        }
        else break;
    }
    for(let a=j+1;a<8;a++){
        if(game.matrix[i+","+a]==undefined){
            if(this.checkMoveValid(i,a)) moves.push([i,a]);
        }
        else if(game.matrix[(i+","+a)].isWhite()!=game.matrix[(i+","+j)].isWhite()){
            if(this.checkMoveValid(i,a)) moves.push([i,a]);
            break;
        }
        else break;
    }
    return moves;
}

Rook.prototype=Object.assign({},Piece.prototype,Rook.prototype)
