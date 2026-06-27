import { TemplateParameterKind, type TemplateType } from '@/entities/template';

export const MOCK_TEMPLATES: TemplateType[] = [
	{
		id: 'tpl-nodejs-service',
		name: 'Node.js Service',
		slug: 'nodejs-service',
		description:
			'TypeScript + Fastify сервис с заготовленным Dockerfile, GitHub Actions и набором базовых интеграций.',
		tags: ['typescript', 'fastify', 'docker', 'api'],
		parameters: [
			{
				kind: TemplateParameterKind.STRING,
				name: 'serviceName',
				label: 'Имя сервиса',
				required: true,
				pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
				description: 'Используется как slug, имя репо и пакет в registry.',
			},
			{
				kind: TemplateParameterKind.STRING,
				name: 'description',
				label: 'Описание',
				description: 'Короткое описание для каталога DevGate.',
			},
			{
				kind: TemplateParameterKind.ENUM,
				name: 'ciProvider',
				label: 'CI-провайдер',
				required: true,
				options: [
					{ value: 'github-actions', label: 'GitHub Actions' },
					{ value: 'gitlab-ci', label: 'GitLab CI' },
					{ value: 'jenkins', label: 'Jenkins' },
				],
				default: 'github-actions',
			},
			{
				kind: TemplateParameterKind.BOOLEAN,
				name: 'includeOpenTelemetry',
				label: 'Подключить OpenTelemetry',
				default: true,
			},
			{
				kind: TemplateParameterKind.BOOLEAN,
				name: 'includePostgres',
				label: 'Добавить Postgres-зависимость',
				default: false,
			},
		],
		createdAt: '2025-08-15T10:00:00Z',
	},
	{
		id: 'tpl-go-worker',
		name: 'Go Worker',
		slug: 'go-worker',
		description:
			'Go-воркер с Kafka-consumer, прометеус-метриками и graceful-shutdown.',
		tags: ['go', 'kafka', 'worker', 'metrics'],
		parameters: [
			{
				kind: TemplateParameterKind.STRING,
				name: 'serviceName',
				label: 'Имя сервиса',
				required: true,
				pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
			},
			{
				kind: TemplateParameterKind.STRING,
				name: 'kafkaTopic',
				label: 'Kafka topic',
				required: true,
				description: 'Topic, который сервис будет потреблять.',
			},
			{
				kind: TemplateParameterKind.ENUM,
				name: 'consumerGroup',
				label: 'Стратегия consumer-group',
				options: [
					{ value: 'shared', label: 'Shared (несколько инстансов)' },
					{ value: 'exclusive', label: 'Exclusive (один инстанс)' },
				],
				default: 'shared',
			},
			{
				kind: TemplateParameterKind.BOOLEAN,
				name: 'includeDeadLetterQueue',
				label: 'Подключить DLQ',
				default: true,
			},
		],
		createdAt: '2025-09-01T12:00:00Z',
	},
	{
		id: 'tpl-python-cli',
		name: 'Python CLI Tool',
		slug: 'python-cli',
		description:
			'Утилита на Python с Click, pytest и публикацией в корпоративный pypi.',
		tags: ['python', 'cli', 'pypi'],
		parameters: [
			{
				kind: TemplateParameterKind.STRING,
				name: 'toolName',
				label: 'Имя утилиты',
				required: true,
				pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
			},
			{
				kind: TemplateParameterKind.ENUM,
				name: 'pythonVersion',
				label: 'Python',
				options: [
					{ value: '3.11', label: '3.11' },
					{ value: '3.12', label: '3.12' },
					{ value: '3.13', label: '3.13' },
				],
				default: '3.12',
			},
			{
				kind: TemplateParameterKind.BOOLEAN,
				name: 'publishToPypi',
				label: 'Публиковать в корпоративный PyPI',
				default: true,
			},
		],
		createdAt: '2025-10-10T09:00:00Z',
	},
	{
		id: 'tpl-react-frontend',
		name: 'React Frontend',
		slug: 'react-frontend',
		description:
			'Next.js + TypeScript фронтенд по шаблону DevGate (Mantine, Biome, FSD-структура).',
		tags: ['typescript', 'nextjs', 'mantine', 'frontend'],
		parameters: [
			{
				kind: TemplateParameterKind.STRING,
				name: 'projectName',
				label: 'Имя проекта',
				required: true,
				pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
			},
			{
				kind: TemplateParameterKind.ENUM,
				name: 'styling',
				label: 'Подход к стилизации',
				options: [
					{ value: 'css-modules', label: 'CSS Modules + Mantine' },
					{ value: 'tailwind', label: 'Tailwind CSS' },
				],
				default: 'css-modules',
			},
			{
				kind: TemplateParameterKind.BOOLEAN,
				name: 'includeAuth',
				label: 'Включить шаблон авторизации',
				default: false,
			},
			{
				kind: TemplateParameterKind.BOOLEAN,
				name: 'enableE2e',
				label: 'Подключить Playwright e2e',
				default: false,
			},
		],
		createdAt: '2025-11-05T11:30:00Z',
	},
	{
		id: 'tpl-rust-grpc',
		name: 'Rust gRPC Service',
		slug: 'rust-grpc',
		description:
			'Высоконагруженный сервис на Rust + Tonic с трассировкой и health-checks.',
		tags: ['rust', 'grpc', 'tonic', 'critical'],
		parameters: [
			{
				kind: TemplateParameterKind.STRING,
				name: 'serviceName',
				label: 'Имя сервиса',
				required: true,
				pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
			},
			{
				kind: TemplateParameterKind.STRING,
				name: 'protoPackage',
				label: 'Имя proto-пакета',
				required: true,
				description: 'Например, devgate.payments.v1',
			},
			{
				kind: TemplateParameterKind.BOOLEAN,
				name: 'includeOpenTelemetry',
				label: 'Подключить OpenTelemetry',
				default: true,
			},
		],
		createdAt: '2025-12-01T14:00:00Z',
	},
];
