var mysql = require('mysql');


class Mysql_connection {

    constructor() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }

    query(sql, params) {
        return new Promise((resolve, reject) => {
            this.pool.query(sql, params, (err, results) => {
                if (err) {
                    reject(err);
                    console.error('Error executing SQL query:', err);
                    return;
                }
                return resolve(results);
                //console.log('mysql_connection - sql: ' + sql, ' params: ', params)
                //console.log('mysql_connection - Query executed successfully. Results:', results);
            });
        });
    }

}

module.exports = new Mysql_connection();