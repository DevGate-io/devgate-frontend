export const CATALOG_LABELS = {
	title: 'Каталог сервисов',
	description:
		'Все зарегистрированные сервисы платформы с метаданными и быстрыми действиями.',
	emptyTitle: 'Сервисы не найдены',
	emptyDescription:
		'Попробуйте сменить фильтры или зарегистрируйте новый сервис из шаблона.',
	repoLinkLabel: 'Репозиторий',
	pipelineLinkLabel: 'Pipeline',
	docsLinkLabel: 'Документация',
} as const;

export const SERVICE_HEALTH_LABEL: Record<string, string> = {
	healthy: 'Healthy',
	degraded: 'Degraded',
	down: 'Down',
	unknown: 'Unknown',
};
