const profileService = require('../service/profile');

class ProfileController {
  async getProfile(req, res) {
    const { id } = req.params;
    try {
      const user = await profileService.getProfile(id);
        if(user.length !== 0) {
          res.status(200).json(user[0]);
        } else {
          res.status(400).json('User Not Found')
        }
    } catch (err) {
      console.error(err);
      res.status(500).json("something went wrong")
    }
  }
}

module.exports = new ProfileController;