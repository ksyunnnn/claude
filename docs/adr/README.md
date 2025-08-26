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

## 新しいADRの作成

新しい技術的決定を記録する際は、以下の手順に従ってください：

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

- [Michael Nygard's ADR template](https://github.com/joelparkerhenderson/architecture_decision_record)
- [ADR GitHub organization](https://adr.github.io/)