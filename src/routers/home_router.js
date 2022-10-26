// home router

// load all 3rd party packages
const express = require("express");

// load all 1st party modules
const globals = require("../globals");

// initialize an express router
const router = new express.Router();

// handle the home route
router.get("/", (req, res) => {
  res.render(
    "index",
    globals.join({
      page_header: "Home",
    })
  );
});

// export the home router
module.exports = router;
