import { ServiceHealthEnum } from '@/entities/service';

export const TOOLBAR_LABELS = {
	searchLabel: 'Поиск по сервисам',
	searchPlaceholder: 'Имя, описание сервиса…',
	healthLabel: 'Состояние',
	healthPlaceholder: 'Любое',
	tagsLabel: 'Теги',
	tagsPlaceholder: 'Все',
} as const;

export const SEARCH_DEBOUNCE_MS = 250;

export const HEALTH_FILTER_OPTIONS: Array<{ value: string; label: string }> = [
	{ value: ServiceHealthEnum.HEALTHY, label: 'Healthy' },
	{ value: ServiceHealthEnum.DEGRADED, label: 'Degraded' },
	{ value: ServiceHealthEnum.DOWN, label: 'Down' },
	{ value: ServiceHealthEnum.UNKNOWN, label: 'Unknown' },
];

export const SEARCH_PARAM_KEYS = {
	search: 'q',
	health: 'health',
	tags: 'tags',
} as const;
