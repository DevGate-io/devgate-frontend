import clsx from 'clsx';
import type { FC } from 'react';
import { getToneClass } from '@/widgets/activity-panel/lib/get-tone-class';
import type { ActivityToneType } from '@/widgets/activity-panel/types';
import css from './index.module.css';

type EventItemProps = {
	text: string;
	occurredAt: string;
	occurredAtLabel: string;
	tone: ActivityToneType;
};

const TONE_CLASSES = {
	lavender: css.dotLavender,
	sky: css.dotSky,
	mint: css.dotMint,
	peach: css.dotPeach,
};

export const EventItem: FC<EventItemProps> = ({
	text,
	occurredAt,
	occurredAtLabel,
	tone,
}) => {
	return (
		<article className={css.root}>
			<span
				className={clsx(css.dot, getToneClass(tone, TONE_CLASSES))}
				aria-hidden='true'
			/>
			<div className={css.body}>
				<p className={css.text}>{text}</p>
				<time className={css.time} dateTime={occurredAt}>
					{occurredAtLabel}
				</time>
			</div>
		</article>
	);
};
