import {
	AuditActionEnum,
	type AuditActionType,
	type AuditTargetTypeType,
	AuditTargetTypeEnum,
} from '@/entities/audit-event';

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

export const AUDIT_ACTION_LABEL: Record<AuditActionType, string> = {
	[AuditActionEnum.SERVICE_CREATED]: 'Создание сервиса',
	[AuditActionEnum.SERVICE_UPDATED]: 'Изменение сервиса',
	[AuditActionEnum.SERVICE_DELETED]: 'Удаление сервиса',
	[AuditActionEnum.TEMPLATE_USED]: 'Запуск шаблона',
	[AuditActionEnum.ROLE_CHANGED]: 'Смена роли',
	[AuditActionEnum.TEAM_MEMBER_ADDED]: 'Добавлен участник',
	[AuditActionEnum.TEAM_MEMBER_REMOVED]: 'Удалён участник',
	[AuditActionEnum.INTEGRATION_CONNECTED]: 'Подключена интеграция',
	[AuditActionEnum.INTEGRATION_DISCONNECTED]: 'Отключена интеграция',
};

export const AUDIT_ACTION_COLOR: Record<AuditActionType, string> = {
	[AuditActionEnum.SERVICE_CREATED]: 'mint',
	[AuditActionEnum.SERVICE_UPDATED]: 'sky',
	[AuditActionEnum.SERVICE_DELETED]: 'danger',
	[AuditActionEnum.TEMPLATE_USED]: 'lavender',
	[AuditActionEnum.ROLE_CHANGED]: 'peach',
	[AuditActionEnum.TEAM_MEMBER_ADDED]: 'mint',
	[AuditActionEnum.TEAM_MEMBER_REMOVED]: 'gray',
	[AuditActionEnum.INTEGRATION_CONNECTED]: 'mint',
	[AuditActionEnum.INTEGRATION_DISCONNECTED]: 'gray',
};

export const TARGET_TYPE_LABEL: Record<AuditTargetTypeType, string> = {
	[AuditTargetTypeEnum.SERVICE]: 'Сервис',
	[AuditTargetTypeEnum.TEMPLATE]: 'Шаблон',
	[AuditTargetTypeEnum.TEAM]: 'Команда',
	[AuditTargetTypeEnum.USER]: 'Пользователь',
	[AuditTargetTypeEnum.INTEGRATION]: 'Интеграция',
};

export const ADMIN_AUDIT_PARAM_KEYS = {
	action: 'action',
	actor: 'actor',
	from: 'from',
	to: 'to',
} as const;

export const ACTION_OPTIONS: Array<{ value: AuditActionType; label: string }> =
	Object.values(AuditActionEnum).map((value) => ({
		value,
		label: AUDIT_ACTION_LABEL[value],
	}));
