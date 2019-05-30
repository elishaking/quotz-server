var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "quotz.sqlite3"

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Quote =
/*#__PURE__*/
function () {
  function Quote(res) {
    var category = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "random";

    _classCallCheck(this, Quote);

    _defineProperty(this, "sql", "select * from quotes");

    _defineProperty(this, "params", []);

    _defineProperty(this, "res", void 0);

    this.res = res;

    if (category != "random") {
      this.sql += " where category = ?";
      this.params.push(category);
    }
  }

  _createClass(Quote, [{
    key: "sendQuote",
    value: function sendQuote() {
      var db = new sqlite3.Database(DBSOURCE, function (err) {
        if (err) {
          // Cannot open database
          console.error("20: " + err.message);
          throw err;
        } else {
          console.log('Connected to the SQLite database.');
          db.run("CREATE TABLE quotes (\n            id INTEGER PRIMARY KEY AUTOINCREMENT,\n            category text UNIQUE,\n            quote text,\n            author text\n            )", function (err) {
            if (err) {// Table already created
            } else {
              // Table just created, creating some rows
              var insert = 'INSERT INTO quotes (category, quote, author) VALUES (?,?,?)';
              db.run(insert, ["Happiness", "Today I choose life. Every morning when I wake up I can choose joy, happiness, negativity, pain... To feel the freedom that comes from being able to continue to make mistakes and choices - today I choose to feel life, not to deny my humanity but embrace it", "Kevyn Aucoin"]);
              db.run(insert, ["Happiness", "Your success and happiness lies in you. Resolve to keep happy, and your joy and you shall form an invincible host against difficulties", "Helen Keller"]);
            }
          });
          db.all(sql, params, function (err, quotes) {
            if (err) {
              res.status(400).json({
                "error": err.message
              });
              return;
            }

            var index = Math.floor(Math.random() * quotes.length);
            res.json({
              "message": "success",
              "data": quotes[index]
            });
          });
        }
      });
    }
  }]);

  return Quote;
}();


module.exports = Quote