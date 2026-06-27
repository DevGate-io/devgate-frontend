import { IntegrationKind, IntegrationStatus } from '@/entities/integration';

export const ADMIN_INTEGRATIONS_LABELS = {
	title: 'Интеграции',
	description:
		'Подключения к SCM, CI/CD, мониторингу и сторонним сервисам. Конфигурация управляется через бэкенд — UI работает в режиме просмотра.',
	emptyTitle: 'Интеграций пока нет',
	emptyDescription: 'Подключите первый источник через бэкенд-конфиг.',
	lastSyncedLabel: 'последняя синхронизация',
	neverSynced: 'не синхронизировано',
	configLink: 'Настройка',
	docsLink: 'Документация',
} as const;

export const KIND_LABEL: Record<IntegrationKind, string> = {
	[IntegrationKind.SCM]: 'SCM',
	[IntegrationKind.CI]: 'CI/CD',
	[IntegrationKind.MONITORING]: 'Monitoring',
	[IntegrationKind.CHAT]: 'Chat',
	[IntegrationKind.QUALITY]: 'Quality',
};

export const STATUS_LABEL: Record<IntegrationStatus, string> = {
	[IntegrationStatus.CONNECTED]: 'Подключено',
	[IntegrationStatus.ERROR]: 'Ошибка',
	[IntegrationStatus.DISABLED]: 'Отключено',
};

export const STATUS_COLOR: Record<IntegrationStatus, string> = {
	[IntegrationStatus.CONNECTED]: 'mint',
	[IntegrationStatus.ERROR]: 'danger',
	[IntegrationStatus.DISABLED]: 'gray',
};
