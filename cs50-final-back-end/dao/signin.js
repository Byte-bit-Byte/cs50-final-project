const db = require('../db/db');
const bcrypt = require('bcrypt-nodejs');

class SigninDAO {
	async signinUser(email, password) {
		const user = await db.select('email', 'hash')
								.from('login')
								.where('email', email)
								.then(data => {
									const isValid = bcrypt.compareSync(password, data[0].hash);
									if (isValid) {
										return db.select('*')
													.from('users')
													.where('email',email)
													.catch(err => ['unable to get user'])
									} else {
										return ['wrong credentials'];
									}
								}).catch(err => ['wrong credentials'])

		return user;
	}
}

module.exports = new SigninDAO;