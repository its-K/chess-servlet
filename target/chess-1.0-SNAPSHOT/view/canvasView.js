
function CanvasGame(){
    this.windowWidth=window.innerWidth;
    this.windowHeight=window.innerHeight;
    this.perBoxHeightWidth=0;
    this.coinSize=0;
    this.container=undefined;
}

CanvasGame.prototype.createBoard=function(container){
    this.container=container;
    this.setWindowHeightWidth();
    this.calculateBoardSize();
    this.container.innerHTML = '<canvas class="chessboard" id="mycanvas" width="'+this.windowWidth+'" height="'+this.windowHeight+'" style="display: block;margin-top: 20px;background-color: green;"></canvas>';
    this.container.insertAdjacentHTML('beforeend','<button style="margin-left:45%;margin-top:10px" onclick="game.undoMove()">Undo</button> <button onclick="game.redoMove()">Redo</button>');
    var canvas=document.getElementById('mycanvas');
    var ctx=canvas.getContext('2d');

    for(var i=0;i<8;i++){
        for(var j=0;j<8;j++){
            var color=((i+j)%2==0) ? "white":"grey";
            ctx.fillStyle=color;
            ctx.fillRect(i*this.perBoxHeightWidth,j*this.perBoxHeightWidth,this.perBoxHeightWidth,this.perBoxHeightWidth);
        }
    }

    this.placePieces()
    this.attachListeners();
}

CanvasGame.prototype.calculateBoardSize=function(){
    if(this.windowHeight<=900 && this.windowWidth<=900){
        var minValue=(this.windowHeight>this.windowWidth) ? this.windowWidth:this.windowHeight;
        minValue-=80;
        var outerBox=Math.round(minValue/8)*8;
        this.windowHeight=outerBox;
        this.windowWidth=outerBox;
        this.perBoxHeightWidth=outerBox/8;
        this.coinSize=Math.round(this.perBoxHeightWidth/10)*6;
    }
    else{
        this.windowHeight=800;
        this.windowWidth=800;
        this.perBoxHeightWidth=100;
        this.coinSize=Math.round(this.perBoxHeightWidth/10)*6;
    }
}

CanvasGame.prototype.setWindowHeightWidth=function(){
    this.windowHeight=window.innerHeight;
    this.windowWidth=window.innerWidth;
}

CanvasGame.prototype.placePieces=function(){
    for(key in game.matrix){
        var element=game.matrix[key];
        this.setPiece(element);
    }
}

CanvasGame.prototype.setPiece=function(coin){
    var canvas=document.getElementById('mycanvas');
    var ctx=canvas.getContext('2d');
    var piece=getPieceUrl(coin.coinType,coin.isWhite());
    var pos=coin.position;
    ctx.font=this.coinSize+"px Aerial";
    ctx.fillStyle="black";
    ctx.fillText(piece,pos[1]*this.perBoxHeightWidth+((this.perBoxHeightWidth/100)*25),pos[0]*this.perBoxHeightWidth+((this.perBoxHeightWidth/100)*65));
}

CanvasGame.prototype.attachListeners=function(){
    var canvas=document.getElementById('mycanvas');
    var view=this;
    canvas.addEventListener('click', function(e) {
        view.getCursorPosition(canvas, e);
    });
}

CanvasGame.prototype.getCursorPosition=function(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x =Math.round(event.clientX - rect.left);
    const y =Math.round(event.clientY - rect.top);
    pos=this.getMatrixPosition(x,y);
    this.selectAndHighlightPiece(pos)
}

CanvasGame.prototype.getMatrixPosition=function(x,y){
    let a=0;
    let b=0;
    for(let i=0;i<8*this.perBoxHeightWidth;i+=this.perBoxHeightWidth){
        for(let j=0;j<8*this.perBoxHeightWidth;j+=this.perBoxHeightWidth){
            if(x>=i && x<=i+this.perBoxHeightWidth && y>=j && y<=j+this.perBoxHeightWidth){
                return [b,a];
            }
            b++;
        }
        a++;
        b=0;
    }
    return [b,a];
}

CanvasGame.prototype.selectAndHighlightPiece=function(position){
    if(game.selectedPiece==undefined){
        var pos=position;
        if(game.selectPiece(parseInt(pos[0]),parseInt(pos[1]))){
            this.highlightPiece(game.selectedPiece,pos[0],pos[1]);
            this.highlightPossibleMoves(game.selectedPiece.getPossibleMoves())
        }
    }
    else if(game.selectedPiece==game.matrix[position[0]+","+position[1]]){
        this.createBoard(this.container);
        game.clearSelectedPiece();
    }
    else{
        this.movePiece(position);
    }
}

CanvasGame.prototype.highlightPiece=function(coin,x,y){
    var canvas=document.getElementById('mycanvas');
    var ctx=canvas.getContext('2d');
    var piece="";
    if(coin!=undefined) piece=getPieceUrl(coin.coinType,coin.isWhite());

    ctx.fillStyle="green";
    ctx.fillRect(y*this.perBoxHeightWidth,x*this.perBoxHeightWidth,this.perBoxHeightWidth,this.perBoxHeightWidth);
    ctx.font=this.coinSize+"px Aerial";
    ctx.fillStyle="black";
    ctx.fillText(piece,y*this.perBoxHeightWidth+((this.perBoxHeightWidth/100)*25),x*this.perBoxHeightWidth+((this.perBoxHeightWidth/100)*65));
}

CanvasGame.prototype.highlightPossibleMoves=function(possibleMoves){
    possibleMoves.forEach(move => {
        var piece=game.matrix[move[0]+","+move[1]];
        this.highlightPiece(piece,move[0],move[1]);
    });
}

CanvasGame.prototype.movePiece=function(position){
    var pos=position
    if(game.moveSelectedPiece(pos[0],pos[1])){
        this.createBoard(this.container);
    }
}