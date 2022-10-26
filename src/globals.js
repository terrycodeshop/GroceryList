// globals.js

// load the path module
const path = require("path");

// load development environment variables
require("dotenv").config();

// initialize empty globals
const globals = {};

// initialize database URI
globals.database_uri = process.env.GROCERY_DATABASE_URI;

// initialize server listening port
globals.server_port = process.env.GROCERY_SERVER_PORT;

// initialize public path
globals.public_path = path.join(__dirname, "../public");

//initialize view path
globals.views_path = path.join(__dirname, "../templates/views");

//initialize partial templates path
globals.partials_path = path.join(__dirname, "../templates/partials");

// initialize copyright holder
globals.copyright_holder = "Terry Code Shop";

// initialize copyright years
globals.copyright_year = () => {
  const baseYear = 2022;
  const thisYear = new Date().getFullYear();
  if (baseYear === thisYear) {
    return `${thisYear}`;
  } else {
    return `${baseYear}-${thisYear}`;
  }
};

// assign page title
globals.page_title = "Grocery List";

// ad global page values to data rendered by view engine
globals.join = (data) => {
  data.page_title = globals.page_title;
  data.copyright_holder = globals.pcopyright_holder;
  data.copyright_year = globals.copyright_year;
  return data;
};

//return all global values
module.exports = globals;
