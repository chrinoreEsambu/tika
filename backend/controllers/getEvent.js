const argon2 = require("argon2");
const prisma = require("../config/prismaClient");

exports.getEvents = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 6;
  const jumper = (page-1)*limit;
  try {
    const findAllEvent = await prisma.event.findMany({
      skip: jumper,
      take: limit,
      select: {
        id_event: true,
        title: true,
        date: true,
        location: true,
      },
    });
    res.status(200).json({ message: "event available", findAllEvent });
  } catch (error) {}
};
