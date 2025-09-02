#!/bin/bash

# 音声ファイルを生成するスクリプト
mkdir -p public

# ナレーション1
say -v Kyoko -o public/narration-1.aiff "Command Shareへようこそ。コマンドラインの知識を共有する新しいプラットフォームです。"

# ナレーション2
say -v Kyoko -o public/narration-2.aiff "主な機能をご紹介します。コマンドの共有、フォロー機能、高速検索、そしてGitHub認証による安全なログインが可能です。"

# ナレーション3
say -v Kyoko -o public/narration-3.aiff "実際の使用例をご覧ください。このように、コマンドとその説明を簡単に共有できます。"

# ナレーション4
say -v Kyoko -o public/narration-4.aiff "今すぐcommand-share.appにアクセスして、あなたの知識を共有しましょう。"

echo "音声ファイルの生成が完了しました。"