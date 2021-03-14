const express = require('express')
const config = require('config')

const sqlite3 = require('sqlite3').verbose()

const app = express()

app.use('/api/user', require('./routes/user.routes'))

const PORT = config.get('port') || 5000

function start() {

    try {
        const db = new sqlite3.Database(`${config.DbUrl}bitmedia.db`, (err)=>{
            if (err) {
                throw new Error(err.message)
            } else console.log('Connect wit bitmedia.db')
        })
        db.close((err) => {
            if (err) {
                console.log(err.message)
                return
            } else console.log('DB connection is closed ')
        })

    } catch(e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}
start()

app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))


// db.close((err) => {
//     if (err) {
//         console.log(err.message)
//         return
//     } else console.log('DB connection is closed ')
// })