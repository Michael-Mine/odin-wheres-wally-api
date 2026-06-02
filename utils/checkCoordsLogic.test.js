const checkCoordsLogic = require("./checkCoordsLogic");

test("checkXCoords", () => {
  expect(checkCoordsLogic.checkXCoords(99, 200)).not.toBeTruthy();
  expect(checkCoordsLogic.checkXCoords(100, 200)).toBeTruthy();
  expect(checkCoordsLogic.checkXCoords(200, 200)).toBeTruthy();
  expect(checkCoordsLogic.checkXCoords(300, 200)).toBeTruthy();
  expect(checkCoordsLogic.checkXCoords(301, 200)).not.toBeTruthy();
});

test("checkYCoords", () => {
  expect(checkCoordsLogic.checkYCoords(99, 200)).not.toBeTruthy();
  expect(checkCoordsLogic.checkYCoords(100, 200)).toBeTruthy();
  expect(checkCoordsLogic.checkYCoords(200, 200)).toBeTruthy();
  expect(checkCoordsLogic.checkYCoords(300, 200)).toBeTruthy();
  expect(checkCoordsLogic.checkYCoords(301, 200)).not.toBeTruthy();
});
