import {
	IntegrationKindEnum,
	IntegrationStatusEnum,
	type IntegrationType,
} from '@/entities/integration';

export const MOCK_INTEGRATIONS: IntegrationType[] = [
	{
		id: 'int-github',
		name: 'GitHub',
		provider: 'github.com',
		kind: IntegrationKindEnum.SCM,
		status: IntegrationStatusEnum.CONNECTED,
		description:
			'Источник кода: репозитории, ветки, теги. Используется scaffolder для создания PR.',
		configUrl: 'https://github.com/settings/applications',
		docsUrl: 'https://docs.devgate.local/integrations/github',
		lastSyncedAt: '2026-05-03T11:42:00Z',
	},
	{
		id: 'int-gitlab',
		name: 'GitLab',
		provider: 'gitlab.devgate.local',
		kind: IntegrationKindEnum.SCM,
		status: IntegrationStatusEnum.CONNECTED,
		description:
			'Корпоративный self-hosted GitLab для внутренних репозиториев.',
		configUrl: 'https://gitlab.devgate.local/-/profile/applications',
		docsUrl: 'https://docs.devgate.local/integrations/gitlab',
		lastSyncedAt: '2026-05-03T10:18:00Z',
	},
	{
		id: 'int-jenkins',
		name: 'Jenkins',
		provider: 'ci.devgate.local',
		kind: IntegrationKindEnum.CI,
		status: IntegrationStatusEnum.ERROR,
		description:
			'CI-пайплайны на Jenkins. Используется для отображения статусов сборки в карточке сервиса.',
		configUrl: 'https://ci.devgate.local/configure',
		docsUrl: 'https://docs.devgate.local/integrations/jenkins',
		lastSyncedAt: '2026-05-02T22:05:00Z',
		statusMessage: 'Webhook вернул 500 при последней попытке синхронизации.',
	},
	{
		id: 'int-datadog',
		name: 'Datadog',
		provider: 'app.datadoghq.eu',
		kind: IntegrationKindEnum.MONITORING,
		status: IntegrationStatusEnum.CONNECTED,
		description:
			'Метрики и SLO. Источник данных для health-индикаторов в каталоге.',
		configUrl: 'https://app.datadoghq.eu/account/settings#api',
		docsUrl: 'https://docs.devgate.local/integrations/datadog',
		lastSyncedAt: '2026-05-03T11:55:00Z',
	},
	{
		id: 'int-slack',
		name: 'Slack',
		provider: 'devgate.slack.com',
		kind: IntegrationKindEnum.CHAT,
		status: IntegrationStatusEnum.CONNECTED,
		description:
			'Нотификации в командные каналы: статусы пайплайнов, инциденты, scaffolder PRs.',
		configUrl: 'https://devgate.slack.com/apps/manage',
		docsUrl: 'https://docs.devgate.local/integrations/slack',
		lastSyncedAt: '2026-05-03T09:30:00Z',
	},
	{
		id: 'int-sonarqube',
		name: 'SonarQube',
		provider: 'sonar.devgate.local',
		kind: IntegrationKindEnum.QUALITY,
		status: IntegrationStatusEnum.DISABLED,
		description:
			'Quality gates и code-coverage метрики. Сейчас отключено до завершения миграции.',
		docsUrl: 'https://docs.devgate.local/integrations/sonarqube',
		statusMessage:
			'Включится после полного перехода на новый кластер Sonar 11.',
	},
];
