import { TeamRole } from '@/entities/team';

export const TEAM_DETAIL_LABELS = {
	createdAt: 'Создана',
	membersTitle: 'Состав',
	membersEmpty: 'В команде пока нет участников.',
	servicesTitle: 'Сервисы во владении',
	servicesEmpty: 'У команды пока нет сервисов в каталоге.',
	roleLabel: 'Роль',
	memberMissing: 'Пользователь не найден',
	openService: 'Открыть сервис',
	memberEmail: 'Email',
	healthTitle: 'Здоровье сервисов',
	healthEmpty: 'У команды пока нет сервисов в каталоге.',
} as const;

export const ROLE_LABEL: Record<TeamRole, string> = {
	[TeamRole.OWNER]: 'Владелец',
	[TeamRole.MAINTAINER]: 'Maintainer',
	[TeamRole.MEMBER]: 'Участник',
};

export const ROLE_COLOR: Record<TeamRole, string> = {
	[TeamRole.OWNER]: 'lavender',
	[TeamRole.MAINTAINER]: 'sky',
	[TeamRole.MEMBER]: 'gray',
};

export const ROLE_ORDER: Record<TeamRole, number> = {
	[TeamRole.OWNER]: 0,
	[TeamRole.MAINTAINER]: 1,
	[TeamRole.MEMBER]: 2,
};
