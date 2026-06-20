import type { FC } from 'react';
import type { ActivityToneType } from '@/widgets/activity-panel/types';
import css from './index.module.css';

type EventItemProps = {
	text: string;
	occurredAt: string;
	occurredAtLabel: string;
	tone: ActivityToneType;
};

export const EventItem: FC<EventItemProps> = ({
	text,
	occurredAt,
	occurredAtLabel,
	tone,
}) => {
	return (
		<article className={css.root} data-tone={tone}>
			<span className={css.dot} aria-hidden='true' />
			<div className={css.body}>
				<p className={css.text}>{text}</p>
				<time className={css.time} dateTime={occurredAt}>
					{occurredAtLabel}
				</time>
			</div>
		</article>
	);
};
