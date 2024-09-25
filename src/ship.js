class Ship {
  constructor(length, hits) {
    this.length = length;
    this.hits = hits;
    this.sunk = false;
  }

  hit() {
    if (this.hits < this.length) {
      this.hits += 1;
    }
  }

  isSunk() {
    if (this.hits >= this.length) {
      return true;
    }
  }
}

module.exports = Ship;
