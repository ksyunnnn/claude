---
description: Issue駆動型タスク実行フレームワーク - GitHubのissueから作業を特定し、対話的に実行します
argument-hint: [issue_number] [--repo owner/repo] [--auto-confirm]
allowed-tools: Bash(*), TodoWrite, TodoRead
---

Issue駆動型タスク実行フレームワークを実行します。

## 使用方法

- `/issue-task` - 対話的にissue選択
- `/issue-task 10` - Issue #10を処理
- `/issue-task 10 --repo ksyunnnn/claude` - 特定リポジトリのIssue #10を処理
- `/issue-task 10 --auto-confirm` - 確認をスキップして自動実行

## 実行ステップ

1. **タスクの特定**: GitHubから対象issueを取得・確認
2. **実行計画の合意**: 作業内容を要約し、実行確認を取る
3. **タスクの実行**: 必要な作業をTodoListで管理しながら実行
4. **完了処理**: Issueをクローズし、実行結果を記録
5. **通知送信**: 実行完了を通知（開始・終了時刻含む）

このフレームワークにより、issue駆動の作業が標準化され、トレーサビリティと品質が向上します。

Arguments: $ARGUMENTS