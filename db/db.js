const config = require('config')
const sqlite3 = require('sqlite3').verbose()
const dbMigrate = require('./dbMigrate')

const db = new sqlite3.Database(`${config.DbUrl}`, (err)=>{
    if (err) {
        throw new Error(err.message)
    } else {
        console.log('Connect with bitmedia.sqlite')        
    }
})

db.doEachSql = async (sql) => {
    let arr = [];
    const getData = () => {
      return new Promise((resolve, reject) => {
        db.each(
          sql,
          (err, rows) => {
            if (err) {
              reject(err);
            } else {
              arr.push(rows);
            }
          },
          () => {
            resolve(arr);
          }
        );
      });
    };
    return await getData()
}

const dbServices = { db, dbMigrate }

module.exports = dbServices