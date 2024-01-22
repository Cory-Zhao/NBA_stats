const mysql = require('mysql');
const config = require('../config');
const fetch = require('node-fetch');

const connection = mysql.createConnection(config.database);

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected!');
    const query_use = 'USE nba_teams';
    const query_table_team_stats = 'CREATE TABLE IF NOT EXISTS team_stats (game_id tinyint(4) NOT NULL AUTO_INCREMENT, home_team_id varchar(50) NOT NULL, visitor_team_id varchar(50) NOT NULL, home_team_score tinyint(3) NOT NULL, visitor_team_score tinyint(3) NOT NULL, season tinyint(4) NOT NULL, postseason boolean NOT NULL, PRIMARY KEY (game_id));'
    connection.query(query_use, function(err) {
        if (err) throw err;
        console.log("Database used!");
    })
    connection.query(query_table_team_stats, function(err) {
      if (err) throw err;
      console.log("Table created!");
    })
});

const date = new Date();
const parameters = {
    season: 2023,
    start_date: '2023-10-24',
    end_date: date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2,'0') + '-' + date.getDate().toString().padStart(2,'0'),
    per_page: 100,
};
let page = 1;

const apiUrl = `https://balldontlie.io/api/v1/games?seasons[]=${parameters.season}&start_date=${parameters.start_date}&end_date=${parameters.end_date}&per_page=${parameters.per_page}&page=${page}`;

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