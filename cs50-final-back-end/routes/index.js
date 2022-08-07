const express = require('express');

const profileController = require('../controller/profile');
const registerController = require('../controller/register');
const signinController = require('../controller/signin');
const weekDataController =  require('../controller/weekData');
const questionsController = require('../controller/questions');
const quizController = require('../controller/quiz');
const rankController = require('../controller/rank');

const router = express.Router();

router.use("/images", express.static("images"));

router.get('/', (req, res)=> { res.json('Server Running') });
router.get('/profile/:id', profileController.getProfile);
router.get('/weekData/:id', weekDataController.getWeekData);
router.get('/questions', questionsController.getQuestions);

router.post('/signin', signinController.signinUser);
router.post('/register', registerController.registerUser);
router.post('/quiz', quizController.submitQuiz);
router.post('/rank', rankController.getData);

module.exports = router;