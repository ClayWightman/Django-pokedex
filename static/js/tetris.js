$(document).ready(function(){
    
    class GameBoard{
        constructor(){
            this.boardRep;
            this.pieceName;
            this.pieceCenter;
            this.pieceRotation;
            this.pieceColor;
        }

        /* ==========================Board funtions ============================*/
        createBoard(){
            this.boardRep = new Array(10);
            for (var i = 0; i < this.boardRep.length; i++) {
                this.boardRep[i] = new Array(20).fill([0,"blank"])
            }
        }

        printBoard(){
            var textLine = ''
            for (var y = this.boardRep[0].length-1; y >= 0; y--){
                for (var x = 0; x < this.boardRep.length; x++){
                    textLine += "[" + this.boardRep[x][y][0] + "]" + " "
                }
                console.log(textLine)
                textLine = ''
            }
        }

        removeFilledRows(){

        }

        /*===========================Piece functions ===============================*/
        addPiece(){
            //pieces = ["line", "l", "rev-l", "square", "z", "rev-z", "pyramid"]
            this.pieceName = ["line", "line", "line", "line", "line", "line", "line"][Math.floor((Math.random()*7))]
            this.pieceRotation = 0;
            this.pieceCenter = {'x': 4, 'y': 19};
            this.pieceColor = "blue"
            this.pieceLocked = false
            this.putLivePieceOnBoard()
        }

        rotatePiece(){
            if (this.pieceRotation == 3){
                this.pieceRotation = 0
            }else{
                this.pieceRotation ++
            }
        }

        moveDownBlocked(){
            for (var y = 0; y < this.boardRep[0].length; y++){
                for (var x = 0; x < this.boardRep.length; x++){
                    if (this.boardRep[x][y][0] == 1){
                        if(y == 0 || this.boardRep[x][y-1][0] == 2){
                            return true
                        }
                    }
                }
            }
            return false
        }

        moveRightBlocked(){
            for (var y = 0; y < this.boardRep[0].length; y++){
                for (var x = 0; x < this.boardRep.length; x++){
                    if (this.boardRep[x][y][0] == 1){
                        if(x == this.boardRep.length-1 || this.boardRep[x+1][y][0] == 2){
                            return true
                        }
                    }
                }
            }
            return false
        }

        moveLeftBlocked(){
            for (var y = 0; y < this.boardRep[0].length; y++){
                for (var x = 0; x < this.boardRep.length; x++){
                    if (this.boardRep[x][y][0] == 1){
                        if(x == 0 || this.boardRep[x-1][y][0] == 2){
                            return true
                        }
                    }
                }
            }
            return false
        }

        lockPiece(){
            for (var y = 0; y < this.boardRep[0].length; y++){
                for (var x = 0; x < this.boardRep.length; x++){
                    if (this.boardRep[x][y][0] == 1){
                        this.boardRep[x][y] = [2, "red"]
                        this.pieceLocked = true
                    }
                }
            }
        }

        move(direction){
            if (direction == "down"){
                if (this.moveDownBlocked()){
                    this.lockPiece()
                }else{
                    this.pieceCenter['y'] -= 1
                }
            }else if (direction == "left"){
                if (!this.moveLeftBlocked()){
                    this.pieceCenter['x'] -= 1
                }
            }else if (direction == "right"){
                if (!this.moveRightBlocked()){
                    this.pieceCenter['x'] += 1
                }
            }
            this.clearOldLivePiece()
            this.putLivePieceOnBoard()
        }

        clearOldLivePiece(){
            for (var y = 0; y < this.boardRep[0].length; y++){
                for (var x = 0; x < this.boardRep.length; x++){
                    if (this.boardRep[x][y][0] == 1){
                        this.boardRep[x][y] = [0, "blank"]
                    }
                }
            }
        }

        putLivePieceOnBoard(){
            var centerX = this.pieceCenter['x']
            var centerY = this.pieceCenter['y']
            var board = this.boardRep
            var fillValue = [1, this.pieceColor]
            var rotation = this.pieceRotation
            if (!this.pieceLocked){
                if (this.pieceName == "line"){
                    if (rotation == 0){
                        board[centerX-1][centerY] = fillValue
                        board[centerX][centerY] = fillValue
                        board[centerX+1][centerY] = fillValue
                        board[centerX+2][centerY] = fillValue
                    }else if (rotation == 1){
                        board[centerX][centerY+1] = fillValue
                        board[centerX][centerY] = fillValue
                        board[centerX][centerY-1] = fillValue
                        board[centerX][centerY-2] = fillValue
                    }else if (rotation == 2){
                        board[centerX-2][centerY] = fillValue
                        board[centerX-1][centerY] = fillValue
                        board[centerX][centerY] = fillValue
                        board[centerX+1][centerY] = fillValue
                    }else if (rotation == 3){
                        board[centerX][centerY+2] = fillValue
                        board[centerX][centerY+1] = fillValue
                        board[centerX][centerY] = fillValue
                        board[centerX][centerY-1] = fillValue
                    }
                }else if (this.pieceName == "l"){
                    if (rotation == 0){
                        board[centerX-1][centerY+1] = fillValue
                        board[centerX-1][centerY] = fillValue
                        board[centerX][centerY] = fillValue
                        board[centerX+1][centerY] = fillValue
                    }else if (rotation == 1){
                        board[centerX][centerY+1] = fillValue
                        board[centerX+1][centerY+1] = fillValue
                        board[centerX][centerY] = fillValue
                        board[centerX][centerY-1] = fillValue
                    }else if (rotation == 2){
                        board[centerX-1][centerY] = fillValue
                        board[centerX][centerY] = fillValue
                        board[centerX+1][centerY] = fillValue
                        board[centerX+1][centerY-1] = fillValue
                    }else if (rotation == 3){
                        board[centerX-1][centerY-1] = fillValue
                        board[centerX][centerY-1] = fillValue
                        board[centerX][centerY] = fillValue
                        board[centerX][centerY+1] = fillValue   
                    }
                }else if (this.pieceName == "rev-l"){
                    if (rotation == 0){
                        board[centerX-1][centerY] = fillValue   
                        board[centerX][centerY] = fillValue   
                        board[centerX+1][centerY] = fillValue   
                        board[centerX+1][centerY+1] = fillValue
                    }else if (rotation == 1){
                        board[centerX][centerY+1] = fillValue   
                        board[centerX][centerY] = fillValue   
                        board[centerX][centerY-1] = fillValue   
                        board[centerX+1][centerY-1] = fillValue
                    }else if (rotation == 2){
                        board[centerX-1][centerY] = fillValue   
                        board[centerX][centerY] = fillValue   
                        board[centerX+1][centerY] = fillValue   
                        board[centerX+1][centerY-1] = fillValue
                    }else if (rotation == 3){
                        board[centerX-1][centerY-1] = fillValue   
                        board[centerX][centerY-1] = fillValue   
                        board[centerX][centerY] = fillValue   
                        board[centerX][centerY+1] = fillValue
                    }
                }else if (this.pieceName == "square"){
                    if (rotation == 0){
                        
                    }else if (rotation == 1){

                    }else if (rotation == 2){

                    }else if (rotation == 3){
                        
                    }
                }else if (this.pieceName == "z"){
                    if (rotation == 0){
                        
                    }else if (rotation == 1){

                    }else if (rotation == 2){

                    }else if (rotation == 3){
                        
                    }
                }else if (this.pieceName == "rev-z"){
                    if (rotation == 0){
                        
                    }else if (rotation == 1){

                    }else if (rotation == 2){

                    }else if (rotation == 3){
                        
                    }
                }else if (this.pieceName == "pyramid"){
                if (rotation == 0){
                        
                }else if (rotation == 1){

                }else if (rotation == 2){

                }else if (rotation == 3){
                    
                }       
            }
        }
    }
}
    game = new GameBoard()
    game.createBoard()
    game.addPiece()
    moveDownInterval = setInterval(function(){
        game.move("down")
        if (game.pieceLocked){
            game.addPiece()
        }
        //game.printBoard()
    }, 500)
    document.addEventListener("keydown",function(event){
        if (event.key === "a"){
            game.move("left")
        }
        if (event.key === "s"){
            game.move("down")
        }
        if (event.key === "d"){
            game.move("right")
        }
        if (event.key === " "){
            game.rotatePiece()
        }
    })
    

    


    canvas = $("#game_canvas")[0]
    ctx = canvas.getContext("2d")
    drawOnCanvasInterval = setInterval(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "green"
        ctx.fillRect(0,0,40,40)
        for (var y = 0; y < game.boardRep[0].length; y++){
            for (var x = 0; x < game.boardRep.length; x++){
                xPos = x * 40
                yPos = canvas.height-((y+1) * 40)
                if (game.boardRep[x][y][0] == 1 || game.boardRep[x][y][0] == 2){
                    ctx.fillStyle = game.boardRep[x][y][1]
                    ctx.fillRect(xPos, yPos, 40, 40)
                }
            }
        }
    }, 20)
    
})