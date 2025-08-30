# Remotion デモ動画プロジェクト

Command Share アプリの説明動画を Remotion で作成したプロジェクトです。

## 含まれるコンポジション

### 1. CommandShareDemo
- 基本的なアニメーションのみのデモ
- 音声なし
- 10秒（300フレーム）

### 2. CommandShareDemoWithAudio
- 音声ナレーション付きのデモ
- macOS の say コマンドで生成した音声を使用
- 10秒（300フレーム）

### 3. AdvancedDemo ⭐ NEW
- 高度な同期機能を実装したバージョン
- 特徴：
  - 音声とアニメーションの精密な同期
  - 字幕表示（フェードイン・アウト付き）
  - タイプライター効果
  - スプリングアニメーション
  - グラデーション背景
- 15秒（450フレーム）

## 使用方法

### プレビュー
```bash
npm start
```
ブラウザで任意のコンポジションを選択してプレビュー

### 動画の書き出し
```bash
# 高度なデモ版（推奨）
npm run build -- AdvancedDemo out/advanced-demo.mp4

# 基本版
npm run build -- CommandShareDemo out/basic-demo.mp4

# 音声付き版
npm run build -- CommandShareDemoWithAudio out/audio-demo.mp4
```

## ファイル構成

```
src/
├── AdvancedDemo.tsx      # 高度な同期実装のメインコンポーネント
├── audio-config.ts       # 音声とタイミングの設定データ
├── components/
│   └── Subtitle.tsx      # 字幕コンポーネント
├── CommandShareDemo.tsx  # 基本デモ
├── CommandShareDemoWithAudio.tsx  # 音声付きデモ
├── Root.tsx             # コンポジション定義
└── index.tsx            # エントリーポイント

public/
├── narration-1.aiff     # 音声ファイル（intro）
├── narration-2.aiff     # 音声ファイル（features）
├── narration-3.aiff     # 音声ファイル（demo）
└── narration-4.aiff     # 音声ファイル（cta）
```

## 実装の特徴

### 音声同期
- `audio-config.ts` でフレーム単位のタイミング管理
- 各シーンと音声セグメントを正確に同期

### アニメーション
- Remotion の `spring` 関数でなめらかな動き
- `interpolate` で精密なタイミング制御
- タイプライター効果やフェードイン・アウト

### 字幕システム
- 音声に合わせた字幕表示
- スライドイン・フェードアウトのアニメーション
- 読みやすさを考慮したデザイン

## カスタマイズ

### 音声を変更する場合
1. `generate-audio.sh` を編集
2. 新しい音声ファイルを生成
3. `audio-config.ts` のタイミングを調整

### アニメーションを変更する場合
- `AdvancedDemo.tsx` の各シーンコンポーネントを編集
- spring の config でアニメーションの質感を調整

### 字幕を変更する場合
- `audio-config.ts` の `subtitles` 配列を編集
- タイミングはフレーム単位で指定

## トラブルシューティング

### 音声が再生されない
- `public/` フォルダに音声ファイルが存在するか確認
- ブラウザのコンソールでエラーを確認

### アニメーションがカクつく
- ブラウザのハードウェアアクセラレーションを有効化
- 開発者ツールを閉じてプレビュー

## 参考リンク
- [Remotion 公式ドキュメント](https://www.remotion.dev/)
- [Remotion Audio ガイド](https://www.remotion.dev/docs/using-audio)