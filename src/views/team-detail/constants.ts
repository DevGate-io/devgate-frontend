import { TeamRoleEnum, type TeamRoleType } from '@/entities/team';

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
} as const;

export const ROLE_LABEL: Record<TeamRoleType, string> = {
	[TeamRoleEnum.OWNER]: 'Владелец',
	[TeamRoleEnum.MAINTAINER]: 'Maintainer',
	[TeamRoleEnum.MEMBER]: 'Участник',
};

export const ROLE_COLOR: Record<TeamRoleType, string> = {
	[TeamRoleEnum.OWNER]: 'lavender',
	[TeamRoleEnum.MAINTAINER]: 'sky',
	[TeamRoleEnum.MEMBER]: 'gray',
};

export const ROLE_ORDER: Record<TeamRoleType, number> = {
	[TeamRoleEnum.OWNER]: 0,
	[TeamRoleEnum.MAINTAINER]: 1,
	[TeamRoleEnum.MEMBER]: 2,
};
