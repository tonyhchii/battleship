import { loadBoard } from "./DOM/boardDOM";
import { Player } from "./modules/player";

export const loadGame = () => {
  const player1 = new Player("human");
  const player2 = new Player("comp");
  loadBoard(player1.gameboard.board, "one", false);
  loadBoard(player2.gameboard.board, "two", false);

  gameboardController("two", player1).create();
  gameboardController("one", player2).create();
};

const gameboardController = (boardNum, player) => {
  const gameBoard = document.querySelector(`.gameboard-${boardNum}`);
  const create = () => {
    gameBoard.addEventListener("click", (e) => {
      const xVal = e.target.dataset.x;
      const yVal = e.target.dataset.y;
      player.gameboard.receiveAttack([xVal, yVal]);
      loadBoard(player.gameboard.board, boardNum, false);
    });
  };
  const destroy = () => {
    gameBoard.removeEventListener("click");
  };
  return {
    create,
    destroy,
  };
};
