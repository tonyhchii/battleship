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
          isFront: false,
          isEnd: false,
          isHorizontal: false,
        });
      }
      this.board.push(row);
    }
  }

  placeShip(ship, points, isHorizontal) {
    this.ships.push(ship);
    for (let i = 0; i < points.length; i++) {
      const curr = this.board[points[i][0]][points[i][1]];
      if (isHorizontal) {
        curr.isHorizontal = true;
      }
      if (i === 0) {
        curr.isFront = true;
      }
      if (i === points.length - 1) {
        curr.isEnd = true;
      }
      curr.Ship = ship;
      curr.isShip = true;
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

  generateShipPoints(ship, startPoint, isHorizontal) {
    const randomBool = Math.random() < 0.5;
    isHorizontal = isHorizontal ? isHorizontal : randomBool;
    const randomStartX = Math.floor(Math.random() * 10);
    const randomStartY = Math.floor(Math.random() * 10);
    const startX = startPoint ? parseInt(startPoint[0]) : randomStartX;
    const startY = startPoint ? parseInt(startPoint[1]) : randomStartY;
    const points = [];
    for (let i = 0; i < ship.length; i++) {
      if (isHorizontal) {
        points.push([startX, startY + i]);
      } else {
        points.push([startX + i, startY]);
      }
    }
    return [points, isHorizontal];
  }

  addShipToGame(ship, player, startPoint, isHorizontal) {
    const [points, hor] = this.generateShipPoints(
      ship,
      startPoint,
      isHorizontal
    );
    if (this.isValid(points)) {
      this.placeShip(ship, points, hor);
    } else if (!player) {
      this.addShipToGame(ship, false);
    }
  }
}

module.exports = Gameboard;
