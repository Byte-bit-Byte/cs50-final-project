const quizDAO = require('../dao/quiz');

class QuizService {
	submitQuiz(quizData) {
		if (Object.keys(quizData.responses).length === 0) {
    		return ['incorrect form submission'];
  		}
		return quizDAO.submitQuiz(quizData);
	}
}

module.exports = new QuizService;