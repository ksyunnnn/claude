import React, { useEffect, useRef } from 'react';
import { useCurrentFrame, useVideoConfig, continueRender, delayRender } from 'remotion';

interface TTSProps {
	text: string;
	startFrame: number;
	endFrame: number;
}

// ブラウザのWeb Speech APIを使用したTTSコンポーネント
export const TTS: React.FC<TTSProps> = ({ text, startFrame, endFrame }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const audioRef = useRef<HTMLAudioElement>(null);
	const [handle] = React.useState(() => delayRender());

	useEffect(() => {
		if (frame === startFrame && 'speechSynthesis' in window) {
			const utterance = new SpeechSynthesisUtterance(text);
			utterance.lang = 'ja-JP';
			utterance.rate = 0.9;
			utterance.pitch = 1.0;
			utterance.volume = 1.0;

			// 音声の再生が完了したらレンダリングを続行
			utterance.onend = () => {
				continueRender(handle);
			};

			window.speechSynthesis.speak(utterance);
		}

		// フレームが範囲外になったら音声を停止
		if (frame > endFrame && 'speechSynthesis' in window) {
			window.speechSynthesis.cancel();
		}

		return () => {
			if ('speechSynthesis' in window) {
				window.speechSynthesis.cancel();
			}
		};
	}, [frame, startFrame, endFrame, text, handle]);

	return null;
};