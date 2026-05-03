import { ServiceEnvironmentNameEnum } from '@/entities/service';

export const SERVICE_FORM_LABELS = {
	title: 'Создание сервиса',
	description:
		'Зарегистрируйте новый сервис в каталоге DevGate. Часть полей можно заполнить позже.',

	identificationTitle: 'Идентификация',
	ownershipTitle: 'Владение и язык',
	linksTitle: 'Внешние ссылки',
	metadataTitle: 'Метаданные',

	nameLabel: 'Имя сервиса',
	namePlaceholder: 'payments-api',
	slugLabel: 'Слаг',
	slugPlaceholder: 'payments-api',
	slugDescription: 'Только латинские буквы в нижнем регистре, цифры и дефис.',
	descriptionLabel: 'Описание',
	descriptionPlaceholder: 'Зачем нужен этот сервис в одном предложении',

	ownerTeamLabel: 'Команда-владелец',
	ownerTeamPlaceholder: 'team-platform',
	projectLabel: 'Проект',
	projectPlaceholder: 'proj-payments',
	languageLabel: 'Язык',
	languagePlaceholder: 'Выбрать',

	repoUrlLabel: 'Репозиторий',
	repoUrlPlaceholder: 'https://github.com/your-org/service',
	pipelineUrlLabel: 'Pipeline (CI)',
	pipelineUrlPlaceholder: 'https://ci.devgate.local/service',
	docsUrlLabel: 'Документация',
	docsUrlPlaceholder: 'https://docs.devgate.local/service',

	tagsLabel: 'Теги',
	tagsPlaceholder: 'Введите тег и нажмите Enter',
	environmentsLabel: 'Окружения',
	environmentsPlaceholder: 'dev, stage, prod',

	cancel: 'Отмена',
	submit: 'Создать сервис',
	successTitle: 'Сервис создан',
	successMessage: 'Запись добавлена в каталог.',
	errorTitle: 'Не удалось создать сервис',
	errorMessage: 'Проверьте поля и попробуйте ещё раз.',

	editTitle: 'Редактирование сервиса',
	editDescription:
		'Обновите метаданные сервиса. Изменения сохранятся после нажатия «Сохранить».',
	editSubmit: 'Сохранить',
	editSuccessTitle: 'Сервис обновлён',
	editSuccessMessage: 'Изменения сохранены.',
	editErrorTitle: 'Не удалось сохранить',
	editLink: 'Редактировать',
} as const;

export const LANGUAGE_OPTIONS: Array<{ value: string; label: string }> = [
	{ value: 'TypeScript', label: 'TypeScript' },
	{ value: 'JavaScript', label: 'JavaScript' },
	{ value: 'Go', label: 'Go' },
	{ value: 'Python', label: 'Python' },
	{ value: 'Rust', label: 'Rust' },
	{ value: 'Java', label: 'Java' },
	{ value: 'Kotlin', label: 'Kotlin' },
	{ value: 'Other', label: 'Другой' },
];

export const ENVIRONMENT_OPTIONS: Array<{ value: string; label: string }> = [
	{ value: ServiceEnvironmentNameEnum.DEV, label: 'dev' },
	{ value: ServiceEnvironmentNameEnum.STAGE, label: 'stage' },
	{ value: ServiceEnvironmentNameEnum.PROD, label: 'production' },
];
