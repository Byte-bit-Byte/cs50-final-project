const db = require('../db/db');
const bcrypt = require('bcrypt-nodejs');

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