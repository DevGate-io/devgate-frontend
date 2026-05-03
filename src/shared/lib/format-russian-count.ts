type RussianPlural = {
	one: string;
	few: string;
	many: string;
};

export const formatRussianCount = (
	count: number,
	forms: RussianPlural,
): string => {
	const mod10 = count % 10;
	const mod100 = count % 100;

	if (mod10 === 1 && mod100 !== 11) {
		return `${count} ${forms.one}`;
	}
	if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
		return `${count} ${forms.few}`;
	}
	return `${count} ${forms.many}`;
};

export const RUSSIAN_PLURAL_FORMS = {
	members: { one: 'участник', few: 'участника', many: 'участников' },
	services: { one: 'сервис', few: 'сервиса', many: 'сервисов' },
	events: { one: 'событие', few: 'события', many: 'событий' },
} as const;
