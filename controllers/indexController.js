const { body, validationResult, matchedData } = require("express-validator");
const { prisma } = require("../lib/prisma.js");

async function checkCoords(req, res) {}

module.exports = {
  checkCoords,
};
