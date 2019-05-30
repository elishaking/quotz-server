// Create express app
var express = require("express")
var db = require("./quote.js")

var app = express()

// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

function sendQuote(res, category = "random"){
  let sql = "select * from quotes";
  let params = [];

  if (category != "random") {
    sql += " where category = ?";
    params.push(category);
  }

  db.all(sql, params, (err, quotes) => {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }

    let index = Math.floor(Math.random() * quotes.length);

    res.json({
      "message":"success",
      "data": quotes[index]
    })
  });
}

// API endpoints
app.get("/api/quote", (req, res, next) => {
  sendQuote(res);
});

app.get("/api/quote/:category", (req, res, next) => {
  sendQuote(res, req.params.category);
});

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});