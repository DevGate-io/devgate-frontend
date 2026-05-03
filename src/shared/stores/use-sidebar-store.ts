'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const SIDEBAR_STORAGE_KEY = 'devgate-sidebar';

type SidebarStateType = {
	isCollapsed: boolean;
	toggle: () => void;
	setCollapsed: (value: boolean) => void;
};

export const useSidebarStore = create<SidebarStateType>()(
	persist(
		(set) => ({
			isCollapsed: false,
			toggle: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
			setCollapsed: (value) => set({ isCollapsed: value }),
		}),
		{
			name: SIDEBAR_STORAGE_KEY,
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ isCollapsed: state.isCollapsed }),
		},
	),
);
