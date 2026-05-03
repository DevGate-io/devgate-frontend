import { Role } from '@/entities/user';

export const ADMIN_USERS_LABELS = {
	title: 'Пользователи',
	description:
		'Список аккаунтов платформы. Меняйте роль участника напрямую — изменение применится сразу.',
	emptyTitle: 'Пользователей нет',
	emptyDescription: 'Список появится после первой регистрации.',
	searchLabel: 'Поиск',
	searchPlaceholder: 'Имя или email',
	roleLabel: 'Роль',
	lastLoginLabel: 'Последний вход',
	neverLoggedIn: 'не входил',
	updateSuccessTitle: 'Роль обновлена',
	updateErrorTitle: 'Не удалось обновить роль',
	updateErrorMessage: 'Попробуйте ещё раз через несколько секунд.',
	headerName: 'Пользователь',
	headerEmail: 'Email',
	headerRole: 'Роль',
	headerLastLogin: 'Последний вход',
} as const;

export const ROLE_LABEL: Record<Role, string> = {
	[Role.ADMIN]: 'Администратор',
	[Role.MANAGER]: 'Менеджер',
	[Role.DEVOPS]: 'DevOps',
	[Role.QA]: 'QA',
	[Role.MEMBER]: 'Участник',
};

export const ROLE_OPTIONS: Array<{ value: Role; label: string }> = [
	{ value: Role.ADMIN, label: ROLE_LABEL[Role.ADMIN] },
	{ value: Role.MANAGER, label: ROLE_LABEL[Role.MANAGER] },
	{ value: Role.DEVOPS, label: ROLE_LABEL[Role.DEVOPS] },
	{ value: Role.QA, label: ROLE_LABEL[Role.QA] },
	{ value: Role.MEMBER, label: ROLE_LABEL[Role.MEMBER] },
];

export const ADMIN_USERS_SEARCH_PARAM = 'q';
