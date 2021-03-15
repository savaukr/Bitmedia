const config = require('config')
const models = require('../models/models')
const sqlite3 = require('sqlite3').verbose()
const fs = require("fs");

const db = new sqlite3.Database(`${config.DbUrl}`, (err)=>{
    if (err) {
        throw new Error(err.message)
    } else {
        console.log('Connect with bitmedia.sqlite')
        migrateDB()
        
    }
    //  db.close((err) => {
    //     if (err) {
    //            console.log(err.message)
    //         return
    //         } else console.log('DB connection is closed ')
    // })
})

const createTable = (tableName) => {
    fs.readFile(`./db/${tableName}.json`, "utf8", 
            function(error,data) {
                if (error) throw new Error(error.message); 
                console.log(JSON.parse(data)[0]);
                const sql = models[tableName]
                db.run(sql, (err) => {
                    if (err) throw new Error(err.message)
                     else {
                         console.log('writing data to DB')
                     }
                })
    });
}

const migrateDB = () => {
    let  sql = `SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name='users';`
    db.get(sql,  (err, row) => { 
        if (err) throw new Error(err.message)
            else {
                if (!row['COUNT(*)']) {
                    createTable('users')
                    console.log('table needs to create: users')
                }
            }
            
    })

    sql = `SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name='users_statistic';`
    db.get(sql,  (err, row) => { 
        if (err) throw new Error(err.message)
            else {
                if (!row['COUNT(*)']) {
                    createTable('users_statistic')
                    console.log('table needs to create: users_statistic ')
                }
            }
            
    })
}

//const serviceDB = { db, migrateDB }

//module.exports=serviceDB
module.exports=db