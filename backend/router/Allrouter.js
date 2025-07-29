const express = require("express");
const userControllers = require("../controllers/userControllers");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Hello depuis Allrouter !");
});

router.post("/createUser", userControllers.createUser);
module.exports = router;
