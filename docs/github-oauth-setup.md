# GitHub OAuth App設定ガイド

ローカル開発環境でGitHub認証を使用するための設定手順です。

## 1. GitHub OAuth Appの作成

1. GitHubにログインし、以下のURLにアクセス:
   https://github.com/settings/developers

2. 左側のメニューから「OAuth Apps」を選択

3. 「New OAuth App」ボタンをクリック

4. 以下の情報を入力:

   ### ローカル開発環境用の設定値
   
   - **Application name**: `Claude Commands (Local)`
   - **Homepage URL**: `http://localhost:3000`
   - **Application description**: （任意）Local development environment
   - **Authorization callback URL**: `http://127.0.0.1:54321/auth/v1/callback`

   ⚠️ **重要**: Authorization callback URLは必ず上記の通り設定してください。
   これはSupabase Auth APIのエンドポイントです。`127.0.0.1`（localhostではない）を使用する必要があります。

5. 「Register application」をクリック

## 2. Client IDとClient Secretの取得

1. 作成されたOAuth Appのページで以下を確認:
   - **Client ID**: 自動的に表示される（例: `Ov23liABCDEF123456`）
   
2. Client Secretを生成:
   - 「Generate a new client secret」ボタンをクリック
   - 生成されたSecretをコピー（一度しか表示されません！）

## 3. 環境変数の設定

1. プロジェクトルートの`.env.local`ファイルを開く

2. 以下の環境変数を追加:

```bash
# GitHub OAuth - Local Development
SUPABASE_AUTH_EXTERNAL_GITHUB_CLIENT_ID=your_client_id_here
SUPABASE_AUTH_EXTERNAL_GITHUB_SECRET=your_client_secret_here
```

3. `your_client_id_here`と`your_client_secret_here`を実際の値に置き換える

## 4. Supabaseの再起動

環境変数を設定した後、Supabaseを再起動して設定を反映させます:

```bash
npm run db:stop
npm run db:start
```

## 5. 動作確認

1. `npm run dev`でNext.jsアプリケーションを起動
2. ブラウザで http://localhost:3000 にアクセス
3. 「Sign in with GitHub」ボタンをクリック
4. GitHubの認証ページにリダイレクトされることを確認

## トラブルシューティング

### エラー: "Redirect URI mismatch"
- GitHub OAuth Appの設定で、Authorization callback URLが正確に設定されているか確認
- URLは完全一致する必要があります（末尾のスラッシュも含む）

### エラー: "Invalid client_id"
- 環境変数が正しく設定されているか確認
- Supabaseを再起動したか確認

### 環境変数が認識されない場合
- `.env.local`ファイルが正しい場所にあるか確認
- ファイル名が正確か確認（`.env`ではなく`.env.local`）
- Supabaseとアプリケーションを両方再起動

## セキュリティに関する注意事項

- **Client Secret**は絶対にGitにコミットしないでください
- `.env.local`ファイルは`.gitignore`に含まれていることを確認
- 本番環境では別のOAuth Appを作成し、異なるClient ID/Secretを使用してください