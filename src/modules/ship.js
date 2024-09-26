class Ship {
  constructor(length, hits, name) {
    this.length = length;
    this.hits = hits;
    this.sunk = false;
    this.name = name;
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
