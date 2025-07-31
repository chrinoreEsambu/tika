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
      priceAndTypeTickets,
    } = req.body;

    const creatEvent = await prisma.event.create({
      data: {
        title: title,
        description: description,
        date: date,
        location: location,
        availableTickets: availableTickets,
        priceTickets: {
          create: priceAndTypeTickets.map((ticketobj) => ({
            price: ticketobj.price,
            type: ticketobj.type,
          })),
        },
      },
      include: {
        priceTickets: true,
      },
    });

    res.status(201).json({
      message: "your event have been created successfully",
      creatEvent,
    });
  } catch (error) {
    res.status(500).json({
      message: "error during event creation",
      error: { message: error.message },
    });
  }
};
