require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const gameRouter = require("./routes/gameRouter");
const sessionRouter = require("./routes/sessionRouter");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/games", gameRouter);
app.use("/sessions", sessionRouter);

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
