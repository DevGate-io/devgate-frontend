const MAX_INITIALS = 2;

export const getNameInitials = (fullName: string): string => {
	const initials = fullName
		.trim()
		.split(/\s+/)
		.slice(0, MAX_INITIALS)
		.map((part) => part[0]?.toUpperCase() ?? '')
		.join('');
	return initials || '??';
};
