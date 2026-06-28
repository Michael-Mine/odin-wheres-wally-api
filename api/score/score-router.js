const { Router } = require("express");
const scoreRouter = Router();

const scoreController = require("./score-controller");

scoreRouter.get("/:gameSlug", scoreController.getLeaderboard);
scoreRouter.post("/:gameSlug", scoreController.submitScore);

module.exports = scoreRouter;
