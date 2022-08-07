const signinDAO = require('../dao/signin');

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