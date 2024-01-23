// main.js
const { connection } = require('./dbUtils');
const { createNbaTeamsDB } = require('./create_teams_db');
const { createTableTeams, fetchDataAndInsertIntoTeams } = require('./table_teams');
const { createTableGameStats, fetchDataAndInsertIntoGameStats } = require('./table_game_stats');
// Use async/await to ensure the order of execution
(async () => {
    connection.connect();
    console.log("Connected!");
    try {
        await createNbaTeamsDB();
        await createTableTeams();
        await fetchDataAndInsertIntoTeams();
        await createTableGameStats();
        await fetchDataAndInsertIntoGameStats();
    } catch (error) {
        console.error('Error:', error);
    } finally {
        connection.end();
        console.log("Disconnected!");
    }
})();
