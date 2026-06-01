const { body, validationResult, matchedData } = require("express-validator");
const { prisma } = require("../lib/prisma.js");

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
      console.log(characterData);
      if (
        Number(xCoord) >= characterData.xCoord - 100 &&
        Number(xCoord) <= characterData.xCoord + 100 &&
        Number(yCoord) >= characterData.yCoord - 100 &&
        Number(yCoord) <= characterData.yCoord + 100
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
