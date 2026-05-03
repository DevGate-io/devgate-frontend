import { Avatar } from '@mantine/core';
import type { FC } from 'react';
import css from './index.module.css';

type ContactItemProps = {
	name: string;
	role: string;
	initials: string;
};

export const ContactItem: FC<ContactItemProps> = ({ name, role, initials }) => {
	return (
		<article className={css.root}>
			<Avatar size={32} radius='xl' color='lavender'>
				{initials}
			</Avatar>
			<div className={css.text}>
				<span className={css.name}>{name}</span>
				<span className={css.role}>{role}</span>
			</div>
		</article>
	);
};
