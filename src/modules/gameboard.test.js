const Gameboard = require("./gameboard.js");
const Ship = require("./ship.js");

it("Ship placed", () => {
  const gameboard = new Gameboard(10);
  const ship = new Ship(2, 0);
  gameboard.placeShip(ship, [
    [0, 1],
    [0, 2],
  ]);
  expect(gameboard.board[0][1].Ship).toBe(ship);
  expect(gameboard.board[0][2].Ship).toBe(ship);
});

it("Ship cannot be out of bounds", () => {
  const gameboard = new Gameboard(10);
  const ship = new Ship(2, 0);
  gameboard.placeShip(ship, [
    [1, -1],
    [1, 0],
  ]);
  expect(gameboard.board[1][0].isShip).toBe(false);
});

it("Ship cannot collide with other ships", () => {
  const gameboard = new Gameboard(10);
  const ship = new Ship(2, 0);
  gameboard.placeShip(ship, [
    [1, 1],
    [1, 0],
  ]);

  const ship2 = new Ship(3, 0);
  gameboard.placeShip(ship2, [
    [1, 1],
    [1, 2],
  ]);
  expect(gameboard.board[1][0].Ship).toEqual(ship);
  expect(gameboard.board[1][2].Ship).toBe(null);
});

it("The correct ship should receive attack", () => {
  const gameboard = new Gameboard(10);
  const ship = new Ship(2, 0);
  gameboard.placeShip(ship, [
    [1, 1],
    [1, 0],
  ]);
  gameboard.receiveAttack([1, 1]);
  expect(ship.hits).toBe(1);
});

it("The correct ship should receieve attack 2", () => {
  const gameboard = new Gameboard(10);
  const ship = new Ship(2, 0);
  gameboard.placeShip(ship, [
    [1, 1],
    [1, 0],
  ]);

  const ship2 = new Ship(2, 0);
  gameboard.placeShip(ship2, [
    [5, 5],
    [5, 6],
  ]);
  gameboard.receiveAttack([5, 6]);
  expect(ship.hits).toBe(0);
  expect(ship2.hits).toBe(1);
});

it("Misses should be -1", () => {
  const gameboard = new Gameboard(10);
  gameboard.receiveAttack([1, 1]);
  expect(gameboard.board[1][1].isShot).toBe(true);
});

it("All ships are sunk", () => {
  const gameboard = new Gameboard(10);
  const ship = new Ship(2, 1);
  gameboard.placeShip(ship, [
    [5, 5],
    [5, 6],
  ]);
  const ship2 = new Ship(2, 1);
  gameboard.placeShip(ship2, [
    [1, 1],
    [2, 2],
  ]);
  gameboard.receiveAttack([1, 1]);
  gameboard.receiveAttack([5, 5]);
  expect(gameboard.allSunk()).toBe(true);
});
