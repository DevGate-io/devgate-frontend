const RELATIVE_FORMATTER = new Intl.RelativeTimeFormat('ru-RU', {
	numeric: 'auto',
});

const FORMATTER = new Intl.DateTimeFormat('ru-RU', {
	day: 'numeric',
	month: 'long',
	hour: '2-digit',
	minute: '2-digit',
});

const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export const formatRelativeTime = (iso: string): string => {
	const date = new Date(iso);
	const diffSec = Math.round((date.getTime() - Date.now()) / 1000);
	const absSec = Math.abs(diffSec);

	if (absSec < MINUTE) {
		return RELATIVE_FORMATTER.format(diffSec, 'second');
	}
	if (absSec < HOUR) {
		return RELATIVE_FORMATTER.format(Math.round(diffSec / MINUTE), 'minute');
	}
	if (absSec < DAY) {
		return RELATIVE_FORMATTER.format(Math.round(diffSec / HOUR), 'hour');
	}
	if (absSec < 7 * DAY) {
		return RELATIVE_FORMATTER.format(Math.round(diffSec / DAY), 'day');
	}
	return FORMATTER.format(date);
};
