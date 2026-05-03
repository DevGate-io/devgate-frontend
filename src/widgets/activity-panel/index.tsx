import {
	ACTIVITIES,
	ACTIVITY_PANEL_LABELS,
	CONTACTS,
	NOTIFICATIONS,
} from '@/widgets/activity-panel/constants';
import { ContactItem } from '@/widgets/activity-panel/ui/contact-item';
import { EventItem } from '@/widgets/activity-panel/ui/event-item';
import css from './index.module.css';

const NOTIFICATIONS_ID = 'activity-panel-notifications';
const ACTIVITIES_ID = 'activity-panel-activities';
const CONTACTS_ID = 'activity-panel-contacts';

export const ActivityPanel = () => {
	return (
		<aside className={css.root} aria-label={ACTIVITY_PANEL_LABELS.root}>
			<section className={css.section} aria-labelledby={NOTIFICATIONS_ID}>
				<h2 id={NOTIFICATIONS_ID} className={css.title}>
					{ACTIVITY_PANEL_LABELS.notifications}
				</h2>
				<ul className={css.list}>
					{NOTIFICATIONS.map((notification) => (
						<li key={notification.id}>
							<EventItem
								text={notification.text}
								occurredAt={notification.occurredAt}
								occurredAtLabel={notification.occurredAtLabel}
								tone={notification.tone}
							/>
						</li>
					))}
				</ul>
			</section>

			<section className={css.section} aria-labelledby={ACTIVITIES_ID}>
				<h2 id={ACTIVITIES_ID} className={css.title}>
					{ACTIVITY_PANEL_LABELS.activities}
				</h2>
				<ul className={css.list}>
					{ACTIVITIES.map((activity) => (
						<li key={activity.id}>
							<EventItem
								text={activity.text}
								occurredAt={activity.occurredAt}
								occurredAtLabel={activity.occurredAtLabel}
								tone={activity.tone}
							/>
						</li>
					))}
				</ul>
			</section>

			<section className={css.section} aria-labelledby={CONTACTS_ID}>
				<h2 id={CONTACTS_ID} className={css.title}>
					{ACTIVITY_PANEL_LABELS.contacts}
				</h2>
				<ul className={css.list}>
					{CONTACTS.map((contact) => (
						<li key={contact.id}>
							<ContactItem
								name={contact.name}
								role={contact.role}
								initials={contact.initials}
							/>
						</li>
					))}
				</ul>
			</section>
		</aside>
	);
};
