// Import the file system library
const fs = require('fs');

// Creates the week data controller class
// Recieves a request for a week as a request parameter
// The parameter is used to find the specific week's data from the data.json file
// The data for the requested week is served back as a response
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
