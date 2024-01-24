const fetch = require('node-fetch');
const { connection, queryAsync } = require('./dbUtils');

const createTableGameStats = async () => {
    try {
        const queryUse = 'USE nba_teams';
        const queryTableGameStats = `CREATE TABLE IF NOT EXISTS game_stats (
            game_id int NOT NULL, 
            home_team_id tinyint NOT NULL, 
            visitor_team_id tinyint NOT NULL, 
            home_team_score int NOT NULL, 
            visitor_team_score int NOT NULL, 
            date varchar(10) NOT NULL,
            status varchar(20) NOT NULL,
            season int NOT NULL, 
            postseason boolean NOT NULL, 
            PRIMARY KEY (game_id)
        );`;

        await queryAsync(queryUse);
        console.log('Database used!');

        await queryAsync(queryTableGameStats);
        console.log('Table created!');
    } catch (error) {
        console.error('Error creating table:', error);
    } 
};

const fetchDataAndInsertIntoGameStats = async (page = 1) => {
    const date = new Date();
    const parameters = {
        season: 2023,
        start_date: '2023-10-24',
        end_date: date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2,'0') + '-' + date.getDate().toString().padStart(2,'0'),
        per_page: 100,
    };
    
    try {
        const apiUrl = `https://balldontlie.io/api/v1/games?seasons[]=${parameters.season}&start_date=${parameters.start_date}&end_date=${parameters.end_date}&per_page=${parameters.per_page}&page=${page}`;
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

        const queryInsert = `REPLACE INTO game_stats (game_id, home_team_id, visitor_team_id, home_team_score, visitor_team_score, date, status, season, postseason) VALUES ?`;
    
        for (const game of data.data) {
            const values = [[game.id, game.home_team.id, game.visitor_team.id, game.home_team_score, game.visitor_team_score, game.date.slice(0,10), game.status, game.season, game.postseason]];
            if (game.status == "3rd Qtr") {
                console.log(values);
            }
            await queryAsync(queryInsert, [values]);
            console.log(`Data inserted successfully for game { ID: ${game.id}, ${game.home_team.abbreviation} vs ${game.visitor_team.abbreviation} }`);
        }
        connection.commit();

        if (data.meta.next_page) {
            await fetchDataAndInsertIntoGameStats(page + 1);
        }
    }
    catch (error) {
        connection.rollback();
        console.error('Error:', error);
    }

};

module.exports = {
    createTableGameStats,
    fetchDataAndInsertIntoGameStats,
}