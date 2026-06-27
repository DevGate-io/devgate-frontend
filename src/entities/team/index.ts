export enum TeamRole {
	OWNER = 'owner',
	MAINTAINER = 'maintainer',
	MEMBER = 'member',
}

export type TeamMemberType = {
	userId: string;
	role: TeamRole;
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
