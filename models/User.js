const { db } = require("../db/db");

module.exports = class User {

  constructor({ first_name, last_name, email, gender, ip_address }) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.gender = gender;
    this.ip_address = ip_address;
  }

//   static async getUsersCount() {
//     let sql = `SELECT COUNT(*) FROM users`;
//     const count = await db.doEachSql(sql);
//     return await count[0]["COUNT(*)"];
//   }

  static async getUsersOnPage(currentPage, countUsersOnPage) {
    const from = currentPage * countUsersOnPage;
    const to = currentPage * countUsersOnPage + countUsersOnPage + 1;
    let sql = `SELECT * FROM users where id>${from} and id<${to}`;
    const users = await db.doEachSql(sql);

    for (let i = 0; i < (await users.length); i++) {
      sql = `SELECT SUM(clicks) from users_statistic WHERE user_id = ${users[i]["id"]};`;
      const total_clicks = await db.doEachSql(sql);
      users[i].total_clicks = await total_clicks[0]["SUM(clicks)"];
      sql = `SELECT SUM(page_views) from users_statistic WHERE user_id =${users[i]["id"]};`;
      const total_page_views = await db.doEachSql(sql);
      users[i].total_page_views = await total_page_views[0]["SUM(page_views)"];
    }

    return await users;
  }

  static async getStatisticById(id, from, to) {
    const sql = `SELECT * FROM users_statistic WHERE date BETWEEN '${from}' AND '${to}' AND user_id = ${id};`
    const data = await db.doEachSql(sql)
    return await data
  }

};
