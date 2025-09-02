import {Composition} from 'remotion';
import {CommandShareDemo} from './CommandShareDemo';
import {CommandShareDemoWithAudio} from './CommandShareDemoWithAudio';
import {AdvancedDemo} from './AdvancedDemo';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="CommandShareDemo"
				component={CommandShareDemo}
				durationInFrames={300}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="CommandShareDemoWithAudio"
				component={CommandShareDemoWithAudio}
				durationInFrames={300}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="AdvancedDemo"
				component={AdvancedDemo}
				durationInFrames={1800}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};