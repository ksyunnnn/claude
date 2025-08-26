# Claude Commands

Claude Codeのカスタムスラッシュコマンドを共有・管理するWebアプリケーション

## 概要

Claude Commandsは、開発者がClaude Code用のカスタムスラッシュコマンドを簡単に共有・発見できるプラットフォームです。GitHubアカウントでログインし、自分のコマンドを投稿したり、他のユーザーが作成したコマンドを利用できます。

## 主な機能

- 🔐 GitHub OAuthによる認証
- 📝 カスタムコマンドの作成・編集・削除
- 🔒 公開/非公開設定
- 📋 ワンクリックでコマンドをコピー
- 👤 ユーザープロファイル管理
- 🎨 モダンなUI（shadcn/ui使用）

## 技術スタック

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Supabase
- **Authentication**: Supabase Auth (GitHub OAuth)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Testing**: Playwright
- **Deployment**: Vercel

## セットアップ

### 前提条件

- Node.js 18以上
- npm または yarn
- Supabaseアカウント
- GitHubアカウント（OAuth用）

### 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabaseのセットアップ

1. Supabaseダッシュボードで新しいプロジェクトを作成

2. SQLエディタで`supabase/migrations/001_initial_schema.sql`の内容を実行

3. Authentication > Providers > GitHubを有効化し、以下を設定：
   - Client ID: GitHubで取得したOAuth App ID
   - Client Secret: GitHubで取得したOAuth App Secret
   - Redirect URL: `https://your-project.supabase.co/auth/v1/callback`

### インストールと起動

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# 本番サーバーの起動
npm start
```

## 開発

### ディレクトリ構造

```
src/
├── app/                    # Next.js App Router
│   ├── [userId]/          # ユーザーページ
│   ├── new/               # 新規コマンド作成
│   ├── settings/          # 設定画面
│   └── ...
├── components/            # UIコンポーネント
├── lib/                   # ユーティリティ
├── types/                 # 型定義
└── temp/                  # 一時ファイル（Git管理外）
```

### コマンド

```bash
# 開発サーバー（Turbopack使用）
npm run dev

# コード品質チェック
npm run lint

# ビルド
npm run build

# E2Eテスト
npm run test:e2e

# E2Eテスト（UI付き）
npm run test:e2e:ui
```

## 使い方

1. GitHubアカウントでログイン
2. 「New Command」ボタンからコマンドを作成
3. コマンド名、説明、内容を入力
4. 公開/非公開を選択して保存
5. 作成したコマンドは`/{userId}/{command-slug}`でアクセス可能
6. 他のユーザーはコマンドをコピーして`.claude/commands`に配置して使用

## デプロイ

Vercelを使用したデプロイ：

1. Vercelにプロジェクトをインポート
2. 環境変数を設定
3. デプロイ

## ライセンス

MIT