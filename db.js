/* */

const mongoose = require("mongoose");

const database_url =
  "mongodb+srv://doadmin:isn10wT9342F58Sk@tcs-mongo-f9eaec58.mongo.ondigitalocean.com/admin?replicaSet=tcs-mongo&tls=true&authSource=admin";

mongoose.connect(database_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("connected to database: ", mongoose.connected);

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = db;
