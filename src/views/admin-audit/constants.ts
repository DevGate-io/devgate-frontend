import { AuditAction, AuditTargetType } from '@/entities/audit-event';

export const ADMIN_AUDIT_LABELS = {
	title: 'Audit-лог',
	description:
		'Хронология критических действий: создание/изменение/удаление сервисов, смена ролей, подключение интеграций.',
	emptyTitle: 'Событий не найдено',
	emptyDescription: 'Снимите часть фильтров или расширьте диапазон дат.',
	headerWhen: 'Когда',
	headerActor: 'Актор',
	headerAction: 'Действие',
	headerTarget: 'Объект',
	filterAction: 'Действие',
	filterActor: 'Актор',
	filterFrom: 'С',
	filterTo: 'По',
	resetFilters: 'Сбросить',
	allActions: 'Все действия',
	allActors: 'Все акторы',
	unknownActor: 'Неизвестный актор',
} as const;

export const AUDIT_ACTION_LABEL: Record<AuditAction, string> = {
	[AuditAction.SERVICE_CREATED]: 'Создание сервиса',
	[AuditAction.SERVICE_UPDATED]: 'Изменение сервиса',
	[AuditAction.SERVICE_DELETED]: 'Удаление сервиса',
	[AuditAction.TEMPLATE_USED]: 'Запуск шаблона',
	[AuditAction.ROLE_CHANGED]: 'Смена роли',
	[AuditAction.TEAM_MEMBER_ADDED]: 'Добавлен участник',
	[AuditAction.TEAM_MEMBER_REMOVED]: 'Удалён участник',
	[AuditAction.INTEGRATION_CONNECTED]: 'Подключена интеграция',
	[AuditAction.INTEGRATION_DISCONNECTED]: 'Отключена интеграция',
};

export const AUDIT_ACTION_COLOR: Record<AuditAction, string> = {
	[AuditAction.SERVICE_CREATED]: 'mint',
	[AuditAction.SERVICE_UPDATED]: 'sky',
	[AuditAction.SERVICE_DELETED]: 'danger',
	[AuditAction.TEMPLATE_USED]: 'lavender',
	[AuditAction.ROLE_CHANGED]: 'peach',
	[AuditAction.TEAM_MEMBER_ADDED]: 'mint',
	[AuditAction.TEAM_MEMBER_REMOVED]: 'gray',
	[AuditAction.INTEGRATION_CONNECTED]: 'mint',
	[AuditAction.INTEGRATION_DISCONNECTED]: 'gray',
};

export const TARGET_TYPE_LABEL: Record<AuditTargetType, string> = {
	[AuditTargetType.SERVICE]: 'Сервис',
	[AuditTargetType.TEMPLATE]: 'Шаблон',
	[AuditTargetType.TEAM]: 'Команда',
	[AuditTargetType.USER]: 'Пользователь',
	[AuditTargetType.INTEGRATION]: 'Интеграция',
};

export const ADMIN_AUDIT_PARAM_KEYS = {
	action: 'action',
	actor: 'actor',
	from: 'from',
	to: 'to',
} as const;

export const ACTION_OPTIONS: Array<{ value: AuditAction; label: string }> =
	Object.values(AuditAction).map((value) => ({
		value,
		label: AUDIT_ACTION_LABEL[value],
	}));
