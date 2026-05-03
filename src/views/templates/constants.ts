export const TEMPLATES_LABELS = {
	title: 'Шаблоны',
	description:
		'Готовые scaffolders для типовых сервисов: CI, Dockerfile, метрики, лог-формат — из коробки.',
	emptyTitle: 'Шаблоны не найдены',
	emptyDescription:
		'Платформенная команда ещё не опубликовала шаблоны. Свяжитесь с DevOps, если шаблон нужен прямо сейчас.',
	parameterCount: (count: number): string => {
		const lastTwo = count % 100;
		if (lastTwo >= 11 && lastTwo <= 14) return `${count} параметров`;
		const last = count % 10;
		if (last === 1) return `${count} параметр`;
		if (last >= 2 && last <= 4) return `${count} параметра`;
		return `${count} параметров`;
	},
} as const;
