const express = require("express");
const userControllers = require("../controllers/userControllers");
const createEvents = require("../controllers/createEvents");
const { validate } = require("../middleware/middeleware");
const { event } = require("../controllers/createEvents");
const router = express.Router();

router.post("/api/createUser", validate, userControllers.createUser);
router.post("/api/createEvent", createEvents.event);
module.exports = router;
