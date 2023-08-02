const userModel = require('./model');

module.exports = {
	getAll: (req, res) => {
		return res.render('users.hbs', { users: userModel.getAll() });
	},
	getById: (req, res) => {},
	create: (req, res) => {
		try {
			const { age, username } = req.body;

			if (!age || !username) {
				throw new Error('Не указан username или возраст');
			}

			userModel.create({ age, username });

			return res.redirect('/users');
		} catch (e) {
			return res.render('users-error.hbs', {
				message: e.message,
			});
		}
	},
	removeByUsername: (req, res) => {
		try {
			const username = req.query.username;

			if (!username) {
				throw new Error('id не указан');
			}

			userModel.removeByUsername({ username });

			res.render('users.hbs', {
				users: userModel.getAll(),
			});
		} catch (e) {
			return res.render('users-error.hbs', {
				message: e.message,
			});
		}
	},
	removeById: (req, res) => {
		try {
			const id = req.query.id;

			if (!id) {
				throw new Error('id не указан');
			}

			userModel.removeById({ id });

			res.render('users.hbs', {
				users: userModel.getAll(),
			});
		} catch (e) {
			return res.render('users-error.hbs', {
				message: e.message,
			});
		}
	},
};
