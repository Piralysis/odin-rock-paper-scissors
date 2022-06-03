// Game Logic

let playerScore = 0;
let computerScore = 0;

function playRound(player, computer) {
    player = player.toUpperCase()
    if (player === computer) {
        return 'TIE'
    }

    let win = false
    switch (computer) {
        case 'ROCK':
            win = player === 'PAPER'
            break;
        case 'PAPER':
            win = player === 'SCISSORS'
            break;
        case 'SCISSORS':
            win = player === 'ROCK'
            break;
    }

    return win ? 'WIN' : 'LOSE'
}

function computerPlay() {
    let play = ''
    let rand = Math.floor(Math.random() * 3) + 1
    switch (rand) {
        case 1:
            play = 'ROCK'
            break;
        case 2:
            play = 'PAPER'
            break;
        case 3:
            play = 'SCISSORS'
            break;
    }
    return play
}

function isGameOver() {
    return playerScore === 5 || computerScore === 5;
}

// Helper functions

function toUpperFirstLetter(s) {
    s = s.toLowerCase()
    return s.charAt(0).toUpperCase() + s.slice(1)
}

function convertToIcon(input) {
    switch (input) {
        case 'ROCK':
            return '\u270A';
        case 'PAPER':
            return '\u270B';
        case 'SCISSORS':
            return '\u270C';
    }
}

// UI variables and functions

const btnRock = document.querySelector('#rock');
const btnPaper = document.querySelector('#paper');
const btnScissors = document.querySelector('#scissors');
const btnRestart = document.querySelector('#final-btn');
const txtResult = document.querySelector('#round-result');
const txtResultDesc = document.querySelector('#result-desc');
const icoPScore = document.querySelector('#player-choice');
const icoCScore = document.querySelector('#computer-choice');
const txtPScore = document.querySelector('#player-score');
const txtCScore = document.querySelector('#computer-score');
const txtFinal = document.querySelector('#final-text');
const modal = document.querySelector('.modal');

function handleInput(player) {
    const computer = computerPlay();
    const result = playRound(player, computer);
    updateResults(result, player, computer);

    if (isGameOver()) {
        openModal();
    }
}

function updateResults(s, play, comp) {
    const playResult = toUpperFirstLetter(play);
    const compResult = toUpperFirstLetter(comp);

    if (s === 'WIN') {
        playerScore++;
        txtResult.textContent = 'You Win!';
        txtResultDesc.textContent = playResult + ' beats ' + compResult;
    } else if (s === 'LOSE') {
        computerScore++;
        txtResult.textContent = 'You Lose!';
        txtResultDesc.textContent = compResult + ' beats ' + playResult; 
    } else {
        txtResult.textContent = "It's a Tie!";
        txtResultDesc.textContent = 'You and the Computer chose the same'
    }

    icoPScore.textContent = convertToIcon(play);
    icoCScore.textContent = convertToIcon(comp);

    txtPScore.textContent = `Player: ${playerScore}`;
    txtCScore.textContent = `Computer: ${computerScore}`;
}

function resetResults() {
    txtResult.textContent = 'Choose wisely...';
    txtResultDesc.textContent = "It's first to 5 points";
    icoPScore.textContent = '?';
    icoCScore.textContent = '?';
    txtPScore.textContent = `Player: ${playerScore}`;
    txtCScore.textContent = `Computer: ${computerScore}`;
}

function keyPress(e) {
    if (e.keyCode === 82) {
        // Rock
        handleInput('ROCK');
    } else if (e.keyCode === 80) {
        // Paper
        handleInput('PAPER');
    } else if (e.keyCode === 83) {
        // Scissors
        handleInput('SCISSORS');
    } else {
        return;
    }
}

function openModal() {
    txtFinal.textContent = playerScore > computerScore ? 'You Win!' : 'You Lose!';
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
}

function restart(e) {
    playerScore = 0;
    computerScore = 0;
    resetResults();
    closeModal();
}

btnRock.addEventListener('click', () => handleInput('ROCK'));
btnPaper.addEventListener('click', () => handleInput('PAPER'));
btnScissors.addEventListener('click', () => handleInput('SCISSORS'));
btnRestart.addEventListener('click', restart);
window.addEventListener('keydown', keyPress);