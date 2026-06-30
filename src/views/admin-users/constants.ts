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

export const ADMIN_USERS_MODAL_LABELS = {
	createTitle: 'Создать пользователя',
	editTitle: 'Изменить пользователя',
	deleteTitle: 'Удалить пользователя',
	deleteConfirm: 'Вы уверены, что хотите удалить пользователя',
	deleteConfirmDetail: 'Это действие нельзя отменить.',
	cancel: 'Отмена',
	confirm: 'Подтвердить',
	create: 'Создать',
	save: 'Сохранить',
	delete: 'Удалить',
	addUser: 'Добавить пользователя',
	fieldFullName: 'Полное имя',
	fieldEmail: 'Email',
	fieldPassword: 'Пароль',
	fieldRole: 'Роль',
	fullNameRequired: 'Введите полное имя',
	emailRequired: 'Введите email',
	emailInvalid: 'Неверный формат email',
	passwordRequired: 'Введите пароль',
	passwordMin: 'Пароль должен содержать минимум 8 символов',
	createSuccessTitle: 'Пользователь создан',
	createSuccessMessage: 'Новый аккаунт добавлен в систему.',
	updateSuccessTitle: 'Пользователь обновлён',
	updateSuccessMessage: 'Данные аккаунта сохранены.',
	deleteSuccessTitle: 'Пользователь удалён',
	deleteSuccessMessage: 'Аккаунт удалён из системы.',
	errorTitle: 'Не удалось выполнить операцию',
	errorMessage: 'Попробуйте ещё раз через несколько секунд.',
	actions: 'Действия',
} as const;
