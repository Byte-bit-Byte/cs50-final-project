// Imports the register Data Access Object
const registerDAO = require('../dao/register');

// Recieves the registration data from the controller layer
// Verifies that none of email, name and password are empty
// forwards data to the DAO if no issues
// forwards response to controller layer
class RegisterService {
	registerUser(registerData) {
		const { email, name, password } = registerData;
		if (!email || !name || !password) {
    		return ['incorrect form submission'];
  		}
		return registerDAO.registerUser(email, name, password);
	}
}

module.exports = new RegisterService;