export enum Role {
	MEMBER = 'member',
	ADMIN = 'admin',
	MANAGER = 'manager',
	DEVOPS = 'devops',
	QA = 'qa',
}

export type User = {
	id: string;
	email: string;
	password: string;
	lastLogin?: string;
	role: Role;
	fullName: string;
};
