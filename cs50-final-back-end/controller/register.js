// Imports register service object
const registerService = require('../service/register');

// Create Register Controller class
// Receives user registration data in the request body
// Passes the data on to the service layer
// Recieves back a user data from the service layer if no error
// Which is served back as the response
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