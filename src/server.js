/* */

/* load development environment variables */
require("dotenv").config();

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
  uri: process.env.DATABASE_URI,
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

/* add middleware to have form data parsed and attached to request body property */
app.use(express.urlencoded({ extended: true }));

/* import product model */
const ProductModel = require("./models/product_model.js");

/* return list of products */
app.get("/products", (req, res) => {
  ProductModel.find({}, {}, function (err, results) {
    res.render("product_list", { products: results });
  });
});

/* return new product form  */
app.get("/products/new", (req, res) => {
  res.render("product_new", {
    name: "",
    brand: "(Any Brand)",
    quantity: 1,
  });
});

/* save form data for new product */
app.post("/products/new", (req, res) => {
  let product = new ProductModel();
  product.name = req.body.name;
  product.brand = req.body.brand;
  product.quantity = req.body.quantity;
  product
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/products");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/", (req, res) => {
  res.render("index");
});

/*connect to mongo database and then begin listening for connections */
mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connected to database");

    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
