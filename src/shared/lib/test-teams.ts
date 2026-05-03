import { TeamRoleEnum, type TeamType } from '@/entities/team';

export const MOCK_TEAMS: TeamType[] = [
	{
		id: 'team-platform',
		organizationId: 'org-devgate',
		name: 'Platform',
		slug: 'team-platform',
		description:
			'Платформенная команда: ядро портала, runtime, общие SDK и инфраструктурные сервисы.',
		members: [
			{ userId: 'usr-anna-ivanova', role: TeamRoleEnum.OWNER },
			{ userId: 'usr-denis-kravtsov', role: TeamRoleEnum.MAINTAINER },
			{ userId: 'usr-mikhail-orlov', role: TeamRoleEnum.MEMBER },
			{ userId: 'usr-pavel-sidorov', role: TeamRoleEnum.MEMBER },
		],
		createdAt: '2024-09-01T09:00:00Z',
	},
	{
		id: 'team-commerce',
		organizationId: 'org-devgate',
		name: 'Commerce',
		slug: 'team-commerce',
		description:
			'Команда коммерции: каталог, корзина, заказы и интеграция с каталогом сервисов.',
		members: [
			{ userId: 'usr-roman-volkov', role: TeamRoleEnum.OWNER },
			{ userId: 'usr-ekaterina-belova', role: TeamRoleEnum.MAINTAINER },
			{ userId: 'usr-natalia-popova', role: TeamRoleEnum.MEMBER },
		],
		createdAt: '2024-10-12T10:30:00Z',
	},
	{
		id: 'team-billing',
		organizationId: 'org-devgate',
		name: 'Billing',
		slug: 'team-billing',
		description:
			'Биллинг и расчёты: тарификация, инвойсы, интеграции с платёжными системами.',
		members: [
			{ userId: 'usr-alexey-zaytsev', role: TeamRoleEnum.OWNER },
			{ userId: 'usr-olga-petrova', role: TeamRoleEnum.MAINTAINER },
		],
		createdAt: '2025-01-20T08:15:00Z',
	},
	{
		id: 'team-growth',
		organizationId: 'org-devgate',
		name: 'Growth',
		slug: 'team-growth',
		description:
			'Команда роста: уведомления, активация, A/B-эксперименты, аналитика воронок.',
		members: [
			{ userId: 'usr-irina-fedorova', role: TeamRoleEnum.OWNER },
			{ userId: 'usr-natalia-popova', role: TeamRoleEnum.MEMBER },
		],
		createdAt: '2025-03-05T11:45:00Z',
	},
];
