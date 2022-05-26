function game() {
    let score = 0

    for (let i = 0; i < 5; i++) {
        let player = playerInput()
        if (player === null) {
            console.log('No input was entered, quitting the game')
            return
        }
        let computer = computerPlay()

        let result = playRound(player, computer)
        printRoundResult(result, convertToResult(player), convertToResult(computer))
        if (result === 'WIN') {
            score++
        } else if (result === 'LOSE') {
            score--
        } else {
            // It's a tie, so we do nothing
        }
    }

    if (score > 0) {
        console.log('You win!')
    } else if (score < 0) {
        console.log('You lose!')
    } else {
        console.log('The final result is a tie!')
    }
}

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

function playerInput() {
    return prompt('Rock, Paper, or Scissors?', '')
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

// Helper functions
function convertToResult(s) {
    s = s.toLowerCase()
    return s.charAt(0).toUpperCase() + s.slice(1)
}

function printRoundResult(s, play, comp) {
    if (s === 'WIN') {
        console.log('You win! ' + play + ' beats ' + comp)
    } else if (s === 'LOSE') {
        console.log('You lose! ' + comp + ' beats ' + play)
    } else {
        console.log("It's a tie! Nobody wins, but nobody loses either")
    }
}

// run the game
game()