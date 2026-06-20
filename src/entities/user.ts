export enum Role {
	MEMBER = 'MEMBER',
	ADMIN = 'ADMIN',
	MANAGER = 'MANAGER',
	DEVOPS = 'DEVOPS',
	QA = 'QA',
}

export type User = {
	id: string;
	email: string;
	password?: string;
	lastLogin?: string;
	role: Role;
	fullName: string;
};
