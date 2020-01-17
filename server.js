// Create express app
const express = require("express");
const QuoteUtil = require('./src/utils/quote');


const app = express();

const HTTP_PORT = 8000;

// Root endpoint
app.get("/", (_, res) => {
  res.json({ "message": "Ok" })
});

// API endpoints
app.get("/api/quote/", (req, res) => {
  // console.log(req.params);
  if (req.headers.authorization != "Bearer: dU7n@#s3ls/'sj8ksjdmV%42wx'ldjvs&8*AjskU") {
    res.status(401).json({
      "error": "Not Authorized"
    });
    return;
  }
  QuoteUtil.sendQuote(res);
});

app.get("/api/quote/:category/", (req, res) => {
  // console.log(req.params);
  if (req.headers.authorization != "Bearer: dU7n@#s3ls/'sj8ksjdmV%42wx'ldjvs&8*AjskU") {
    res.status(401).json({
      "error": "Not Authorized"
    });
    return;
  }
  QuoteUtil.sendQuote(res, req.params.category);
});

app.get("/api/quote/:category/:length", (req, res) => {
  // console.log(req.params);
  if (req.headers.authorization != "Bearer: dU7n@#s3ls/'sj8ksjdmV%42wx'ldjvs&8*AjskU") {
    res.status(401).json({
      "error": "Not Authorized"
    });
    return;
  }
  QuoteUtil.sendQuote(res, req.params.category, req.params.length);
});

// Default response for any other request
app.use(function (_, res) {
  res.status(404);
});

app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}`);
});
