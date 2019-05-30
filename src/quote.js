var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "quotz.sqlite3"

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error("20: " + err.message)
    throw err
  } else {
    console.log('Connected to the SQLite database.')
    // db.run(`CREATE TABLE quotes (
    //     id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     category text,
    //     quote text,
    //     author text
    //     )`,
    //   (err) => {
    //     if (err) {
    //       // Table already created
    //     } else {
    //       // Table just created, creating some rows
    //       var insert = 'INSERT INTO quotes (category, quote, author) VALUES (?,?,?)'
    //       db.run(insert, ["Happiness", "Today I choose life. Every morning when I wake up I can choose joy, happiness, negativity, pain... To feel the freedom that comes from being able to continue to make mistakes and choices - today I choose to feel life, not to deny my humanity but embrace it", "Kevyn Aucoin"])
    //       db.run(insert, ["Happiness", "Your success and happiness lies in you. Resolve to keep happy, and your joy and you shall form an invincible host against difficulties", "Helen Keller"])
    //     }
    //   });
  }
});

module.exports = db