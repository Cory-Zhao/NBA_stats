const mysql = require('mysql');
const config = require('../config');

const connection = mysql.createConnection(config.database);

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected!');
    const query_database = 'CREATE DATABASE IF NOT EXISTS nba_teams';
    connection.query(query_database, function(err) {
        if (err) throw err;
        console.log("Database created!");
    })
    connection.end();
});