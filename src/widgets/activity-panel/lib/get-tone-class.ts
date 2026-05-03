import type { ActivityToneType } from '@/widgets/activity-panel/types';

type ToneClassMap = Record<ActivityToneType, string>;

export const getToneClass = (tone: ActivityToneType, map: ToneClassMap) =>
	map[tone];
