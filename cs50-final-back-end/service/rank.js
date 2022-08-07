const rankDAO = require('../dao/rank');

class RankService {
	getData(userData) {
		return rankDAO.getData(userData);
	}
}

module.exports = new RankService;