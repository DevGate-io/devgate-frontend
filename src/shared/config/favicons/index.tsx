import { FAVICONS_CONFIG } from '@/shared/config/favicons/constants';

export const Favicons = () => {
	return (
		<>
			{FAVICONS_CONFIG.map((favicon, index) => (
				<link {...favicon} key={index} />
			))}
		</>
	);
};
