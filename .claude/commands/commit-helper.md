# Commit Helper

変更内容を確認して適切にコミット・プッシュするワークフロー

## 実行手順

1. **対象ファイルを提示**
   `git worktree list`を実行してworktree管理下にあるディレクトリを除外する
   - 除外対象: `git worktree list`で表示されるパス配下のディレクトリ（例: `404/`, `sub/`など）
   - `git add`実行時は除外したディレクトリを避けて個別ファイル指定を推奨

2. **ワークフロー選択**
   新しいブランチを作成してPRを作成しますか？(推奨) [Y/n]:
   ※ユーザーからの回答を必ず待機する

3. **実行コマンド**

### パターンA: ブランチ作成 + PR (推奨)
```bash
# 現状確認・ブランチ作成
git status && git diff --stat
git checkout -b [Claude-generated-branch-name]

# ステージング・コミット（worktree管理ディレクトリは除外）
git add --all --ignore-errors
git reset HEAD -- 404/ sub/ || true
git commit -m "[Claude-generated-message]

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# プッシュ・PR作成
git push -u origin [branch-name]
gh pr create --title "[PR-title]" --body "[PR-description]"

# 通知
terminal-notifier -title "Claude Code" -subtitle "PR作成完了" -message "PR作成: $(date '+%H:%M:%S')" -sound default
```

### パターンB: 直接main
```bash
# 現状確認・ステージング・コミット（worktree管理ディレクトリは除外）
git status && git add --all --ignore-errors
git reset HEAD -- 404/ sub/ || true
git commit -m "[Claude-generated-message]

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# プッシュ・通知
git push origin main
terminal-notifier -title "Claude Code" -subtitle "コミット完了" -message "プッシュ完了: $(date '+%H:%M:%S')" -sound default
```
