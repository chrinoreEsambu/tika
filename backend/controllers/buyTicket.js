const argon2 = require("argon2");
const prisma = require("../config/prismaClient");
const session = require("express-session");

expots.buyTicket = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "somethings went wrong", error: error.message });
  }
};
