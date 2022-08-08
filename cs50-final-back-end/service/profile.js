// Imports the profile Data Access Object
const profileDAO = require('../dao/profile');

// Moves the user id on to the data access layer
// And immediately pushes response to controller layer
class ProfileService {
	getProfile(id) {
		return profileDAO.getProfile(id);
	}
}

module.exports = new ProfileService;