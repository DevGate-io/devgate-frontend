export const SERVICE_DETAIL_LABELS = {
	tabOverview: 'Обзор',
	tabPipeline: 'Pipeline',
	tabDocs: 'Документация',
	tabDependencies: 'Зависимости',
	owner: 'Владелец',
	project: 'Проект',
	language: 'Язык',
	slo: 'SLO',
	updatedAt: 'Обновлён',
	createdAt: 'Создан',
	tagsTitle: 'Теги',
	environmentsTitle: 'Окружения',
	dependenciesTitle: 'Зависимые сервисы',
	dependenciesEmpty: 'У этого сервиса нет внешних зависимостей.',
	docsTitle: 'Документация',
	docsEmpty: 'Документация ещё не привязана к сервису.',
	pipelineTitle: 'CI/CD пайплайн',
	pipelineEmpty: 'Пайплайн не привязан. Добавьте ссылку в карточке сервиса.',
	openRepo: 'Открыть репозиторий',
	openPipeline: 'Открыть pipeline',
	openDocs: 'Открыть документацию',
	openInEnv: 'Открыть',
	noEnvUrl: 'нет URL',
	notFoundTitle: 'Сервис не найден',
	notFoundDescription: 'Проверьте идентификатор или вернитесь в каталог.',
	backToCatalog: 'Вернуться в каталог',
} as const;

export const SERVICE_DETAIL_TABS = {
	overview: 'overview',
	pipeline: 'pipeline',
	docs: 'docs',
	dependencies: 'dependencies',
} as const;

export const ENVIRONMENT_LABEL: Record<string, string> = {
	dev: 'dev',
	stage: 'stage',
	prod: 'production',
};
