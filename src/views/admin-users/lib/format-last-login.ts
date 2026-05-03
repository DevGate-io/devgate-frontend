import { ADMIN_USERS_LABELS } from '@/views/admin-users/constants';

const FORMATTER = new Intl.DateTimeFormat('ru-RU', {
	day: 'numeric',
	month: 'long',
	year: 'numeric',
	hour: '2-digit',
	minute: '2-digit',
});

export const formatLastLogin = (iso: string | undefined): string => {
	if (!iso) {
		return ADMIN_USERS_LABELS.neverLoggedIn;
	}
	return FORMATTER.format(new Date(iso));
};
