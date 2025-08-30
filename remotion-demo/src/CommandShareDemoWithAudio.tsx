import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
	spring,
	Audio,
	staticFile,
} from 'remotion';

// ナレーションテキスト
export const narrationScript = [
	{
		start: 0,
		duration: 60,
		text: "Command Shareへようこそ。コマンドラインの知識を共有する新しいプラットフォームです。"
	},
	{
		start: 60,
		duration: 120,
		text: "主な機能をご紹介します。コマンドの共有、フォロー機能、高速検索、そしてGitHub認証による安全なログインが可能です。"
	},
	{
		start: 180,
		duration: 60,
		text: "実際の使用例をご覧ください。このように、コマンドとその説明を簡単に共有できます。"
	},
	{
		start: 240,
		duration: 60,
		text: "今すぐcommand-share.appにアクセスして、あなたの知識を共有しましょう。"
	}
];

export const CommandShareDemoWithAudio: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Scene 1: Title (0-60 frames)
	const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
		extrapolateRight: 'clamp',
	});

	// Scene 2: Features (60-180 frames)
	const featuresProgress = spring({
		fps,
		frame: frame - 60,
		config: {
			damping: 100,
			stiffness: 200,
		},
	});

	// Scene 3: Demo (180-240 frames)
	const demoScale = spring({
		fps,
		frame: frame - 180,
		config: {
			damping: 100,
			stiffness: 100,
		},
	});

	// Scene 4: Call to Action (240-300 frames)
	const ctaOpacity = interpolate(frame, [240, 260], [0, 1], {
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{backgroundColor: '#f3f4f6'}}>
			{/* Audio tracks - 各シーンごとに音声ファイルを配置 */}
			<Audio src={staticFile("narration-1.aiff")} startFrom={0} />
			<Audio src={staticFile("narration-2.aiff")} startFrom={60} />
			<Audio src={staticFile("narration-3.aiff")} startFrom={180} />
			<Audio src={staticFile("narration-4.aiff")} startFrom={240} />

			{/* Scene 1: Title */}
			<Sequence from={0} durationInFrames={60}>
				<AbsoluteFill
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						opacity: titleOpacity,
					}}
				>
					<div style={{textAlign: 'center'}}>
						<h1
							style={{
								fontSize: 80,
								fontWeight: 'bold',
								color: '#4B5563',
								marginBottom: 20,
								fontFamily: 'system-ui, -apple-system, sans-serif',
							}}
						>
							Command Share
						</h1>
						<p
							style={{
								fontSize: 36,
								color: '#6B7280',
								fontFamily: 'system-ui, -apple-system, sans-serif',
							}}
						>
							コマンドラインの知識を共有しよう
						</p>
					</div>
				</AbsoluteFill>
			</Sequence>

			{/* Scene 2: Features */}
			<Sequence from={60} durationInFrames={120}>
				<AbsoluteFill
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						padding: 100,
					}}
				>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(2, 1fr)',
							gap: 40,
							width: '100%',
							maxWidth: 1200,
						}}
					>
						{[
							{icon: '📝', title: 'コマンドを共有', desc: '便利なコマンドを簡単に共有'},
							{icon: '👥', title: 'フォロー機能', desc: '他のユーザーをフォローして学ぼう'},
							{icon: '⚡', title: '高速検索', desc: '必要なコマンドをすぐに見つける'},
							{icon: '🔐', title: 'GitHub認証', desc: '安全で簡単なログイン'},
						].map((feature, i) => (
							<div
								key={i}
								style={{
									backgroundColor: 'white',
									padding: 40,
									borderRadius: 16,
									boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
									transform: `translateY(${(1 - featuresProgress) * 50 * (i + 1)}px)`,
									opacity: featuresProgress,
								}}
							>
								<div style={{fontSize: 48, marginBottom: 16}}>{feature.icon}</div>
								<h3
									style={{
										fontSize: 28,
										fontWeight: 'bold',
										color: '#374151',
										marginBottom: 8,
										fontFamily: 'system-ui, -apple-system, sans-serif',
									}}
								>
									{feature.title}
								</h3>
								<p
									style={{
										fontSize: 20,
										color: '#6B7280',
										fontFamily: 'system-ui, -apple-system, sans-serif',
									}}
								>
									{feature.desc}
								</p>
							</div>
						))}
					</div>
				</AbsoluteFill>
			</Sequence>

			{/* Scene 3: Demo */}
			<Sequence from={180} durationInFrames={60}>
				<AbsoluteFill
					style={{
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<div
						style={{
							backgroundColor: 'white',
							borderRadius: 16,
							boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
							padding: 40,
							width: '80%',
							maxWidth: 800,
							transform: `scale(${demoScale})`,
						}}
					>
						<div
							style={{
								backgroundColor: '#1F2937',
								color: '#10B981',
								padding: 24,
								borderRadius: 8,
								fontFamily: 'monospace',
								fontSize: 20,
								marginBottom: 24,
							}}
						>
							<div style={{marginBottom: 12}}>$ git branch --show-current</div>
							<div style={{opacity: 0.7}}>feature/typescript-any-elimination</div>
						</div>
						<div style={{display: 'flex', gap: 16, marginBottom: 16}}>
							<span
								style={{
									backgroundColor: '#EFF6FF',
									color: '#3B82F6',
									padding: '8px 16px',
									borderRadius: 8,
									fontSize: 18,
									fontFamily: 'system-ui, -apple-system, sans-serif',
								}}
							>
								#git
							</span>
							<span
								style={{
									backgroundColor: '#F0FDF4',
									color: '#10B981',
									padding: '8px 16px',
									borderRadius: 8,
									fontSize: 18,
									fontFamily: 'system-ui, -apple-system, sans-serif',
								}}
							>
								#branch
							</span>
						</div>
						<p
							style={{
								color: '#6B7280',
								fontSize: 18,
								fontFamily: 'system-ui, -apple-system, sans-serif',
							}}
						>
							現在のブランチ名を表示するコマンド
						</p>
					</div>
				</AbsoluteFill>
			</Sequence>

			{/* Scene 4: Call to Action */}
			<Sequence from={240} durationInFrames={60}>
				<AbsoluteFill
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						opacity: ctaOpacity,
					}}
				>
					<div style={{textAlign: 'center'}}>
						<h2
							style={{
								fontSize: 64,
								fontWeight: 'bold',
								color: '#4B5563',
								marginBottom: 32,
								fontFamily: 'system-ui, -apple-system, sans-serif',
							}}
						>
							今すぐ始めよう
						</h2>
						<div
							style={{
								backgroundColor: '#4B5563',
								color: 'white',
								padding: '20px 40px',
								borderRadius: 12,
								fontSize: 28,
								fontWeight: 'bold',
								display: 'inline-block',
								fontFamily: 'system-ui, -apple-system, sans-serif',
							}}
						>
							command-share.app
						</div>
					</div>
				</AbsoluteFill>
			</Sequence>
		</AbsoluteFill>
	);
};