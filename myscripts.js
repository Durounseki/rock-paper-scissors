//Computer move selection unaltered

const moves = ["ROCK","PAPER","SCISSORS"]

//Generate computer move at random
function getComputerMove(){
    return moves[getRandInt(3)];
}

//getRandInt(n) returns rand int between 0 and n-1
function getRandInt(end,start=0){
    return start+Math.floor(Math.random()*(end-start));
}

//Show number of rounds
const rounds = document.querySelector('#rounds');
const round = document.querySelector('#round');
const roundLabel = document.querySelector('label');
round.textContent = '5';    //Default number of rounds
let totalRounds = +round.textContent;

rounds.addEventListener('input',() => rounds.value == ''? round.textContent = '5': round.textContent = rounds.value); //Change number of rounds

//Start the game
const instructions = document.querySelector('.instructions');
const scores = document.querySelector('.scores')
const playerScore = document.querySelector('.player-score p');
playerScore.textContent = '0';
const computerScore = document.querySelector('.computer-score p');
computerScore.textContent = '0';
const roundCount = document.querySelector('.round-count p');
let currentRound = 1;
roundCount.textContent = currentRound + "/" + totalRounds;
const controls = document.querySelector('.controls');
const startBtn = document.querySelector('#start');

startBtn.addEventListener('click',startGame);

function startGame(){
    //Hide rounds input
    roundLabel.style.display = 'none';
    rounds.style.display = 'none';
    //Show scores
    scores.style.display = 'flex';
    //Change text in start button
    startBtn.textContent = 'RESTART';
    //Show extra instructions
    let instruction = document.createElement('p');
    instruction.textContent = 'Make a move...'
    instructions.appendChild(instruction);
    //Show options
    controls.style.display = 'flex';
}

//Chose move

const playerMoves = document.querySelectorAll('.controls button');
const resultContainer = document.querySelector('.game-result');
const result = document.querySelector('.game-result p');
// const rock = document.querySelector('#rock');
// const paper = document.querySelector('#paper');
// const scissors = document.querySelector('#scissors');

playerMoves.forEach( (button) => {
    button.addEventListener('click', () => {
        result.textContent = playRound(button.textContent);
        // console.log(button.textContent);
    });
});


//Prompt the user to chose a move
function getPlayerMove(button){
    return button.textContent;
}

//Play one round
function playRound(playerMove){
    let computerMove=getComputerMove();
    console.log(computerMove);
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
    //If one of the players win floor(n/2)+1 games stop the game and show the result 
    while(Math.abs(score) <= rounds-i && rounds-i > 0){
        result = playRound(i+1);
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