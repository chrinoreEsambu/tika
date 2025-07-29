const express = require("express");
const userControllers = require("../controllers/userControllers");
const { validate } = require("../middleware/middeleware");
const router = express.Router();

router.post("/api/createUser", validate, userControllers.createUser);

module.exports = router;
