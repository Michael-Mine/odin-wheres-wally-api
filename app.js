require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const gameRouter = require("./api/game/game-router");
const sessionRouter = require("./api/session/session-router");
const scoreRouter = require("./api/score/score-router");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/games", gameRouter);
app.use("/sessions", sessionRouter);
app.use("/scores", scoreRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = 3004;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${PORT}!`);
});
