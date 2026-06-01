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

      res.json({ message: "received" });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
];

// query Character
// check xCoord & yCoord
// if correct, send name & coords
// if incorrect, send message

module.exports = {
  checkCoords,
};
