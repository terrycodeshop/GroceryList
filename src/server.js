/* */

/*( environment variables */
const port = process.env.PORT || 3000;
const mongo_uri =
  "mongodb+srv://doadmin:UB70V68mO1253Kyt@tcs-mongo-7d8a1ff1.mongo.ondigitalocean.com/admin?tls=true&authSource=admin";

/* import all node modules */
const path = require("path");
const express = require("express");
const bodyparser = require("body-parser");
const hbs = require("hbs");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");
const multer = require("multer");

const app = express();
const store = new MongoDBStore({
  uri: mongo_uri,
  collection: "sessions",
});
const csrfProtection = csrf();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Grocery List",
    name: "Terry Code Shop",
  });
});

/*connect to mongo database and then begin listening for connections */
mongoose
  .connect(mongo_uri)
  .then((result) => {
    console.log("Connected to database");

    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
