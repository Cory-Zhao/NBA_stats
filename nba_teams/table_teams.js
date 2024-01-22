const mysql = require('mysql');
const config = require('../config');
const fetch = require('node-fetch');

const connection = mysql.createConnection(config.database);

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected!');
    const query_use = 'USE nba_teams';
    const query_table_teams = 'CREATE TABLE IF NOT EXISTS teams (team_id tinyint(4) NOT NULL AUTO_INCREMENT, name varchar(50) NOT NULL, full_name varchar(50) NOT NULL, city varchar(255) NOT NULL,acronym varchar(3) NOT NULL, conference varchar(50) NOT NULL, division varchar(50) NOT NULL, PRIMARY KEY (team_id));';
    connection.query(query_use, function(err) {
        if (err) throw err;
        console.log("Database used!");
    })
    connection.query(query_table_teams, function(err) {
        if (err) throw err;
        console.log("Table created!");
    })
});

const apiUrl = 'https://www.balldontlie.io/api/v1/teams';

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Data not found');
      } else if (response.status === 500) {
        throw new Error('Server error');
      } else {
        throw new Error('Network response was not ok');
      }
    }
    return response.json();
  })
  .then(data => {
    connection.beginTransaction();

    const query_insert = 'INSERT INTO teams (team_id, name, full_name, city, acronym, conference, division) VALUES ?';
    for (const team of data.data) {
        const values = [[team.id, team.name, team.full_name, team.city, team.abbreviation, team.conference, team.division]];
        connection.query(query_insert, [values], (error, results) => {
            if (error) {
                console.error('Error inserting data:', error);
            } else {
                console.log('Data inserted successfully:', results);
            }
        });
    }
    
    connection.commit();
    connection.end();
  })
  .catch(error => {
    connection.rollback();
    console.error('Error:', error);
  });