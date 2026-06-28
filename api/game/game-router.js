const { Router } = require("express");
const gameRouter = Router();

const gameController = require("./game-controller");

gameRouter.post("/coords", gameController.checkCharacterLocation);

module.exports = gameRouter;
