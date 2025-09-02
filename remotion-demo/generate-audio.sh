#!/bin/bash

# 音声ファイルを生成するスクリプト - 60秒ハッカソン版
mkdir -p public

# ハッカソン版音声（60秒版）
say -v Kyoko -o public/hackathon-1.aiff "こんにちは、登壇者のこばしゅんは帰ってしまったので、代わりにこの動画が発表します。"
say -v Kyoko -o public/hackathon-2.aiff "Claude Codeのカスタムスラッシュコマンドを共有するWebサービスを、Claude Code自身と協業で開発しました。"
say -v Kyoko -o public/hackathon-3.aiff "Next.js 15とSupabaseによる最新フルスタック構成で、GitHub認証、リアルタイム共有、フォロー機能を実装。"
say -v Kyoko -o public/hackathon-4.aiff "総開発コード15,000行、47回のコミット、全て人間とAIの協業で実現。革新的な開発手法を確立しました。"
say -v Kyoko -o public/hackathon-5.aiff "slash-commands.comで今すぐ体験できます。この動画もClaude Codeが生成しています。"

# AIFF -> WAV変換（afconvert使用）
for file in public/hackathon-*.aiff; do
    base=$(basename "$file" .aiff)
    afconvert -f WAVE -d LEI16 "$file" "public/${base}.wav"
done

echo "音声ファイルの生成が完了しました。"