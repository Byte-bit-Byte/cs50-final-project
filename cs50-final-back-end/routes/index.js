// Imports express for the router
const express = require('express');

// Imports all the needed controllers
const profileController = require('../controller/profile');
const registerController = require('../controller/register');
const signinController = require('../controller/signin');
const weekDataController =  require('../controller/weekData');
const questionsController = require('../controller/questions');
const quizController = require('../controller/quiz');
const rankController = require('../controller/rank');

// Assigns the router to the express router method
const router = express.Router();

// Uses express static to serve all the images on request
router.use("/images", express.static("images"));

// Router Get requests pushed to controller layer
router.get('/', (req, res)=> { res.json('Server Running') });
router.get('/profile/:id', profileController.getProfile);
router.get('/weekData/:id', weekDataController.getWeekData);
router.get('/questions', questionsController.getQuestions);

// Router post requests pushed to controller layer
router.post('/signin', signinController.signinUser);
router.post('/register', registerController.registerUser);
router.post('/quiz', quizController.submitQuiz);
router.post('/rank', rankController.getData);

// Exports router
module.exports = router;