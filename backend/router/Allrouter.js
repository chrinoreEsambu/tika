const express = require("express");
const { createUser } = require("../controllers/userControllers");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Hello depuis Allrouter !");
});

module.exports = router;
