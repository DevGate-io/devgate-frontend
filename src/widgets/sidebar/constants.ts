import { pageConfig } from '@/shared/config/page.config';
import type { SidebarSectionType } from '@/widgets/sidebar/types';

export const SIDEBAR_LABELS = {
	root: 'Основная навигация',
	brand: 'DevGate',
	workspace: 'Workspace',
	system: 'Система',
} as const;

export const SIDEBAR_SECTIONS: SidebarSectionType[] = [
	{
		id: 'workspace',
		label: SIDEBAR_LABELS.workspace,
		items: [
			{ id: 'overview', label: 'Обзор', href: pageConfig.base },
			{ id: 'catalog', label: 'Каталог', href: pageConfig.catalog },
			{ id: 'templates', label: 'Шаблоны', href: pageConfig.templates },
			{ id: 'teams', label: 'Команды', href: pageConfig.teams },
		],
	},
	{
		id: 'system',
		label: SIDEBAR_LABELS.system,
		items: [
			{ id: 'admin', label: 'Администрирование', href: pageConfig.admin },
			{ id: 'profile', label: 'Профиль', href: pageConfig.profile },
		],
	},
];
