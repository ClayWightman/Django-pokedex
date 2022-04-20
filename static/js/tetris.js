$(document).ready(function(){
    var gameArea = {
        canvasElement: $("#game_canvas"),
        context: $("#game_canvas")[0].getContext("2d"),
        height: $("#game_canvas")[0].height,
        width: $("#game_canvas")[0].width,
        interval: setInterval(moveDown, 400)
    }

    function moveDown(){
        console.log("calling movedown")
        clearBoard()
        if (redSquare.yPos < 680){
            redSquare.yPos = redSquare.yPos + 40
        }else{
            clearInterval(gameArea.interval)
        }
        drawBoard()
    }

    function clearBoard(){
        gameArea.context.clearRect(0, 0, gameArea.width, gameArea.height);
    }

    var redSquare = {
        xPos: 160,
        yPos: 0,
        height: 40,
        width: 40,
        horizontal: "right"
    }

    function drawBoard(){
        gameArea.context.fillRect(redSquare.xPos, redSquare.yPos, redSquare.height, redSquare.width) 
    }

    $(document).keydown(function(event){
        if (event.keyCode == 65 && redSquare.xPos > 0){//a
            redSquare.xPos = redSquare.xPos - 40
        }else if (event.keyCode == 68 && redSquare.xPos < 360){//d
            redSquare.xPos = redSquare.xPos + 40
        }
        clearBoard()
        drawBoard()
    })
})