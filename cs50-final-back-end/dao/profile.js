const db = require('../db/db');

class ProfileDAO {
	async getProfile(id) {
		const user = await db.select('*').from('users').where({id});
		return user;
	}
}

module.exports = new ProfileDAO;