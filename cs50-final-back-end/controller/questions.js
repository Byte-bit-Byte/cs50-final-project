// Imports the file system library
const fs = require('fs');

// Recieve the request for the question data 
// Parse the questions.json file
// Serve the data from the json file back as a response
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