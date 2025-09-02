# ADR-0006: Commandいいね機能の実装

## Status

Accepted

## Context

コマンド共有アプリケーションにおいて、ユーザーエンゲージメントとコンテンツの品質向上を目的として、commandに対するいいね機能の実装が必要となった。

- **現在の課題**: コマンドに対するユーザーの評価やエンゲージメントを測定する仕組みがない
- **選択肢**: 
  1. シンプルなLikeボタンのみの実装
  2. Like/Dislike両方向の評価システム
  3. 5段階評価システム
  4. コメント機能との組み合わせ
- **制約条件**: 
  - 既存のSupabase + Next.js 15アーキテクチャとの整合性
  - 認証済みユーザーのみが操作可能
  - リアルタイム更新対応
- **ステークホルダー要求**: ユーザーが簡単にコマンドの有用性を示せる仕組み

## Decision

**シンプルなLikeボタンのみの実装**を採用する。

- **UI/UX戦略**: Radix UIベースのコンポーネント設計で一貫性を保持
- **データベース設計**: 新しい`likes`テーブルを作成し、user_id, command_id, created_atの構成
- **認証連携**: 未認証ユーザーには促進モーダルを表示
- **技術スタック拡張**: 
  - `@radix-ui/react-avatar`: ユーザー表示用
  - `@radix-ui/react-dialog`: いいねしたユーザー一覧モーダル用
  - `sonner`: エラーハンドリング用トースト通知
  - `next-themes`: テーマサポート

## Consequences

### Positive（メリット）

- **ユーザーエンゲージメント向上**: コマンドの人気度可視化
- **コンテンツ品質向上**: 有用なコマンドが自然に発見されやすくなる
- **技術的一貫性**: 既存のRadix UIエコシステムとの統合
- **パフォーマンス**: シンプルな実装で高速レスポンス
- **アクセシビリティ**: Radix UIにより標準準拠

### Negative（デメリット・リスク）

- **データベース負荷**: いいね操作の頻発によるwrite負荷増加
- **UIの複雑性**: モーダル、エラーハンドリング等の追加実装
- **依存関係増加**: 新しいパッケージ追加によるバンドルサイズ増加
- **メンテナンス**: いいね機能特有のエラーケース対応

### Neutral（中立的な影響）

- **E2Eテスト拡張**: Playwright テストケース追加が必要
- **スクリーンショット更新**: UI変更に伴うテスト資産更新
- **RLS政策**: Supabase Row Level Security設定の追加

## Implementation Notes

### 技術的実装詳細

1. **データベース移行**: `supabase/migrations/004_create_likes_table.sql`
2. **コンポーネント構成**:
   - `like-button.tsx`: メインのいいねボタン
   - `liked-users-modal.tsx`: いいねユーザー一覧表示
   - `login-prompt-modal.tsx`: 認証促進UI
   - `like-error-handler.tsx`: エラーハンドリング
3. **Server Actions**: `src/lib/actions/like-actions.ts`で状態管理
4. **認証ユーティリティ**: `src/lib/auth-utils.ts`でセッション管理

### テスト戦略

- **E2Eテスト**: 認証済み/未認証ユーザーの操作フロー
- **スクリーンショットテスト**: デスクトップ・モバイル両対応
- **エラーシナリオ**: ネットワークエラー、認証エラーのハンドリング

## Related Decisions

- ADR-0005: Radix UI Extension Strategy - UI コンポーネント戦略との整合性

---

**Date**: 2025-08-27
**Author**: Claude Code
**Reviewers**: -