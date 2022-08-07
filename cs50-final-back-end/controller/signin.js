const signinService = require('../service/signin');

class SigninController {
  async signinUser(req, res) {
    try {
      const user = await signinService.signinUser(req.body);
      res.status(200).json(user[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json("something went wrong")
    }
  }
}

module.exports = new SigninController;