//const users = ["id", "first_name", "last_name", "email", "gender", "ip_address"]
//const users_statistic = ["user_id", "date", "page_views", "clicks"]
const users =`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(255),
    gender VARCHAR(10),
    ip_address VARCHAR(15));`

const users_statistic = `CREATE TABLE users_statistic (
    user_id INTEGER,
    date VARCHAR(10),
    page_views INTEGER,
    clicks INTEGER);
`

const models = {
    users,
    users_statistic
}
module.exports = models