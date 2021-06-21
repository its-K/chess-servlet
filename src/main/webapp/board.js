
function Board(){
    this.matrix={};
    this.selectedPiece;
    this.curPlayerIsWhite=true;
    this.savedMoves=[];
    this.noOfMovesDone=0;
}

Board.prototype.initializeGame=function(){
    //black coins
    this.matrix[0+","+0]=new Rook(false,[0,0]);
    this.matrix[0+","+1]=new Knight(false,[0,1]);
    this.matrix[0+","+2]=new Bishop(false,[0,2]);
    this.matrix[0+","+3]=new Queen(false,[0,3]);
    this.matrix[0+","+4]=new King(false,[0,4]);
    this.matrix[0+","+5]=new Bishop(false,[0,5]);
    this.matrix[0+","+6]=new Knight(false,[0,6]);
    this.matrix[0+","+7]=new Rook(false,[0,7]);
    for(var i=0;i<8;i++) this.matrix[1+","+i]=new Pawn(false,[1,i]);
    
    //white coins
    this.matrix[7+","+0]=new Rook(true,[7,0]);
    this.matrix[7+","+1]=new Knight(true,[7,1]);
    this.matrix[7+","+2]=new Bishop(true,[7,2]);
    this.matrix[7+","+3]=new Queen(true,[7,3]);
    this.matrix[7+","+4]=new King(true,[7,4]);
    this.matrix[7+","+5]=new Bishop(true,[7,5]);
    this.matrix[7+","+6]=new Knight(true,[7,6]);
    this.matrix[7+","+7]=new Rook(true,[7,7]);
    for(var i=0;i<8;i++) this.matrix[6+","+i]=new Pawn(true,[6,i]);
}

Board.prototype.selectPiece=function(i,j){
    if(this.matrix[i+","+j]!=undefined && this.matrix[i+","+j].isWhite()==this.curPlayerIsWhite){
        this.selectedPiece=this.matrix[i+","+j];
        console.log("Coin selected");
        return true;
    }
    return false;
}

Board.prototype.moveSelectedPiece=function(i,j){
    var possibleMoves=this.selectedPiece.getPossibleMoves();
    var curPos=this.selectedPiece.position;
    var isPieceMoved=false;
    possibleMoves.forEach(move => {
        if(move[0]==i && move[1]==j){
            this.storeMoves([i,j],this.selectedPiece);

            if(this.selectedPiece.coinType==COIN_TYPE.KING) this.selectedPiece.isMoved=true;
            if(this.selectedPiece.coinType==COIN_TYPE.PAWN) this.selectedPiece.noOfMoves+=1;

            this.checkAndDoEnPassant(i,j);
            this.selectedPiece.position=[i,j];
            this.matrix[i+","+j]=this.selectedPiece;
            delete this.matrix[curPos[0]+","+curPos[1]];
            
            this.checkSpecialMoves(i,j);
            if(Piece.prototype.checkKingUnderCheck(!this.selectedPiece.isWhite())) alert("Check");
            this.clearSelectedPiece();
            isPieceMoved=true;
            console.log("Coin moved");
            this.curPlayerIsWhite=!this.curPlayerIsWhite;
        }
    });
    if(!isPieceMoved){
        alert("Move not possible");
        return false;
    }
    return isPieceMoved;
}

Board.prototype.clearSelectedPiece=function(){
    this.selectedPiece=undefined;
}

Board.prototype.checkAndDoPawnPromotion=function(i,j,coin){
    if(this.matrix[i+","+j].coinType==COIN_TYPE.PAWN){
        if(i==0 || i==7){
            var isWhite=this.matrix[i+","+j].isWhite();
            switch (coin) {
                case COIN_TYPE.QUEEN:
                    this.matrix[i+","+j]=new Queen(isWhite,[i,j]);
                    break;
                case COIN_TYPE.ROOK:
                    this.matrix[i+","+j]=new Rook(isWhite,[i,j]);
                    break;
                case COIN_TYPE.BISHOP:
                    this.matrix[i+","+j]=new Bishop(isWhite,[i,j]);
                    break;
            }
        }
    }
}

Board.prototype.checkAndDoCastling=function(i,j){
    if(this.selectedPiece.coinType==COIN_TYPE.KING && this.selectedPiece.isCastingAllowed){
        this.noOfMovesDone-=1;
        var xpos=this.selectedPiece.position[0];
        var ypos=this.selectedPiece.position[1];
        var move=this.savedMoves[this.noOfMovesDone];
        move.castlingMove.rookIsWhite=this.selectedPiece.isWhite();
        move.isCastling=true;
        if(j==2){
            this.matrix[xpos+","+(ypos+1)]=this.matrix[xpos+","+(ypos-2)];
            delete this.matrix[xpos+","+(ypos-2)];
            this.matrix[xpos+","+(ypos+1)].position=[xpos,ypos+1];
            doCastling(this.matrix[xpos+","+(ypos+1)],[xpos,ypos-2]);
            move.castlingMove.rookSourcePosition=[xpos,ypos-2];
            move.castlingMove.rookTargetPosition=[xpos,ypos+1];
        }
        else if(j==6){
            this.matrix[xpos+","+(ypos-1)]=this.matrix[xpos+","+(ypos+1)];
            delete this.matrix[xpos+","+(ypos+1)];
            this.matrix[xpos+","+(ypos-1)].position=[xpos,ypos-1];
            doCastling(this.matrix[xpos+","+(ypos-1)],[xpos,ypos+1]);
            move.castlingMove.rookSourcePosition=[xpos,ypos+1];
            move.castlingMove.rookTargetPosition=[xpos,ypos-1];
        }
        this.savedMoves[this.noOfMovesDone]=move;
        this.noOfMovesDone+=1;
        return true;
    }
    return false;
}

Board.prototype.checkAndDoEnPassant=function(i,j){
    if(this.selectedPiece.coinType==COIN_TYPE.PAWN && this.selectedPiece.isEnPassantAllowed){
        if(this.selectedPiece.position[1]!=j && this.matrix[i+","+j]==undefined) {
            this.noOfMovesDone-=1;
            var move=this.savedMoves[this.noOfMovesDone];
            move.isEnPassant=true;

            var row=this.selectedPiece.isWhite()? i+1:i-1;
            delete this.matrix[row+","+(j)];
            doEnpassant([row,j]);
            move.enPassantMove.pawnSourcePosition=[row,j];
            move.enPassantMove.pawnIsWhite=!this.selectedPiece.isWhite();
            this.noOfMovesDone+=1;
            return true;
        }
    }
    return false;
}

Board.prototype.checkSpecialMoves=function(i,j){
    this.checkAndDoPawnPromotion(i,j,COIN_TYPE.QUEEN);
    this.checkAndDoCastling(i,j);
}

Board.prototype.storeMoves=function(targetPos,sourcePiece){
    targetPiece=this.matrix[targetPos[0]+","+targetPos[1]];
    if(targetPiece!=undefined){
        var move=new Move(targetPos,targetPiece.coinType,targetPiece.isWhite(),sourcePiece.position,sourcePiece.coinType,sourcePiece.isWhite());
    }
    else{
        var move=new Move(targetPos,undefined,undefined,sourcePiece.position,sourcePiece.coinType,sourcePiece.isWhite());
    }
    this.savedMoves[this.noOfMovesDone]=move;
    this.noOfMovesDone+=1;
    var count=this.noOfMovesDone;
    while(this.savedMoves[count]!=undefined){
        this.savedMoves[count]=undefined;
        count+=1;
    }
}

Board.prototype.redoMove=function(){
    if(this.savedMoves[this.noOfMovesDone]!=undefined){
        var move=this.savedMoves[this.noOfMovesDone];
        if(move.isCastling){
            var targetPiece=this.createPiece(move.sourceCoinType,move.isSourcePieceWhite,move.targetPosition);
            targetPiece.isMoved=true;
            var tPos=move.targetPosition;
            var sPos=move.sourcePosition;
            this.matrix[tPos[0]+","+tPos[1]]=targetPiece;
            setPiece(targetPiece);
            delete this.matrix[sPos[0]+","+sPos[1]];
            removePiece(sPos[0],sPos[1]);

            var rookPiece=this.createPiece(COIN_TYPE.ROOK,move.castlingMove.rookIsWhite,move.castlingMove.rookTargetPosition);
            rksPos=move.castlingMove.rookSourcePosition;
            rktPos=move.castlingMove.rookTargetPosition;
            this.matrix[rktPos[0]+","+rktPos[1]]=rookPiece;
            setPiece(rookPiece);
            delete this.matrix[rksPos[0]+","+rksPos[1]];
            removePiece(rksPos[0],rksPos[1]);
        }
        else if(move.isEnPassant){
            var targetPiece=this.createPiece(move.sourceCoinType,move.isSourcePieceWhite,move.targetPosition);
            var tPos=move.targetPosition;
            var sPos=move.sourcePosition;
            this.matrix[tPos[0]+","+tPos[1]]=targetPiece;
            setPiece(targetPiece);
            delete this.matrix[sPos[0]+","+sPos[1]];
            removePiece(sPos[0],sPos[1]);

            pPos=move.enPassantMove.pawnSourcePosition;
            delete this.matrix[pPos[0]+","+pPos[1]];
            removePiece(pPos[0],pPos[1]);
        }
        else{
            var targetPiece=this.createPiece(move.sourceCoinType,move.isSourcePieceWhite,move.targetPosition);
            var tPos=move.targetPosition;
            var sPos=move.sourcePosition;
            this.matrix[tPos[0]+","+tPos[1]]=targetPiece;
            setPiece(targetPiece);
            delete this.matrix[sPos[0]+","+sPos[1]];
            removePiece(sPos[0],sPos[1]);
        }
        this.noOfMovesDone+=1;
        this.curPlayerIsWhite=!this.curPlayerIsWhite;
        return true;
    }
    return false;
}

Board.prototype.undoMove=function(){
    if(this.noOfMovesDone>0){
        this.noOfMovesDone-=1;
        var move=this.savedMoves[this.noOfMovesDone];
        if(move.isCastling){
            var targetPiece=this.createPiece(move.sourceCoinType,move.isSourcePieceWhite,move.sourcePosition);
            tPos=move.sourcePosition;
            sPos=move.targetPosition;
            this.matrix[tPos[0]+","+tPos[1]]=targetPiece;
            setPiece(targetPiece);
            delete this.matrix[sPos[0]+","+sPos[1]];
            removePiece(sPos[0],sPos[1]);

            rksPos=move.castlingMove.rookSourcePosition;
            rktPos=move.castlingMove.rookTargetPosition;
            var sourcePiece=this.createPiece(COIN_TYPE.ROOK,move.castlingMove.rookIsWhite,move.castlingMove.rookSourcePosition);
            this.matrix[rksPos[0]+","+rksPos[1]]=sourcePiece;
            setPiece(sourcePiece);
            delete this.matrix[rktPos[0]+","+rktPos[1]];
            removePiece(rktPos[0],rktPos[1]);
        }
        else if(move.isEnPassant){
            var targetPiece=this.createPiece(move.sourceCoinType,move.isSourcePieceWhite,move.sourcePosition);
            tPos=move.sourcePosition;
            sPos=move.targetPosition;
            this.matrix[tPos[0]+","+tPos[1]]=targetPiece;
            setPiece(targetPiece);
            delete this.matrix[sPos[0]+","+sPos[1]];
            removePiece(sPos[0],sPos[1]);

            pPos=move.enPassantMove.pawnSourcePosition;
            var sourcePiece=this.createPiece(COIN_TYPE.PAWN,move.enPassantMove.pawnIsWhite,pPos);
            this.matrix[pPos[0]+","+pPos[1]]=sourcePiece;
            setPiece(sourcePiece);
        }
        else{
            var targetPiece=this.createPiece(move.sourceCoinType,move.isSourcePieceWhite,move.sourcePosition);
            tPos=move.sourcePosition;
            sPos=move.targetPosition;
            this.matrix[tPos[0]+","+tPos[1]]=targetPiece;
            setPiece(targetPiece);
            if(move.targetCoinType==undefined){
                delete this.matrix[sPos[0]+","+sPos[1]];
                removePiece(sPos[0],sPos[1]);
            }
            else{
                var sourcePiece=this.createPiece(move.targetCoinType,move.isTargetPieceWhite,move.targetPosition);
                this.matrix[sPos[0]+","+sPos[1]]=sourcePiece;
                setPiece(sourcePiece);
            }
        }
        this.curPlayerIsWhite=!this.curPlayerIsWhite;
        return true;
    }
    return false;
}

Board.prototype.createPiece=function(coinType,isWhite,position){
    piece=undefined;
    switch (coinType) {
        case COIN_TYPE.KING:
            piece=new King(isWhite,position);
            break;
        case COIN_TYPE.QUEEN:
            piece=new Queen(isWhite,position);
            break;
        case COIN_TYPE.BISHOP:
            piece=new Bishop(isWhite,position);
            break;
        case COIN_TYPE.KNIGHT:
            piece=new Knight(isWhite,position);
            break;
        case COIN_TYPE.ROOK:
            piece=new Rook(isWhite,position);
            break;
        case COIN_TYPE.PAWN:
            piece=new Pawn(isWhite,position);
        default:
            break;
    }
    return piece;
}