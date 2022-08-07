const profileDAO = require('../dao/profile');

class ProfileService {
	getProfile(id) {
		return profileDAO.getProfile(id);
	}
}

module.exports = new ProfileService;