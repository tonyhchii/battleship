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
    if (
      points.some((point) => {
        return point[0] < 0 || point[0] > 9 || point[1] > 9 || point[1] < 0;
      })
    ) {
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

  addShipToGame(ship) {
    const randomBool = Math.random() < 0.5;
    const isHorizontal = randomBool;
    const randomStartX = Math.floor(Math.random() * 10);
    const randomStartY = Math.floor(Math.random() * 10);
    const points = [];
    for (let i = 0; i < ship.length; i++) {
      if (isHorizontal) {
        points.push([randomStartX, randomStartY + i]);
      } else {
        points.push([randomStartX + i, randomStartY]);
      }
    }
    if (this.isValid(points)) {
      this.placeShip(ship, points);
    } else {
      this.addShipToGame(ship);
    }
  }
}

module.exports = Gameboard;
