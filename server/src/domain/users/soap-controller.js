const userModel = require('./model');
const { parse } = require('nodemon/lib/cli');

module.exports = {
	getAll: (req, res) => {
		const xmlUsers = parse(userModel.getAll());
		return res.send(xmlUsers);
	},
};
