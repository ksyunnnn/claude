# 7. ローカルSupabase開発環境とGitHub OAuth対応

Date: 2025-08-29

## Status

Accepted

## Context

本プロジェクトはSupabaseをバックエンドとして使用しているが、これまでクラウド環境のみで開発を行っていた。これにより以下の課題が発生していた：

1. **開発効率の低下**
   - クラウド環境への依存により、オフライン開発が不可能
   - 開発・テスト時にプロダクション環境に影響を与えるリスク
   - APIリクエストの遅延による開発速度の低下

2. **テストの困難さ**
   - E2Eテストでクラウド環境を使用すると、データの競合やクリーンアップが複雑
   - 認証フローのテストが困難（特にOAuth）

3. **コスト管理**
   - 開発・テスト時のAPIリクエストがクラウドコストに影響

また、認証方式としてGitHub OAuthを採用することが決定されたため、その対応も必要となった。

## Decision

以下の方針でローカルSupabase開発環境を構築し、GitHub OAuth認証を実装する：

### 1. Supabase CLIの採用

- Dockerベースのローカル開発環境を提供するSupabase CLIを採用
- バージョン管理可能な設定ファイル（`supabase/config.toml`）で環境を定義

### 2. 開発用npmスクリプトの追加

以下のnpmスクリプトを追加して開発効率を向上：

```json
{
  "db:start": "supabase start",
  "db:stop": "supabase stop",
  "db:status": "supabase status",
  "db:reset": "supabase db reset",
  "db:migrate": "supabase migration new",
  "db:studio": "open http://127.0.0.1:54323",
  "db:mailbox": "open http://127.0.0.1:54324"
}
```

### 3. ローカル環境の構成

- **APIサーバー**: `http://127.0.0.1:54321`
- **PostgreSQLデータベース**: `postgresql://postgres:postgres@127.0.0.1:54322/postgres`
- **Supabase Studio（管理UI）**: `http://127.0.0.1:54323`
- **Inbucket（メールテスト）**: `http://127.0.0.1:54324`

### 4. GitHub OAuth設定

- ローカル開発用とプロダクション用で別々のGitHub OAuth Appを作成
- 環境変数で適切な認証情報を管理
- ドキュメント（`docs/github-oauth-setup.md`）で設定手順を明文化

## Consequences

### ポジティブな影響

1. **開発効率の向上**
   - オフライン開発が可能
   - 高速なAPIレスポンス
   - 独立した開発環境

2. **テストの改善**
   - E2Eテスト用の隔離された環境
   - データベースのリセットが容易
   - 認証フローの完全なテストが可能

3. **コスト削減**
   - 開発・テスト時のクラウドAPI使用量の削減

4. **チーム開発の促進**
   - 統一された開発環境の提供
   - 環境構築の自動化

### ネガティブな影響

1. **初期設定の複雑さ**
   - Docker Desktopのインストールが必要
   - GitHub OAuth Appの設定が必要

2. **メンテナンスコスト**
   - Supabase CLIのバージョン管理
   - マイグレーションファイルの管理

3. **リソース使用**
   - ローカルマシンでDockerコンテナを実行するためのリソース消費

### 今後の対応

1. CI/CDパイプラインでのローカルSupabase環境の活用
2. シードデータの充実化
3. 開発環境セットアップの自動化スクリプトの作成

## References

- [Supabase Local Development](https://supabase.com/docs/guides/cli/local-development)
- [PR #9: feat: ローカルSupabase開発環境の設定とGitHub OAuth対応](https://github.com/ksyunnnn/lt-claude-app/pull/9)
- [Issue #10: [ADR] データベース設計の変更](https://github.com/ksyunnnn/claude/issues/10)