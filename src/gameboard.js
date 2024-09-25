const Ship = require("./ship");

class Gameboard {
  constructor(size) {
    this.size = size;
    this.board = new Array(size).fill().map(() => new Array(10).fill(0));
    this.ships = [];
  }

  placeShip(ship, points) {
    this.ships.push(ship);
    if (this.isValid(points)) {
      points.forEach((point) => {
        this.board[point[0]][point[1]] = ship;
      });
    }
  }

  isValid(points) {
    if (points.some((point) => this.board[point[0]][point[1]])) {
      return false;
    } else if (points.some((point) => this.board[point[0]][point[1]] != 0)) {
      return false;
    }
    return true;
  }

  receiveAttack(point) {
    const curr = this.board[point[0]][point[1]];
    if (curr == 0) {
      this.board[point[0]][point[1]] = -1;
    } else {
      curr.hit();
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
