// Create express app
var express = require("express")
var db = require("./src/db.js")

var app = express()

var HTTP_PORT = 8000

// Root endpoint
app.get("/", (req, res, next) => {
  res.json({ "message": "Ok" })
});

function isCategory(category) {
  const categories = [
    "random",
    "inspirational",
    "motivational",
    "happiness",
    "frienship",
    "family",
    "funny",
    "spiritual",
    "nature",
    "love",
    "work",
    "attitude",
  ];

  return categories.indexOf(category) != -1;
}

function isLength(length) {
  const lengths = [
    "short", "medium", "long"
  ];

  return lengths.indexOf(length) != -1;
}

function sendQuote(res, category = "random", length = "random") {
  console.log("sending quote");

  let sql = "select * from quotes";
  let params = [];

  if (category != "random" && isCategory(category)) {
    sql += " where category = ?";
    params.push(category);

    if (length != "random" && isLength(length)) {
      sql += " AND length = ?";
      params.push(length);
    }
  } else if (length != "random" && isLength(length)) {
    sql += " where length = ?";
    params.push(length);
  }

  db.all(sql, params, (err, quotes) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    // console.log(quotes);

    if (quotes.length == 0) {
      db.all(sql.replace(" AND length = " + length, ""), [category], (err, quotes) => {
        if (err) {
          res.status(400).json({ "error": err.message });
          return;
        }
        let index = Math.floor(Math.random() * quotes.length);
        res.json({
          "message": "success",
          "data": quotes[index]
        });
      });
    } else {
      let index = Math.floor(Math.random() * quotes.length);
      res.json({
        "message": "success",
        "data": quotes[index]
      });
    }
  });
}

// API endpoints
app.get("/api/quote/", (req, res) => {
  // console.log(req.params);
  if (req.headers.authorization != "Bearer: dU7n@#s3ls/'sj8ksjdmV%42wx'ldjvs&8*AjskU") {
    res.status(401).json({
      "error": "Not Authorized"
    });
    return;
  }
  sendQuote(res);
});

app.get("/api/quote/:category/", (req, res) => {
  // console.log(req.params);
  if (req.headers.authorization != "Bearer: dU7n@#s3ls/'sj8ksjdmV%42wx'ldjvs&8*AjskU") {
    res.status(401).json({
      "error": "Not Authorized"
    });
    return;
  }
  sendQuote(res, req.params.category);
});

app.get("/api/quote/:category/:length", (req, res) => {
  // console.log(req.params);
  if (req.headers.authorization != "Bearer: dU7n@#s3ls/'sj8ksjdmV%42wx'ldjvs&8*AjskU") {
    res.status(401).json({
      "error": "Not Authorized"
    });
    return;
  }
  sendQuote(res, req.params.category, req.params.length);
});

// Default response for any other request
app.use(function (_, res) {
  res.status(404);
});

app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}`);
});