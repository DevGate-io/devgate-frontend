export type ActivityToneType = 'lavender' | 'sky' | 'mint' | 'peach';

export type NotificationItemType = {
	id: string;
	text: string;
	occurredAt: string;
	occurredAtLabel: string;
	tone: ActivityToneType;
};

export type ActivityItemType = {
	id: string;
	text: string;
	occurredAt: string;
	occurredAtLabel: string;
	tone: ActivityToneType;
};

export type ContactItemType = {
	id: string;
	name: string;
	role: string;
	initials: string;
};
