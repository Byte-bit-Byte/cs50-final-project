// Import sign in Data Access Object
const signinDAO = require('../dao/signin');

// Recieves sign in data from controller layer
// Checks to makes sure email and password are not empty
// Forwards data to the DAO
// Forwards response back to the controller
class SigninService {
	signinUser(signinData) {
		const {email, password} = signinData;
		  if (!email || !password) {
    		return ['incorrect form submission'];
  		}
		return signinDAO.signinUser(email, password);
	}
}

module.exports = new SigninService;