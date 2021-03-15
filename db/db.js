const config = require('config')
const models = require('../models/models')
const sqlite3 = require('sqlite3').verbose()
const fs = require("fs");
 /*
const serviceDB = () => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(`${config.DbUrl}`, (err)=>{
            if (err) {
                reject(err)
            } else {
                console.log('Connect with bitmedia.sqlite from promise')
                migrateDB()
                resolve('from promise')     
            }
        })
    })
}
promiseDB().then((result)=>console.log(result));
*/

const db = new sqlite3.Database(`${config.DbUrl}`, (err)=>{
    if (err) {
        throw new Error(err.message)
    } else {
        console.log('Connect with bitmedia.sqlite')        
    }
})
const fromJsonToDb = (json, tableName) => {
    return new Promise((resolve, reject ) => {
        json = JSON.parse(json)
        const keys = Object.keys(json[0])
        let strValues = ''
        for (let i=0; i < keys.length; i++) {
            if (i < keys.length-1) strValues += '?,'
                else strValues += '?'
        }
        var stmt = db.prepare(`INSERT INTO ${tableName} values (${strValues})`)

        json.forEach( (item) => {
        const  itemValues = []
        for (let k in item) {
            itemValues.push(item[k])
        }
        stmt.run(itemValues);
        });

        stmt.finalize();
        resolve()
    })
}

const createTable = (tableName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(`./db/${tableName}.json`, "utf8", 
            function(error,data) {
                if (error) throw new Error(error.message); 
                const sql = models[tableName]
                db.run(sql, (err) => {
                    if (err) throw new Error(err.message)
                    else {
                        fromJsonToDb(data, tableName).then(()=>{
                            console.log(`${tableName} is created!`)
                        })   
                    }
                })
                resolve('readFile resolved')
        });
    })
}

const  migrateDB = (firstTable, secondTable) => {
    return new Promise((resolve, reject) => {
        let  sql = `SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name='${firstTable}';`
        db.get(sql,  (err, row) => { 
            if (err) {
               throw new Error(err.message)
            }
                else {
                    if (!row['COUNT(*)']) {
                    createTable('users').then((result)=>{
                        console.log('first table:', result)
                        sql = `SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name='${secondTable}';`
                        db.get(sql,  (err, row) => { 
                            if (err) throw new Error(err.message)
                                else {
                                    if (!row['COUNT(*)']) {
                                        createTable('users_statistic').then((result)=>{
                                            console.log('second table:', result)
                                            setTimeout(()=>{resolve('migrate resolved!!!')}, 1000)
                                        })
                                    }
                                }
                                
                        })
                    })
                    } else resolve('migrate resolved with out creating table')
                }
        })
        
    })
}

const serviceDB = { db,  migrateDB }

module.exports=serviceDB