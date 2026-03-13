const gameBoard = (() => {
  const WINNING_STATES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const MARKS = {
    empty: "",
    x: "x",
    o: "o",
  };

  let grid = [
    MARKS.empty,
    MARKS.empty,
    MARKS.empty,
    MARKS.empty,
    MARKS.empty,
    MARKS.empty,
    MARKS.empty,
    MARKS.empty,
    MARKS.empty,
  ]; // Every 3 elements is a row

  function checkWin(mark) {
    return WINNING_STATES.some((state) => {
      return state.every((index) => {
        return grid[index] === mark;
      });
    });
  }

  function markSpot(index, mark) {
    if (grid[index] !== MARKS.empty) return false;
    grid[index] = mark;
    return true;
  }

  function checkHasEmptySpot() {
    return grid.some((element) => {
      return element === MARKS.empty;
    });
  }

  function clearBoard() {
    grid.fill(MARKS.empty);
  }

  return { MARKS, grid, checkWin, markSpot, clearBoard, checkHasEmptySpot };
})();

const display = (() => {
  const grid = document.querySelector(".grid");
  const gridSpots = grid.children;
  const player1Score = document.querySelector(".player1-score");
  const player2Score = document.querySelector(".player2-score");
  const currentPlayer = document.querySelector(".current-player");
  const resetButton = document.querySelector(".reset-button");

  function markSpot(index, mark) {
    gridSpots[index].textContent = mark;
  }

  function clearGrid() {
    for (const gridSpot of gridSpots) {
      gridSpot.textContent = "";
    }
  }

  return {
    markSpot,
    clearGrid,
    grid,
    player1Score,
    player2Score,
    currentPlayer,
    resetButton,
  };
})();

function createPlayer(mark) {
  let score = 0;

  function getScore() {
    return score;
  }

  function incrementScore() {
    score++;
  }

  function resetScore() {
    score = 0;
  }

  return { mark, getScore, incrementScore, resetScore };
}

const game = (() => {
  const GAME_STATES = {
    ongoing: "ongoing",
    win: "win",
    tie: "tie",
  };
  const player1 = createPlayer(gameBoard.MARKS.x);
  const player2 = createPlayer(gameBoard.MARKS.o);
  let currentPlayer = player1;
  let turn = true;

  function switchPlayer() {
    turn = !turn;
    if (turn === true) {
      currentPlayer = player1;
      display.currentPlayer.textContent = "Player 1";
    } else {
      currentPlayer = player2;
      display.currentPlayer.textContent = "Player 2";
    }
  }

  function playTurn(index) {
    const success = gameBoard.markSpot(index, currentPlayer.mark);
    if (success) {
      display.markSpot(index, currentPlayer.mark);
      if (checkGameState(currentPlayer) === GAME_STATES.ongoing) switchPlayer();
    }
  }

  function incrementPlayerScore(player) {
    player.incrementScore();
    player === player1
      ? (display.player1Score.textContent = player.getScore())
      : (display.player2Score.textContent = player.getScore());
  }

  function endGame({
    gameState = GAME_STATES.tie,
    player = player1,
    force = false,
  }) {
    if (
      force === true ||
      gameState === GAME_STATES.win ||
      gameState === GAME_STATES.tie
    ) {
      if (gameState === GAME_STATES.win) incrementPlayerScore(player);
      display.clearGrid();
      gameBoard.clearBoard();
      display.currentPlayer.textContent = "Player 1";
      return true;
    }
    return false;
  }

  function checkGameState(player) {
    if (gameBoard.checkWin(player.mark) === true) {
      endGame({ gameState: GAME_STATES.win, player: player });
      return GAME_STATES.win;
    } else if (gameBoard.checkHasEmptySpot() === false) {
      endGame({ gameState: GAME_STATES.tie, player: player });
      return GAME_STATES.tie;
    } else return GAME_STATES.ongoing;
  }

  function resetGame() {
    player1.resetScore();
    player2.resetScore();
    display.player1Score.textContent = "0";
    display.player2Score.textContent = "0";
    endGame({ force: true });
    return true;
  }

  display.grid.addEventListener("click", (event) => {
    const index = event.target.dataset.index;
    if (index !== undefined) playTurn(index);
  });
  display.resetButton.addEventListener("click", (event) => {
    resetGame();
  });

  return {
    player1,
    player2,
    playSpot: playTurn,
    incrementPlayerScore,
    checkGameState,
    resetGame,
  };
})();
