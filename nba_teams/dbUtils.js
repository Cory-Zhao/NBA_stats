// dbUtils.js
const mysql = require('mysql');
const config = require('../config');

const connection = mysql.createConnection(config.database);

const queryAsync = (query, values) => {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = {
    connection,
    queryAsync,
};