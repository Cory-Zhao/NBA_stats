const mysql = require('mysql');
const config = require('../config');

const connection = mysql.createConnection(config.database);

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected!');
    const query_database = 'CREATE DATABASE IF NOT EXISTS `nba_players`';
    const query_use = 'USE `nba_teams`';
    const query_table = 'CREATE TABLE IF NOT EXISTS `teams` (`team_id` tinyint(4) NOT NULL AUTO_INCREMENT,`name` varchar(50) NOT NULL,`full_name` varchar(50) NOT NULL,`city` varchar(255) NOT NULL,`acronym` varchar(3) NOT NULL,`conference` varchar(50) NOT NULL,`division` varchar(50) NOT NULL, PRIMARY KEY (`team_id`));';
    connection.query(query_database, function(err) {
        if (err) throw err;
        console.log("Database created!");
    })
    connection.query(query_use, function(err) {
        if (err) throw err;
        console.log("Database used!");
    })
    connection.query(query_table, function(err) {
        if (err) throw err;
        console.log("Table created!");
    })
});