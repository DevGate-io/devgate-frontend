import { Role, type User } from '@/entities/user';

export type TeamMemberUserType = Pick<
	User,
	'id' | 'fullName' | 'email' | 'role'
>;

export const MOCK_TEAM_MEMBER_USERS: TeamMemberUserType[] = [
	{
		id: 'usr-anna-ivanova',
		fullName: 'Анна Иванова',
		email: 'anna.ivanova@devgate.local',
		role: Role.MANAGER,
	},
	{
		id: 'usr-denis-kravtsov',
		fullName: 'Денис Кравцов',
		email: 'denis.kravtsov@devgate.local',
		role: Role.DEVOPS,
	},
	{
		id: 'usr-olga-petrova',
		fullName: 'Ольга Петрова',
		email: 'olga.petrova@devgate.local',
		role: Role.QA,
	},
	{
		id: 'usr-mikhail-orlov',
		fullName: 'Михаил Орлов',
		email: 'mikhail.orlov@devgate.local',
		role: Role.MEMBER,
	},
	{
		id: 'usr-pavel-sidorov',
		fullName: 'Павел Сидоров',
		email: 'pavel.sidorov@devgate.local',
		role: Role.MEMBER,
	},
	{
		id: 'usr-ekaterina-belova',
		fullName: 'Екатерина Белова',
		email: 'ekaterina.belova@devgate.local',
		role: Role.MEMBER,
	},
	{
		id: 'usr-roman-volkov',
		fullName: 'Роман Волков',
		email: 'roman.volkov@devgate.local',
		role: Role.DEVOPS,
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
	},
	{
		id: 'usr-irina-fedorova',
		fullName: 'Ирина Фёдорова',
		email: 'irina.fedorova@devgate.local',
		role: Role.QA,
	},
];

export const findMockUserById = (id: string): TeamMemberUserType | undefined =>
	MOCK_TEAM_MEMBER_USERS.find((user) => user.id === id);
