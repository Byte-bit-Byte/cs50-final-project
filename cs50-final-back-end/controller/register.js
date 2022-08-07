const registerService = require('../service/register');

class RegisterController {
  async registerUser(req, res) {
    try {
      const user = await registerService.registerUser(req.body);
      res.status(200).json(user[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json("Unable to register")
    }
  }
}

module.exports = new RegisterController;