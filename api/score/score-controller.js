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

module.exports = {
  getLeaderboard,
};
