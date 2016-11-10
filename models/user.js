let sqlite3 = require('sqlite3')
let md5 = require('md5')
class User {

  constructor() {
    this.db = new sqlite3.Database('virt-mgmt')
  }

  auth(username, password) {
    let hashedPassword = md5(password)
    let stmt = this.db.prepare('SELECT * FROM users WHERE username=? AND password=?;', username, hashedPassword)
    return new Promise((resolve, reject) => {
      stmt.get(username, hashedPassword, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }
}

module.exports = {User:User}
