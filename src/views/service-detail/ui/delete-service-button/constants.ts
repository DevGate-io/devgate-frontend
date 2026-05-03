export const DELETE_SERVICE_LABELS = {
	trigger: 'Удалить',
	modalTitle: 'Удалить сервис',
	confirm: 'Удалить',
	cancel: 'Отмена',
	successTitle: 'Сервис удалён',
	successMessage: 'Запись убрана из каталога.',
	errorTitle: 'Не удалось удалить',
	errorMessage: 'Попробуйте позже или обратитесь в платформенную команду.',
	confirmation: (name: string) =>
		`Сервис «${name}» будет удалён из каталога. Связанные ссылки на репозиторий и pipeline сохранятся, но карточка сервиса станет недоступной.`,
} as const;
