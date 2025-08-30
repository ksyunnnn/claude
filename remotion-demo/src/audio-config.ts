// 音声とタイミングの設定データ
export interface AudioSegment {
  id: string;
  text: string;
  startFrame: number;
  durationFrames: number;
  filename: string;
}

export const FPS = 30;

// 音声セグメントの定義（30fps基準）
export const audioSegments: AudioSegment[] = [
  {
    id: 'intro',
    text: 'Command Shareへようこそ。コマンドラインの知識を共有する新しいプラットフォームです。',
    startFrame: 0,
    durationFrames: 90, // 3秒
    filename: 'narration-1.wav'
  },
  {
    id: 'features',
    text: '主な機能をご紹介します。コマンドの共有、フォロー機能、高速検索、そしてGitHub認証による安全なログインが可能です。',
    startFrame: 90,
    durationFrames: 150, // 5秒
    filename: 'narration-2.wav'
  },
  {
    id: 'demo',
    text: '実際の使用例をご覧ください。このように、コマンドとその説明を簡単に共有できます。',
    startFrame: 240,
    durationFrames: 120, // 4秒
    filename: 'narration-3.wav'
  },
  {
    id: 'cta',
    text: '今すぐcommand-share.appにアクセスして、あなたの知識を共有しましょう。',
    startFrame: 360,
    durationFrames: 90, // 3秒
    filename: 'narration-4.wav'
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
    text: 'Command Shareへようこそ',
    startFrame: 0,
    endFrame: 45
  },
  {
    text: 'コマンドラインの知識を共有する新しいプラットフォームです',
    startFrame: 45,
    endFrame: 90
  },
  {
    text: '主な機能をご紹介します',
    startFrame: 90,
    endFrame: 135
  },
  {
    text: 'コマンドの共有、フォロー機能',
    startFrame: 135,
    endFrame: 180
  },
  {
    text: '高速検索、GitHub認証による安全なログイン',
    startFrame: 180,
    endFrame: 240
  },
  {
    text: '実際の使用例をご覧ください',
    startFrame: 240,
    endFrame: 300
  },
  {
    text: 'コマンドとその説明を簡単に共有できます',
    startFrame: 300,
    endFrame: 360
  },
  {
    text: '今すぐcommand-share.appにアクセス',
    startFrame: 360,
    endFrame: 410
  },
  {
    text: 'あなたの知識を共有しましょう',
    startFrame: 410,
    endFrame: 450
  }
];