// Imports quiz service object
const quizService = require('../service/quiz');

// Create Quiz Controller class
// Receives quiz responses in the request body
// Passes the responses on to the service layer
// Recieves back a score from the service layer
// Which is served back as the response
class QuizController {
  async submitQuiz(req, res) {
    try {
      const score = await quizService.submitQuiz(req.body);
      res.status(200).json(score);
    } catch (err) {
      console.error(err);
      res.status(500).json("Unable Submit Quiz")
    }
  }
}

module.exports = new QuizController;