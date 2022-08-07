const db = require('../db/db');

class RankDAO {
	async getData(userData) {
		const leaderboard = await db.select('name', 'attempts', 'max_score')
			.from('users')
			.orderBy([
			  { column: 'max_score', order: 'desc' }, 
			  { column: 'attempts', order: 'asc' }
			])
			.limit(10)
			.catch(err => ['Error Getting Leaderboard Data'])

		const scores = await db.select('score')
			.from('quiz_attempts')
			.where('user_id', userData.id)
			.orderBy('id', 'desc')
			.limit(5)
			.catch(err =>{
				console.error(err);
				return ['Error Getting Scores Data'];
			})

		const returnData = await db.select('attempts', 'max_score')
			.from('users')
			.where('id', userData.id)
			.catch(err => ['Error Getting User Data'])

		return [leaderboard, scores, returnData];
	}
}

module.exports = new RankDAO;