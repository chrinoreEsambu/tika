const argon2 = require("argon2");
const prisma = require("../config/prismaClient");
const session = require("express-session");

exports.event = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      location,
      availableTickets,
      quantity,
      ticketsSold,
    } = req.body;
    const creatEvent = await prisma.event.create({
      data: {
        title: title,
        description: description,
        date: date,
        location: location,
        availableTickets: availableTickets,
        quantity: quantity || null,
        ticketsSold: ticketsSold || 100,
        priceTickets: {
          create: [
            { type: "vip", price: 200 },
            { type: "Standard", price: 50 },
          ],
        },
      },
    });
    res
      .status(201)
      .json({
        message: "your event have been created successfully",
        creatEvent,
      });
  } catch (error) {
    res.status(500).json({ message: "error during event creation",error:{message:error.message} });
  }
};
