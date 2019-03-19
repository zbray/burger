var mysql = require("mysql");

var connection;


var connection;
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        port: 3306,
        host: 'localhost',
        user: 'root',
        password: "password",
        database: "burgers_db"
    })
}

module.exports = connection;