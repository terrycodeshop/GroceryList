const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello from inside node app");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
