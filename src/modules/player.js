const Gameboard = require("./gameboard.js");
const Ship = require("./ship.js");

export class Player {
  constructor(type) {
    this.type = type;
    this.gameboard = new Gameboard(10);
    this.init();
  }

  init() {
    const ship = new Ship(2, 0);
    this.gameboard.placeShip(ship, [
      [1, 1],
      [1, 0],
    ]);
    const ship2 = new Ship(2, 1);
    this.gameboard.placeShip(ship, [
      [5, 5],
      [5, 6],
    ]);
  }
}
