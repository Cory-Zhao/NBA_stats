// main.js
const { connection } = require('./dbUtils');
const { createNbaTeamsDB } = require('./create_teams_db');
const { createTableTeams, fetchDataAndInsertIntoTeams } = require('./table_teams');

// Use async/await to ensure the order of execution
(async () => {
    connection.connect();
    console.log("Connected!");
    try {
        await createNbaTeamsDB();
        await createTableTeams();
        await fetchDataAndInsertIntoTeams();
    } catch (error) {
        console.error('Error:', error);
    } finally {
        connection.end();
        console.log("Disconnected!");
    }
})();
