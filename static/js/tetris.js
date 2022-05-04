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
                    textLine = textLine +  "[" + this.boardRep[x][y][0] + "]" + " "
                }
                console.log(textLine)
                textLine = ''
            }
        }

        removeFilledRows(){
            var touchedBlocks = false
            var emptyRowCount = 0
            var replacementRows = {}
            //TODO GET TOUCHED BLOCKS
            for(var y = 0; y < this.boardRep[0].length; y++){   //Set up the fill in row and empty the full rows
                replacementRows[y] = y
                var rowTotal = 0;
                var rowAboveTotal = 0
                for (var x = 0; x < this.boardRep.length; x++){
                    rowTotal = rowTotal + this.boardRep[x][y][0]
                    if (y == this.boardRep[0].length-1){
                        rowAboveTotal = 0
                    }else{
                        rowAboveTotal = rowAboveTotal + this.boardRep[x][y+1][0]
                    }
                }
                if (rowTotal == 20){    //Empty the full rows
                    if (!rowAboveTotal == 0){ //if first row to empty is not the top row
                        emptyRowCount ++
                    }
                    for (var x = 0; x < this.boardRep.length; x++){
                        this.boardRep[x][y] = [0, 'blank']
                    }
                }
            }
            if (emptyRowCount > 0){
                for (var y = this.boardRep[0].length-1; y > 0; y--){
                    var rowTotal = 0
                    var underRowTotal = 0
                    for ( var x = 0; x < this.boardRep.length; x++){
                        rowTotal = rowTotal + this.boardRep[x][y][0]
                        underRowTotal = underRowTotal + this.boardRep[x][y-1][0]
                    }
                    if (rowTotal > 0){
                        touchedBlocks = true
                    }
                    if (y + emptyRowCount > this.boardRep[0].length-1){
                        replacementRows[y] = "blank"
                        replacementRows[y-emptyRowCount] = y
                    } else{
                        if (emptyRowCount > 0 && touchedBlocks){
                            if (rowTotal == 0){
                                emptyRowCount --    
                            }else{
                                replacementRows[y-emptyRowCount] = y
                            }
                        }else{
                            replacementRows[y-emptyRowCount] = y
                        }
                    }
                }
                this.redrawClearedBoard(replacementRows)
            }
        }


        redrawClearedBoard(replacementRows){
            for (var currentInx = 0; currentInx < Object.keys(replacementRows).length; currentInx ++){
                var replaceInx = replacementRows[currentInx]
                for (var x = 0; x < this.boardRep.length; x++){
                    if (replacementRows[currentInx] == "blank"){
                        this.boardRep[x][currentInx] = [0, "blank"]
                    }else{
                        this.boardRep[x][currentInx] = this.boardRep[x][replaceInx]
                    }
                }
            }
        }

        /*===========================Piece functions ===============================*/
        addPiece(){
            var pieces = ["line", "l", "rev-l", "square", "z", "rev-z", "pyramid"]
            var colors = ["red", "blue", "green", "yellow", "orange", "purple"]
            //var pieces = ["line", "line", "line", "line", "line", "line", "line"]
            this.pieceName = pieces[Math.floor((Math.random()*7))]
            this.pieceRotation = 0;
            this.pieceCenter = {'x': 4, 'y': 19};
            this.pieceColor = colors[Math.floor(Math.random() * 6)]
            this.pieceLocked = false
            this.putLivePieceOnBoard()
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
                        this.boardRep[x][y] = [2, this.pieceColor]
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
                    this.pieceCenter['y'] --
                }
            }else if (direction == "left"){
                if (!this.moveLeftBlocked()){
                    this.pieceCenter['x'] --
                }
            }else if (direction == "right"){
                if (!this.moveRightBlocked()){
                    this.pieceCenter['x'] ++ 
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

        rotatePiece(){
            if (this.canRotatePiece()){
                if (this.pieceRotation == 3){
                    this.pieceRotation = 0
                }else{
                    this.pieceRotation ++
                }
                this.clearOldLivePiece()
                this.putLivePieceOnBoard()
            }
        }

        canRotatePiece(){
            var centerX = this.pieceCenter['x']
            var centerY = this.pieceCenter['y']
            var board = this.boardRep

            if (this.pieceRotation == 3){
                var rotation = 0
            }else{
                var rotation = this.pieceRotation + 1
            }
            if (!this.pieceLocked){
                if (this.pieceName == "line"){
                    if (rotation == 0){
                        if (board[centerX-1][centerY-1][0] == 2 || board[centerX][centerY][0] == 2 || board[centerX+1][centerY][0] == 2 || board[centerX+2][centerY][0] == 2){
                            return false
                        }
                    }else if (rotation == 1){
                        if (board[centerX][centerY+1][0] == 2 || board[centerX][centerY][0] == 2 || board[centerX][centerY-1][0] == 2 || board[centerX][centerY-2][0] == 2){
                            return false
                        }
                    }else if (rotation == 2){
                        if(board[centerX-2][centerY][0] == 2 || board[centerX-1][centerY][0] == 2 || board[centerX][centerY][0] == 2 || board[centerX+1][centerY][0] == 2){
                            return false
                        }
                    }else if (rotation == 3){
                        if(board[centerX][centerY+2][0] == 2 || board[centerX][centerY+1][0] == 2 || board[centerX][centerY][0] == 2 || board[centerX][centerY-1][0] == 2){
                            return false
                        }
                    }
                }else if (this.pieceName == "l"){
                    if (rotation == 0){
                        if(board[centerX-1][centerY][0] == 2 || board[centerX][centerY][0] == 2 || board[centerX+1][centerY][0] == 2 || board[centerX+1][centerY+1][0] == 2){
                            return false
                        }
                    }else if (rotation == 1){
                        if(board[centerX][centerY+1][0] == 2 || board[centerX][centerY][0] == 2 || board[centerX][centerY-1][0] == 2 || board[centerX+1][centerY-1][0] == 2){
                            return false
                        }
                    }else if (rotation == 2){
                        if(board[centerX-1][centerY-1][0] == 2 || board[centerX-1][centerY][0] == 2 || board[centerX][centerY][0] == 2 || board[centerX+1][centerY][0] == 2){
                            return false
                        }
                    }else if (rotation == 3){
                        if(board[centerX-1][centerY+1][0] == 2 || board[centerX][centerY+1][0] == 2 || board[centerX][centerY][0] == 2 || board[centerX][centerY-1][0] == 2){
                            return false 
                        }
                    }
                }else if (this.pieceName == "rev-l"){
                    if (rotation == 0){
                        if(board[centerX-1][centerY+1][0] == 2 || board[centerX-1][centerY][0] == 2 || board[centerX][centerY][0] == 2 || board[centerX+1][centerY][0] == 2){
                            return false
                        }
                    }else if (rotation == 1){
                        if(board[centerX][centerY+1][0] == 2 || board[centerX+1][centerY+1][0] == 2 || board[centerX][centerY][0] == 2 || board[centerX][centerY-1][0] == 2){
                            return false
                        }
                    }else if (rotation == 2){
                        if(board[centerX-1][centerY][0] == 2 || board[centerX][centerY][0] == 2 || board[centerX+1][centerY][0] == 2 || board[centerX+1][centerY-1][0] == 2){
                            return false
                        }
                    }else if (rotation == 3){
                        if(board[centerX-1][centerY-1][0] == 2 || board[centerX][centerY-1][0] == 2 || board[centerX][centerY][0] == 2 || board[centerX][centerY+1][0] == 2){
                            return false
                        } 
                    }
                }else if (this.pieceName == "square"){
                    return true
                }else if (this.pieceName == "z"){
                    if (rotation == 0 || rotation == 2){
                        if(board[centerX-1][centerY+1][0] == 2 || board[centerX][centerY+1][0] == 2 || board[centerX][centerY][0] == 2 || board[centerX+1][centerY][0] == 2){
                            return false 
                        }
                    }else if (rotation == 1 || rotation == 3){
                        if(board[centerX+1][centerY+1][0] == 2 || board[centerX+1][centerY][0] == 2 || board[centerX][centerY][0] == 2 || board[centerX][centerY-1][0] == 2){
                            return false
                        }
                    }
                }else if (this.pieceName == "rev-z"){
                    if (rotation == 0 || rotation == 2){
                        if(board[centerX-1][centerY][0] == 2 || board[centerX][centerY][0] == 2 || board[centerX][centerY+1][0] == 2 || board[centerX+1][centerY+1][0] == 2){
                            return false
                        }
                    }else if (rotation == 1 || rotation == 3){
                        if(board[centerX][centerY+1][0] == 2 || board[centerX][centerY][0] == 2 || board[centerX+1][centerY][0] == 2 || board[centerX+1][centerY-1][0] == 2){
                            return false
                        }
                    }
                }else if (this.pieceName == "pyramid"){
                    if (rotation == 0){
                        if(board[centerX-1][centerY][0] == 2 || board[centerX][centerY][0] == 2 || board[centerX][centerY+1][0] == 2 || board[centerX+1][centerY][0] == 2){
                            return false
                        }
                    }else if (rotation == 1){
                        if(board[centerX][centerY+1][0] == 2 || board[centerX][centerY][0] == 2 || board[centerX+1][centerY][0] == 2 || board[centerX][centerY-1][0] == 2){
                            return false
                        }
                    }else if (rotation == 2){
                        if(board[centerX-1][centerY][0] == 2 || board[centerX][centerY][0] == 2 || board[centerX+1][centerY][0] == 2 || board[centerX][centerY-1][0] == 2){
                            return false
                        }
                    }else if (rotation == 3){
                        if(board[centerX-1][centerY][0] == 2 || board[centerX][centerY][0] == 2 || board[centerX][centerY+1][0] == 2 || board[centerX][centerY-1][0] == 2){
                            return false
                        }
                    }   
                }
                return true
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
                        board[centerX-1][centerY-1] = fillValue   
                        board[centerX-1][centerY] = fillValue   
                        board[centerX][centerY] = fillValue   
                        board[centerX+1][centerY] = fillValue
                    }else if (rotation == 3){
                        board[centerX-1][centerY+1] = fillValue   
                        board[centerX][centerY+1] = fillValue   
                        board[centerX][centerY] = fillValue   
                        board[centerX][centerY-1] = fillValue
                    }
                }else if (this.pieceName == "rev-l"){
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
                }else if (this.pieceName == "square"){
                    board[centerX-1][centerY] = fillValue
                    board[centerX][centerY] = fillValue
                    board[centerX-1][centerY-1] = fillValue
                    board[centerX][centerY-1] = fillValue
                }else if (this.pieceName == "z"){
                    if (rotation == 0 || rotation == 2){
                        board[centerX-1][centerY+1] = fillValue
                        board[centerX][centerY+1] = fillValue
                        board[centerX][centerY] = fillValue
                        board[centerX+1][centerY] = fillValue
                    }else if (rotation == 1 || rotation == 3){
                        board[centerX+1][centerY+1] = fillValue
                        board[centerX+1][centerY] = fillValue
                        board[centerX][centerY] = fillValue
                        board[centerX][centerY-1] = fillValue
                    }
                }else if (this.pieceName == "rev-z"){
                    if (rotation == 0 || rotation == 2){
                        board[centerX-1][centerY] = fillValue
                        board[centerX][centerY] = fillValue
                        board[centerX][centerY+1] = fillValue
                        board[centerX+1][centerY+1] = fillValue
                    }else if (rotation == 1 || rotation == 3){
                        board[centerX][centerY+1] = fillValue
                        board[centerX][centerY] = fillValue
                        board[centerX+1][centerY] = fillValue
                        board[centerX+1][centerY-1] = fillValue
                    }
                }else if (this.pieceName == "pyramid"){
                if (rotation == 0){
                    board[centerX-1][centerY] = fillValue
                    board[centerX][centerY] = fillValue
                    board[centerX][centerY+1] = fillValue
                    board[centerX+1][centerY] = fillValue
                }else if (rotation == 1){
                    board[centerX][centerY+1] = fillValue
                    board[centerX][centerY] = fillValue
                    board[centerX+1][centerY] = fillValue
                    board[centerX][centerY-1] = fillValue
                }else if (rotation == 2){
                    board[centerX-1][centerY] = fillValue
                    board[centerX][centerY] = fillValue
                    board[centerX+1][centerY] = fillValue
                    board[centerX][centerY-1] = fillValue
                }else if (rotation == 3){
                    board[centerX-1][centerY] = fillValue
                    board[centerX][centerY] = fillValue
                    board[centerX][centerY+1] = fillValue
                    board[centerX][centerY-1] = fillValue  
                }       
            }
        }
    }
    gameOver(){
        if (this.boardRep[3][19][0] == 2 || this.boardRep[4][19][0] == 2 || this.boardRep[5][19][0] == 2 || this.boardRep[6][19][0] == 2){
            return true
        }else{
            return false
        }
    }
}
    game = new GameBoard()
    game.createBoard()
    game.addPiece()
    moveDownInterval = setInterval(function(){
        game.move("down")
        game.removeFilledRows()
        if (game.pieceLocked){
            if (game.gameOver()){
                writeGameoverToCanvas()
                clearInterval(moveDownInterval)
                clearInterval(drawOnCanvasInterval)
            }else{
                game.addPiece()
            }
        }
    }, 500)
    document.getElementById("a-btn").addEventListener("click", function(){game.move("left")})
    document.getElementById("s-btn").addEventListener("click", function(){game.move("down")})
    document.getElementById("d-btn").addEventListener("click", function(){game.move("right")})
    document.getElementById("space-btn").addEventListener("click", function(){game.rotatePiece()})

    document.addEventListener("keydown",function(event){
        if (event.key.toUpperCase() === "A"){
            game.move("left")
        }
        if (event.key.toUpperCase() === "S"){
            game.move("down")
        }
        if (event.key.toUpperCase() === "D"){
            game.move("right")
        }
        if (event.key === " "){
            game.rotatePiece()
        }
    })
    

    function writeGameoverToCanvas(){
        var canvas = $("#game_canvas")[0]
        var ctx = canvas.getContext("2d")
        ctx.fillStyle = "red"
        ctx.strokeStyle = "black"
        ctx.font = "60px Arial"
        ctx.lineWidth = 2
        ctx.strokeText("Game Over", 40, 50)
        ctx.fillText("Game Over", 40, 50)
        ctx.strokeText("You Suck", 60, 700)
        ctx.fillText("You Suck", 60, 700)
    }


    var canvas = $("#game_canvas")[0]
    var ctx = canvas.getContext("2d")
    drawOnCanvasInterval = setInterval(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var y = 0; y < game.boardRep[0].length; y++){
            for (var x = 0; x < game.boardRep.length; x++){
                xPos = x * 40
                yPos = canvas.height-((y+1) * 40)
                if (game.boardRep[x][y][0] == 0){
                    ctx.strokeStyle = "gray"
                    ctx.lineWidth = .3
                    //ctx.setLineDash([5, 15]);
                    ctx.strokeRect(xPos, yPos, 40, 40)
                }
                if (game.boardRep[x][y][0] == 1 || game.boardRep[x][y][0] == 2){
                    ctx.fillStyle = game.boardRep[x][y][1]
                    ctx.fillRect(xPos, yPos, 40, 40)
                    ctx.lineWidth = 2
                    ctx.strokeStyle = "black"
                    ctx.strokeRect(xPos, yPos, 40, 40)
                }
            }
        }
    }, 20)
    
})