# ADR-0005: Radix UI拡張戦略

## Status

Accepted

## Context

PR #3のいいね機能実装において、新しいUIコンポーネントの追加が必要となった。プロジェクト開始時から`@radix-ui/react-label`、`@radix-ui/react-switch`を採用していたが、統一的な拡張戦略が必要となった。

### 現在の状況
- **既存採用**: Label, Switch（基本フォーム要素）
- **新規追加**: Avatar, Dialog（いいね機能用）
- **将来需要**: Dropdown, Tooltip, Popover等

### 選択肢の検討
1. **Radix UI継続拡張**: 一貫したアクセシビリティとAPI
2. **shadcn/ui統合**: プリスタイルコンポーネント
3. **混在アプローチ**: 用途別ライブラリ選択

## Decision

**Radix UIを主軸とした段階的拡張戦略**を採用し、shadcn/uiパターンとの親和性を保ちつつ拡張する。

### 拡張方針

#### 1. 採用基準
```typescript
// 採用優先度（高 → 低）
1. Radix UI Primitives: アクセシビリティ重視
2. shadcn/ui Components: Radix UIベース + Tailwind統合
3. Custom Components: プロジェクト固有要件
```

#### 2. コンポーネント分類
```
src/components/ui/
├── button.tsx          # shadcn/ui準拠
├── input.tsx           # shadcn/ui準拠  
├── label.tsx           # Radix UI直接
├── switch.tsx          # Radix UI直接
├── avatar.tsx          # 新規: Radix UI + Tailwind
└── dialog.tsx          # 新規: Radix UI + Tailwind
```

#### 3. 実装パターンの標準化

**基本構造**:
```typescript
// components/ui/avatar.tsx
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
))
```

#### 4. 命名規則とAPI統一
- **コンポーネント名**: Pascal Case（`Avatar`, `Dialog`）
- **プロップス**: Radix UI APIに準拠
- **スタイリング**: Tailwind + `cn()`ユーティリティ
- **型定義**: `React.forwardRef`パターン統一

### バンドルサイズ管理
```json
// package.json - 段階的導入
{
  "dependencies": {
    "@radix-ui/react-avatar": "^1.1.10",    // 追加済み
    "@radix-ui/react-dialog": "^1.1.15",    // 追加済み
    "@radix-ui/react-label": "^2.1.7",      // 既存
    "@radix-ui/react-switch": "^1.2.6"      // 既存
  }
}
```

## Consequences

### Positive（メリット）

- **一貫性**: 統一されたAPI設計とアクセシビリティ
- **保守性**: shadcn/uiパターンによる予測可能な実装
- **品質**: WAI-ARIA準拠の高品質コンポーネント
- **柔軟性**: Tailwindによるカスタマイズ性
- **コミュニティ**: shadcn/uiエコシステムとの親和性
- **段階導入**: 必要に応じた依存関係追加

### Negative（デメリット・リスク）

- **バンドルサイズ**: 複数Radix UIパッケージによる増加
- **学習コスト**: Radix UI Primitives APIの習得
- **更新コスト**: 複数パッケージのバージョン管理
- **過剰設計**: 小規模機能に対する複雑なAPI

### Neutral（中立的な影響）

- Tree Shakingによるバンドル最適化が重要
- TypeScript型定義の恩恵を最大活用

## Implementation Notes

### PR #3での実装実績

#### Avatar コンポーネント
```typescript
// いいねユーザー表示用
<Avatar className="h-8 w-8">
  <AvatarImage src={user.avatar_url} alt={user.username} />
  <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
</Avatar>
```

#### Dialog コンポーネント
```typescript
// いいねユーザー一覧モーダル
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button variant="outline">いいね {count}</Button>
  </DialogTrigger>
  <DialogContent className="max-w-md">
    <DialogHeader>
      <DialogTitle>いいねしたユーザー</DialogTitle>
    </DialogHeader>
    {/* ユーザーリスト */}
  </DialogContent>
</Dialog>
```

### 将来の拡張計画

#### Phase 1: 基本UI拡張
- `@radix-ui/react-dropdown-menu`: ナビゲーション
- `@radix-ui/react-tooltip`: ヘルプ機能
- `@radix-ui/react-popover`: 設定UI

#### Phase 2: 高度なUI拡張
- `@radix-ui/react-select`: フォーム強化
- `@radix-ui/react-tabs`: ページネーション
- `@radix-ui/react-accordion`: FAQ機能

#### Phase 3: 専門機能
- `@radix-ui/react-slider`: 設定調整
- `@radix-ui/react-progress`: 処理状況
- `@radix-ui/react-menubar`: 高度ナビ

### パフォーマンス監視

#### バンドルサイズ監視
```bash
# 依存関係追加時の確認
npm run build && npx bundlemon
```

#### 実行時パフォーマンス
- Radix UIコンポーネントのレンダリング性能
- アニメーション品質とフレームレート
- アクセシビリティ機能の動作確認

## Related Decisions

- ADR-0004: React 19 useOptimistic（UI状態管理）
- ADR-0001: ファビコンデザイン（デザインシステム一貫性）
- 将来: コンポーネントライブラリ統合方針

## Standards and Guidelines

### コンポーネント作成ルール

1. **forwardRef必須**: ref透過性保証
2. **className支援**: `cn()`での結合可能
3. **Variant対応**: `cva`による多様性
4. **TypeScript完全**: 型安全性確保

### ファイル構成
```
components/ui/
├── [component-name].tsx    # メインコンポーネント
├── index.ts                # 全体エクスポート
└── types.ts                # 共通型定義
```

---

**Date**: 2025-01-26  
**Author**: Claude Code  
**Context**: PR #3 Avatar・Dialog追加に基づくUI戦略  
**Reference**: https://ui.shadcn.com/ (参考パターン)