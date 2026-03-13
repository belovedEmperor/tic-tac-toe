const gameBoard = () => {
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

  function checkWin(playerMark) {
    return WINNING_STATES.some((state) => {
      return state.every((index) => {
        return grid[index] === playerMark;
      });
    });
  }

  function markSpot(index, playerMark) {
    if (grid[index] !== MARKS.empty) return false;
    grid[index] = playerMark;
    return true;
  }

  return { MARKS, grid, checkWin, markSpot };
};

const board = gameBoard();
board.markSpot(0, board.MARKS.o);
console.log(board.checkWin(board.MARKS.o));
board.markSpot(4, board.MARKS.o);
board.markSpot(8, board.MARKS.o);
console.log(board.checkWin(board.MARKS.o));
console.log(board.grid);
