const argon2 = require("argon2");
const prisma = require("../config/prismaClient");
const session = require("express-session");

exports.getEvents = async (req, res) => {
  try {
    const findAllEvent = await prisma.event.findMany({
      select: {
        title: true,
        date: true,
        location: true,
      },
    });
    res.status(200).json({ message: "event available", findAllEvent });
  } catch (error) {}
};
