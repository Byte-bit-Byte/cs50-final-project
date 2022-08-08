// Imports the rank service object
const rankService = require('../service/rank');

// Create Rank Controller class
// Receives user id in the request body
// Passes the id on to the service layer
// Recieves back leaderboard and score data from the service layer if no errors
// Which is served back as the response
class RankController {
  async getData(req, res) {
    try {
      const data = await rankService.getData(req.body);
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json("something went wrong")
    }
  }
}

module.exports = new RankController;