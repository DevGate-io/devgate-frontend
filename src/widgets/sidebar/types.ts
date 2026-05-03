export type SidebarItemType = {
	id: string;
	label: string;
	href: string;
};

export type SidebarSectionType = {
	id: string;
	label: string;
	items: SidebarItemType[];
};
