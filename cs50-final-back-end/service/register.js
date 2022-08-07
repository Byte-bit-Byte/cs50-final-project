const registerDAO = require('../dao/register');

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