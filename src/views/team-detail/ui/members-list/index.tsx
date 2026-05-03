import { Badge } from '@mantine/core';
import type { FC } from 'react';
import type { TeamMemberType } from '@/entities/team';
import { findMockUserById } from '@/shared/lib/test-users';
import {
	ROLE_COLOR,
	ROLE_LABEL,
	ROLE_ORDER,
	TEAM_DETAIL_LABELS,
} from '@/views/team-detail/constants';
import { getNameInitials } from '@/views/team-detail/lib/get-name-initials';
import css from './index.module.css';

type MembersListProps = {
	members: TeamMemberType[];
};

export const MembersList: FC<MembersListProps> = ({ members }) => {
	if (members.length === 0) {
		return (
			<section className={css.root}>
				<h2 className={css.title}>{TEAM_DETAIL_LABELS.membersTitle}</h2>
				<p className={css.empty}>{TEAM_DETAIL_LABELS.membersEmpty}</p>
			</section>
		);
	}

	const sorted = [...members].sort(
		(a, b) => ROLE_ORDER[a.role] - ROLE_ORDER[b.role],
	);

	return (
		<section className={css.root}>
			<h2 className={css.title}>{TEAM_DETAIL_LABELS.membersTitle}</h2>
			<ul className={css.list}>
				{sorted.map((member) => {
					const user = findMockUserById(member.userId);
					const fullName = user?.fullName ?? member.userId;
					return (
						<li key={member.userId} className={css.item}>
							<span className={css.avatar} aria-hidden='true'>
								{getNameInitials(fullName)}
							</span>
							<div className={css.identity}>
								<span className={css.name}>{fullName}</span>
								{user?.email && <span className={css.email}>{user.email}</span>}
							</div>
							<Badge
								variant='light'
								color={ROLE_COLOR[member.role]}
								radius='sm'
								size='sm'
							>
								{ROLE_LABEL[member.role]}
							</Badge>
						</li>
					);
				})}
			</ul>
		</section>
	);
};
