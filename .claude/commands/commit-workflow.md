# 変更確認→適切な粒度でコミット→プッシュ ワークフロー

変更内容を分析し、適切な粒度でコミットを作成してプッシュするワークフローです。

## 使用方法

```bash
# ワークフロー実行
/commit-workflow
```

## ワークフロー実装

### Phase 1: 現状把握

```bash
echo "=== Phase 1: 現状把握 ==="
echo ""

echo "📊 変更状況の全体確認"
echo "------------------------"

echo "🔍 ファイル変更状況:"
git status --porcelain | head -20

echo ""
echo "📈 ステージング状況:"
git status -s

echo ""
echo "📝 具体的な変更内容:"
git diff --stat

echo ""
echo "📚 最近のコミット履歴:"
git log --oneline -5

echo ""
read -p "詳細な diff を確認しますか? (y/N): " show_diff
if [[ $show_diff =~ ^[Yy]$ ]]; then
    git diff
fi
```

### Phase 2: 変更内容の分析・分類

```bash
echo ""
echo "=== Phase 2: 変更内容の分析・分類 ==="
echo ""

# 変更されたファイルを分類
echo "📁 変更ファイルの分類:"
echo "------------------------"

# ドキュメント系
DOC_FILES=$(git status --porcelain | grep -E '\.(md|txt|rst)$' | awk '{print $2}')
if [[ -n "$DOC_FILES" ]]; then
    echo "📖 ドキュメント:"
    echo "$DOC_FILES" | sed 's/^/  - /'
fi

# ソースコード系
CODE_FILES=$(git status --porcelain | grep -E '\.(ts|tsx|js|jsx|py|go|rs|java|c|cpp)$' | awk '{print $2}')
if [[ -n "$CODE_FILES" ]]; then
    echo "💻 ソースコード:"
    echo "$CODE_FILES" | sed 's/^/  - /'
fi

# 設定系
CONFIG_FILES=$(git status --porcelain | grep -E '\.(json|yaml|yml|toml|ini|env)$' | awk '{print $2}')
if [[ -n "$CONFIG_FILES" ]]; then
    echo "⚙️ 設定ファイル:"
    echo "$CONFIG_FILES" | sed 's/^/  - /'
fi

# その他
OTHER_FILES=$(git status --porcelain | grep -vE '\.(md|txt|rst|ts|tsx|js|jsx|py|go|rs|java|c|cpp|json|yaml|yml|toml|ini|env)$' | awk '{print $2}')
if [[ -n "$OTHER_FILES" ]]; then
    echo "📦 その他:"
    echo "$OTHER_FILES" | sed 's/^/  - /'
fi

echo ""
echo "💡 推奨コミット戦略:"
echo "- 機能実装とドキュメントは分離"
echo "- 設定変更は独立したコミット"
echo "- 関連する変更はグループ化"
```

### Phase 3: 適切な粒度でのコミット作成

```bash
echo ""
echo "=== Phase 3: コミット作成 ==="
echo ""

commit_count=1

while true; do
    echo "📝 コミット #$commit_count の作成"
    echo "------------------------"
    
    echo "未ステージングファイル:"
    git status --porcelain | grep -E '^( M| A|??|\?\?)' | sed 's/^/  /'
    
    echo ""
    read -p "追加するファイルを入力 (例: file1.ts file2.md) または 'done' で終了: " files
    
    if [[ "$files" == "done" ]]; then
        break
    fi
    
    if [[ -n "$files" ]]; then
        echo "📎 ファイルを追加: $files"
        git add $files
        
        echo ""
        echo "ステージングされた変更:"
        git diff --cached --stat
        
        echo ""
        read -p "コミットメッセージのプレフィックス (feat/fix/docs/refactor等): " prefix
        read -p "コミットメッセージの本文: " message
        
        COMMIT_MSG=$(cat <<EOF
$prefix: $message

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)
        
        echo ""
        echo "作成予定のコミットメッセージ:"
        echo "------------------------"
        echo "$COMMIT_MSG"
        echo "------------------------"
        
        read -p "このコミットを作成しますか? (y/N): " confirm
        if [[ $confirm =~ ^[Yy]$ ]]; then
            git commit -m "$COMMIT_MSG"
            echo "✅ コミット #$commit_count 作成完了"
            ((commit_count++))
        else
            git reset
            echo "❌ コミット作成をキャンセル"
        fi
    fi
    
    echo ""
done
```

### Phase 4: リモート反映

```bash
echo ""
echo "=== Phase 4: リモート反映 ==="
echo ""

CURRENT_BRANCH=$(git branch --show-current)
echo "🌿 現在のブランチ: $CURRENT_BRANCH"

echo ""
echo "📤 作成されたコミット:"
git log --oneline -$((commit_count-1))

echo ""
read -p "リモートにプッシュしますか? (y/N): " push_confirm

if [[ $push_confirm =~ ^[Yy]$ ]]; then
    echo "🚀 プッシュ中..."
    git push origin "$CURRENT_BRANCH"
    
    if [[ $? -eq 0 ]]; then
        echo "✅ プッシュ完了"
        
        # 通知送信（グローバル設定に従って）
        if command -v terminal-notifier &> /dev/null; then
            terminal-notifier -title "Claude Code" \
                -subtitle "Git操作完了" \
                -message "$(($commit_count-1))個のコミットを作成してプッシュしました
完了: $(date '+%H:%M:%S')" \
                -sound default
        fi
    else
        echo "❌ プッシュに失敗しました"
    fi
else
    echo "📝 プッシュはスキップされました"
    echo "手動でプッシュする場合: git push origin $CURRENT_BRANCH"
fi

echo ""
echo "🎉 ワークフロー完了"
```

## 実行権限の設定

```bash
# 実行権限は不要（markdown形式のため）
# 使用時は内容をコピーして実行
```