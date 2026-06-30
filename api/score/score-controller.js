const { body, validationResult, matchedData } = require("express-validator");
const { prisma } = require("../../lib/prisma.js");
const CustomNotFoundError = require("../errors/CustomNotFoundError.js");

async function getLeaderboard(req, res) {
  const { gameSlug } = req.params;

  try {
    const scores = await prisma.score.findMany({
      where: {
        game: {
          title: gameSlug,
        },
      },
      orderBy: {
        time: "asc",
      },
      select: {
        id: true,
        username: true,
        time: true,
      },
    });
    res.status(200).json(scores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch leaderboard scores" });
  }
}

const lengthErr = "must be between 3 and 15 characters.";

const validatePost = [
  body("sessionId").trim().notEmpty(),
  body("username")
    .trim()
    .notEmpty()
    .isLength({ min: 3, max: 15 })
    .withMessage(`Name ${lengthErr}`),
];

const submitScore = [
  validatePost,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    try {
      const { sessionId, username } = matchedData(req);
      const { gameSlug } = req.params;

      const session = await prisma.session.findUnique({
        where: { id: sessionId },
      });

      if (!session) {
        return res.status(400).json({ message: "Session not found" });
      }

      if (!session.endTime) {
        return res.status(400).json({ message: "Session time not found" });
      }

      const durationInMilliseconds =
        session.endTime.getTime() - session.startTime.getTime();

      const savedScore = await prisma.score.create({
        data: {
          username,
          time: durationInMilliseconds,
          gameId: session.gameId,
        },
      });

      await prisma.session.delete({
        where: { id: sessionId },
      });

      res.status(201).json({
        message: "Score saved!",
        score: savedScore,
      });
    } catch (err) {
      return next(err);
    }
  },
];

module.exports = {
  getLeaderboard,
  submitScore,
};
