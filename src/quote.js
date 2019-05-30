var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "quotesDb.sqlite"

class Quote {
  sql = "select * from quotes";
  params = [];
  res;

  constructor(res, category = "random"){
    this.res = res;
    if(category != "random"){
      this.sql += " where category = ?";
      this.params.push(category);
    }
  }

  sendQuote(){
    let db = new sqlite3.Database(DBSOURCE, (err) => {
      if (err) {
        // Cannot open database
        console.error("20: " + err.message)
        throw err
      } else {
        console.log('Connected to the SQLite database.')
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
    }); 
  }
}


module.exports = Quote