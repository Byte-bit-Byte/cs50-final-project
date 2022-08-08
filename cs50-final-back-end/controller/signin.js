// Imports signin service object
const signinService = require('../service/signin');

// Create Signin Controller class
// Receives user signin data in the request body
// Passes the data on to the service layer for processing
// Recieves back user data from the service layer if no errors
// Which is served back as the response
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