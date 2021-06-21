var whiteKing="♔";
var blackKing="♚";
var whiteQueen="♕";
var blackQueen="♛";
var whiteBishop="♗";
var blackBishop="♝";
var whiteKnight="♘";
var blackKnight="♞";
var whiteRook="♖";
var blackRook="♜";
var whitePawn="♙";
var blackPawn="♟";

var COIN_TYPE={
    KING : "King",
    QUEEN : "Queen",
    PAWN : "Pawn",
    ROOK : "Rook",
    BISHOP : "Bishop",
    KNIGHT : "Knight"
}

function getPieceUrl(type,isWhite){
    switch (type) {
        case COIN_TYPE.PAWN:
            return (isWhite)? whitePawn:blackPawn;
        case COIN_TYPE.ROOK:
            return (isWhite)? whiteRook:blackRook;
        case COIN_TYPE.KNIGHT:
            return (isWhite)? whiteKnight:blackKnight;
        case COIN_TYPE.BISHOP:
            return (isWhite)? whiteBishop:blackBishop;
        case COIN_TYPE.QUEEN:
            return (isWhite)? whiteQueen:blackQueen;
        case COIN_TYPE.KING:
            return (isWhite)? whiteKing:blackKing;
    }
}
