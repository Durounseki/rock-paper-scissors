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
rounds.addEventListener('input',() => rounds.value == ''? round.textContent = '5': round.textContent = rounds.value); //Change number of rounds

//Start the game
const instructions = document.querySelector('.instructions');
const scores = document.querySelector('.scores')
const playerScoreContainer = document.querySelector('.player-score p');
const computerScoreContainer = document.querySelector('.computer-score p');
const roundCount = document.querySelector('.round-count p');
const controls = document.querySelector('.controls');
const startBtn = document.querySelector('#start');
const playerMoves = document.querySelectorAll('.controls button');
const resultContainer = document.querySelector('.game-result');
const result = document.querySelector('.game-result p');

//State of the game
const gameState = {
    playerScore: 0,
    computerScore: 0,
    currentRound: 1,
    totalRounds: +round.textContent,
    controlsEnable: false
};

startBtn.addEventListener('click',startGame);

function playGame(event){
    if(gameState.controlsEnable){
        updateScore(event,gameState);
        endOfGameCondition(gameState);
        if(gameState.currentRound<gameState.totalRounds){
            gameState.currentRound++;
        }
        roundCount.textContent = gameState.currentRound + "/" + gameState.totalRounds;
    }
}

function startGame(){
    let instruction = document.querySelector('.instructions .game-instruction');
    if(!instruction){
        instruction = document.createElement('p');
        instruction.classList.add('game-instruction');
        instruction.textContent = 'Make a move...';
        instructions.appendChild(instruction);
    }

    //Reset game state
    gameState.playerScore = 0;
    playerScoreContainer.textContent = gameState.playerScore;
    gameState.computerScore = 0;
    computerScoreContainer.textContent = gameState.computerScore;
    gameState.currentRound = 1;
    gameState.totalRounds = +round.textContent;
    roundCount.textContent = gameState.currentRound + "/" + gameState.totalRounds;
    result.textContent = '';
    gameState.controlsEnable = true;
    playerMoves.forEach( (button) => {button.removeEventListener('click', playGame);});
    playerMoves.forEach( (button) => {button.addEventListener('click', playGame);});

    //Show scores
    scores.style.display = 'flex';
    
    //Change text in start button
    startBtn.textContent = 'RESTART';
    
    //Show options
    controls.style.display = 'flex';
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

function updateScore(event,gameState){
    button = event.target;
    let roundResult = playRound(button.textContent);
    result.textContent = roundResult;

    if(roundResult.includes("Win")){
        gameState.playerScore += 1;
    }if(roundResult.includes("Lose")){
        gameState.computerScore += 1
    }

    playerScoreContainer.textContent = gameState.playerScore;
    computerScoreContainer.textContent = gameState.computerScore;
}

function endOfGameCondition(gameState){
    let score = gameState.playerScore - gameState.computerScore;
    let remainingRounds = gameState.totalRounds-gameState.currentRound;
    console.log("current round "+gameState.currentRound);
    console.log("remaining rounds "+remainingRounds);
    console.log("score "+score);
    //If one of the players win floor(n/2)+1 games stop the game and show the result 
    if(Math.abs(score) > remainingRounds || remainingRounds === 0){
        gameState.controlsEnable = false;
        console.log(gameState);
        if(score > 0){
            result.textContent = "Game Over. You Win!";
        }if(score < 0){
            result.textContent = "Game Over. You Lose!";
        }else{
            result.textContent = "Game Over. It's a Tie!"
        }
        startBtn.textContent = 'START';
    }
}