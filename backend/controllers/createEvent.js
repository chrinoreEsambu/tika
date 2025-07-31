const argon2 = require("argon2");
const prisma = require("../config/prismaClient");
const session = require("express-session");

exports.event = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "error during event creation" });
  }
};
