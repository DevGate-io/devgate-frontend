'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const RECENTLY_VIEWED_STORAGE_KEY = 'devgate-recently-viewed';
const RECENTLY_VIEWED_LIMIT = 6;

export type RecentlyViewedServiceType = {
	id: string;
	name: string;
	viewedAt: string;
};

type RecentlyViewedStateType = {
	viewed: RecentlyViewedServiceType[];
	markViewed: (id: string, name: string) => void;
	clear: () => void;
};

export const useRecentlyViewedStore = create<RecentlyViewedStateType>()(
	persist(
		(set) => ({
			viewed: [],
			markViewed: (id, name) =>
				set((state) => {
					const filtered = state.viewed.filter((entry) => entry.id !== id);
					const next: RecentlyViewedServiceType = {
						id,
						name,
						viewedAt: new Date().toISOString(),
					};
					return {
						viewed: [next, ...filtered].slice(0, RECENTLY_VIEWED_LIMIT),
					};
				}),
			clear: () => set({ viewed: [] }),
		}),
		{
			name: RECENTLY_VIEWED_STORAGE_KEY,
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ viewed: state.viewed }),
		},
	),
);
