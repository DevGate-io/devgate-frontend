export const TEMPLATE_RUN_LABELS = {
	title: 'Применение шаблона',
	descriptionPrefix:
		'Параметры будут использованы для генерации сервиса по шаблону',
	parametersTitle: 'Параметры шаблона',
	ownershipTitle: 'Привязка в DevGate',
	ownerTeamLabel: 'Команда-владелец',
	ownerTeamPlaceholder: 'team-platform',
	ownerTeamRequiredError: 'Укажите команду-владельца',
	projectLabel: 'Проект',
	projectPlaceholder: 'proj-payments',
	projectRequiredError: 'Укажите проект',
	cancel: 'Назад к шаблону',
	submit: 'Создать сервис',
	successTitle: 'Сервис создан',
	successMessageSuffix: 'добавлен в каталог по шаблону',
	errorTitle: 'Не удалось создать сервис',
	errorMessage: 'Проверьте поля и попробуйте ещё раз.',
	requiredError: 'Поле обязательно',
	patternError: 'Не соответствует ожидаемому формату',
	missingNameError:
		'В шаблоне нет параметра-идентификатора (serviceName / projectName / toolName).',
} as const;

export const SERVICE_NAME_PARAMETER_KEYS = [
	'serviceName',
	'projectName',
	'toolName',
] as const;
