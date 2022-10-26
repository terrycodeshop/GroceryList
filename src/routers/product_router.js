// product router

// load all 3rd party modules
const express = require("express");

// import all 1st party modules
const globals = require("../globals");
const ProductModel = require("../models/product_model.js");

// initialize a new express router
const router = new express.Router();

// return list of products
router.get("/products", (req, res) => {
  ProductModel.find({}, {}, function (err, results) {
    res.render("product_list", globals.join({ products: results }));
  });
});

// return new product form
router.get("/products/new", (req, res) => {
  res.render(
    "product_new",
    globals.join({
      name: "",
      brand: "(Any Brand)",
      quantity: 1,
    })
  );
});

// save form data for new product
router.post("/products/new", (req, res) => {
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

// export product router
module.exports = router;
