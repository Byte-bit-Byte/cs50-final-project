// Imports rank Data Access Object
const rankDAO = require('../dao/rank');

// Gets user id from controller layer
// Sends the data directly to the DAO
// forwards response to controller layer
class RankService {
	getData(userData) {
		return rankDAO.getData(userData);
	}
}

module.exports = new RankService;