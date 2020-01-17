const db = require("../db");

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

const QuoteUtil = {
  /**
   * @param {string} category
   */
  isCategory: (category) => categories.indexOf(category) != -1,

  /**
   * @param {string} length
   */
  isLength: (length) => {
    const lengths = [
      "short", "medium", "long"
    ];

    return lengths.indexOf(length) != -1;
  },

  sendQuote: (res, category = "random", length = "random") => {
    // console.log("sending quote");

    let sql = "select * from quotes";
    let params = [];

    if (category != "random" && QuoteUtil.isCategory(category)) {
      sql += " where category = ?";
      params.push(category);

      if (length != "random" && QuoteUtil.isLength(length)) {
        sql += " AND length = ?";
        params.push(length);
      }
    } else if (length != "random" && QuoteUtil.isLength(length)) {
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
          res.status(200).json({
            "message": "success",
            "data": quotes[index]
          });
        });
      } else {
        let index = Math.floor(Math.random() * quotes.length);
        res.status(200).json({
          "message": "success",
          "data": quotes[index]
        });
      }
    });
  }
};

module.exports = QuoteUtil;
