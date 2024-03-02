const moves = ["ROCK","PAPER","SCISSORS"]

//Generate computer move at random
function getComputerMove(){
    return moves[getRandInt(3)];
}

//getRandInt(n) returns rand int between 0 and n-1
function getRandInt(end,start=0){
    return start+Math.floor(Math.random()*(end-start));
}

//Prompt the user to chose a move
function getPlayerMove(){
    //Capitalize the string to make comparison easier 
    let move=prompt("ROCK, PAPER, SCISSORS...").toUpperCase();
    //If the input is not in the allowed moves tell the user to chose again
    while(!moves.includes(move)){
        alert("Try again!")
        move=prompt("ROCK, PAPER, SCISSORS...").toUpperCase();
    }
    return move;
}

//Play one round
function playRound(){
    let playerMove=getPlayerMove();
    let computerMove=getComputerMove();
    if(playerMove==="ROCK"){
        if(computerMove==="PAPER"){
            return "You Lose! Paper beats Rock";
        }if(computerMove==="SCISSORS"){
            return "You Win! Rock beats Scissors";
        }else{
            return "It's a Tie!";
        }
    }if(playerMove==="PAPER"){
        if(computerMove==="SCISSORS"){
            return "You Lose! Scissors beats Paper";
        }if(computerMove==="ROCK"){
            return "You Win! Paper beats Rock";
        }else{
            return "It's a Tie!";
        }
    }else{
        if(computerMove==="ROCK"){
            return "You Lose! Rock beats Scissors";
        }if(computerMove==="PAPER"){
            return "You Win! Scissors beats Paper";
        }else{
            return "It's a Tie!";
        }
    }
}

//Play a game with n rounds, use default value n=5
function playGame(rounds=5){
    //Tell the user the game is about to start
    alert(
        `Let's Play Rock Paper Scissors!\n
        The Best Out of ${rounds} Wins.\n
        Are You Ready?`
    )
    let i=0;
    let score=0;
    //If one of the players win 3 games stop the game and show the result 
    while(Math.abs(score) < rounds-i){
        result = playRound();
        if(result.includes("Win")){
            score++
        }if(result.includes("Lose")){
            score-- 
        }
        i++
        alert(result);
    }
    if(score > 0){
        return "Game Over. You Win!";
    }if(score < 0){
        return "Game Over. You Lose!";
    }else{
        return "Game Over. It's a Tie!"
    }
}
