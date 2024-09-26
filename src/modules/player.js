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
    const battleship = new Ship(4, 0, "Battleship");
    const cruiser = new Ship(3, 0, "Cruiser");
    const carrier = new Ship(5, 0, "Carrier");
    const submarine = new Ship(3, 0, "Submarine");
    const destroyer = new Ship(2, 0, "Destroyer");
    this.ships = [destroyer, carrier, cruiser, battleship, submarine];
  }

  addAllShips(ships) {
    ships.forEach((ship) => {
      this.gameboard.addShipToGame(ship, "comp");
    });
  }
}
