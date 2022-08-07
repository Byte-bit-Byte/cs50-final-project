const rankService = require('../service/rank');

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