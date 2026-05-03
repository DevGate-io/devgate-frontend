export const TEMPLATE_DETAIL_LABELS = {
	parametersTitle: 'Параметры шаблона',
	parametersEmpty:
		'У шаблона нет параметров — он создаст репозиторий с дефолтами.',
	parameterName: 'Имя',
	parameterKind: 'Тип',
	parameterRequired: 'Обяз.',
	parameterDefault: 'Дефолт',
	parameterDescription: 'Описание',
	createdAt: 'Создан',
	useTemplate: 'Использовать шаблон',
	tagsTitle: 'Теги',
	requiredYes: 'да',
	requiredNo: 'нет',
	noDefault: '—',
} as const;

export const PARAMETER_KIND_LABEL: Record<string, string> = {
	string: 'string',
	enum: 'enum',
	boolean: 'boolean',
};
