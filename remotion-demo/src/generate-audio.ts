// macOSのsayコマンドを使用して音声ファイルを生成するスクリプト
// 実行方法: ts-node src/generate-audio.ts

import { exec } from 'child_process';
import { promises as fs } from 'fs';
import { narrationScript } from './CommandShareDemoWithAudio';

const generateAudioFiles = async () => {
	// publicディレクトリを作成
	await fs.mkdir('public', { recursive: true });

	// 各ナレーションテキストに対して音声ファイルを生成
	for (let i = 0; i < narrationScript.length; i++) {
		const { text } = narrationScript[i];
		const outputFile = `public/narration-${i + 1}.aiff`;
		const mp3File = `public/narration-${i + 1}.mp3`;
		
		console.log(`Generating audio ${i + 1}...`);
		
		// macOSのsayコマンドで音声生成（日本語音声: Kyoko）
		await new Promise((resolve, reject) => {
			exec(`say -v Kyoko -o ${outputFile} "${text}"`, (error) => {
				if (error) {
					reject(error);
				} else {
					resolve(null);
				}
			});
		});
		
		// AIFFからMP3に変換（ffmpegが必要）
		await new Promise((resolve, reject) => {
			exec(`ffmpeg -i ${outputFile} -acodec mp3 -ab 192k ${mp3File} -y`, (error) => {
				if (error) {
					// ffmpegがない場合のフォールバック
					console.warn('ffmpeg not found. Using AIFF format instead.');
					exec(`mv ${outputFile} ${mp3File.replace('.mp3', '.aiff')}`, () => {
						resolve(null);
					});
				} else {
					// AIFFファイルを削除
					fs.unlink(outputFile).catch(() => {});
					resolve(null);
				}
			});
		});
	}
	
	console.log('Audio generation complete!');
};

// 実行
generateAudioFiles().catch(console.error);