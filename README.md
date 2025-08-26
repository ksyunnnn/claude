# Claude Commands

Claude Codeのカスタムスラッシュコマンドを共有・管理するWebアプリケーション

## 概要

Claude Commandsは、開発者がClaude Code用のカスタムスラッシュコマンドを簡単に共有・発見できるプラットフォームです。GitHubアカウントでログインし、自分のコマンドを投稿したり、他のユーザーが作成したコマンドを利用できます。

## 主な機能

- 🔐 **GitHub OAuthによる認証**: Supabase Authを使用したセキュアなGitHub OAuth認証
- 📝 **カスタムコマンドの作成・編集・削除**: リッチなフォームでコマンドを管理
- 🔒 **公開/非公開設定**: コマンドの可視性を細かく制御
- 📋 **ワンクリックでコマンドをコピー**: クリップボードAPIを活用した快適なUX
- 👤 **ユーザープロファイル管理**: カスタムユーザー名・フルネーム設定機能
- 🌐 **ユーザー名ベースのURL**: カスタマイズ可能な美しいURL（例: `/ksyunnnn/following`）
- 👥 **フォロー機能**: ユーザー同士のつながりとコミュニティ形成
- 🎨 **モダンなUI**: shadcn/ui、Tailwind CSS v4による洗練されたデザイン
- 📱 **レスポンシブデザイン**: モバイル・デスクトップ両対応

## 技術スタック

### フロントエンド
- **Framework**: Next.js 15 (App Router) - 最新のReact Server Components使用
- **Language**: TypeScript 5 - 厳密な型チェックによる開発品質向上
- **Styling**: Tailwind CSS v4 - ユーティリティファーストなCSS
- **UI Components**: shadcn/ui - Radix UIベースのアクセシブルなコンポーネント

### バックエンド・インフラ
- **Database**: Supabase (PostgreSQL) - RLS（Row Level Security）によるセキュア設計
- **Authentication**: Supabase Auth (GitHub OAuth) - セッション管理とセキュリティ
- **Deployment**: Vercel - Next.js最適化デプロイメント

### 開発・品質管理
- **Testing**: Playwright - E2Eテスト自動化
- **Linting**: ESLint - Next.js推奨設定
- **Build Tool**: Turbopack - 高速な開発体験

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

2. SQLエディタで以下のマイグレーションファイルを順番に実行：
   - `supabase/migrations/001_initial_schema.sql` - 基本スキーマとRLS設定
   - `supabase/migrations/002_fix_rls_policies.sql` - RLSポリシーの修正
   - `supabase/migrations/003_create_follows_table.sql` - フォロー機能のテーブル設計

3. Authentication > Providers > GitHubを有効化し、以下を設定：
   - Client ID: GitHubで取得したOAuth App ID
   - Client Secret: GitHubで取得したOAuth App Secret
   - Redirect URL: `https://your-project.supabase.co/auth/v1/callback`

### データベース設計について

本プロジェクトでは、セキュリティと拡張性を重視したデータベース設計を採用しています：

- **RLS（Row Level Security）**: 全テーブルでRLSを有効化し、適切なポリシーを設定
- **ユニーク制約**: usernameカラムにユニーク制約を設定し、美しいURL実現
- **関数・インデックス最適化**: フォロワー数取得やフォロー関係チェック用の最適化された関数
- **参照整合性**: 外部キー制約による堅牢なデータ整合性保証

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
├── app/                         # Next.js App Router
│   ├── [username]/             # ユーザー名ベースの動的ルート
│   │   ├── [commandSlug]/      # コマンド詳細・編集ページ
│   │   ├── followers/          # フォロワーページ
│   │   ├── following/          # フォロー中ページ
│   │   └── page.tsx           # ユーザープロフィールページ
│   ├── auth/                   # 認証関連
│   │   └── callback/          # OAuth認証コールバック
│   ├── new/                    # 新規コマンド作成
│   ├── settings/               # ユーザー設定
│   │   ├── page.tsx           # 設定ページ
│   │   └── profile-form.tsx   # プロフィール編集フォーム
│   ├── layout.tsx              # ルートレイアウト
│   └── page.tsx                # ホームページ
├── components/                  # 再利用可能なUIコンポーネント
│   ├── ui/                     # shadcn/uiコンポーネント
│   ├── command-actions.tsx     # コマンドアクションボタン
│   └── edit-command-form.tsx   # コマンド編集フォーム
├── lib/                        # ユーティリティ・設定
│   ├── actions/               # Server Actions
│   │   ├── follow-actions.ts  # フォロー機能のアクション
│   │   └── profile-actions.ts # プロフィール更新アクション
│   ├── supabase/              # Supabaseクライアント設定
│   └── user-utils.ts          # ユーザー関連ヘルパー関数
└── supabase/                   # データベース関連
    └── migrations/             # SQLマイグレーションファイル
```

### アーキテクチャの特徴

#### ユーザー名ベースルーティング
- **実装理由**: UUIDベースのURLは可読性が低く、ユーザー体験を損なうため
- **技術的解決策**: `getUserByUsername`ヘルパー関数でユーザー名→IDの解決を実装
- **パフォーマンス**: データベースのユニーク制約とインデックスで高速検索保証
- **後方互換性**: ID・ユーザー名両方をサポートする柔軟な設計

#### Server Actions活用
- **実装理由**: クライアント・サーバー間の型安全性とパフォーマンス最適化
- **セキュリティ**: サーバーサイドでの認証・バリデーション実行
- **リアクティブ更新**: `revalidatePath`によるキャッシュ最適化

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

### 基本的な使い方

1. **ログイン**: GitHubアカウントでログイン
2. **プロフィール設定**: `/settings`でユーザー名とフルネームを設定（美しいURL生成のため）
3. **コマンド作成**: 「New Command」ボタンからコマンドを作成
4. **コマンド設定**: コマンド名、説明、内容を入力し、公開/非公開を選択
5. **共有**: 作成したコマンドは`/{username}/{command-slug}`でアクセス可能
6. **利用**: 他のユーザーはコマンドをコピーして`.claude/commands`に配置して使用

### URL構造の説明

- **ユーザープロフィール**: `/{username}` (例: `/ksyunnnn`)
- **フォロワー**: `/{username}/followers`
- **フォロー中**: `/{username}/following`
- **コマンド詳細**: `/{username}/{command-slug}`
- **コマンド編集**: `/{username}/{command-slug}/edit`（所有者のみ）

### 実装済み機能

#### 認証・プロフィール管理
- GitHub OAuthログイン
- カスタムユーザー名設定（3-20文字、英数字とアンダースコア・ハイフン）
- フルネーム設定
- プロフィール更新

#### コマンド管理
- コマンド作成・編集・削除
- Slugによる美しいURL生成
- 公開/非公開設定
- ワンクリックコピー機能

#### ソーシャル機能
- ユーザーフォロー・アンフォロー機能
- フォロワー・フォロー中一覧表示
- フォロワー数・フォロー数表示

## 技術的な実装詳細

### 主要な実装判断と根拠

#### 1. ユーザー名ベースルーティングの実装

**課題**: 従来のUUIDベースURL（例: `/a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6/following`）は可読性が低い

**解決策**: カスタムユーザー名による美しいURL実現
```typescript
// /src/lib/user-utils.ts
export async function getUserByUsername(username: string) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()
  return profile
}

export function isValidUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9][a-zA-Z0-9_-]{2,19}$/
  return usernameRegex.test(username)
}
```

**技術的根拠**:
- データベースレベルでのユニーク制約保証
- 正規表現による厳密なバリデーション
- パフォーマンス最適化されたインデックス

#### 2. Server Actions による状態管理

**課題**: 従来のクライアントサイド状態管理では、型安全性とセキュリティに課題

**解決策**: Next.js 15のServer Actions活用
```typescript
// /src/lib/actions/profile-actions.ts
'use server'

export async function updateUsername(username: string) {
  // サーバーサイドでの認証・バリデーション
  // revalidatePath によるキャッシュ最適化
}
```

**技術的根拠**:
- 型安全性の向上
- サーバーサイドでのセキュリティ検証
- 自動キャッシュ無効化

#### 3. Row Level Security（RLS）によるセキュリティ

**実装**: Supabaseの RLS を全テーブルで有効化
```sql
-- フォローテーブルのRLS例
create policy "Users can follow others"
  on public.follows
  for insert
  with check (auth.uid() = follower_id);
```

**技術的根拠**:
- データベースレベルでのアクセス制御
- アプリケーションの脆弱性からの保護
- 監査ログとの統合

### パフォーマンス最適化

#### データベース設計
- **インデックス最適化**: フォロー関係の複合インデックス
- **関数最適化**: `get_follower_count`などの集計関数をPostgreSQL関数として実装
- **RLS最適化**: 必要最小限のポリシーで高速アクセス

#### フロントエンド最適化
- **Turbopack**: 開発時の高速ビルド
- **React Server Components**: サーバーサイドレンダリング最適化
- **動的インポート**: コンポーネントの遅延読み込み

## デプロイ

### Vercelを使用したデプロイ

1. **プロジェクトのインポート**: GitHub連携でVercelにプロジェクトをインポート
2. **環境変数の設定**:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
3. **自動デプロイ**: mainブランチへのpush時に自動デプロイ実行

### 本番環境での注意点

- **Supabase認証設定**: 本番URLでのGitHub OAuth設定
- **RLS ポリシー**: 本番データでのポリシー動作確認
- **パフォーマンス監視**: Vercel Analyticsでの監視設定

## デザインシステム

### ブランドアイデンティティ

Claude Commandsのロゴ・ファビコンは、サービスのコンセプトを表現した独自デザインを採用しています：

- **コンセプト**: コマンドプロンプトの象徴である「>`」をモダンに解釈
- **デザイン手法**: ダブルシェブロン（`>>`）による立体感と奥行き表現
- **スタイル**: Appleライクなフラットデザイン、ミニマリズム
- **カラー**: ダークグレー（#4B5563）による落ち着いた品のある印象

### 技術的実装

#### Next.js ImageResponseによる動的ファビコン生成

静的SVGファイルではなく、Next.js 15のImageResponse APIを使用したプログラマティック生成を採用：

```typescript
// src/app/icon.tsx
import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(/* ダブルシェブロンデザイン */)
}
```

**採用理由**：
- 動的調整可能（色調・サイズ変更が容易）
- Next.js標準機能でメンテナンス性向上
- TypeScriptによる型安全性
- ビルドプロセスとの一体化

**設計決定の詳細**: [ADR-0001: ファビコンデザインの技術選択](docs/adr/0001-favicon-design.md)

## プロジェクト管理

### アーキテクチャ決定記録（ADR）

重要な技術的・設計的決定は [Architecture Decision Records](docs/adr/) で管理しています：

- [ADR-0001: ファビコンデザインの技術選択](docs/adr/0001-favicon-design.md)
- [ADR-0002: バージョン管理手法の採用](docs/adr/0002-version-management.md)

ADRにより、なぜその技術や手法を選択したのかの理由と経緯を将来の開発者が理解できるよう文書化しています。

### バージョン管理

**セマンティックバージョニング**を採用：

- **Major.Minor.Patch** 形式（例：v1.1.0）
- **Major**: 破壊的変更（API変更、データスキーマ変更）
- **Minor**: 新機能追加（後方互換性保持）
- **Patch**: バグ修正、小規模改善

**リリース管理**：

```bash
# Gitタグによるバージョン管理
git tag -a v1.1.0 -m "Add Apple-style flat design favicon"
git push origin v1.1.0

# GitHub Releasesで自動リリースノート生成
```

### 技術決定プロセス

新しい技術的決定は以下のプロセスで管理：

1. **調査・検討**: 複数の選択肢を比較検討
2. **ADR作成**: 決定内容と理由を文書化
3. **レビュー**: 重要な決定はPRでレビュー実施
4. **実装**: 決定に基づく実装実行
5. **追跡**: 決定の結果と影響を継続監視

## 今後の拡張予定

- [ ] コマンド検索・フィルタリング機能
- [ ] タグ・カテゴリ機能
- [ ] コメント・レーティング機能
- [ ] API エンドポイント公開
- [ ] 多言語対応
- [ ] OGP画像の自動生成（ファビコンデザイン連携）

## ライセンス

MIT