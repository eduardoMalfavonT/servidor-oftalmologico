const express = require("express");
const routes = require("./routes/index");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/oftalmologico", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const App = express();
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true }));
App.use(cors());
App.use("/", routes());
App.use(express.static("uploads"));
App.listen(5000);
