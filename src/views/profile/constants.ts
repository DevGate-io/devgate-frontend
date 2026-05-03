import { Role, type User } from '@/entities/user';

export const PROFILE_LABELS = {
	title: 'Профиль',
	description:
		'Личные данные аккаунта, состав команд и последние действия в платформе.',
	emailLabel: 'Email',
	roleLabel: 'Роль',
	lastLoginLabel: 'Последний вход',
	neverLoggedIn: 'не входил',
	myTeamsTitle: 'Мои команды',
	myTeamsEmpty: 'Вы пока не состоите ни в одной команде.',
	myActivityTitle: 'Мои последние действия',
	myActivityEmpty: 'Активности по вашему аккаунту ещё нет.',
	logoutButton: 'Выйти из аккаунта',
	logoutConfirmTitle: 'Сессия закрыта',
	logoutConfirmMessage: 'Перенаправляем на страницу входа.',
} as const;

export const ROLE_LABEL: Record<User['role'], string> = {
	[Role.ADMIN]: 'Администратор',
	[Role.MANAGER]: 'Менеджер',
	[Role.DEVOPS]: 'DevOps',
	[Role.QA]: 'QA',
	[Role.MEMBER]: 'Участник',
};
