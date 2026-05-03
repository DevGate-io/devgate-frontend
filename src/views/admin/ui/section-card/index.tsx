import { Badge } from '@mantine/core';
import Link from 'next/link';
import type { FC } from 'react';
import { ADMIN_LABELS, type AdminSectionType } from '@/views/admin/constants';
import css from './index.module.css';

type SectionCardProps = {
	section: AdminSectionType;
};

export const SectionCard: FC<SectionCardProps> = ({ section }) => {
	if (!section.available) {
		return (
			<article className={`${css.root} ${css.disabled}`} aria-disabled='true'>
				<header className={css.head}>
					<h2 className={css.title}>{section.title}</h2>
					<Badge variant='light' color='gray' radius='sm' size='sm'>
						{ADMIN_LABELS.comingSoon}
					</Badge>
				</header>
				<p className={css.description}>{section.description}</p>
			</article>
		);
	}

	return (
		<article className={css.root}>
			<header className={css.head}>
				<h2 className={css.title}>
					<Link className={css.titleLink} href={section.href}>
						{section.title}
					</Link>
				</h2>
				<Badge variant='light' color='lavender' radius='sm' size='sm'>
					{ADMIN_LABELS.openSection}
				</Badge>
			</header>
			<p className={css.description}>{section.description}</p>
		</article>
	);
};
