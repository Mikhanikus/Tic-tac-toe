const gameBoard = {
    // to store gameboard
    array: [],
    // current player
    player: 'X',
    winner: '',
    //to store players' moves
    players: [[], []],
    //winning combinations
    combs: [[0,1,2], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6], [3,4,5], [6,7,8]],
    // display grid


    display: function () {
        let container = document.getElementById('container');

        for (let i = 0; i<9; i++) {
            this.array.push(createCell());
        }
        for (let i = 0; i<9; i++) {
            container.appendChild(this.array[i]);
        }
        for (let i = 0; i<=8; i++) {

        }
        beginGame();
    },

    // compare the players' moves with winning combs
    checkThree: function (player) {
        let temp = [];
        for (let i = 0; i<=gameBoard.combs.length; i++) {
            let temp1 = [];
            for (let j = 0; j<=2; j++) {
                try {
                    if (player.includes(gameBoard.combs[i][j])) {
                        temp1.push (gameBoard.combs[i][j]);
                    }
                }
                catch (e) {
                    return 0;
                }
            }
            if (temp1.length === 3) {
                temp = temp1;
                break;
            }
            else {
                temp1 = [];
            }
        }

        if (temp !== []) {
            return temp;
        }
    },
    // add sign to a div
    createP: function () {
        let p = document.createElement('p');
        p.innerText = this.player;
        return p;
    },
    // change color of winning combs
    changeColor: function (array) {
        for (let i = 0; i <array.length; i++) {
            this.array[array[i]].setAttribute('style', 'background-color: green');
        }
    },
    startGame: function () {
        for (let i = 0; i<9; i++) {
            gameBoard.array[i].addEventListener('click', function() {
                // checks if the button has been clicked already
                if(gameBoard.winner === '') {
                    if (this.innerText === '') {
                        this.appendChild(gameBoard.createP(gameBoard.player));
                        if (gameBoard.player === 'X') {
                            gameBoard.players[0].push(i);
                            gameController();
                        }
                        else if (gameBoard.player === 'O') {
                            gameBoard.players[1].push(i);
                            gameController();
                        }

                    }
                    else {
                    }
                }
            })
        }
    }

};
// controls the flow of the game
function beginGame () {
    const button = document.querySelector('button');
    button.addEventListener('click', gameBoard.startGame);
    button.addEventListener('click', function () {
        this.innerText = 'Reset game';
        this.setAttribute('style', 'background-color: red')
    })

}
/*
function resetGame () {
    let container = document.getElementById('container');
    let button = document.querySelector('button');
    button.addEventListener('click', function () {
        container.innerText = '';
        gameBoard.winner = '';
        gameBoard.array = [];
        gameBoard.players = [[], []];
    });

}
*/
function gameController () {
    if (gameBoard.player === 'X') {

        if (gameBoard.checkThree(gameBoard.players[0]) === 0) {
            gameBoard.player = 'O';
        }
        else {
            gameBoard.changeColor(gameBoard.checkThree(gameBoard.players[0]));
            gameBoard.winner = 'X';

        }
    }
    else {
        if (gameBoard.checkThree(gameBoard.players[1]) === 0) {
            gameBoard.player = 'X';
        }
        else {
            gameBoard.changeColor(gameBoard.checkThree(gameBoard.players[1]));
            gameBoard.winner = 'O';
        }
    }
}
// create cells
function createCell () {
    let cell = document.createElement('div');
    cell.setAttribute('class', 'cell');
    return cell;
}
// display the game
gameBoard.display();