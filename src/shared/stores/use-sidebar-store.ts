'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const SIDEBAR_STORAGE_KEY = 'devgate-sidebar';

type SidebarStateType = {
	isCollapsed: boolean;
	mobileOpened: boolean;
	toggle: () => void;
	setCollapsed: (value: boolean) => void;
	toggleMobile: () => void;
	openMobile: () => void;
	closeMobile: () => void;
};

export const useSidebarStore = create<SidebarStateType>()(
	persist(
		(set) => ({
			isCollapsed: false,
			mobileOpened: false,
			toggle: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
			setCollapsed: (value) => set({ isCollapsed: value }),
			toggleMobile: () =>
				set((state) => ({ mobileOpened: !state.mobileOpened })),
			openMobile: () => set({ mobileOpened: true }),
			closeMobile: () => set({ mobileOpened: false }),
		}),
		{
			name: SIDEBAR_STORAGE_KEY,
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ isCollapsed: state.isCollapsed }),
		},
	),
);
