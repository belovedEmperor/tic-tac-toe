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

  return { MARKS, grid, checkWin, markSpot };
})();

function createPlayer(mark) {
  let score = 0;

  function checkScore() {
    return score;
  }

  function incrementScore() {
    score++;
  }

  function resetScore() {
    score = 0;
  }

  return { mark, checkScore, incrementScore, resetScore };
}

gameBoard.markSpot(0, gameBoard.MARKS.o);
console.log(gameBoard.checkWin(gameBoard.MARKS.o));
gameBoard.markSpot(4, gameBoard.MARKS.o);
gameBoard.markSpot(8, gameBoard.MARKS.o);
console.log(gameBoard.checkWin(gameBoard.MARKS.o));
console.log(gameBoard.grid);
