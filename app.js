const express = require('express')
const config = require('config')
// const serviceDB = require('./db/db')
const db = require('./db/db')
const app = express()

app.use('/api/user', require('./routes/user.routes'))

const PORT = config.get('port') || 5000


function start() {
    try {
        //serviceDB.migrateDB('users', 'users_statistic') 
        // serviceDB.db.close((err) => {
        //     if (err) {
        //         console.log(err.message)
        //         return
        //     } else console.log('DB connection is closed ')
        // })
    } catch(e) {
        console.log('Server Error', e.message)
        process.exit(1)
    } finally {
        //  serviceDB.db.close((err) => {
        //     if (err) {
        //         console.log(err.message)
        //         return
        //     } else console.log('DB connection is closed ')
        //  })
    }
}
start()

app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))

