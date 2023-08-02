import { SortField, SortOrder, UsersModel } from './UsersModel';

export class UsersController {
	model: UsersModel;

	constructor(model: UsersModel) {
		this.model = model;
	}

	public handleCreate(username: string, age: number) {
		console.log('handleCreate');
		if (!username || !age) {
			throw Error('Enter username and age');
		}
		return this.model.createUser(username, age);
	}

	public handleSort(field: SortField, order: SortOrder) {
		console.log('handleSort');
		if (!field) {
			throw Error('Enter sort field');
		}
		return this.model.sortUsers(field, order);
	}
}
