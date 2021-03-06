var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "quotz.sqlite3"

const SHORT = 70;
const MEDIUM = 150;
// const LONG = 200;

function getLength(length) {
  if (length <= SHORT) return "short";
  if (length > SHORT && length <= MEDIUM) return "medium";

  return "long";
}

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error("err: " + err.message)
    throw err
  } else {
    console.log('Connected to the SQLite database.')
    // db.run(`CREATE TABLE quotes (
    //     id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     category text,
    //     quote text,
    //     length text,
    //     author text
    //     )`,
    //   (err) => {
    //     if (err) {
    //       // Table already created
    //     } else {
    //       // Table just created, creating some rows
    //       var insert = 'INSERT INTO quotes (category, quote, length, author) VALUES (?,?,?,?)'
    //       var quotes = ["Today I choose life. Every morning when I wake up I can choose joy, happiness, negativity, pain... To feel the freedom that comes from being able to continue to make mistakes and choices - today I choose to feel life, not to deny my humanity but embrace it", "Your success and happiness lies in you. Resolve to keep happy, and your joy and you shall form an invincible host against difficulties"];
    //       db.run(insert, ["happiness", quotes[0], getLength(quotes[0].length) , "Kevyn Aucoin"])
    //       db.run(insert, ["happiness", quotes[1], getLength(quotes[1].length), "Helen Keller"])
    //     }
    //   });
  }
});

module.exports = db