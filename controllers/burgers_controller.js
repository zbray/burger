var express = require("express");
var router = express.Router();

var burger = require('../models/burger.js');

// Create the `router` for the app, and export the `router` at the end of your file.
router.get("/", function (req, res) {
  burger.selectAll(function (data) {
    var hbsObject = {
      burger: data
    };
    console.log("hbsObject: " + hbsObject);
    res.render("index", hbsObject);
  });
});

//Add a new burger to the db
router.post("/api/burgers", function (req, res) {
  burger.insertOne([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, req.body.devoured
  ], function (result) {
    res.json({id: result.insertID});
  })
});

//Change Devoured boolean to true
router.put("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function (res) {
    if (res.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

//Export routes
module.exports = router;