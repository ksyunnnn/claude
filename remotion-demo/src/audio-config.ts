// 音声とタイミングの設定データ
export interface AudioSegment {
  id: string;
  text: string;
  startFrame: number;
  durationFrames: number;
  filename: string;
}

export const FPS = 30;

// 音声セグメントの定義（30fps基準）- 60秒ハッカソン発表版
export const audioSegments: AudioSegment[] = [
  {
    id: 'introduction',
    text: 'こんにちは、登壇者のこばしゅんは帰ってしまったので、代わりにこの動画が発表します。',
    startFrame: 0,
    durationFrames: 300, // 10秒
    filename: 'hackathon-1.wav'
  },
  {
    id: 'product-intro',
    text: 'Claude Codeのカスタムスラッシュコマンドを共有するWebサービスを、Claude Code自身と協業で開発しました。',
    startFrame: 300,
    durationFrames: 450, // 15秒
    filename: 'hackathon-2.wav'
  },
  {
    id: 'tech-demo',
    text: 'Next.js 15とSupabaseによる最新フルスタック構成で、GitHub認証、リアルタイム共有、フォロー機能を実装。',
    startFrame: 750,
    durationFrames: 450, // 15秒
    filename: 'hackathon-3.wav'
  },
  {
    id: 'collaboration-highlight',
    text: '総開発コード15,000行、47回のコミット、全て人間とAIの協業で実現。革新的な開発手法を確立しました。',
    startFrame: 1200,
    durationFrames: 450, // 15秒
    filename: 'hackathon-4.wav'
  },
  {
    id: 'conclusion-cta',
    text: 'slash-commands.comで今すぐ体験できます。この動画もClaude Codeが生成しています。',
    startFrame: 1650,
    durationFrames: 150, // 5秒
    filename: 'hackathon-5.wav'
  }
];

// 字幕用のタイミングデータ
export interface SubtitleSegment {
  text: string;
  startFrame: number;
  endFrame: number;
}

export const subtitles: SubtitleSegment[] = [
  {
    text: '登壇者は帰りました',
    startFrame: 0,
    endFrame: 150
  },
  {
    text: '代わりに動画が発表',
    startFrame: 150,
    endFrame: 300
  },
  {
    text: 'Claude Codeスラッシュコマンド共有サービス',
    startFrame: 300,
    endFrame: 600
  },
  {
    text: 'Claude Code自身と協業開発',
    startFrame: 600,
    endFrame: 750
  },
  {
    text: 'Next.js 15 + Supabase',
    startFrame: 750,
    endFrame: 900
  },
  {
    text: 'GitHub認証・リアルタイム共有',
    startFrame: 900,
    endFrame: 1050
  },
  {
    text: 'フォロー機能',
    startFrame: 1050,
    endFrame: 1200
  },
  {
    text: '15,000行のコード',
    startFrame: 1200,
    endFrame: 1350
  },
  {
    text: '47回のコミット',
    startFrame: 1350,
    endFrame: 1500
  },
  {
    text: '人間とAIの協業',
    startFrame: 1500,
    endFrame: 1650
  },
  {
    text: 'slash-commands.com',
    startFrame: 1650,
    endFrame: 1725
  },
  {
    text: 'Claude Code生成動画',
    startFrame: 1725,
    endFrame: 1800
  }
];