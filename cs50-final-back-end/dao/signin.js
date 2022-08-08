// Imports the database object to access the database
// Imports bcrypt to compare password to saved hash
const db = require('../db/db');
const bcrypt = require('bcrypt-nodejs');

// Recieves user data: emaila and password
// Checks to see if the email is in the login table
// returns an error if it is not
// Compares to saved hash if it is
// If password valid, then query users table
// Return the users data for corresponding to the email
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