# ADR-0003: GitHub Releasesを使用したリリースプロセス

## Status

Accepted

## Context

プロジェクトの成長に伴い、リリース管理の標準化が必要になった。v1.1.0のリリース経験を基に、以下の課題を特定：

- リリース手順が属人的で文書化されていない
- リリースノートの形式が統一されていない
- タグ作成とGitHub Releasesの連携プロセスが曖昧
- 将来の自動化に向けた基盤が不足

手動プロセスから始めて段階的に自動化していく方針が求められた。

## Decision

**Gitタグ + GitHub Releases + 標準化されたリリースプロセス**を採用する。

### リリースプロセス

#### 1. 事前準備
```bash
# 作業ブランチで開発・テスト完了後
npm run lint  # コード品質チェック
npm run build # ビルド確認
npm run test:e2e # E2Eテスト実行（該当時）
```

#### 2. 変更のコミット
```bash
# 全ての変更をステージング
git add [files]

# 日本語での簡潔なコミットメッセージ
git commit -m "機能追加: 新機能の説明"
```

#### 3. バージョンタグの作成
```bash
# セマンティックバージョニング
git tag -a v1.1.0 -m "Brief description in English"

# 例: git tag -a v1.1.0 -m "Apple-style flat design favicon with ADR system"
```

#### 4. リモートへのプッシュ
```bash
# コミットとタグを同時にプッシュ
git push origin main --tags
```

#### 5. GitHub Releasesでのリリース作成
- GitHubのタグページから「Create release」
- タグを選択してリリースノートを作成
- 標準テンプレートに従った内容構成

### バージョニング戦略

**セマンティックバージョニング (Major.Minor.Patch)**:
- **Major (例: 2.0.0)**: 破壊的変更、API変更、データスキーマ変更
- **Minor (例: 1.1.0)**: 新機能追加、後方互換性保持
- **Patch (例: 1.0.1)**: バグ修正、小規模改善、ドキュメント更新

### リリースノート構成

標準セクション:
- **🎉 新機能 (Features)**: 追加された機能
- **🔧 修正 (Bug Fixes)**: バグ修正とパフォーマンス改善
- **📚 ドキュメント (Documentation)**: ドキュメント更新
- **⚠️ 破壊的変更 (Breaking Changes)**: 後方互換性のない変更（Major版のみ）
- **🙏 謝辞 (Acknowledgments)**: コントリビューターへの感謝

## Consequences

### Positive（メリット）

- **標準化**: 一貫したリリースプロセスによる品質向上
- **透明性**: GitHub Releasesでのユーザー向け変更履歴公開
- **自動化基盤**: 将来のCI/CD導入への土台
- **セマンティックバージョニング**: 依存関係管理の明確化
- **チーム協業**: 属人化解消と新メンバーへの知識共有
- **タグ管理**: コードの特定バージョンへの迅速なアクセス

### Negative（デメリット・リスク）

- **手動作業**: 現段階では手動プロセスのため人的ミスのリスク
- **学習コスト**: リリース担当者がプロセスを習得する必要
- **GitHub依存**: GitHub Releasesに依存するためプラットフォーム変更時の影響
- **メンテナンス**: プロセス文書の継続的な更新が必要

### Neutral（中立的な影響）

- プロセスの習熟まで時間がかかるが、長期的には効率化
- 小規模な修正でも同様のプロセスが必要

## Implementation Notes

### v1.1.0リリース実績（2025-01-26）

実際に実行した手順:
```bash
# 1. ファイルの追加
git add docs/ src/app/icon.tsx CLAUDE.md README.md

# 2. コミット実行
git commit -m "AppleスタイルのフラットデザインfaviconとADRシステムを追加

- Next.js ImageResponseでプログラマティックなfavicon生成
- ダブルシェブロン(>>)のミニマルデザイン
- アーキテクチャ決定記録(ADR)システムの導入
- デザインとバージョン管理のドキュメント整備"

# 3. タグ作成
git tag -a v1.1.0 -m "Apple-style flat design favicon with ADR system"

# 4. プッシュ
git push origin main --tags
```

**成果**: 
- 7ファイル変更、553行追加
- 新機能: 動的favicon生成、ADRシステム
- 新規ファイル: icon.tsx, 4つのADRファイル

### トラブルシューティング

- **タグ削除**: `git tag -d v1.1.0` (ローカル), `git push origin :refs/tags/v1.1.0` (リモート)
- **コミット修正**: `git commit --amend` (プッシュ前のみ)
- **リリースノート編集**: GitHubのReleasesページで後から編集可能

### 将来の自動化計画

- **GitHub Actions**: タグプッシュ時のリリース自動作成
- **Conventional Commits**: コミットメッセージ規約導入
- **自動CHANGELOG生成**: リリースノート自動作成
- **デプロイ自動化**: Vercelとの連携強化

## Related Decisions

- ADR-0002: バージョン管理手法の採用（基盤となる決定）
- 将来: CI/CDパイプライン導入時の新ADR予定

---

**Date**: 2025-01-26  
**Author**: Claude Code  
**Context**: v1.1.0リリース経験に基づくプロセス標準化