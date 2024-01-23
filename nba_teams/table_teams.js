const fetch = require('node-fetch');
const { connection, queryAsync } = require('./dbUtils');

const createTableTeams = async () => {
    try {
        const queryUse = 'USE nba_teams';
        const queryTableTeams = `CREATE TABLE IF NOT EXISTS teams (
            team_id tinyint(4) NOT NULL AUTO_INCREMENT,
            name varchar(50) NOT NULL,
            full_name varchar(50) NOT NULL,
            city varchar(255) NOT NULL,
            acronym varchar(3) NOT NULL,
            conference varchar(50) NOT NULL,
            division varchar(50) NOT NULL,
            PRIMARY KEY (team_id)
        );`;

        await queryAsync(queryUse);
        console.log('Database used!');

        await queryAsync(queryTableTeams);
        console.log('Table created!');
    } catch (error) {
        console.error('Error creating table:', error);
    } 
};

const fetchDataAndInsertIntoTeams = async () => {
    try {
        const apiUrl = 'https://www.balldontlie.io/api/v1/teams';
        const response = await fetch(apiUrl);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Data not found');
            } else if (response.status === 500) {
                throw new Error('Server error');
            } else {
                throw new Error('Network response was not ok');
            }
        }
        
        const data = await response.json();

        connection.beginTransaction();

        const queryInsert = `INSERT IGNORE INTO teams (team_id, name, full_name, city, acronym, conference, division) VALUES ?`;

        for (const team of data.data) {
            const values = [[team.id, team.name, team.full_name, team.city, team.abbreviation, team.conference, team.division]];
            await queryAsync(queryInsert, [values]);
            console.log('Data inserted successfully for team:', team.name);
        }

        connection.commit();
    } catch (error) {
        connection.rollback();
        console.error('Error:', error);
    }
};

module.exports = {
    createTableTeams,
    fetchDataAndInsertIntoTeams,
};