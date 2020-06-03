const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");

const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");
const app = express();
const port = 7000;
const dbConn = require("./database/db");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(express.json());

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
