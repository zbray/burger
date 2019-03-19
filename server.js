//Dependencies
var express = require("express");
// var path = require("path");
var connection = require("../burger/config/connection")
var bodyParser = require("body-parser");
//Set up express
var app = express();

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});


//Allow content from the app to be pulled from the "public" directory
// app.use(express.static(path.join(__dirname + ".../public")));
app.use(express.static("public"));

//Parse application body as JSON
app.use(bodyParser.urlencoded({
  extended: false
}));


//Set Handlebars
var exphbs = require("express-handlebars");
// app.set("views", path.join(__dirname, "/views"));
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");


//Set routes and use them
var routes = require("./controllers/burgers_controller.js");
app.use(routes);

//Start our server so it can listen for client requests
var PORT = process.env.PORT || 8080;
app.listen(PORT);