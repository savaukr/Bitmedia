const models = require('../models/models')
const fs = require("fs");

const fromJsonToDb = (json, tableName, db) => {
    return new Promise((resolve,reject) => {
        try {
            json = JSON.parse(json)
            const keys = Object.keys(json[0])
            let templateValues = ''
            for (let i=0; i < keys.length; i++) {
                if (i < keys.length-1) templateValues += '?,'
                    else templateValues += '?'
            }
            
            db.serialize(function() {
                var stmt = db.prepare(`INSERT INTO ${tableName} values (${templateValues})`)
                json.forEach( (item) => {
                    const  itemValues = []
                    for (let k in item) {
                        itemValues.push(item[k])
                    }
                    stmt.run(itemValues);
                });

                stmt.finalize((err)=>{
                    if (err) reject(err)
                    console.log('finilize')
                    resolve(`${tableName}: fromJsonToDb resolved`)
                })  
            })
            
        } catch(err) { 
            reject(err)
        }
    })
}

const createTable = (tableName, db) => {
    return new Promise((resolve, reject) => {
        const data =  fs.readFileSync(`./db/${tableName}.json`, "utf8")
        const sql = models[tableName]
        db.run(sql, (err) => {
            if (err) { 
                reject(err)
            } else {
                fromJsonToDb(data, tableName, db)
                    .then((result) => {
                        console.log(result)
                        resolve(tableName + ': createdTable resolved')
                })   
            }
        })   
    });
}

const checkExistCreateTable = (tableName, db) => {
    return new Promise((resolve, reject) => {
        let  sql = `SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name='${tableName}';`
        db.get(sql,  (err, row) => { 
            if (err) {
                reject(err)
            } 
            //Перевірка чи існує $tableName таблиця у БД
            if (!row['COUNT(*)']) {
                createTable(tableName, db)
                .then((result)=>{
                    console.log(result)
                    resolve(`${tableName}: checkExistCreateTable resolved`)
                }).catch((err) => {reject(err)})
            } else {
                resolve(`${tableName}: checkExistCreateTable is resolved without creating table`)
            }

        })
    })
}

const  dbMigrate = (firstTable, secondTable, db) => {
    return new Promise((resolve, reject) => {
        checkExistCreateTable(firstTable, db)
            .then((result)=>{
                console.log(result)
                return checkExistCreateTable(secondTable, db)
            })
            .catch((err) => {
                console.log(err.message)
            })
            .then((result) => {
                console.log(result)
                resolve('dbMigrate is resolved')
            })
            .catch((err) => reject(err))
    })
}

module.exports = dbMigrate