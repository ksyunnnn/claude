# リリースガイド

Slash Commandsプロジェクトのリリース手順書

## リリース前チェックリスト

- [ ] 全ての変更がmainブランチにマージ済み
- [ ] `npm run lint` でコード品質チェック完了
- [ ] `npm run build` でビルド成功確認
- [ ] E2Eテストが必要な場合は `npm run test:e2e` で実行
- [ ] READMEやドキュメントの更新完了
- [ ] 破壊的変更がある場合はドキュメントに明記

## リリース手順

### 1. 事前準備
```bash
# 最新の状態に更新
git checkout main
git pull origin main

# コード品質とビルドの確認
npm run lint
npm run build
```

### 2. 変更のコミット
```bash
# 変更をステージング
git add [変更されたファイル]

# 簡潔で明確なコミットメッセージ（日本語）
git commit -m "新機能: [機能の簡潔な説明]"
# または
git commit -m "修正: [修正内容の簡潔な説明]"
```

### 3. バージョン決定
セマンティックバージョニングに従って決定：

- **Major (例: 2.0.0)**: 破壊的変更、大幅なAPI変更
- **Minor (例: 1.2.0)**: 新機能追加（後方互換性あり）
- **Patch (例: 1.1.1)**: バグ修正、小規模改善

### 4. Gitタグ作成
```bash
# バージョンタグを作成（英語でのメッセージ）
git tag -a v1.2.0 -m "Add new feature: brief description"

# 作成されたタグの確認
git tag -l
```

### 5. リモートにプッシュ
```bash
# コミットとタグを一緒にプッシュ
git push origin main --tags
```

### 6. GitHub Releasesの作成

1. GitHubリポジトリのページにアクセス
2. 「Releases」タブをクリック
3. 「Create a new release」をクリック
4. 作成したタグを選択
5. リリースタイトルを入力（例：`v1.2.0`）
6. リリースノートを作成（下記テンプレート参照）
7. 「Publish release」をクリック

## リリースノートテンプレート

```markdown
## 🎉 新機能 (Features)
- 機能名: 機能の説明とメリット
- 機能名: 機能の説明とメリット

## 🔧 修正 (Bug Fixes)
- 修正内容: 修正された問題の説明
- 修正内容: 修正された問題の説明

## 📚 ドキュメント (Documentation)
- ドキュメント更新: 更新内容の説明
- 新規ドキュメント: 追加されたドキュメントの説明

## ⚠️ 破壊的変更 (Breaking Changes)
*（Major版のみ、該当する場合）*
- 変更内容: 影響範囲と移行方法
- 変更内容: 影響範囲と移行方法

## 🔗 技術的な詳細
- 実装の詳細や技術的な変更点
- パフォーマンス改善の数値など

## 🙏 謝辞 (Acknowledgments)
このリリースにご協力いただいた全ての方に感謝いたします。

**Full Changelog**: https://github.com/ksyunnnn/claude/compare/v1.0.0...v1.2.0
```

## バージョン例

### v1.1.0の実例（参考）
```bash
git commit -m "AppleスタイルのフラットデザインfaviconとADRシステムを追加

- Next.js ImageResponseでプログラマティックなfavicon生成
- ダブルシェブロン(>>)のミニマルデザイン
- アーキテクチャ決定記録(ADR)システムの導入
- デザインとバージョン管理のドキュメント整備"

git tag -a v1.1.0 -m "Apple-style flat design favicon with ADR system"
git push origin main --tags
```

## トラブルシューティング

### タグを間違えて作成した場合
```bash
# ローカルのタグを削除
git tag -d v1.2.0

# リモートのタグも削除（プッシュ済みの場合）
git push origin :refs/tags/v1.2.0

# 正しいタグを再作成
git tag -a v1.2.0 -m "Correct message"
git push origin --tags
```

### コミットメッセージを修正したい場合
```bash
# まだプッシュしていない場合のみ
git commit --amend -m "修正されたメッセージ"
```

### リリースノートを後から編集
GitHubのReleasesページで該当するリリースの「Edit release」から編集可能

## 自動化の計画

将来的には以下の自動化を検討：
- GitHub Actionsでのタグプッシュ時自動リリース作成
- Conventional Commitsによるリリースノート自動生成
- セマンティックリリースツールの導入

## 関連ドキュメント

- [ADR-0003: GitHub Releasesを使用したリリースプロセス](docs/adr/0003-release-process.md)
- [ADR-0002: バージョン管理手法の採用](docs/adr/0002-version-management.md)
- [GitHub Releases テンプレート](.github/release-template.md)