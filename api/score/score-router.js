const { Router } = require("express");
const scoreRouter = Router();

const scoreController = require("./score-controller");

scoreRouter.get("/:gameSlug", scoreController.getLeaderboard);

module.exports = scoreRouter;
