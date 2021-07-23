const mongoose = require("mongoose");
const express = require("express");
const shortid = require("shortid");

const ah = require("./utils/hooks");
const data = require("./data/user");

const app = express();
const router = express.Router();
const port = 8080;

var uri = "mongodb://localhost:27017/kennel";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.use("*", function (req, res, next) {
  req.requestId = shortid.generate();
  console.log("requestId", req.requestId)
  ah.createRequestContext(req.requestId);
  return next();
  });

app.use("/", router);

router.route("/insertdata").post(function(req, res) {
    employees.insertMany(data, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

const userService = require('./service/user');
var getUser = function (req, res) {
  console.log("out context", ah.getRequestContext());
  userService.getUser("60f6ab9fdc367574299f33ac", 
  function (err, user) {
      if (err) {
        console.log("error");
          return res.status(500)
        }
        console.log("in context", ah.getRequestContext());
        return res.status(200).json(user);
      }
  );
}

router.route("/fetchdata").get(getUser);

app.listen(port, function() {
  console.log("Server is running on Port: " + port);
});
