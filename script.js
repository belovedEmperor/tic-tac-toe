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
    empty: "empty",
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

  function playSpot(index, player) {
    gameBoard.markSpot(index, player.mark);
    return checkGameState(player);
  }

  function incrementPlayerScore(player) {
    player.incrementScore();
  }

  function endGame(gameState, player, force) {
    if (force === true) {
      gameBoard.clearBoard();
      return true;
    } else if (gameState === GAME_STATES.win || gameState === GAME_STATES.tie) {
      gameBoard.clearBoard();
      player.incrementScore();
      return true;
    }
    return false;
  }

  function checkGameState(player) {
    if (gameBoard.checkWin(player.mark) === true) {
      endGame(GAME_STATES.win, player);
      return GAME_STATES.win;
    } else if (gameBoard.checkHasEmptySpot() === false) {
      endGame(GAME_STATES.tie, player);
      return GAME_STATES.tie;
    } else return GAME_STATES.ongoing;
  }

  function resetGame() {
    player1.resetScore();
    player2.resetScore();
    endGame(null, null, true);
  }

  return {
    player1,
    player2,
    playSpot,
    incrementPlayerScore,
    checkGameState,
    resetGame,
  };
})();

console.log(gameBoard.grid);
console.log(game.playSpot(0, game.player1));
console.log(game.playSpot(1, game.player1));
console.log(gameBoard.grid);
console.log(game.playSpot(2, game.player1));
console.log(gameBoard.grid);

console.log(game.playSpot(0, game.player1));
console.log(game.playSpot(1, game.player2));
console.log(game.playSpot(2, game.player1));
console.log(game.playSpot(3, game.player1));
console.log(game.playSpot(4, game.player1));
console.log(gameBoard.grid);
console.log(game.player1.getScore());
console.log(game.player2.getScore());
game.resetGame();
console.log(game.player1.getScore());
console.log(game.player2.getScore());
console.log(gameBoard.grid);
console.log(game.playSpot(5, game.player2));
console.log(game.playSpot(6, game.player2));
console.log(game.playSpot(7, game.player1));
console.log(gameBoard.grid);
console.log(game.playSpot(8, game.player2));
console.log(gameBoard.grid);
