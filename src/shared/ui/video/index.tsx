import type { ComponentProps } from 'react';

import type { Picture } from '../picture';

type VideoProps = ComponentProps<'video'> & {
	mp4: string;
	webm?: string;
	isSafari?: boolean;
	pictureProps?: ComponentProps<typeof Picture>;
};

export const Video = ({ webm, mp4, isSafari, ...props }: VideoProps) => {
	const finalTypeMp4 = 'video/mp4';
	const finalTypeWebm = 'video/webm';

	const VideoContent = () => {
		if (isSafari) {
			return (
				<>
					{mp4 && <source src={mp4} type={finalTypeMp4} />}
					{webm && <source src={webm} type={finalTypeWebm} />}
				</>
			);
		}

		return (
			<>
				{webm && <source src={webm} type={finalTypeWebm} />}
				{mp4 && <source src={mp4} type={finalTypeMp4} />}
			</>
		);
	};

	return (
		<video {...props}>
			<VideoContent />
			Ваш браузер не поддерживает видео
		</video>
	);
};
