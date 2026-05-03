export const ADMIN_LABELS = {
	title: 'Администрирование',
	description:
		'Управление пользователями, интеграциями и audit-лог. Часть разделов появится позже.',
	comingSoon: 'скоро',
	openSection: 'Перейти',
} as const;

export type AdminSectionType = {
	id: string;
	title: string;
	description: string;
	href: string;
	available: boolean;
};
