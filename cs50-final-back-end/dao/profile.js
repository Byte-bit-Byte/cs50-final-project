// Import the database object to access the database
const db = require('../db/db');

// Queries the database to get all the columns of data
// For the user with the specific ID
// Sends data back up to service layer
class ProfileDAO {
	async getProfile(id) {
		const user = await db.select('*').from('users').where({id});
		return user;
	}
}

module.exports = new ProfileDAO;