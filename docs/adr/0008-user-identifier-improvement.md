# ADR-0008: ユーザー識別子改善 - Username/UUID両対応システム

## Status

Accepted

## Context

これまでのシステムではユーザーページへのアクセスにusernameのみを使用していたが、以下の問題が発生していた：

- username未設定のユーザーがページにアクセスできない（404エラー）
- ユーザーがusernameを設定するまで、プロフィールページやコマンドページが閲覧不可
- システム内部ではユーザーIDはUUIDで管理されているが、URL経路では活用されていない
- ユーザビリティの低下とアクセシビリティの問題

### 技術的な制約条件

- 既存のusernameベースのURLは維持する必要がある（後方互換性）
- UUIDでのアクセスも新たにサポートする必要がある
- パフォーマンスへの影響を最小限に抑える
- 既存のNext.jsアプリルーターの動的ルーティング構造は維持

### 検討した選択肢

1. **Username必須化**: すべてのユーザーにusername設定を強制
2. **UUID専用システム**: usernameを廃止してUUIDのみ使用
3. **デュアル識別子システム**: username/UUID両方をサポート（採用案）
4. **リダイレクトベース**: UUID→usernameへの自動リダイレクト

## Decision

**デュアル識別子システム**を採用し、`getUserByIdentifier`関数を実装する：

- `[username]`パラメータでusername・UUID両方を受け取り可能
- 最初にusernameで検索、見つからない場合はUUIDとして検索
- 既存のusernameベースURLは変更なし
- 新たにUUIDでのアクセスをサポート

### 実装詳細

- `src/lib/user-utils.ts`に`getUserByIdentifier`関数を追加
- `isValidUUID`バリデーション関数でUUID形式を検証
- 各ページコンポーネントで`getUserByUsername`から`getUserByIdentifier`への移行

## Consequences

### Positive（メリット）

- **ユーザビリティ向上**: username未設定ユーザーもページにアクセス可能
- **後方互換性維持**: 既存のusernameベースURLが引き続き機能
- **柔軟性向上**: 内部システムでUUID、外部向けにusernameという使い分けが可能
- **404エラー削減**: より多くのユーザーページが正常にアクセス可能

### Negative（デメリット・リスク）

- **パフォーマンス影響**: 2段階の検索プロセスにより若干のクエリ遅延
- **複雑性増加**: 識別子の判定ロジックが必要
- **セキュリティ考慮事項**: UUIDの露出によるユーザー列挙の可能性
- **URL予測可能性**: UUIDベースのURLは人間には読みにくい

### Neutral（中立的な影響）

- **既存コード**: 段階的な移行が必要（影響範囲は限定的）
- **データベース構造**: 変更不要
- **SEO影響**: usernameベースURLが優先されるため影響は最小限

## Implementation Notes

- `getUserByIdentifier`関数は最初にusername検索を実行（高速）
- UUID検索は`isValidUUID`バリデーション通過時のみ実行（効率的）
- エラーハンドリングは既存の404ページ機能を継続使用
- 段階的な移行により既存機能への影響を最小化

## Related Decisions

- ADR-0007: Local Supabase Development - データベース設計との整合性
- 将来的なADR: ユーザー認証・認可システムの改善検討

---

**Date**: 2025-09-02
**Author**: Claude Code (ksyunnnn)
**Reviewers**: -
**Related PR**: #19 - fix: username未設定ユーザーのアクセス問題を解決
**Related Issue**: #20 - [ADR] アーキテクチャの変更: fix: username未設定ユーザーのアクセス問題を解決