const { Router } = require("express");
const indexRouter = Router();

const indexController = require("../controllers/indexController");

indexRouter.post("/coords", indexController.checkCoords);

module.exports = indexRouter;
