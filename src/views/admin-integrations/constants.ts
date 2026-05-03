import {
	IntegrationKindEnum,
	type IntegrationKindType,
	IntegrationStatusEnum,
	type IntegrationStatusType,
} from '@/entities/integration';

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

export const KIND_LABEL: Record<IntegrationKindType, string> = {
	[IntegrationKindEnum.SCM]: 'SCM',
	[IntegrationKindEnum.CI]: 'CI/CD',
	[IntegrationKindEnum.MONITORING]: 'Monitoring',
	[IntegrationKindEnum.CHAT]: 'Chat',
	[IntegrationKindEnum.QUALITY]: 'Quality',
};

export const STATUS_LABEL: Record<IntegrationStatusType, string> = {
	[IntegrationStatusEnum.CONNECTED]: 'Подключено',
	[IntegrationStatusEnum.ERROR]: 'Ошибка',
	[IntegrationStatusEnum.DISABLED]: 'Отключено',
};

export const STATUS_COLOR: Record<IntegrationStatusType, string> = {
	[IntegrationStatusEnum.CONNECTED]: 'mint',
	[IntegrationStatusEnum.ERROR]: 'danger',
	[IntegrationStatusEnum.DISABLED]: 'gray',
};
