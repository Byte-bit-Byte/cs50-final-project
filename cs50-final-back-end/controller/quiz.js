const quizService = require('../service/quiz');

class QuizController {
  async submitQuiz(req, res) {
    try {
      const user = await quizService.submitQuiz(req.body);
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json("Unable Submit Quiz")
    }
  }
}

module.exports = new QuizController;