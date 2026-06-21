function checkXCoords(userXCoord, dbXCoord) {
  if (
    Number(userXCoord) >= dbXCoord - 100 &&
    Number(userXCoord) <= dbXCoord + 100
  ) {
    return true;
  } else {
    return false;
  }
}

function checkYCoords(userYCoord, dbYCoord) {
  if (
    Number(userYCoord) >= dbYCoord - 100 &&
    Number(userYCoord) <= dbYCoord + 100
  ) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  checkXCoords,
  checkYCoords,
};
