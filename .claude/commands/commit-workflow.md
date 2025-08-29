# Git Commit Workflow

変更内容を確認して適切にコミット・プッシュするワークフロー

## 実行コマンド

```bash
# 現状確認
git status
git diff --stat
git log --oneline -5

# 変更をステージング
git add [ファイル名]

# コミット作成
git commit -m "$(cat <<'EOF'
[prefix]: [message]

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"

# プッシュ
git push origin $(git branch --show-current)

# 通知
terminal-notifier -title "Claude Code" -subtitle "Git操作完了" -message "コミット完了: $(date '+%H:%M:%S')" -sound default
```