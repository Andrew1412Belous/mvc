import { UsersController } from './UsersController';
import { SortField, SortOrder, User } from './UsersModel';
import './users.css';

export class UsersView {
	controller: UsersController;
	root: HTMLElement;

	private form: HTMLDivElement | undefined;
	private users: HTMLElement | undefined;
	private usernameInput: HTMLInputElement | undefined;
	private ageInput: HTMLInputElement | undefined;
	private createButton: HTMLButtonElement | undefined;

	private sortSelectors: HTMLDivElement | undefined;
	private fieldSelect: HTMLSelectElement | undefined;
	private orderSelect: HTMLSelectElement | undefined;
	private sortButton: HTMLButtonElement | undefined;

	constructor(root: HTMLElement, controller: UsersController) {
		this.root = root;
		this.controller = controller;

		this.createUserForm();
		this.createSortSelectors();
		this.createUsersList();

		this.bindListeners();
	}

	private onCreateClick = () => {
		try {
			if (this.usernameInput && this.ageInput) {
				const newUser = this.controller.handleCreate(
					this.usernameInput.value,
					Number(this.ageInput.value),
				);

				this.renderNewUser(newUser);
			}
		} catch (e) {
			this.showError((e as Error).message);
		}
	};

	private onSortClick = () => {
		if (this.fieldSelect && this.orderSelect) {
			const newUsers = this.controller.handleSort(
				this.fieldSelect.value as SortField,
				this.orderSelect.value as SortOrder,
			);
			this.renderUsers(newUsers);
		}
	};

	private bindListeners() {
		if (this.createButton && this.sortButton) {
			this.createButton.addEventListener('click', this.onCreateClick);
			this.sortButton.addEventListener('click', this.onSortClick);
		}
	}

	private showError(message: string) {
		alert(message);
	}

	private getUserElement(user: User) {
		return `
                 <div class="user">
                    <h3>Username = ${user.username}</h3>
                    <h5>Age = ${user.age}</h5>
                </div>
            `;
	}

	private renderNewUser(user: User) {
		const userNode = document.createElement('div');
		userNode.innerHTML = this.getUserElement(user);

		this.users && this.users.appendChild(userNode);
	}

	private renderUsers(users: User[]) {
		const usersElements = users.map((user) => {
			return this.getUserElement(user);
		});

		if (this.users) this.users.innerHTML = usersElements.join('');
	}

	private createUsersList() {
		this.users = document.createElement('div');
	}

	private createSortSelectors() {
		this.sortSelectors = document.createElement('div');

		this.fieldSelect = document.createElement('select');
		const usernameOption = document.createElement('option');
		usernameOption.value = 'username';
		usernameOption.innerText = 'User name';
		const ageOption = document.createElement('option');
		ageOption.value = 'age';
		ageOption.innerText = 'Age';

		this.fieldSelect.add(usernameOption);
		this.fieldSelect.add(ageOption);

		this.orderSelect = document.createElement('select');
		const ascOption = document.createElement('option');
		ascOption.value = 'asc';
		ascOption.innerText = 'by ascending';
		const descOption = document.createElement('option');
		descOption.value = 'desc';
		descOption.innerText = 'by descending';

		this.orderSelect.add(ascOption);
		this.orderSelect.add(descOption);

		this.sortButton = document.createElement('button');
		this.sortButton.innerText = 'sort';

		this.sortSelectors.appendChild(this.fieldSelect);
		this.sortSelectors.appendChild(this.orderSelect);
		this.sortSelectors.appendChild(this.sortButton);
	}

	private createUserForm() {
		this.form = document.createElement('div');
		this.usernameInput = document.createElement('input');
		this.usernameInput.placeholder = 'Enter your username';
		this.ageInput = document.createElement('input');
		this.ageInput.placeholder = 'ВEnter your age';
		this.createButton = document.createElement('button');
		this.createButton.innerText = 'Create';
		this.form.appendChild(this.usernameInput);
		this.form.appendChild(this.ageInput);
		this.form.appendChild(this.createButton);
	}

	public mount() {
		this.root.innerHTML = `
            <h1>Users</h1>
        `;

		if (this.sortSelectors && this.form && this.users) {
			this.root.appendChild(this.sortSelectors);
			this.root.appendChild(this.form);
			this.root.appendChild(this.users);
		}
	}
}
