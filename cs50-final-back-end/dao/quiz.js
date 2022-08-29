// Imports the database object for accessing the database
// And the file system library for reading the questions.json file
const db = require('../db/db');
const fs = require('fs');

// Quiz Data Access Object class
class QuizDAO {
	async submitQuiz(quizData) {
		// First recieves the users reponses and their id
		const score = await fs.promises.readFile("questions.json")
	        .then(result => {
			    const questions = JSON.parse(result);
				// Grades the quiz using the question.json file
	        	let correct = Object.keys(quizData.responses).filter(question => {
			        return quizData.responses[question] === questions[question].answer
			    });
			    console.log(correct, quizData.id);
			    return correct.length;
		    })
		    .catch(error => {
		    	console.log(error, 'could not read file');
		    	return ['error submitting Quiz'];
		    })
			// Saves the score as variable "score"

		const attempt = await db.transaction(trx => {
			trx('users')
			.where('id', quizData.id)
			.increment('attempts', 1) // Checks the database and increases the user's number of attempts by 1
			.returning('max_score')
			.then(max_score => {
				if(score > max_score[0].max_score){ // Checks if the current score is greater than the max
					return trx('users')
					.where('id', quizData.id)
					.returning('id')
					.update({
						max_score: score
					})
					// Updates the max score if it is
				}				
			})
			.then(id => {
					console.log(id[0].id);
					return trx('quiz_attempts')
					.returning('*')
					.insert({
						user_id: id[0].id,
						score: score
					})
					// Inserts the user's id and their score into the attempts table
					}
				)
			.then(trx.commit)
			.catch(trx.rollback)
		})
		return attempt;
	}
}

module.exports = new QuizDAO;