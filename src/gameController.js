import { loadBoard } from "./DOM/boardDOM";
import { Player } from "./modules/player";

export const loadGame = () => {
  const player1 = new Player("human");
  player1.gameboard.receiveAttack([0, 0]);
  player1.gameboard.receiveAttack([5, 5]);
  loadBoard(player1.gameboard.board);
};
