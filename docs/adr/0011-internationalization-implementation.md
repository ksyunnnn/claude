# ADR-0011: 多言語対応機能の実装

## Status

Accepted

## Context

プロジェクトをグローバルに展開するため、日本語・英語の多言語対応が必要になりました。特に以下の課題への対応が求められました：

- 現在のアプリケーションは日本語のハードコード文字列が多数存在
- 国際的なユーザーへのアクセシビリティ向上が必要
- SEO対応としてURL構造での言語識別が重要
- サーバーサイドレンダリング（SSR）との互換性が必須
- Next.js 15 App Routerアーキテクチャでの動作保証が必要

### 検討した選択肢

1. **next-intl**: Next.js専用の国際化ライブラリ
2. **react-i18next**: React汎用の国際化ライブラリ
3. **lingui**: TypeScript親和性の高い国際化ライブラリ
4. **自作の翻訳システム**: プロジェクト固有の実装

### 制約条件

- Next.js 15 App Routerとの完全互換性
- サーバーサイド・クライアントサイド両対応
- TypeScript対応
- 既存のUI/UXを維持
- パフォーマンスへの影響を最小限に抑制

## Decision

**next-intl v4.3.5を採用**し、以下の設計で多言語対応を実装することを決定しました：

### 1. 国際化ライブラリの選択
- **next-intl**を採用
- Next.js 15 App Router公式サポート
- サーバーサイドレンダリング標準対応
- TypeScript完全対応

### 2. 翻訳ファイル構造
- **プロジェクトルートの`messages/`ディレクトリ**に配置
- `messages/ja.json` - 日本語翻訳
- `messages/en.json` - 英語翻訳
- 階層構造でのキー管理

### 3. ロケール検出とルーティング
- **ミドルウェアによるサブパス方式**（`/ja/`, `/en/`）
- SEO対応のURL構造
- ブラウザ言語設定による自動検出
- クッキーでの言語設定永続化

### 4. 実装アーキテクチャ
- `src/lib/i18n/` - 国際化ユーティリティ
- `src/components/language-switcher.tsx` - 言語切り替えUI
- `src/middleware.ts` - ロケール検出処理
- Server Actions対応の言語切り替え機能

## Consequences

### Positive（メリット）

- **国際的なアクセシビリティ向上**: 英語圏ユーザーへのサービス提供が可能
- **SEO向上**: 言語別URLによる検索エンジン最適化
- **開発効率性**: next-intlの豊富な機能とNext.js最適化
- **TypeScript安全性**: 翻訳キーの型安全性確保
- **パフォーマンス**: サーバーサイドレンダリング対応による高速化
- **標準準拠**: Web標準の国際化ベストプラクティスに準拠

### Negative（デメリット・リスク）

- **URL構造の破壊的変更**: 既存URLに`/ja/`プレフィックス追加
- **翻訳メンテナンスコスト**: 継続的な翻訳管理が必要
- **パッケージ依存性**: next-intlライブラリへの依存
- **学習コスト**: 開発チームのnext-intl習得が必要
- **初期実装コスト**: 全文字列の翻訳化作業

### Neutral（中立的な影響）

- **ファイル構造変更**: 翻訳ファイルとi18n設定ファイルの追加
- **ビルドサイズ**: 翻訳ファイルによる微増（軽微な影響）
- **開発フロー**: 新機能開発時の翻訳作業が標準化

## Implementation Notes

### ファイル構成
```
messages/
├── ja.json          # 日本語翻訳
└── en.json          # 英語翻訳

src/lib/i18n/
├── client.ts        # クライアントサイド設定
├── server.ts        # サーバーサイド設定
├── types.ts         # 型定義
└── translations/    # 詳細翻訳（移行済み）
    ├── ja.ts
    └── en.ts

src/components/
└── language-switcher.tsx  # 言語切り替えコンポーネント
```

### 設定ファイル
- `next.config.ts` - next-intl プラグイン設定
- `src/i18n.ts` - 国際化設定
- `src/middleware.ts` - ロケール検出ミドルウェア

### 移行プロセス
1. **Phase 1**: next-intl基盤構築（PR #26）
2. **Phase 2**: 全ハードコード文字列の翻訳化（PR #32）
3. **Phase 3**: 翻訳品質向上とメンテナンスプロセス確立

## Related Decisions

- ADR-0002: バージョン管理手法 - 破壊的変更のバージョニング方針
- ADR-0003: リリースプロセス - 多言語対応リリースの手順

---

**Date**: 2025-09-10
**Author**: ksyunnnn
**Reviewers**: Claude Code