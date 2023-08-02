let users = [{ id: 1, username: 'test', age: 20 }];

module.exports = {
	create: ({ username, age }) => {
		const newUser = {
			username,
			age,
			id: String(Date.now()),
		};

		if (!users.find((user) => user.username === username)) {
			users.push(newUser);
		} else {
			throw new Error('User already exists');
		}

		return newUser;
	},
	removeById: ({ id }) => {
		const userIndex = users.findIndex((user) => user.id === id);

		if (userIndex === -1) {
			throw new Error('User not found');
		}

		users.splice(userIndex, 1);

		return id;
	},
	removeByUsername: ({ username }) => {
		const userIndex = users.findIndex((user) => user.username === username);

		if (userIndex === -1) {
			throw new Error('User not found');
		}

		users.splice(userIndex, 1);

		return username;
	},
	getById: ({ id }) => users.find((user) => user.id === id),
	getAll: () => users,
};
