import { Role, type User } from '@/entities/user';
import type { CreateUserDtoType } from '@/shared/api/users/create-user';
import type { UpdateUserDtoType } from '@/shared/api/users/update-user';

export type TeamMemberUserType = Pick<
	User,
	'id' | 'fullName' | 'email' | 'role' | 'lastLogin'
>;

export const MOCK_TEAM_MEMBER_USERS: TeamMemberUserType[] = [
	{
		id: 'usr-anna-ivanova',
		fullName: 'Анна Иванова',
		email: 'anna.ivanova@devgate.local',
		role: Role.MANAGER,
		lastLogin: '2026-05-03T09:14:00.000Z',
	},
	{
		id: 'usr-denis-kravtsov',
		fullName: 'Денис Кравцов',
		email: 'denis.kravtsov@devgate.local',
		role: Role.DEVOPS,
		lastLogin: '2026-05-02T18:42:00.000Z',
	},
	{
		id: 'usr-olga-petrova',
		fullName: 'Ольга Петрова',
		email: 'olga.petrova@devgate.local',
		role: Role.QA,
		lastLogin: '2026-05-03T08:05:00.000Z',
	},
	{
		id: 'usr-mikhail-orlov',
		fullName: 'Михаил Орлов',
		email: 'mikhail.orlov@devgate.local',
		role: Role.MEMBER,
		lastLogin: '2026-04-29T14:22:00.000Z',
	},
	{
		id: 'usr-pavel-sidorov',
		fullName: 'Павел Сидоров',
		email: 'pavel.sidorov@devgate.local',
		role: Role.MEMBER,
		lastLogin: '2026-05-01T11:10:00.000Z',
	},
	{
		id: 'usr-ekaterina-belova',
		fullName: 'Екатерина Белова',
		email: 'ekaterina.belova@devgate.local',
		role: Role.MEMBER,
		lastLogin: '2026-04-28T17:30:00.000Z',
	},
	{
		id: 'usr-roman-volkov',
		fullName: 'Роман Волков',
		email: 'roman.volkov@devgate.local',
		role: Role.DEVOPS,
		lastLogin: '2026-05-03T07:48:00.000Z',
	},
	{
		id: 'usr-natalia-popova',
		fullName: 'Наталья Попова',
		email: 'natalia.popova@devgate.local',
		role: Role.MEMBER,
	},
	{
		id: 'usr-alexey-zaytsev',
		fullName: 'Алексей Зайцев',
		email: 'alexey.zaytsev@devgate.local',
		role: Role.ADMIN,
		lastLogin: '2026-05-03T10:01:00.000Z',
	},
	{
		id: 'usr-irina-fedorova',
		fullName: 'Ирина Фёдорова',
		email: 'irina.fedorova@devgate.local',
		role: Role.QA,
		lastLogin: '2026-05-02T15:55:00.000Z',
	},
];

let mockIdCounter = 11;

export const findMockUserById = (id: string): TeamMemberUserType | undefined =>
	MOCK_TEAM_MEMBER_USERS.find((user) => user.id === id);

export const updateMockUserRole = (
	id: string,
	role: Role,
): TeamMemberUserType | null => {
	const index = MOCK_TEAM_MEMBER_USERS.findIndex((user) => user.id === id);
	if (index === -1) {
		return null;
	}
	MOCK_TEAM_MEMBER_USERS[index] = { ...MOCK_TEAM_MEMBER_USERS[index], role };
	return MOCK_TEAM_MEMBER_USERS[index];
};

export const createMockUser = (dto: CreateUserDtoType): TeamMemberUserType => {
	const id = `usr-mock-${mockIdCounter++}`;
	const newUser: TeamMemberUserType = {
		id,
		fullName: dto.fullName,
		email: dto.email,
		role: dto.role ?? Role.MEMBER,
	};
	MOCK_TEAM_MEMBER_USERS.push(newUser);
	return newUser;
};

export const updateMockUser = (
	dto: UpdateUserDtoType,
): TeamMemberUserType | null => {
	const index = MOCK_TEAM_MEMBER_USERS.findIndex(
		(user) => user.email === dto.email,
	);
	if (index === -1) {
		return null;
	}
	MOCK_TEAM_MEMBER_USERS[index] = {
		...MOCK_TEAM_MEMBER_USERS[index],
		fullName: dto.fullName,
		role: dto.role ?? MOCK_TEAM_MEMBER_USERS[index].role,
	};
	return MOCK_TEAM_MEMBER_USERS[index];
};

export const deleteMockUser = (id: string): void => {
	const index = MOCK_TEAM_MEMBER_USERS.findIndex((user) => user.id === id);
	if (index !== -1) {
		MOCK_TEAM_MEMBER_USERS.splice(index, 1);
	}
};
