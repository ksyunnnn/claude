# ADR-0004: React 19 useOptimisticフックの採用

## Status

Accepted

## Context

PR #3「commandのいいね機能実装」において、ユーザーの操作に対する即座のフィードバックが求められた。従来のアプローチでは以下の課題があった：

- **レスポンス遅延**: サーバー応答待ちによるボタン操作の遅延感
- **UX問題**: ローディング状態が続くことによるユーザビリティの低下
- **実装複雑化**: 手動での楽観的更新とロールバック実装の複雑性

類似の機能（フォロー/アンフォロー）では手動実装していたが、いいね機能の実装でより洗練されたソリューションが必要となった。

## Decision

**React 19の`useOptimistic`フック**を採用し、いいね機能における楽観的更新（Optimistic Updates）を実装する。

### 実装方針

#### 1. useOptimisticの基本実装
```typescript
const [optimisticLikes, addOptimisticLike] = useOptimistic(
  { count: likesCount, isLiked: isUserLiked },
  (state, newLike: boolean) => ({
    count: newLike ? state.count + 1 : state.count - 1,
    isLiked: newLike,
  })
)
```

#### 2. Server Actionとの連携
```typescript
async function handleLikeToggle() {
  const newLikeState = !optimisticLikes.isLiked
  addOptimisticLike(newLikeState)
  
  try {
    await toggleLikeAction(commandId)
  } catch (error) {
    // useOptimisticが自動的にロールバック
    console.error('Like action failed:', error)
  }
}
```

#### 3. エラーハンドリング戦略
- **自動ロールバック**: useOptimisticの組み込み機能
- **エラー表示**: トースト通知による失敗通知
- **リトライ機能**: ユーザーが再度操作可能

### 適用範囲
- **いいね/いいね解除**: メイン機能
- **将来の類似機能**: フォロー、ブックマーク等への展開

## Consequences

### Positive（メリット）

- **即座のユーザー体験**: ボタンクリック時の瞬時反応
- **モダンなReactパターン**: React 19公式推奨のパターン採用
- **コード品質向上**: 手動実装に比べてバグが少ない
- **開発効率**: 楽観的更新ロジックの標準化
- **将来性**: React エコシステムとの親和性

### Negative（デメリット・リスク）

- **React 19依存**: 最新バージョンへの依存リスク
- **ブラウザサポート**: React 19対応ブラウザの制約
- **学習コスト**: チーム内でのuseOptimistic理解が必要
- **デバッグ複雑性**: 楽観的更新とサーバー状態の不整合デバッグ

### Neutral（中立的な影響）

- Next.js 15との互換性確保が継続的に必要
- 他のOptimistic更新パターンとの一貫性保持が重要

## Implementation Notes

### PR #3での実装例

実際のいいね機能実装：
```typescript
// コンポーネント内での使用例
const [optimisticLikes, addOptimisticLike] = useOptimistic(
  { count: likesCount, isLiked: isUserLiked },
  (state, newLike: boolean) => ({
    count: newLike ? state.count + 1 : state.count - 1,
    isLiked: newLike,
  })
)

const handleLikeToggle = async () => {
  if (!user) return
  
  const newLikeState = !optimisticLikes.isLiked
  addOptimisticLike(newLikeState)
  
  try {
    await toggleLikeAction(commandId)
  } catch (error) {
    // 自動的にロールバック
    toast.error('いいねの更新に失敗しました')
  }
}
```

### パフォーマンス考慮

- **Server Action**: 非同期処理の最適化
- **Revalidation**: `revalidatePath`による適切なキャッシュ更新
- **Database**: Supabaseでの効率的ないいね数集計

### エラーケース対応

- **認証エラー**: ログイン画面へのリダイレクト
- **ネットワークエラー**: リトライ可能な通知
- **サーバーエラー**: ユーザーフレンドリーなエラーメッセージ

## Related Decisions

- ADR-0005: Radix UI拡張戦略（関連UIコンポーネント）
- ADR-0007: Server Actions活用パターン（データ操作の標準化）
- 将来: フォロー機能のuseOptimistic移行検討

## Future Considerations

### 拡張予定
1. **フォロー機能**: 現在の手動実装からuseOptimisticへ移行
2. **ブックマーク機能**: 同様のパターンでの実装
3. **コメント機能**: 楽観的更新の適用

### 監視項目
- React 19の安定性とパフォーマンス
- ユーザーのブラウザ対応状況
- エラー率とユーザビリティ指標

---

**Date**: 2025-01-26  
**Author**: Claude Code  
**Context**: PR #3 いいね機能実装に基づく技術選択  
**Reference**: https://github.com/ksyunnnn/slash-commands/pull/3