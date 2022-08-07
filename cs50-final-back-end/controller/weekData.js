// const questionService = require('../service/questions');
const fs = require('fs');

class WeekDataController {
	async getWeekData(req, res) {
		const { id } = req.params;
		fs.promises.readFile("data.json")
		    .then(function(result) {
		      let weeks = JSON.parse(result);
		      res.status(200).json(weeks[id]);
		    })
		    .catch(function(error) {
		       console.log(error);
		       res.status(500).json("Error 500");
		    })
	}
}

module.exports = new WeekDataController;

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
