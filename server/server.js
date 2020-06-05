const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 5000;

// create express app
const app = express();

app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require("./config/secret.db.config");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to Garden application. Organize and keep track of all your plants.",
  });
});

require("./routes/plant.routes.js")(app);
require("./JSONs/reader")();
// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
