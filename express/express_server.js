const express = require("express");
const server = express();

const bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({extended: true}));

server.set("view engine", "ejs");
server.use(express.static("public"));

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

function generateRandomString() {
  return Math.random().toString(36).substr(2, 6);
}

server.listen(8080, function() {
  console.log("Server started");
})

server.get("/", function(request, response) {
  response.end("Hello");
});

server.get("/urls.json", (request, response) => {
  response.json(urlDatabase);
});

server.get("/urls", (request, response) => {
  let templateVars = {urls: urlDatabase};
  response.render("index", urlDatabase);
});

server.get("/urls/new", (request, response) => {
  response.render("urls_new");
});

server.post("/urls", (request, response) => {
  var shortURL = generateRandomString();
  urlDatabase[shortURL] = request.body.longURL;
  response.redirect("/urls/" + shortURL);
});

server.get("/urls/:id", (request, response) => {
  let templateVars = {shortURL: request.params.id,
                      urls: urlDatabase};
  response.render("urls_show", templateVars);
});

server.get("/u/:shortURL", (request, response) => {
  let longURL = urlDatabase[shortURL];
  response.redirect(longURL);
});




// // create another route where you can input a person's name - anything after the / is set to 'name'
// server.get("/:name", function(request, response) {
//   response.render("index", {name: request.params.name,
//                             colors: ["red", "green"],
//                             showMoon: true})
//   response.send(request.params.name)
// })

server.post("/", function(request, response) {
  response.send("You made a post request");
});

