// Imports the profile service object
const profileService = require('../service/profile');

// Creates the profile controller class object
// It profides the user id parameter to the service layer to process
// Recives back an array of length 1 containing user data
// Provides the user data as a response if no error occurs
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