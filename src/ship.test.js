const Ship = require("./ship.js");

it("Ship has correct length", () => {
  const test = new Ship(4, 0);
  expect(test.length).toBe(4);
});

it("Ship has correct length 2", () => {
  const test = new Ship(2, 0);
  expect(test.length).toBe(2);
});

it("Ship has correct hits", () => {
  const test = new Ship(4, 2);
  expect(test.hits).toBe(2);
});

it("Ship has correct hits 2", () => {
  const test = new Ship(4, 0);
  expect(test.hits).toBe(0);
});

it("Ship.hit() is working", () => {
  const test = new Ship(4, 0);
  test.hit();
  expect(test.hits).toBe(1);
});

it("Ship.hit() is working 2", () => {
  const test = new Ship(4, 0);
  test.hit();
  test.hit();
  expect(test.hits).toBe(2);
});

it("Ship.hit(), hit cannot go over length", () => {
  const test = new Ship(4, 4);
  test.hit();
  expect(test.hits).toBe(4);
});

it("Ship.hit(), causes ship to Sink", () => {
  const test = new Ship(4, 4);
  test.hit();
  expect(test.sunk).toBe(true);
});

it("Ship.hit(), causes ship to Sink", () => {
  const test = new Ship(4, 3);
  test.hit();
  expect(test.sunk).toBe(true);
});
