const users = `CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(255),
    gender VARCHAR(10),
    ip_address VARCHAR(15));`

const users_statistic = `CREATE TABLE users_statistic (
    user_id INTEGER,
    date DATE,
    page_views INTEGER,
    clicks INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id));`

const models = {
  users,
  users_statistic,
};
module.exports = models;
