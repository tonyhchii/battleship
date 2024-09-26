const Ship = require("./ship");

class Gameboard {
  constructor(size) {
    this.size = size;
    this.board = [];
    this.init();
    this.ships = [];
  }

  init() {
    for (let i = 0; i < this.size; i++) {
      const row = [];
      for (let j = 0; j < this.size; j++) {
        row.push({
          isShip: false,
          isShot: false,
          Ship: null,
        });
      }
      this.board.push(row);
    }
  }

  placeShip(ship, points) {
    this.ships.push(ship);
    if (this.isValid(points)) {
      points.forEach((point) => {
        this.board[point[0]][point[1]].Ship = ship;
        this.board[point[0]][point[1]].isShip = true;
      });
    }
  }

  isValid(points) {
    if (points.some((point) => !this.board[point[0]][point[1]])) {
      return false;
    } else if (points.some((point) => this.board[point[0]][point[1]].isShip)) {
      return false;
    }
    return true;
  }

  receiveAttack(point) {
    const curr = this.board[point[0]][point[1]];
    if (curr.isShot === false) {
      this.board[point[0]][point[1]].isShot = true;
      if (curr.isShip === true) {
        curr.Ship.hit();
      }
    }
  }

  allSunk() {
    if (this.ships.length == 0) {
      return true;
    } else {
      return this.ships.every((ship) => ship.isSunk());
    }
  }
}

module.exports = Gameboard;
