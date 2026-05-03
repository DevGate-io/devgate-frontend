const FORMATTER = new Intl.DateTimeFormat('ru-RU', {
	day: 'numeric',
	month: 'long',
	hour: '2-digit',
	minute: '2-digit',
});

export const formatEventTime = (iso: string): string =>
	FORMATTER.format(new Date(iso));
