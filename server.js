/* */

const express = require("express");

const mongoose = require("mongoose");

const app = express();

const mongoDB =
  "mongodb+srv://doadmin:isn10wT9342F58Sk@tcs-mongo-f9eaec58.mongo.ondigitalocean.com/admin?replicaSet=tcs-mongo&tls=true&authSource=admin";

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("connected to database: ", mongoose.connected);

app.get((req, res) => {
  res.status(200).send("<h1> Grocery List");
});

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
