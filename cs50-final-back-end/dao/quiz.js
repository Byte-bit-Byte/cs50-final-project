const db = require('../db/db');
const fs = require('fs');

class QuizDAO {
	async submitQuiz(quizData) {
		const score = await fs.promises.readFile("questions.json")
	        .then(result => {
			    const questions = JSON.parse(result);
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

		const attempt = await db.transaction(trx => {
			trx('users')
			.where('id', quizData.id)
			.increment('attempts', 1)
			.returning('max_score')
			.then(max_score => {
				if(score > max_score[0].max_score){
					// console.log(max_score[0].max_score);
					return trx('users')
					.where('id', quizData.id)
					.returning('id')
					.update({
						max_score: score
					})
				} else {
					// console.log(max_score);
					return trx('users')
					.where('id', quizData.id)
					.returning('id')
					.update({
						max_score: max_score[0].max_score
					})
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
					}
				)
			.then(trx.commit)
			.catch(trx.rollback)
		})
		return attempt;
	}
}

module.exports = new QuizDAO;