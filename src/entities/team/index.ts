export const TeamRoleEnum = {
	OWNER: 'owner',
	MAINTAINER: 'maintainer',
	MEMBER: 'member',
} as const;

export type TeamRoleType = (typeof TeamRoleEnum)[keyof typeof TeamRoleEnum];

export type TeamMemberType = {
	userId: string;
	role: TeamRoleType;
};

export type TeamType = {
	id: string;
	organizationId: string;
	name: string;
	slug: string;
	description?: string;
	members: TeamMemberType[];
	createdAt: string;
};
