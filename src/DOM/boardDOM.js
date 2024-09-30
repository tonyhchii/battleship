export const loadBoard = (board, num, hidden) => {
  const gameboardContainer = document.getElementById(num);
  const gameboard = gameboardContainer.querySelector(`.gameboard`);
  gameboard.innerHTML = "";
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      const square = document.createElement("div");
      square.classList.add("board-square");
      square.dataset.x = i;
      square.dataset.y = j;
      gameboard.appendChild(square);
      const curr = board[i][j];
      updateSquare(square, curr, hidden);
    }
  }
};

export const loadSquare = (board, num, hidden, point) => {
  const gameboardContainer = document.getElementById(num);
  const squares = Array.from(
    gameboardContainer.querySelectorAll(`.board-square`)
  );
  const square = squares.filter(
    (square) => square.dataset.x === point[0] && square.dataset.y === point[1]
  );
  updateSquare(square[0], board[point[0]][point[1]], hidden);
};

const updateSquare = (square, curr, hidden) => {
  if (curr.isShot === true) {
    if (curr.isShip === true) {
      square.classList.add("board-hit");
    } else {
      square.classList.add("board-miss");
    }
  }
  if (curr.isShip === true) {
    if (hidden) {
    } else {
      square.classList.add("board-boat");
      if (curr.isFront) {
        square.classList.add("front");
      }
      if (curr.isEnd) {
        square.classList.add("end");
      }
      if (curr.isHorizontal) {
        square.classList.add("horizontal");
      } else {
        square.classList.add("vertical");
      }
    }
  }
};
