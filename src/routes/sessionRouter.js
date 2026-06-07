const { Router } = require("express");
const sessionRouter = Router();

const sessionController = require("../controllers/sessionController");

sessionRouter.post("/start", sessionController.startSession);
sessionRouter.post("/finish", sessionController.finishSession);

module.exports = sessionRouter;
