# ADR-0010: コマンドいいねシステムの設計とユーザー体験改善

## Status

Accepted

## Context

ソーシャルコマンド共有プラットフォームとして、ユーザーエンゲージメントを向上させるためのいいね機能が必要だった：

- **コミュニティ機能の不足**: コマンドへのフィードバック・評価システムがない
- **ユーザーモチベーション**: 投稿者への評価・反応システムが必要
- **コンテンツ品質向上**: 人気コマンドの判別と推奨機能の基盤
- **未ログインユーザーのUX問題**: いいねボタンクリック時の突然のリダイレクトがユーザー体験を阻害

### 技術要件

- **認証済みユーザー**: いいね・いいね解除が可能
- **未ログインユーザー**: 適切なログイン誘導UI
- **リアルタイム更新**: React 19 useOptimisticによる即応性
- **データ整合性**: 重複いいね防止とRLS（Row Level Security）
- **パフォーマンス**: 高速な読み取りクエリ

### 検討したUI/UX戦略

1. **即座のリダイレクト**: 未ログインユーザーを直接ログインページへ
2. **インライン認証**: ボタン内での認証フローを展開
3. **モーダルベース認証誘導**: 魅力的なモーダルでログインを促進（採用案）
4. **ツールチップ警告**: ホバー時に認証必要性を通知

## Decision

**魅力的なログイン促進モーダル**を中心とした包括的ないいねシステムを採用：

### コアアーキテクチャ

```
Database Layer:
├── likes table (UUID, user_id, command_id, created_at)
├── RLS policies (select: public, insert/delete: owner only)
└── PostgreSQL functions (get_like_count, has_user_liked)

Application Layer:
├── Server Actions (like-actions.ts)
├── UI Components (like-button.tsx, modals)
└── Real-time Updates (React 19 useOptimistic)
```

### UX改善戦略

- **未ログインユーザー**: モーダル表示 → 魅力的なログイン誘導 → "Maybe later"での自然なキャンセル
- **認証済みユーザー**: 即座のいいね・解除 → Optimistic Updates
- **投稿者特典**: いいねユーザー一覧の閲覧権限

### 技術実装詳細

- **React 19 useOptimistic**: クライアント側でのレスポンシブな状態更新
- **Radix UI Dialog**: アクセシビリティ対応のモーダル実装
- **PostgreSQL関数**: パフォーマンスの最適化
- **Playwright E2E**: 包括的なテスト・スクリーンショット自動化

## Consequences

### Positive（メリット）

- **ユーザーエンゲージメント向上**: コマンドへのフィードバック機能提供
- **UX大幅改善**: 未ログインユーザーの突然のリダイレクト問題を解決
- **コンテンツ品質向上**: 人気コマンドの可視化による品質向上インセンティブ
- **技術的優位性**: React 19先進機能によるモダンなUI体験
- **スケーラビリティ**: PostgreSQL関数・インデックス最適化による高パフォーマンス
- **保守性**: コンポーネント分離とServer Actions活用

### Negative（デメリット・リスク）

- **複雑性増加**: 認証状態・モーダル状態管理の複雑化
- **パフォーマンス影響**: 追加のクエリとコンポーネント描画
- **データ増加**: いいね数増加によるデータベース容量増大
- **スパム対策**: いいねスパム・操作への対策が将来必要
- **サーバー負荷**: useOptimisticによるリアルタイム更新での負荷増加

### Neutral（中立的な影響）

- **依存関係**: Radix UI Dialog等のUI依存関係追加（@radix-ui/react-dialog, @radix-ui/react-avatar）
- **テスト工数**: E2Eテスト・スクリーンショット維持の継続的工数
- **UI設計継続性**: 他機能でのモーダルパターン統一化の必要性

## Implementation Notes

### データベース設計

```sql
-- Unique constraint prevents duplicate likes
unique (user_id, command_id)

-- Performance optimization indexes
create index idx_likes_command_id on public.likes(command_id);
create index idx_likes_relationship on public.likes(user_id, command_id);

-- Security via RLS policies
create policy "Users can create likes" with check (auth.uid() = user_id);
```

### React 19 useOptimistic活用

```typescript
const [optimisticLiked, setOptimisticLiked] = useOptimistic(
  userHasLiked,
  (currentState, optimisticValue) => optimisticValue
);
```

### モーダルUXパターン

```typescript
// 未ログインユーザー向けの魅力的なCTA
<LoginPromptModal 
  isOpen={showLoginPrompt}
  onClose={() => setShowLoginPrompt(false)}
  ctaMessage="Join our community to like and save commands!"
/>
```

## Related Decisions

- ADR-0004: React useOptimistic - 同一技術スタック活用
- ADR-0005: Radix UI Extension Strategy - UI設計の一貫性
- 将来的なADR: スパム対策・コンテンツ推奨アルゴリズム

## Future Considerations

### 拡張可能性

- **推奨システム**: いいね数ベースのコマンド推奨機能
- **通知機能**: いいね通知・アクティビティフィード
- **分析機能**: いいね傾向・ユーザー行動分析
- **ソーシャル機能**: コメント・シェア機能拡張

---

**Date**: 2025-09-02  
**Author**: Claude Code (ksyunnnn)  
**Reviewers**: -  
**Related PR**: #3 - 新機能: commandのいいね機能を実装  
**Related Issues**: #4-8 - [ADR] UI/UX戦略の変更: 新機能: commandのいいね機能を実装  
**Migration**: 004_create_likes_table.sql