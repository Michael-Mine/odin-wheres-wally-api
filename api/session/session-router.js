const { Router } = require("express");
const sessionRouter = Router();

const sessionController = require("./session-controller");

sessionRouter.post("/start", sessionController.startSession);
sessionRouter.post("/finish", sessionController.finishSession);

module.exports = sessionRouter;
