const express = require('express')
const config = require('config')
const dbServices = require('./db/db')
const app = express()

app.use(express.json({extended: true}))
app.use('/api/user', require('./routes/user.routes'))
app.use('/api/static', require('./routes/static.routes'))

const PORT = config.get('port') || 5000

function start() {
    try {
        dbServices.dbMigrate('users', 'users_statistic', dbServices.db)
            .then((result)=>{
                console.log('\nstart :', result)
            })
            .catch((err)=>{
                console.log("Error in promise:", err.message)
            })
            .finally(()=> {
                console.log('finally is working...')
                /*
                dbServices.db.close((err) => {
                    if (err) {
                        console.log(err.message)
                    } else console.log('DB connection is closed!!! ')
                })
                */
            })
        
    } catch(e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}
start()

app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))

process.on('SIGINT', () => {
    dbServices.db.close();
    server.close();
});

