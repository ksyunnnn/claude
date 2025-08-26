# Vercel デプロイ手順

このドキュメントでは、Claude Commands を Vercel にデプロイするための詳細な手順を説明します。

## 前提条件

- GitHub リポジトリにプロジェクトがプッシュ済み
- Vercel アカウント
- Supabase プロジェクトのセットアップ完了

## 手順

### 1. Vercel にプロジェクトをインポート

1. [Vercel ダッシュボード](https://vercel.com/dashboard)にログイン
2. "Add New Project" をクリック
3. GitHub アカウントを連携（初回のみ）
4. リポジトリ一覧から `claude` を選択
5. "Import" をクリック

### 2. プロジェクト設定

#### 基本設定
- **Framework Preset**: Next.js （自動検出）
- **Root Directory**: `app` に変更（重要）
- **Build Settings**: デフォルトのまま

#### 環境変数の設定

以下の環境変数を追加：

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx
```

**環境変数の取得方法：**
1. Supabase ダッシュボード → Settings → API
2. Project URL をコピー → `NEXT_PUBLIC_SUPABASE_URL` に設定
3. Project API keys の anon (public) キーをコピー → `NEXT_PUBLIC_SUPABASE_ANON_KEY` に設定

### 3. Supabase の本番設定

#### GitHub OAuth の設定

1. Supabase ダッシュボード → Authentication → Providers → GitHub
2. Redirect URLを本番URLに更新：
   - `https://your-app-name.vercel.app/auth/callback`
   - `https://xxxxxxxxxxxxx.supabase.co/auth/v1/callback`

#### データベースマイグレーション

Supabase の SQL エディタで以下を順番に実行：

1. `/supabase/migrations/001_initial_schema.sql`
2. `/supabase/migrations/002_fix_rls_policies.sql`
3. `/supabase/migrations/003_create_follows_table.sql`

### 4. デプロイ実行

1. すべての設定を確認
2. "Deploy" ボタンをクリック
3. デプロイが完了するまで待機（通常 2-3分）

### 5. デプロイ後の確認

#### 動作確認チェックリスト

- [ ] トップページが正しく表示される
- [ ] GitHub ログインが機能する
- [ ] プロフィール設定（/settings）が開ける
- [ ] コマンドの作成・編集・削除が可能
- [ ] フォロー機能が動作する
- [ ] ユーザー名ベースのURLが機能する

#### トラブルシューティング

**ログインできない場合：**
- Supabase の GitHub OAuth 設定を確認
- Redirect URL が正しく設定されているか確認
- 環境変数が正しく設定されているか確認

**404 エラーが発生する場合：**
- Root Directory が `app` に設定されているか確認
- Dynamic Routes の設定を確認

**データベースエラーが発生する場合：**
- マイグレーションが正しく実行されているか確認
- RLS ポリシーが有効になっているか確認

### 6. カスタムドメインの設定（オプション）

1. Vercel ダッシュボード → Settings → Domains
2. "Add" をクリックしてドメインを追加
3. DNS 設定を更新（A レコードまたは CNAME）
4. SSL 証明書の発行を待つ（自動）

## 運用上の注意事項

### パフォーマンス監視

- Vercel Analytics を有効化して監視
- Web Vitals のスコアを定期的にチェック
- Edge Functions の使用状況を確認

### セキュリティ

- 環境変数は必ず Vercel の環境変数機能を使用
- Supabase の RLS ポリシーを定期的に見直し
- 依存関係の脆弱性チェック（Dependabot）

### バックアップ

- Supabase のデータベースバックアップを定期的に取得
- 重要な設定変更前はスナップショットを作成

## 自動デプロイ設定

GitHub の main ブランチにプッシュすると自動的にデプロイされます。

### ブランチプレビュー

- Pull Request を作成すると自動的にプレビュー環境が作成されます
- プレビュー環境では本番と同じ環境変数が使用されます（注意）

## サポート

問題が発生した場合：

1. Vercel のビルドログを確認
2. Supabase のログを確認
3. GitHub Issues で報告