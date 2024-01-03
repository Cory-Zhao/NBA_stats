const mysql = require('mysql');
const config = require('../config');

const connection = mysql.createConnection(config.database);

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected!');
    connection.query('CREATE DATABASE IF NOT EXISTS test', function(err) {
        if (err) throw err;
        console.log("Database created!");
    })
    connection.end();
});