const { body, validationResult, matchedData } = require("express-validator");
const { prisma } = require("../../lib/prisma.js");
const CustomNotFoundError = require("../errors/CustomNotFoundError.js");

const validateStartSession = [
  body("gameId").trim().notEmpty().isNumeric().isInt({ min: 1, max: 9 }),
];

const startSession = [
  validateStartSession,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    try {
      const { gameId } = matchedData(req);

      const session = await prisma.session.create({
        data: { gameId: Number(gameId) },
      });

      res.status(201).json({ sessionId: session.id });
    } catch (err) {
      console.error("Start session error: ", err);
      return next(err);
    }
  },
];

const validateFinishSession = [body("sessionId").trim().notEmpty()];

const finishSession = [
  validateFinishSession,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    try {
      const { sessionId } = matchedData(req);

      const currentTime = new Date();

      const session = await prisma.session.update({
        where: { id: sessionId },
        data: { endTime: currentTime },
      });

      const durationInMilliseconds =
        currentTime.getTime() - session.startTime.getTime();

      res.status(200).json({ time: durationInMilliseconds });
    } catch (err) {
      console.error("Start finish error: ", err);
      return next(err);
    }
  },
];

module.exports = {
  startSession,
  finishSession,
};
