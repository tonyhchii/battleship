export const loadBoard = (board, num, hidden) => {
  const gameboardContainer = document.querySelector(`.gameboard-${num}`);
  gameboardContainer.innerHTML = "";
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      const square = document.createElement("div");
      square.classList.add("board-square");
      square.dataset.x = i;
      square.dataset.y = j;
      gameboardContainer.appendChild(square);
      if (board[i][j].isShot === true) {
        if (board[i][j].isShip === true) {
          square.classList.add("board-hit");
        } else {
          square.classList.add("board-miss");
        }
      } else {
        if (board[i][j].isShip === true) {
          if (hidden) {
          } else {
            square.classList.add("board-boat");
          }
        }
      }
    }
  }
};
