
function isCheck(i,j){
    //for vertical moves
    for(let a=i-1;a>=0;a--){
        if(game.matrix[a+","+j]!=undefined){
            if(game.matrix[a+","+j].isWhite()!=game.matrix[i+","+j].isWhite()){
                if(game.matrix[a+","+j].coinType==COIN_TYPE.ROOK || game.matrix[a+","+j].coinType==COIN_TYPE.QUEEN ){
                    return true;
                }
                break;
            }
            else if(game.matrix[a+","+j].isWhite()==game.matrix[i+","+j].isWhite()) break;
        }
    }
    for(let a=i+1;a<8;a++){
        if(game.matrix[a+","+j]!=undefined){
            if(game.matrix[a+","+j].isWhite()!=game.matrix[i+","+j].isWhite()){
                if(game.matrix[a+","+j].coinType==COIN_TYPE.ROOK || game.matrix[a+","+j].coinType==COIN_TYPE.QUEEN){
                    return true;
                }
                break;
                }
            else if(game.matrix[a+","+j].isWhite()==game.matrix[i+","+j].isWhite()) break;
        }
    }
    //for horizontal moves
    for(let a=j-1;a>=0;a--){
        if(game.matrix[i+","+a]!=undefined){
            if(game.matrix[i+","+a].isWhite()!=game.matrix[i+","+j].isWhite()){
                if(game.matrix[i+","+a].coinType==COIN_TYPE.ROOK || game.matrix[i+","+a].coinType==COIN_TYPE.QUEEN){
                    return true;
                }
                break;
            }
            else if(game.matrix[i+","+a].isWhite()==game.matrix[i+","+j].isWhite()) break;
        }
    }
    for(let a=j+1;a<8;a++){
        if(game.matrix[i+","+a]!=undefined){
            if(game.matrix[i+","+a].isWhite()!=game.matrix[i+","+j].isWhite()){
                if(game.matrix[i+","+a].coinType==COIN_TYPE.ROOK || game.matrix[i+","+a].coinType==COIN_TYPE.QUEEN){
                    return true;
                }
                break;
            }
            else if(game.matrix[i+","+a].isWhite()==game.matrix[i+","+j].isWhite()) break;
        }
    }

    //for vertical diagonal
    let a=i+1;
    let b=j+1;
    while(a<8 && b<8){
        if(game.matrix[a+","+b]!=undefined){
            if(game.matrix[a+","+b].isWhite()!=game.matrix[i+","+j].isWhite()){
                if(game.matrix[a+","+b].coinType==COIN_TYPE.BISHOP || game.matrix[a+","+b].coinType==COIN_TYPE.QUEEN){
                    return true;
                }
                break;
            }
            else if(game.matrix[a+","+b].isWhite()==game.matrix[i+","+j].isWhite()) break;
        }
        a++;
        b++;
    }

    a=i-1;
    b=j-1;
    while(a>=0 && b>=0){
        if(game.matrix[a+","+b]!=undefined){
            if(game.matrix[a+","+b].isWhite()!=game.matrix[i+","+j].isWhite()){
                if(game.matrix[a+","+b].coinType==COIN_TYPE.BISHOP || game.matrix[a+","+b].coinType==COIN_TYPE.QUEEN){
                    return true;
                }
                break;
            }
            else if(game.matrix[a+","+b].isWhite()==game.matrix[i+","+j].isWhite()) break;
        }
        a--;
        b--;
    }
    //for horizontal diagonal
    a=i-1;
    b=j+1;
    while(a>=0 && b<8){
        if(game.matrix[a+","+b]!=undefined){
            if(game.matrix[a+","+b].isWhite()!=game.matrix[i+","+j].isWhite()){
                if(game.matrix[a+","+b].coinType==COIN_TYPE.BISHOP || game.matrix[a+","+b].coinType==COIN_TYPE.QUEEN){
                    return true;
                }
                break;
            }
            else if(game.matrix[a+","+b].isWhite()==game.matrix[i+","+j].isWhite()) break;
        }
        a--;
        b++;
    }

    a=i+1;
    b=j-1;
    while(a<8 && b>=0){
        if(game.matrix[a+","+b]!=undefined){
            if(game.matrix[a+","+b].isWhite()!=game.matrix[i+","+j].isWhite()){
                if(game.matrix[a+","+b].coinType==COIN_TYPE.BISHOP || game.matrix[a+","+b].coinType==COIN_TYPE.QUEEN){
                    return  true;
                }
                break;
            }
            else if(game.matrix[a+","+b].isWhite()==game.matrix[i+","+j].isWhite()) break;
        }
        a++;
        b--;
    }

    //for l movement
    if(i+2<8 && j+1<8){
        if(game.matrix[(i+2)+","+(j+1)]!=undefined && game.matrix[(i+2)+","+(j+1)].isWhite()!=game.matrix[i+","+j].isWhite()) {
            if(game.matrix[(i+2)+","+(j+1)].coinType==COIN_TYPE.KNIGHT) return true;
        }
    }
    if(i+2<8 && j-1>=0){
        if(game.matrix[(i+2)+","+(j-1)]!=undefined && game.matrix[(i+2)+","+(j-1)].isWhite()!=game.matrix[i+","+j].isWhite()){
            if(game.matrix[(i+2)+","+(j-1)].coinType==COIN_TYPE.KNIGHT) return true;
        }
    }
    if(i-2>=0 && j+1<8){
        if(game.matrix[(i-2)+","+(j+1)]!=undefined && game.matrix[(i-2)+","+(j+1)].isWhite()!=game.matrix[i+","+j].isWhite()){
            if(game.matrix[(i-2)+","+(j+1)].coinType==COIN_TYPE.KNIGHT) return true;
        }
    }
    if(i-2>=0 && j-1>=0){
        if(game.matrix[(i-2)+","+(j-1)]!=undefined && game.matrix[(i-2)+","+(j-1)].isWhite()!=game.matrix[i+","+j].isWhite()){
            if(game.matrix[(i-2)+","+(j-1)].coinType==COIN_TYPE.BISHOP) return true;
        }
    }

    if(i+1<8 && j+2<8){
        if(game.matrix[(i+1)+","+(j+2)]!=undefined && game.matrix[(i+1)+","+(j+2)].isWhite()!=game.matrix[i+","+j].isWhite()) {
            if(game.matrix[(i+1)+","+(j+2)].coinType==COIN_TYPE.KNIGHT) return true;
        }
    }
    if(i-1>=0 && j+2<8){
        if(game.matrix[(i-1)+","+(j+2)]!=undefined && game.matrix[(i-1)+","+(j+2)].isWhite()!=game.matrix[i+","+j].isWhite()){
            if(game.matrix[(i-1)+","+(j+2)].coinType==COIN_TYPE.KNIGHT) return true;
        }
    }
    if(i+1<8 && j-2>=0){
        if(game.matrix[(i+1)+","+(j-2)]!=undefined && game.matrix[(i+1)+","+(j-2)].isWhite()!=game.matrix[i+","+j].isWhite()){
            if(game.matrix[(i+1)+","+(j-2)].coinType==COIN_TYPE.KNIGHT) return true;
        }
    }
    if(i-1>=0 && j-2>=0){
        if(game.matrix[(i-1)+","+(j-2)]!=undefined && game.matrix[(i-1)+","+(j-2)].isWhite()!=game.matrix[i+","+j].isWhite()){
            if(game.matrix[(i-1)+","+(j-2)].coinType==COIN_TYPE.KNIGHT) return true;
        }
    }
    //for pawn moves
    if(game.matrix[i+","+j].isWhite()){
        if(i+1<8 && j+1<8){
            if(game.matrix[(i+1)+","+(j+1)]!=undefined && game.matrix[(i+1)+","+(j+1)].isWhite()!=game.matrix[i+","+j].isWhite()){
                if(game.matrix[(i+1)+","+(j+1)]==COIN_TYPE.PAWN) return true;
            }
        }
        if(i+1<8 && j-1>=0){
            if(game.matrix[(i+1)+","+(j-1)]!=undefined && game.matrix[(i+1)+","+(j-1)].isWhite()!=game.matrix[i+","+j].isWhite()){
                if(game.matrix[(i+1)+","+(j-1)]==COIN_TYPE.PAWN) return true;
            }
        }
    }
    if(!game.matrix[i+","+j].isWhite()){
        if(i-1>=0 && j-1>=0){
            if(game.matrix[(i-1)+","+(j-1)]!=undefined && game.matrix[(i-1)+","+(j-1)].isWhite()!=game.matrix[i+","+j].isWhite()){
                if(game.matrix[(i-1)+","+(j-1)]==COIN_TYPE.PAWN) return true;
            }
        }
        if(i-1>=0 && j+1<8){
            if(game.matrix[(i-1)+","+(j+1)]!=undefined && game.matrix[(i-1)+","+(j+1)].isWhite()!=game.matrix[i+","+j].isWhite()){
                if(game.matrix[(i-1)+","+(j+1)]==COIN_TYPE.PAWN) return true;
            }
        }
    }
    return false;
}