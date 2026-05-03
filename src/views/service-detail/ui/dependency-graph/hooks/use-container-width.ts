import { type RefObject, useEffect, useState } from 'react';

export const useContainerWidth = (
	ref: RefObject<HTMLElement | null>,
): number => {
	const [width, setWidth] = useState(0);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;
		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				setWidth(Math.round(entry.contentRect.width));
			}
		});
		observer.observe(node);
		return () => observer.disconnect();
	}, [ref]);

	return width;
};
