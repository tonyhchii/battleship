import { loadBoard, loadSquare } from "./DOM/boardDOM";
import { Player } from "./modules/player";

export const loadGame = () => {
  twoPlayerGame();
};

const switchPlayer = (myPlayer, enemyPlayer, myBoard, enemyBoard) => {
  loadBoard(myPlayer.gameboard.board, myBoard, false);
  loadBoard(enemyPlayer.gameboard.board, enemyBoard, true);
};

const twoPlayerGame = () => {
  const player1 = new Player("human");
  const player2 = new Player("comp");
  loadBoard(player1.gameboard.board, "game1", false);
  loadBoard(player2.gameboard.board, "game2", false);
  loadShips(player1, player2);
};

const loadShips = (player1, player2) => {
  const dragControlOne = dragShipController(player1, "game1");
  dragControlOne.create();
  const startGameBtn = document.getElementById("start");
  startGameBtn.textContent = "Ready";
  const readyUp = () => {
    const gameboardContainer = document.getElementById("game1");
    const optionContainer =
      gameboardContainer.querySelector(".option-container");
    if (optionContainer.children.length > 0) {
      optionContainer.classList.toggle("hide");
      startGameBtn.textContent = "Start Game";
      startGameBtn.removeEventListener("click", readyUp);
      switchPlayer(player2, player1, "game2", "game1");
      const dragControlTwo = dragShipController(player2, "game2");
      dragControlTwo.create();
      startGameBtn.addEventListener("click", () => {
        switchPlayer(player1, player2, "game1", "game2");
        startGame();
      });
    }
  };

  const startGame = () => {
    const gameboardContainer = document.getElementById("game2");
    const optionContainer =
      gameboardContainer.querySelector(".option-container");
    const startGameBtn = document.getElementById("start");
    if (optionContainer.children.length > 0) {
      optionContainer.classList.add("hide");
      startGameBtn.classList.add("hide");
      const player2Board = gameboardController(
        "game2",
        player2,
        player1,
        false
      );
      player2Board.create();
    } else {
      console.log("Need to drag all ships");
    }
  };

  startGameBtn.addEventListener("click", readyUp);
};

const singlePlayerGame = () => {
  const player1 = new Player("human");
  const player2 = new Player("comp");

  player2.addAllShips(player2.ships);
  loadBoard(player1.gameboard.board, "game1", false);
  loadBoard(player2.gameboard.board, "game2", false);
  const dragControl = dragShipController(player1);
  dragControl.create();
  startGameController(player1, player2).create();
};

const startGameController = (player1, player2) => {
  const startGame = () => {
    const gameboardContainer = document.getElementById("game1");
    const optionContainer =
      gameboardContainer.querySelector(".option-container");
    const startGameBtn = document.getElementById("start");
    if (optionContainer.children.length === 0) {
      destroy();
      optionContainer.classList.add("hide");
      startGameBtn.classList.add("hide");
      const player2Board = gameboardController("game2", player2, player1, true);
      player2Board.create();
    } else {
      console.log("Need to drag all ships");
    }
  };

  const create = () => {
    const startGameBtn = document.getElementById("start");
    startGameBtn.addEventListener("click", startGame);
  };

  const destroy = () => {
    const startGameBtn = document.getElementById("start");
    startGameBtn.removeEventListener("click", startGame);
  };

  return {
    create,
    destroy,
  };
};

const computerAttack = (player) => {
  const xVal = Math.floor(Math.random() * 10);
  const yVal = Math.floor(Math.random() * 10);
  if (xVal && yVal) {
    player.gameboard.receiveAttack([xVal, yVal]);
    loadSquare(player.gameboard.board, "game1", false, [xVal, yVal]);
  }
};

const gameOverCheck = (player) => {
  if (player.gameboard.allSunk() === true) {
    console.log("All Sunk Player Lost GAME OVER");
  }
};

const gameboardController = (boardNum, myPlayer, enemyPlayer, singlePlayer) => {
  const gameboardContainer = document.getElementById(boardNum);
  const gameBoard = gameboardContainer.querySelector(`.gameboard`);
  const controlGame = (e) => {
    const xVal = e.target.dataset.x;
    const yVal = e.target.dataset.y;
    if (xVal && yVal) {
      myPlayer.gameboard.receiveAttack([xVal, yVal]);
      loadSquare(myPlayer.gameboard.board, boardNum, false, [xVal, yVal]);
      if (singlePlayer) {
        computerAttack(enemyPlayer);
      } else {
        destroy();
        const myBoard = boardNum === "game1" ? "game1" : "game2";
        const enemyBoard = boardNum === "game1" ? "game2" : "game1";
        switchPlayer(enemyPlayer, myPlayer, enemyBoard, myBoard);
        gameboardController(
          enemyBoard,
          enemyPlayer,
          myPlayer,
          singlePlayer
        ).create();
      }
    }
    gameOverCheck(myPlayer);
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

const dragShipController = (player, boardNum) => {
  const gameboardContainer = document.getElementById(boardNum);
  const gameboard = gameboardContainer.querySelector(".gameboard");
  const optionContainer = gameboardContainer.querySelector(".option-container");
  const optionShips = Array.from(optionContainer.children);
  let draggedShip = null;
  optionContainer.classList.toggle("hide");
  const addDraggedShip = (e) => {
    const xVal = e.target.dataset.x;
    const yVal = e.target.dataset.y;
    if (xVal && yVal) {
      const ships = player.gameboard.ships.length;
      player.gameboard.addShipToGame(
        player.ships[draggedShip.id],
        true,
        [xVal, yVal],
        false
      );
      loadBoard(player.gameboard.board, boardNum, false);
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
