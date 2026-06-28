const { body, validationResult, matchedData } = require("express-validator");
const { prisma } = require("../../lib/prisma.js");
const CustomNotFoundError = require("../errors/CustomNotFoundError.js");
const checkCoordsLogic = require("./check-coords-logic.js");

const validatePost = [
  body("gameId").trim().notEmpty().isNumeric().isInt({ min: 1, max: 9 }),
  body("character").trim().notEmpty().isAlpha(),
  body("xCoord").trim().notEmpty().isNumeric().isInt({ min: 0, max: 9999 }),
  body("yCoord").trim().notEmpty().isNumeric().isInt({ min: 0, max: 9999 }),
];

const checkCharacterLocation = [
  validatePost,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    try {
      const { gameId, character, xCoord, yCoord } = matchedData(req);

      const characterData = await prisma.character.findFirst({
        where: { gameId: Number(gameId), name: character },
      });

      if (!characterData) {
        throw new CustomNotFoundError("Character not found");
      }

      if (
        checkCoordsLogic.checkXCoords(xCoord, characterData.xCoord) &&
        checkCoordsLogic.checkYCoords(yCoord, characterData.yCoord)
      ) {
        res.json(characterData);
      } else {
        res.json({ message: "incorrect" });
      }
    } catch (err) {
      return next(err);
    }
  },
];

module.exports = {
  checkCharacterLocation,
};
