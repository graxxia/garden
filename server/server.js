const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("./_helpers/jwt");
const errorHandler = require("./_helpers/error-handler");
//const port = 5000;

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use("/users", require("./controllers/user.controller"));

// global error handler
app.use(errorHandler);

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to Garden application. Organize and keep track of all your plants.",
  });
});

require("./routes/plant.routes.js")(app);

// listen for requests

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 5000;
app.listen(port, async function () {
  console.log("Server listening on port " + port);

  //const reader = require("./JSONs/reader")();

});
