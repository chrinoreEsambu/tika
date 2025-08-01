const express = require("express");
const userControllers = require("../controllers/userControllers");
const createEvents = require("../controllers/createEvents");
const { validate } = require("../middleware/middeleware");
const getEventsControllers =require("../controllers/getEvent")
// const { event } = require("../controllers/createEvents");
const router = express.Router();

router.post("/api/createUser", validate, userControllers.createUser);
router.post("/api/createEvent", createEvents.event);

router.get ("/api/getEvent",getEventsControllers.getEvents)
module.exports = router;
