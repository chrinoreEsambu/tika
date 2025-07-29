const express = require("express");
const app = express();
const { middleware, validate } = require("./middleware/middeleware");
const router = require("./router/Allrouter");
require("dotenv").config();

app.use(middleware);
app.use(router);
app.use(validate);
const Port = process.env.PORT || 5000;
(async () => {
  try {
    app.listen(Port, "0.0.0.0", () => {
      console.log(`Server is up on http://localhost:${Port}`);
    });
  } catch (error) {
    console.log("error when starting server", error.message);
  }
})();
