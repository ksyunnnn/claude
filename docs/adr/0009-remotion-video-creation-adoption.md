# ADR-0009: Remotion動画制作システムの採用とメインプロジェクトへの統合

## Status

Accepted

## Context

プロダクトのマーケティング・説明用動画を効率的に制作する必要が生じた：

- 従来は外部ツール（After Effects等）で動画制作を行う必要があった
- 開発者フレンドリーでない制作環境（GUIベース）
- プロダクトの機能更新に合わせた動画内容の迅速な更新が困難
- プログラマブルな動画制作による品質・一貫性の確保の必要性
- 日本語音声対応の動画制作システムが必要

### 技術要件

- **React/TypeScript**との技術スタック整合性
- **プログラマブル制作**: コードによる動画内容・タイミング制御
- **日本語音声**: macOS sayコマンドによる自然な音声生成
- **高品質出力**: Full HD（1920×1080）での動画書き出し
- **統合性**: メインプロジェクトからの簡単な実行・管理

### 検討した選択肢

1. **After Effects + JavaScript**: Adobe製品の自動化
2. **FFmpeg + スクリプト**: コマンドライン動画編集
3. **Lottie + Web技術**: Web AnimationによるSVGアニメーション
4. **Remotion**: React-based動画制作フレームワーク（採用案）
5. **Manim**: Python数学アニメーションライブラリ

## Decision

**Remotion 4.0.340**を採用し、専用プロジェクト`remotion-demo/`として統合：

- React/TypeScriptによるコンポーネントベース動画制作
- フレーム単位での精密な音声・映像同期システム
- macOS sayコマンドによる日本語音声生成（Kyokoボイス）
- メインプロジェクトからのnpm scripts統合

### 実装アーキテクチャ

```
remotion-demo/                    # 独立したRemotionプロジェクト
├── src/
│   ├── AdvancedDemo.tsx         # メイン動画コンポーネント
│   ├── audio-config.ts          # 音声・タイミング設定
│   └── components/Subtitle.tsx  # 字幕表示コンポーネント
├── public/                      # 音声ファイル（WAV形式）
├── generate-audio.sh           # 音声生成スクリプト
└── out/                        # 生成された動画
```

### 統合npm scripts

```json
{
  "video:start": "cd remotion-demo && npm start",
  "video:build": "cd remotion-demo && npx remotion render AdvancedDemo out/advanced-demo.mp4",
  "video:audio": "cd remotion-demo && ./generate-audio.sh"
}
```

## Consequences

### Positive（メリット）

- **開発者体験**: React/TypeScriptによる馴染みのある開発環境
- **プログラマブル制御**: コードによる精密なタイミング・アニメーション制御
- **統合性**: メインプロジェクトからの統一操作
- **品質向上**: コンポーネント再利用によるデザイン一貫性
- **迅速な更新**: プロダクト変更への素早い対応が可能
- **バージョン管理**: 動画内容の変更履歴を完全に追跡可能

### Negative（デメリット・リスク）

- **学習コスト**: Remotion特有のAPIとコンセプトの習得が必要
- **依存関係増加**: 追加のnode_modules（約500MB）
- **プラットフォーム制約**: macOS sayコマンドに依存した音声生成
- **レンダリング時間**: 高品質動画生成には時間が必要（約30秒/15秒動画）
- **ブラウザ要件**: Chromiumベースの動画レンダリング

### Neutral（中立的な影響）

- **ファイルサイズ**: 生成動画は2.2MB（15秒、Full HD）と適正
- **維持コスト**: 独立プロジェクトとして管理、メインプロジェクトへの影響は限定的
- **拡張性**: Azure/Google TTS等への将来的な移行も容易

## Implementation Notes

### 音声生成システム
```bash
# macOS say command with Japanese voice
say -v Kyoko -o "output.aiff" "日本語テキスト"
ffmpeg -i "output.aiff" "output.wav"  # Remotion互換形式に変換
```

### 動画制作ワークフロー
1. **スクリプト編集**: `audio-config.ts`でナレーションとタイミング調整
2. **音声生成**: `npm run video:audio`で音声ファイル作成
3. **プレビュー**: `npm run video:start`でRemotionスタジオ起動
4. **最終書き出し**: `npm run video:build`でMP4生成

### パフォーマンス最適化
- 独立したnode_modulesによる影響範囲の限定
- フレーム単位のキャッシュ機能
- プレビュー時のリアルタイム更新

## Related Decisions

- ADR-0004: React useOptimistic - React技術スタックとの整合性
- 将来的なADR: CI/CD統合による自動動画生成パイプライン検討

## Future Considerations

### 潜在的な拡張領域
- **3Dアニメーション**: React Three Fiberとの統合
- **クラウドTTS**: Azure/Google TTSへの移行
- **自動化パイプライン**: CI/CDでの動画生成自動化
- **多言語対応**: 英語・他言語音声の追加

---

**Date**: 2025-09-02  
**Author**: Claude Code (ksyunnnn)  
**Reviewers**: -  
**Related PR**: #15 - feat: Remotion動画制作機能をメインプロジェクトに統合  
**Related Issue**: #16 - [ADR] 新しい技術・ライブラリの採用: feat: Remotion動画制作機能をメインプロジェクトに統合  
**Related Session**: #13 - [Session Log] Remotionを使った音声付きプロダクト説明動画の作成