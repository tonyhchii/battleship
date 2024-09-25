const gameboardContainer = document.querySelector(".gameboard");

export const loadBoard = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      const square = document.createElement("div");
      square.classList.add("board-square");
      gameboardContainer.appendChild(square);
      if (board[i][j] == 0) {
        square.classList.add("board-water");
      } else if (board[i][j] == -1) {
        square.classList.add("board-miss");
      } else if (board[i][j] == 1) {
        square.classList.add("board-hit");
      } else {
        square.classList.add("board-boat");
      }
    }
  }
};
