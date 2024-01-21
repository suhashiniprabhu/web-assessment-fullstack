window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
    const playGround = document.querySelector('.playGround');
    const inputNames = document.querySelector('.inputNames');
    const playerNameForm = document.getElementById("playerNameForm");
    const playerNamex = document.querySelector('#playerNamex');
    const playerNameO = document.querySelector('#playerNameO');
    const playerNamexpoints = document.querySelector('#playerNamex-points');
    const playerNameopoints = document.querySelector('#playerNameo-points');
    
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'O';
    let players = {'X':'','O':''};
    let currentPlayerName = '';
    let isGameActive = true;
    let score = {'X':0,'O':0};

    const PLAYERX_WON = 'PLAYERX_WON';
    const playerO_WON = 'playerO_WON';
    const TIE = 'TIE';


    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    //To get user input
    playerNameForm.addEventListener("submit", (e) => {
      e.preventDefault();
 
      let playerX = document.getElementById("playerXName");
      let playerO = document.getElementById("playerOName");
    
      if (playerX.value == "" || playerO.value == "") {
        alert("Ensure you input a value in both fields!");
      } else {
        // perform operation with form input
        console.log(
          `This form has a playerX of ${playerX.value} and playerO of ${playerO.value}`
        );
        players['X'] = playerX.value;
        players['O'] = playerO.value;
        playerNamex.innerHTML=playerX.value;
        playerNameO.innerHTML=playerO.value;
        playerX.value = "";
        playerO.value = "";
    
        playGround.classList.remove('hide');
        inputNames.classList.add('hide');
        changePlayer();

      }
    });

   //To validate user move for win    
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : playerO_WON);
            isGameActive = false;
            return;
        }

    if (!board.includes(''))
        announce(TIE);
    }
   
    //Announce the winner or tie status
    const announce = (type) => {
        switch(type){
            case playerO_WON:
                announcer.innerHTML = 'Player <span class="playerO">'+currentPlayerName+'(O)</span> Won';
                score['O']=score['O']+1;
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">'+currentPlayerName+'(X)</span> Won';
                score['X']=score['X']+1;
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        playerNamexpoints.innerHTML=score['X'];
        playerNameopoints.innerHTML=score['O'];
        announcer.classList.remove('hide');
    };

    //validate user move
    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    //update the board with current Player
    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }
  
    //change the player based on player turns
    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerName=players[currentPlayer];
        playerDisplay.innerText = currentPlayerName+'('+currentPlayer+')';
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    
    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    
    //Reset board 
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
});