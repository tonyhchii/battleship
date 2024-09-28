const Gameboard = require("./gameboard.js");
const Ship = require("./ship.js");

export class Player {
  constructor(type) {
    this.type = type;
    this.gameboard = new Gameboard(10);
    this.ships = [];
    this.init();
  }

  init() {
    const carrier = new Ship(5, 0, "Carrier");
    const battleship = new Ship(4, 0, "Battleship");
    const cruiser = new Ship(3, 0, "Cruiser");
    const submarine = new Ship(3, 0, "Submarine");
    const destroyer = new Ship(2, 0, "Destroyer");
    this.ships = [destroyer, submarine, cruiser, battleship, carrier];
  }

  addAllShips(ships) {
    ships.forEach((ship) => {
      this.gameboard.addShipToGame(ship, false);
    });
  }
}
