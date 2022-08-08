// Imports the database object to access the database
// Imports bcrypt to hash the password before storage
const db = require('../db/db');
const bcrypt = require('bcrypt-nodejs');

// Recieves user data and hashes the recieved password
// Tries to insert user email and hashed password into the login table
// Then uses the email to insert the user info into the users table
// Returns the user data back up to the service layer
class RegisterDAO {
	async registerUser(email, name, password) {
		const hash = bcrypt.hashSync(password);

		const user = await db.transaction(trx => {
			trx.insert({
				hash: hash,
				email: email
			})
			.into('login')
			.returning('email')
			.then(login_email => {
				return trx('users')
				.returning('*')
				.insert({
					email: login_email[0].email,
					name: name
				})
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})
		return user;
	}
}

module.exports = new RegisterDAO;