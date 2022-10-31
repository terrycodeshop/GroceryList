// app.js

// import aall 3rd party modules
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

// import all 1st party modules
const globals = require("./globals");
const productRouter = require("./routers/product_router");
const homeRouter = require("./routers/home_router");

//const userModel = require("./models/user_model");

// create and initialize express application
const app = express();
const store = new MongoDBStore({
  uri: globals.database_uri,
  collection: "sessions",
});

const csrfProtection = csrf();

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", globals.views_path);
hbs.registerPartials(globals.partials_path);

// Setup static directory to serve
app.use(express.static(globals.public_path));

// add middleware to have form data parsed and attached to request body property
app.use(express.urlencoded({ extended: true }));

// register all routes
app.use(productRouter);
app.use(homeRouter);

// export express and mongoose connection
module.exports = { app, mongoose };
