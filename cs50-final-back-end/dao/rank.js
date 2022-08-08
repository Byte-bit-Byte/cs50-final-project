// Imports the database object used to access the database
const db = require('../db/db');

// Creates the Rank Database Access Object
// It Queries the users table to get the users attempts and max score
// based on the provided Id for the top 10
// It first orders based on the max score with larger scores higehr up
// Then it orders based on attempts with fewer attempts higher up
// If there is a tie for the max score
// It saves this data in a variable
// The it retrieves the users last 5 quiz attempt scores
// Based on the id and saves it in a variable
// Lastly it gets the max score and attempt for the provided user id
// It stores this in a variable
// It then returns all the variables in an array to the service layer
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