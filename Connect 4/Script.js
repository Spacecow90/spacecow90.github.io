
var playerColour;
var canPlay = false;
var slotsFilled = new Array(7);
var curRow;
var columnFull = new Array(6);
var curColumn;
var slotTeam;
var grid = new Array(6);
let gridNum = 0;
var cord;
var currentPlayer;
var columnsFilled = 0;
var isWinner = false;

var winAudio = document.getElementById("winAudio");
var loseAudio = document.getElementById("loseAudio");
var pieceFallAudio = document.getElementById("pieceFallAudio");
var piecesCrashAudio = document.getElementById("piecesCrashAudio");

window.onload = function()
{
    //document.write("Creating 2D array <br>");
    // Loop to create 2D array using 1D array

    //makes it 1 or 2, not 0
    if (currentPlayer != 1 || currentPlayer != 2) 
    {
        currentPlayer = Math.floor( (Math.random() *2) +1);
    }
    console.log(currentPlayer);

    for(var i = 0; i < 7;i++)
    {
        slotsFilled[i] = 5; 
        console.log(slotsFilled[i]);
    }
    for (var r = 0; r < grid.length; r++) {
        grid[r] = new Array(7);
        for (var c = 0; c < 7; c++) {
            grid[r][c] = 0;

            //creates circles with ids catalogued to each row and column to be accessed easily
            let slot = document.createElement("div");
            slot.setAttribute("id", "Row" + r + "Col"+ c);
            slot.classList.add("slot");
            slot.addEventListener("click", pieceColour);
            document.getElementById("gameBoard").append(slot);
            gridNum++;
        }
    }

if(currentPlayer == 1)
{
    //Red Team goes first
    playerColour = "yellow";
    for(let i =0; i < 7; i++){
        let hoverColour = document.getElementById(i);
        hoverColour.style.backgroundColor = "yellow";
    }
    document.getElementById("playerTurn").innerHTML = "Yellow's Turn";
}
else if(currentPlayer == 2){
    //Yellow team goes first
    playerColour = "red"
            for(let i =0; i < 7; i++){
            let hoverColour = document.getElementById(i);
            hoverColour.style.backgroundColor = "red";
        }
        document.getElementById("playerTurn").innerHTML = "Red's Turn";
    //should then bring up message displaying this
}
canPlay = true;
}
//changes the team and the piece to its corresponding colour.



function charPressed (curColumn) {

    console.log("Row"+slotsFilled[curColumn]+"Col"+curColumn)
    
        //defines which team owns a slot
        grid[slotsFilled[curColumn]][curColumn] = currentPlayer;
        console.log(currentPlayer);
        curRow = 5 - slotsFilled[curColumn];
        
        //creates a search for an element with an id of the current selected column and lowest possible placement. 
        const cord = document.getElementById("Row"+slotsFilled[curColumn]+"Col"+curColumn);
    
            connect4Check(curColumn);
        
        console.log(cord);
        cord.classList.add(playerColour);
       
        //adds one to the slots filled for the current column
        
        slotsFilled[curColumn]--   
    
    //runs connect4check to see if anyone got a connect 4.

    if(slotsFilled[curColumn] < 0 && isWinner == false)
    {
        columnFull[curColumn] = true;
        columnsFilled++;
        buttonDisable = document.getElementById(curColumn);
        buttonDisable.disabled = true;
        if(columnsFilled == 7)
        {
            let playerWin = document.getElementById("winnerDisplay");
            playerWin.innerHTML = "YOU ALL LOSE"
            let gameOver = document.getElementById("gameOver");
            gameOver.style.visibility = "visible";
            document.getElementById("playerTurn").innerHTML = "Game Over";
            loseAudio.play();
            for (var i = 0; i < 6; i++) {
                for (var j = 0; j < 7; j++)    {
                    console.log(grid[i][j] + " ");
                }
                console.log("<br>");
            }
        }
    }
    
    pieceFallAudio.pause();
    pieceFallAudio.currentTime = 0;
    pieceFallAudio.play();

}

function connect4Check(curColumn) {
    pieceColour ();   
    //handles the horizontal check.
    for(let row = 0; row < 6; row++){
        for(let column = 0; column < 4; column++){
            if(grid[row][column] == grid[row][column+1] && grid[row][column+1] == grid[row][column+2] && grid[row][column+2] == grid[row][column+3] && grid[row][column] != 0){
                winner();
                
            }
        }
    }
    //handles vertical
    for(let row = 0; row < 3; row++){
        for(let column = 0; column < 6; column++){
            if(grid[row][column] == grid[row+1][column] && grid[row+1][column] == grid[row+2][column] && grid[row+2][column] == grid[row+3][column] && grid[row][column] != 0){
                winner();
               
            }
        }
    }
    //handles diagonal right top-left to lower-right
    for(let row = 0; row < 3; row++){
        for(let column = 0; column < 4; column++){
            if(grid[row][column] == grid[row+1][column+1] && grid[row+1][column+1] == grid[row+2][column+2] && grid[row+2][column+2] == grid[row+3][column+3] && grid[row][column] != 0){
                winner();
               
            }
        }
    }   
    //handles diagonal bottom-left to top-right
    for(let row = 5; row > 3; row--){
        for(let column = 0; column < 4; column++){
            if(grid[row][column] == grid[row-1][column+1] && grid[row-1][column+1] == grid[row-2][column+2] && grid[row-2][column+2] == grid[row-3][column+3] && grid[row][column] != 0){
                winner();
                

            }
        }
    }
}

function winner(){
    let playerWin = document.getElementById("winnerDisplay");
    winAudio.play();
    for(let i = 0; i < 7; i++){
        let buttons = document.getElementById(i)
        buttons.disabled = true;
    }
    if(currentPlayer == 1){
        playerWin.innerHTML = "RED WINS"
        isWinner = true;
    }
    if(currentPlayer == 2){
        playerWin.innerHTML = "YELLOW WINS"
       isWinner = true;
    }
    let gameOver = document.getElementById("gameOver");
    gameOver.style.visibility = "visible";
    document.getElementById("playerTurn").innerHTML = "Thanks for Playing :D";
}

function playAgain(){
    document.getElementById("piecesCrashAudio").play();
    var aud = document.getElementById("piecesCrashAudio");
aud.onended = function() {
  window.location.reload();
};
    

}

function pieceColour(){
    //if red become yellow, 1 on the grid is red
    if(currentPlayer == 1){
        playerColour = "yellow";
        for(let i = 0; i < 7; i++){
            let hoverColour = document.getElementById(i);
            hoverColour.style.backgroundColor = "red";
        }
        document.getElementById("playerTurn").innerHTML = "Red's Turn";
        currentPlayer = 2;
    }
    //if yellow become red 2 on the grid is yellow
    else if(currentPlayer == 2){
        playerColour = "red";
        for(let i = 0; i < 7; i++){
            let hoverColour = document.getElementById(i);
            hoverColour.style.backgroundColor = "yellow"
        }
        document.getElementById("playerTurn").innerHTML = "Yellow's Turn";
        currentPlayer = 1;
    }
    
}
