// Create express app
var express = require("express")
var Quote = require("./quote.js")

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

// API endpoints
app.get("/api/quotes", (req, res, next) => {
  // var sql = "select * from quotes"
  // var params = []
  // db.get(sql, params, (err, quote) => {
  //   if (err) {
  //     res.status(400).json({"error":err.message});
  //     return;
  //   }
  //   console.log(quote);
  //   res.json({
  //       "message": "success",
  //       "data": quote
  //   })
  // });
  let q = new Quote(res);
  q.sendQuote();
});

app.get("/api/user/:category", (req, res, next) => {
  // var sql = "select * from user where id = ?"
  // var params = [req.params.id]
  // db.get(sql, params, (err, row) => {
  //     if (err) {
  //       res.status(400).json({"error":err.message});
  //       return;
  //     }
  //     res.json({
  //         "message":"success",
  //         "data":row
  //     })
  //   });
  let q = new Quote(res, req.params.category);
  q.sendQuote();
});

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});