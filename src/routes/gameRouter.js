const { Router } = require("express");
const gameRouter = Router();

const gameController = require("../controllers/gameController");

gameRouter.post("/coords", gameController.checkCoords);

module.exports = gameRouter;
