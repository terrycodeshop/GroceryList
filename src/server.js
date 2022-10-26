// server.js

//load globals
const globals = require("../src/globals");
console.log(globals);

// load app and mongoose modules
const { app, mongoose } = require("../src/app");

//connect to mongo database and then begin listening for connections
mongoose
  .connect(globals.database_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log(`Connected to database: ${globals.database_uri}`);

    // start server listing
    app.listen(globals.server_port, () => {
      console.log(`Server is listening on port ${globals.server_port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
