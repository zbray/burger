//Dependencies
var express = require("express");
var PORT = process.env.PORT || 8080;
var app = express();
var path = require ("path");


//Allow content from the app to be pulled from the "public" directory
app.use(express.static(path.join(__dirname + ".../public")));

//Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Set Handlebar files
app.set('views', path.join(__dirname, '/views'));
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


//Set routes and use them
var routes = require("./controllers/burgers_controller");
app.use(routes);

//Start our server so it can listen for client requests
app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
})