var express = require("express")
var logger = require("morgan")
var http = require("http")
var parser = require("body-parser")
var path = require("path")

var app = express(); // Makes an express app

app.set("views", path.resolve(__dirname, "views")); // Tells express that views are in "views" folder.
app.set("view engine", "ejs"); // Tells express that views will use the ejs enine.

var entries = []; // Creates an empty global array to save your entries.
app.locals.entries = entries; // Makes this "entries" array visible in all views.

app.use(logger("dev")); // Use morgan logger to log all requests.

app.use(parser.urlencoded(
    { 
        extended:false 
    }
)); // Populates a variable called req.body if the user is submitting a form.

app.get("/", function(request, response){
    response.render("index");
})

app.get("/new-entry", function(request, response){
    response.render("new-entry");
})

app.post("/new-entry", function(request, response){
    if(!request.body.title || !request.body.body){
        response.status(400).send("Body and Title should have some value and cannot be null.");
        
        return;
    }

    entries.push({
        title: request.body.title,
        contents: request.body.body,
        published: new Date()
    })

    response.redirect("/");
})

app.use(function(request, response){
    response.status(404).render("404");
})

var port = process.env.PORT || 8080;
app.listen(port, function(){
    console.log("App is running on port 8080.")
})