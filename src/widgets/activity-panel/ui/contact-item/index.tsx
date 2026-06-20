import { Avatar } from '@mantine/core';
import type { FC } from 'react';
import type { ActivityToneType } from '@/widgets/activity-panel/types';
import css from './index.module.css';

type ContactItemProps = {
	name: string;
	role: string;
	initials: string;
	tone: ActivityToneType;
};

export const ContactItem: FC<ContactItemProps> = ({
	name,
	role,
	initials,
	tone,
}) => {
	return (
		<article className={css.root}>
			<Avatar size={32} radius='xl' color={tone} variant='light'>
				{initials}
			</Avatar>
			<div className={css.text}>
				<span className={css.name}>{name}</span>
				<span className={css.role}>{role}</span>
			</div>
		</article>
	);
};
