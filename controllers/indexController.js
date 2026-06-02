const { body, validationResult, matchedData } = require("express-validator");
const { prisma } = require("../lib/prisma.js");
const checkCoordsLogic = require("../utils/checkCoordsLogic");

const validatePost = [
  body("character").trim().notEmpty().isAlpha(),
  body("xCoord").trim().notEmpty().isNumeric().isInt({ min: 0, max: 9999 }),
  body("yCoord").trim().notEmpty().isNumeric().isInt({ min: 0, max: 9999 }),
];

const checkCoords = [
  validatePost,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    try {
      const { character, xCoord, yCoord } = matchedData(req);

      const characterData = await prisma.character.findFirst({
        where: { name: character },
      });
      // if (!characterData) {
      //   res.status(400).json({ message: "character not found" });
      // }

      console.log(characterData);
      if (
        checkCoordsLogic.checkXCoords(xCoord, characterData.xCoord) &&
        checkCoordsLogic.checkYCoords(yCoord, characterData.yCoord)
      ) {
        res.json(characterData);
      } else {
        res.json({ message: "incorrect" });
      }
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
];

module.exports = {
  checkCoords,
};
