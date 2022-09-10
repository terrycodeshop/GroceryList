/* */

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("<h1> Grocery List");

  console.log("get /");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
