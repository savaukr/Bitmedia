const config = require('config')
const models = require('../models/models')
const sqlite3 = require('sqlite3').verbose()
const fs = require("fs");

const db = new sqlite3.Database(`${config.DbUrl}`, (err)=>{
    if (err) {
       throw new Error(err.message)
    } else {
        console.log('Connect with bitmedia.sqlite')      
    }
})


InitialDb()
    .then((db) => {
        createTable('users')
        return new Promise((resolve, reject) => {
            
        })
    })

const fromJsonToDb = (json, tableName) => {
    // return new Promise((resolve, reject ) => {
        json = JSON.parse(json)
        const keys = Object.keys(json[0])
        let strValues = ''
        for (let i=0; i < keys.length; i++) {
            if (i < keys.length-1) strValues += '?,'
                else strValues += '?'
        }
        
        db.serialize(function() {
            var stmt = db.prepare(`INSERT INTO ${tableName} values (${strValues})`)
            json.forEach( (item) => {
                const  itemValues = []
                for (let k in item) {
                    itemValues.push(item[k])
                }
                stmt.run(itemValues);
            });
            stmt.finalize()
        })
        
        //resolve('fromJsonToDb resolved')
    //})
}

const createTable = (tableName) => {
    // return new Promise((resolve, reject) => {
        const data =  fs.readFileSync(`./db/${tableName}.json`, "utf8")
        //console.log(JSON.parse(data).length)
        const sql = models[tableName]
        db.run(sql, (err) => {
            if (err) throw new Error(err.message)
            else {
                fromJsonToDb(data, tableName).then((result)=>{
                    console.log(`${tableName}: ${result}`)
                    //resolve(tableName + ': createdTable resolved')
                })   
            }
        })
        
    // });
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
                                            resolve('migrate resolved!!!')
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