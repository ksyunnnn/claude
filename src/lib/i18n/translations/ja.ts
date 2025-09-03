import type { Translation } from '../types';

export const ja = {
  metadata: {
    title: "Slash Commands - カスタムSlashコマンドを共有",
    description: "Claude Code用のカスタムSlashコマンドを共有・発見",
    siteName: "Slash Commands"
  },
  nav: {
    logo: "Slash Commands",
    newCommand: "新しいコマンド",
    myCommands: "マイコマンド",
    settings: "設定",
    githubRepository: "GitHub Repository"
  },
  home: {
    title: "あなたのClaude Codeコマンドを共有しよう",
    description: "Claude Code用のカスタムSlashコマンドを発見・共有できます。コミュニティが作成したコマンドで開発ワークフローを向上させましょう。"
  },
  auth: {
    signInWithGitHub: "GitHubでサインイン",
    signOut: "サインアウト",
    freeToJoin: "無料で参加 • 1分以内で完了"
  },
  notFound: {
    title: "ページが見つかりません",
    description: "お探しのコマンドは存在しないか、移動されました。",
    backToHome: "ホームに戻る",
    browseCommands: "コマンドを参照",
    lookingForSomething: "特定のコマンドをお探しですか？",
    createNewCommand: "新しいコマンドを作成"
  },
  newCommand: {
    title: "新しいコマンドを作成",
    backToHome: "ホームに戻る"
  },
  form: {
    commandName: "コマンド名",
    commandNamePlaceholder: "例: create-react-component",
    description: "説明（オプション）",
    descriptionPlaceholder: "このコマンドの簡単な説明",
    commandContent: "コマンド内容",
    contentPlaceholder: "コマンド内容をこちらに貼り付けてください...",
    urlPreview: "URLに使用されます: /{username}/{slug}",
    makePublic: "このコマンドを公開する",
    creating: "作成中...",
    create: "コマンドを作成",
    cancel: "キャンセル",
    saving: "保存中...",
    saveChanges: "変更を保存",
    deleteCommand: "コマンドを削除"
  },
  settings: {
    title: "設定",
    profile: "プロフィール",
    language: "言語設定",
    languagePreference: "言語設定",
    languageDescription: "インターフェースの言語を選択してください",
    account: "アカウント",
    signOutAction: "サインアウト",
    signOutDescription: "アカウントからサインアウトする"
  },
  profile: {
    username: "ユーザー名",
    usernamePlaceholder: "ksyunnnn",
    usernameHelp: "プロフィールURLに使用されます（例: /{username}）",
    fullName: "氏名",
    fullNamePlaceholder: "田中太郎",
    anonymousUser: "匿名ユーザー",
    followers: "フォロワー",
    follower: "フォロワー",
    following: "フォロー中",
    commands: "コマンド",
    noCommands: "まだコマンドがありません"
  },
  followPage: {
    backToProfile: "← プロフィールに戻る",
    followingCount: "{count}人をフォロー中",
    followersCount: "{count}人のフォロワー",
    notFollowingAnyone: "まだ誰もフォローしていません",
    noFollowers: "まだフォロワーはいません"
  },
  command: {
    backToCommands: "{username}のコマンドに戻る",
    by: "作成者:",
    edit: "編集",
    content: "コマンド内容",
    howToUse: "使用方法",
    instruction1: "上記のコマンド内容をコピーしてください",
    instruction2: ".claude/commandsディレクトリに{filename}というファイルを作成してください",
    instruction3: "内容を貼り付けてファイルを保存してください",
    instruction4: "Claude Codeで/{commandName}を使用してこのコマンドを実行してください",
    backToCommand: "コマンドに戻る"
  },
  editCommand: {
    title: "コマンドを編集"
  },
  actions: {
    copy: "コピー",
    copied: "コピーしました！",
    follow: "フォロー",
    following: "フォロー中",
    likeCommand: "このコマンドをいいね（{count}いいね）",
    unlikeCommand: "このコマンドのいいねを取り消し（{count}いいね）",
    signInToLike: "サインインしてコマンドにいいね"
  },
  modal: {
    signInToLike: "サインインしてコマンドにいいね",
    signInToLikeDesc: "コミュニティに参加して素晴らしいコマンドに感謝を示し、パーソナライズされたコンテンツを発見しましょう。",
    signInToFollow: "サインインしてユーザーをフォロー",
    signInToFollowDesc: "ユーザーをフォローして最新のコマンドを確認し、ネットワークを構築しましょう。",
    signInToCreate: "サインインしてコマンドを作成",
    signInToCreateDesc: "あなた自身のコマンドをコミュニティで共有し、他の人の学習を支援しましょう。",
    signInRequired: "サインインが必要です",
    signInRequiredDesc: "この機能にアクセスするにはサインインしてください。",
    maybeLater: "後で",
    likedBy: "いいねしたユーザー",
    likes: "いいね",
    like: "いいね",
    noLikes: "まだいいねがありません"
  },
  empty: {
    noCommands: "コマンドがありません",
    noCommandsCreate: "コマンドがまだありません。最初の投稿者になりませんか！",
    noLikes: "まだいいねがありません"
  },
  messages: {
    duplicateCommand: "この名前のコマンドが既に存在します",
    createFailed: "コマンドの作成に失敗しました",
    usernameTooShort: "ユーザー名は3-20文字である必要があります",
    updateUsernameFailed: "ユーザー名の更新に失敗しました",
    updateProfileFailed: "プロフィールの更新に失敗しました",
    profileUpdated: "プロフィールが正常に更新されました！",
    commandUpdated: "コマンドが正常に更新されました",
    updateCommandFailed: "コマンドの更新に失敗しました",
    deleteConfirm: "このコマンドを削除してもよろしいですか？この操作は元に戻せません。",
    commandDeleted: "コマンドが正常に削除されました",
    deleteCommandFailed: "コマンドの削除に失敗しました",
    likeError: "いいね機能が一時的に利用できません",
    likeErrorDesc: "しばらくしてから再度お試しください"
  },
  common: {
    noDate: "日付なし",
    userNotFound: "ユーザーが見つかりません",
    commandNotFound: "コマンドが見つかりません",
    anonymousUser: "匿名ユーザー",
    backToHome: "ホームに戻る",
    languageSwitching: "言語切り替え中...",
    languageSwitchingDesc: "しばらくお待ちください"
  }
} as const satisfies Translation;