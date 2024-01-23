const { queryAsync } = require('./dbUtils');

const createNbaTeamsDB = async () => {
    try {
        const queryCreateDatabase = 'CREATE DATABASE IF NOT EXISTS nba_teams';
        await queryAsync(queryCreateDatabase);

        console.log('Database created!');
    } catch (error) {
        console.error('Error creating database:', error);
    }
};

module.exports = {
  createNbaTeamsDB,
};