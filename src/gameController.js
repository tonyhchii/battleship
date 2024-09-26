import { loadBoard } from "./DOM/boardDOM";
import { Player } from "./modules/player";

export const loadGame = () => {
  const player1 = new Player("human");
  const player2 = new Player("comp");
  player2.addAllShips(player2.ships);
  loadBoard(player1.gameboard.board, "one", false);
  loadBoard(player2.gameboard.board, "two", true);
  const dragControl = dragShipController(player1);
  dragControl.create();

  startGameController(player1, player2);
};

const startGameController = (player1, player2) => {
  const startGameBtn = document.getElementById("start");
  startGameBtn.addEventListener("click", () => {
    const optionContainer = document.querySelector(".option-container");
    optionContainer.classList.add("hide");
    startGameBtn.classList.add("hide");
    const player2Board = gameboardController("two", player2, player1);
    player2Board.create();
  });
};

const computerAttack = (player) => {
  const xVal = Math.floor(Math.random() * 10);
  const yVal = Math.floor(Math.random() * 10);
  if (xVal && yVal) {
    player.gameboard.receiveAttack([xVal, yVal]);
    loadBoard(player.gameboard.board, "one", false);
  }

  if (player.gameboard.allSunk() === true) {
    console.log("All Sunk Player Lost GAME OVER");
  }
};

const gameboardController = (boardNum, myPlayer, enemyPlayer) => {
  const gameBoard = document.querySelector(`.gameboard-${boardNum}`);
  const controlGame = (e) => {
    const xVal = e.target.dataset.x;
    const yVal = e.target.dataset.y;
    if (xVal && yVal) {
      myPlayer.gameboard.receiveAttack([xVal, yVal]);
      loadBoard(myPlayer.gameboard.board, boardNum, false);
      computerAttack(enemyPlayer);
    }
    if (myPlayer.gameboard.allSunk() === true) {
      console.log("All Sunk Computer Lost GAME OVER");
      destroy();
    }
  };
  const create = () => {
    gameBoard.addEventListener("click", controlGame);
  };
  const destroy = () => {
    gameBoard.removeEventListener("click", controlGame);
  };
  return {
    create,
    destroy,
  };
};

const dragShipController = (player) => {
  const optionContainer = document.querySelector(".option-container");
  const optionShips = Array.from(optionContainer.children);
  let draggedShip = null;
  const gameboard = document.querySelector(".gameboard-one");

  const addDraggedShip = (e) => {
    const xVal = e.target.dataset.x;
    const yVal = e.target.dataset.y;
    if (xVal && yVal) {
      const ships = player.gameboard.ships.length;
      player.gameboard.addShipToGame(player.ships[draggedShip.id], "player", [
        xVal,
        yVal,
      ]);
      loadBoard(player.gameboard.board, "one", false);
      if (ships < player.gameboard.ships.length) {
        draggedShip.remove();
      }
    }
  };

  const dragStart = (e) => {
    draggedShip = e.target;
  };

  const create = () => {
    optionShips.forEach((optionShip) => {
      optionShip.addEventListener("dragstart", dragStart);
    });
    gameboard.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    gameboard.addEventListener("drop", addDraggedShip);
  };

  const destroy = () => {
    optionShips.forEach((optionShip) => {
      optionShip.removeEventListener("dragstart", dragStart);
    });
    gameboard.removeEventListener("dragover", (e) => {
      e.preventDefault();
    });
    gameboard.removeEventListener("drop", addDraggedShip);
  };

  return {
    create,
    destroy,
  };
};
