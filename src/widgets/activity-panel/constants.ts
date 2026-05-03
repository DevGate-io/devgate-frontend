import type {
	ActivityItemType,
	ContactItemType,
	NotificationItemType,
} from '@/widgets/activity-panel/types';

export const ACTIVITY_PANEL_LABELS = {
	root: 'Активность платформы',
	notifications: 'Уведомления',
	activities: 'Активность',
	contacts: 'Команда',
} as const;

export const NOTIFICATIONS: NotificationItemType[] = [
	{
		id: 'notification-payments-build',
		text: 'Pipeline payments-api · build #482 завершён успешно',
		occurredAt: '2026-05-03T09:50:00+03:00',
		occurredAtLabel: '10 минут назад',
		tone: 'mint',
	},
	{
		id: 'notification-team-access',
		text: 'Запрос на доступ к команде Platform от Анны Ивановой',
		occurredAt: '2026-05-03T09:22:00+03:00',
		occurredAtLabel: '38 минут назад',
		tone: 'lavender',
	},
	{
		id: 'notification-billing-slo',
		text: 'SLO-нарушение в сервисе billing-gateway (p95 latency)',
		occurredAt: '2026-05-03T09:00:00+03:00',
		occurredAtLabel: '1 час назад',
		tone: 'peach',
	},
];

export const ACTIVITIES: ActivityItemType[] = [
	{
		id: 'activity-orders-worker',
		text: 'Вы зарегистрировали сервис orders-worker',
		occurredAt: '2026-05-03T10:42:00+03:00',
		occurredAtLabel: 'сегодня, 10:42',
		tone: 'lavender',
	},
	{
		id: 'activity-template-nodejs',
		text: 'Шаблон nodejs-service использован 3 раза',
		occurredAt: '2026-05-02T18:00:00+03:00',
		occurredAtLabel: 'вчера',
		tone: 'sky',
	},
	{
		id: 'activity-platform-owners',
		text: 'Команда Platform добавила 2 новых владельцев',
		occurredAt: '2026-05-01T12:00:00+03:00',
		occurredAtLabel: '2 дня назад',
		tone: 'mint',
	},
];

export const CONTACTS: ContactItemType[] = [
	{
		id: 'contact-anna-ivanova',
		name: 'Анна Иванова',
		role: 'Platform Lead',
		initials: 'АИ',
	},
	{
		id: 'contact-denis-kravtsov',
		name: 'Денис Кравцов',
		role: 'SRE',
		initials: 'ДК',
	},
	{
		id: 'contact-olga-petrova',
		name: 'Ольга Петрова',
		role: 'QA Lead',
		initials: 'ОП',
	},
	{
		id: 'contact-mikhail-orlov',
		name: 'Михаил Орлов',
		role: 'Tech Lead',
		initials: 'МО',
	},
];
