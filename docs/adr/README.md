# Architecture Decision Records (ADR)

このディレクトリは、プロジェクトの重要な技術的・設計的決定を記録するためのアーキテクチャ決定記録（ADR）を格納しています。

## ADRとは

ADR（Architecture Decision Records）は、ソフトウェア開発プロジェクトにおける重要な設計決定とその理由を文書化するためのツールです。これにより、将来の開発者や現在のチームメンバーが、なぜ特定の決定が下されたのかを理解できます。

## ADRの構造

各ADRは以下の構造で記述されています：

- **Title**: 決定の簡潔な要約
- **Status**: Proposed（提案）, Accepted（承認）, Deprecated（廃止予定）, Superseded（置き換え）
- **Context**: 決定が必要になった背景・状況
- **Decision**: 採用した解決策と理由
- **Consequences**: 決定による影響（メリット・デメリット両方）

## ファイル命名規則

```
NNNN-title-with-dashes.md
```

- `NNNN`: 4桁の連番（例：0001, 0002）
- `title-with-dashes`: 決定内容を表すタイトル（小文字、ハイフン区切り）

## 既存のADR

- [ADR-0001: ファビコンデザインの技術選択](0001-favicon-design.md)
- [ADR-0002: バージョン管理手法の採用](0002-version-management.md)
- [ADR-0003: GitHub Releasesを使用したリリースプロセス](0003-release-process.md)
- [ADR-0004: React 19 useOptimisticフックの採用](0004-react-use-optimistic.md)
- [ADR-0005: Radix UI拡張戦略](0005-radix-ui-extension-strategy.md)
- [ADR-0006: Commandいいね機能の実装](0006-command-like-system.md)
- [ADR-0007: ローカルSupabase開発環境とGitHub OAuth対応](0007-local-supabase-development.md)
- [ADR-0008: ユーザー識別子改善 - Username/UUID両対応システム](0008-user-identifier-improvement.md)
- [ADR-0009: Remotion動画制作システムの採用とメインプロジェクトへの統合](0009-remotion-video-creation-adoption.md)
- [ADR-0010: コマンドいいねシステムの設計とユーザー体験改善](0010-command-like-system-design.md)
- [ADR-0011: 多言語対応機能の実装](0011-internationalization-implementation.md)

## 自動化システム

このプロジェクトでは、ADR管理の効率化のため**自動化システム**を導入しています：

### 🤖 自動機能
- **技術的変更の自動検出**: PRを分析してADR必要性を判定
- **Issue自動作成**: 技術的決定が必要な場合に自動でIssue作成
- **ADRドラフト自動生成**: Issueに基づいてADRドラフトとPRを自動生成

詳細は [ADR自動化システム](../../.github/ADR-AUTOMATION.md) をご参照ください。

### 利用方法
1. **自動**: 技術的変更を含むPRを作成すると自動でIssueが作成される
2. **手動**: [技術的決定テンプレート](../../.github/ISSUE_TEMPLATE/technical-decision.yml) から手動作成
3. **ドラフト活用**: 自動生成されたADRドラフトを編集・完成

## 新しいADRの作成

### 自動化された方法（推奨）
1. 技術的変更を含むPRを作成
2. 自動生成されるIssueとADRドラフトを確認
3. ドラフトを編集・詳細化
4. レビュー・マージ

### 手動作成
1. `template.md` をコピーして新しいファイルを作成
2. 連番を確認して適切な番号を付与
3. タイトルを決定内容に応じて設定
4. 各セクションを埋める
5. PRでレビュー・承認プロセスを経る

## ADRが必要な決定の例

- 技術スタックの選択（フレームワーク、ライブラリ、データベース）
- アーキテクチャパターンの採用
- セキュリティ・パフォーマンス要件への対応方針
- デザイン・UI/UXの基本方針
- 開発・運用フローの変更

## 参考資料

### プロジェクト関連
- [ADR自動化システム](../../.github/ADR-AUTOMATION.md)
- [技術的決定テンプレート](../../.github/ISSUE_TEMPLATE/technical-decision.yml)
- [リリースプロセス](../../RELEASE.md)

### 外部資料
- [Michael Nygard's ADR template](https://github.com/joelparkerhenderson/architecture_decision_record)
- [ADR GitHub organization](https://adr.github.io/)