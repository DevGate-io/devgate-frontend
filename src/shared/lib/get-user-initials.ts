import type { User } from '@/entities/user';

const FALLBACK_INITIALS = 'DG';
const MAX_INITIALS = 2;

export const getUserInitials = (user: User | null): string => {
	if (!user?.fullName) {
		return FALLBACK_INITIALS;
	}

	const initials = user.fullName
		.trim()
		.split(/\s+/)
		.slice(0, MAX_INITIALS)
		.map((part) => part[0]?.toUpperCase() ?? '')
		.join('');

	return initials || FALLBACK_INITIALS;
};
