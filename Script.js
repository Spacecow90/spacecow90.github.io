//the text name of the colour playing
var playerColour;
//checks how many slots from bottom to top that are full for each column
var slotsFilled = new Array(7);
//the current column being played in
var curColumn;
//the game grid in array format
var grid = new Array(6);
let gridNum = 0;
var cord;
//is the value of 1 or 2 corresponding with each team.
var currentPlayer;
//the number of filled columns in the grid
var columnsFilled = 0;
//if is winner becomes true, the game ends
var isWinner = false;
//variables defining all of the audio elements present on the site
//Leszek Szary. (2021, 05, August). Success 1. [audio file] in Pixabay. Retrieved from https://pixabay.com/sound-effects/f6-102819/
var winAudio = document.getElementById("winAudio");
//themusicalnomad. (2021, 05, August). Negative Beeps. [audio file] in Pixabay. Retrieved from https://pixabay.com/sound-effects/f6-102819/ 
var loseAudio = document.getElementById("loseAudio");
var pieceFallAudio = document.getElementById("pieceFallAudio");
var piecesCrashAudio = document.getElementById("piecesCrashAudio");

//function runs when the page opens
window.onload = function()
{
    //document.write("Creating 2D array <br>");
    // Loop to create 2D array using 1D array

    //makes it 1 or 2, not 0
    if (currentPlayer != 1 || currentPlayer != 2) 
    {
        currentPlayer = Math.floor( (Math.random() *2) +1);
    }
    //console.log(currentPlayer);

    //fills the slotfilled array with values of 5, meaning that the current lowest slot is one less.
    for(var i = 0; i < 7;i++)
    {
        slotsFilled[i] = 5; 
        //console.log(slotsFilled[i]);
    }
    // Loop to create 2D array using 1D arrays
    for (var r = 0; r < grid.length; r++) {
        //fills each index of the grid array with a new array
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
//if the random number was 1 then yellow goes first
if(currentPlayer == 1)
{
    //Yellow Team goes first
    playerColour = "yellow";
    //changes the colour of ghost buttons above each column
    for(let i =0; i < 7; i++){
        let hoverColour = document.getElementById(i);
        hoverColour.style.backgroundColor = "yellow";
    }
    document.getElementById("playerTurn").innerHTML = "Yellow's Turn";
}
//if the random number was 2 then red goes first
else if(currentPlayer == 2){
    //Red team goes first
    playerColour = "red"
            //changes the colour of ghost buttons above each column
            for(let i =0; i < 7; i++){
            let hoverColour = document.getElementById(i);
            hoverColour.style.backgroundColor = "red";
        }
        document.getElementById("playerTurn").innerHTML = "Red's Turn";
    //should then bring up message displaying this
}
}
//changes the team and the piece to its corresponding colour.



function charPressed (curColumn) {

    //console.log("Row"+slotsFilled[curColumn]+"Col"+curColumn)
    
        //defines which team owns a slot
        grid[slotsFilled[curColumn]][curColumn] = currentPlayer;
        //console.log(currentPlayer);
        
        //creates a search for an element with an id of the current selected column and lowest possible placement. 
        const cord = document.getElementById("Row"+slotsFilled[curColumn]+"Col"+curColumn);
            //runs connect4check to see if anyone got a connect 4.
            connect4Check(curColumn);
        
        //console.log(cord);
        cord.classList.add(playerColour);
       
        //adds one to the slots filled for the current column
        
        slotsFilled[curColumn]--   
    
    //if the column is filled and no one has won yet, do the following;
    if(slotsFilled[curColumn] < 0 && isWinner == false)
    {
        //adds one to the amount of columnsFilled
        columnsFilled++;
        //disables the button relating to the current column
        buttonDisable = document.getElementById(curColumn);
        buttonDisable.disabled = true;
        //if columns filled is 7, then all columns are filled, this means the game is over, do the following;
        if(columnsFilled == 7)
        {
            //displays that everyone loses.
            let playerWin = document.getElementById("winnerDisplay");
            playerWin.innerHTML = "YOU ALL LOSE"
            let gameOver = document.getElementById("gameOver");
            gameOver.style.visibility = "visible";
            document.getElementById("playerTurn").innerHTML = "Game Over";
            //themusicalnomad. (2021, 05, August). Negative Beeps. [audio file] in Pixabay. Retrieved from https://pixabay.com/sound-effects/f6-102819/ 
            loseAudio.play();
            
        }
    }
    //resets the sound files so that a new sound can be played before the other finishes.
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
//used to display when someoene wins
function winner(){
    let playerWin = document.getElementById("winnerDisplay");
    //plays the win sound effect
    //Leszek Szary. (2021, 05, August). Success 1. [audio file] in Pixabay. Retrieved from https://pixabay.com/sound-effects/f6-102819/
    winAudio.play();
    //disables all the buttons
    for(let i = 0; i < 7; i++){
        let buttons = document.getElementById(i)
        buttons.disabled = true;
    }
    //displays if Red won
    if(currentPlayer == 1){
        playerWin.innerHTML = "RED WINS"
        isWinner = true;
    }
    //displays if Yellow won
    if(currentPlayer == 2){
        playerWin.innerHTML = "YELLOW WINS"
       isWinner = true;
    }
    let gameOver = document.getElementById("gameOver");
    gameOver.style.visibility = "visible";
    //thanks for playing!
    document.getElementById("playerTurn").innerHTML = "Thanks for Playing :D";
}
//when a player presses the play again button this happens;
function playAgain(){
    //the pieces crashing of a connect 4 board being reset plays
    document.getElementById("piecesCrashAudio").play();
    //makes the page reload wait until the sound has finished playing
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
        //swaps all values to change to the other colour
        currentPlayer = 2;
    }
    //if yellow become red, 2 on the grid is yellow
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
