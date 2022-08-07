// const questionService = require('../service/questions');
const fs = require('fs');

class QuestionController {
	async getQuestions(req, res) {
		fs.promises.readFile("questions.json")
		    .then(function(result) {
		      let questions = JSON.parse(result);
		      res.status(200).json(questions);
		    })
		    .catch(function(error) {
		       console.log(error);
		       res.status(500).json("Error 500");
		    })
	}
}

module.exports = new QuestionController;

// class PersonController {
// 	async createPerson(req, res) {
// 		try {
// 			const id = await personService.createPerson(req.body);
// 			res.status(200).json(id);
// 		} catch (err) {
// 			console.error(err);
// 			res.status(500).json("something went wrong")
// 		}
// 	}
// }
