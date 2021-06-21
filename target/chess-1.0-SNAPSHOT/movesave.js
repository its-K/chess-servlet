function Move(targetPos,tarpetCoinType,isTargetPieceWhite,sourcePos,sourceCoinType,isSourcePieceWhite){
    this.targetPosition=targetPos;
    this.targetCoinType=tarpetCoinType;
    this.isTargetPieceWhite=isTargetPieceWhite;
    this.sourcePosition=sourcePos;
    this.sourceCoinType=sourceCoinType;
    this.isSourcePieceWhite=isSourcePieceWhite;
    this.isCastling=false;
    this.isEnPassant=false;
}

Move.prototype.castlingMove={
    rookSourcePosition:undefined,
    rookIsWhite:false,
    rookTargetPosition:undefined
}

Move.prototype.enPassantMove={
    pawnSourcePosition:undefined,
    pawnIsWhite:false
}