// Imports quiz Data Access Object
const quizDAO = require('../dao/quiz');

// recieves quiz data from controller layer
// ensures there are quiz responses to be graded
// Pushes the quiz data on to the DA layer if no issues
// Recieves the result and sends it to the controller layer
class QuizService {
	submitQuiz(quizData) {
		if (Object.keys(quizData.responses).length === 0) {
    		return ['incorrect form submission'];
  		}
		return quizDAO.submitQuiz(quizData);
	}
}

module.exports = new QuizService;