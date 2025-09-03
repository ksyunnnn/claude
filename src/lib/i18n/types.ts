// 翻訳データの型定義
export interface MetadataTranslation {
  title: string;
  description: string;
  siteName: string;
}

export interface NavigationTranslation {
  logo: string;
  newCommand: string;
  myCommands: string;
  settings: string;
  githubRepository: string;
}

export interface HomeTranslation {
  title: string;
  description: string;
}

export interface AuthTranslation {
  signInWithGitHub: string;
  signOut: string;
  freeToJoin: string;
}

export interface NotFoundTranslation {
  title: string;
  description: string;
  backToHome: string;
  browseCommands: string;
  lookingForSomething: string;
  createNewCommand: string;
}

export interface NewCommandTranslation {
  title: string;
  backToHome: string;
}

export interface FormTranslation {
  commandName: string;
  commandNamePlaceholder: string;
  description: string;
  descriptionPlaceholder: string;
  commandContent: string;
  contentPlaceholder: string;
  urlPreview: string;
  makePublic: string;
  creating: string;
  create: string;
  cancel: string;
  saving: string;
  saveChanges: string;
  deleteCommand: string;
}

export interface SettingsTranslation {
  title: string;
  profile: string;
  language: string;
  languagePreference: string;
  languageDescription: string;
  account: string;
  signOutAction: string;
  signOutDescription: string;
}

export interface ProfileTranslation {
  username: string;
  usernamePlaceholder: string;
  usernameHelp: string;
  fullName: string;
  fullNamePlaceholder: string;
  anonymousUser: string;
  followers: string;
  follower: string;
  following: string;
  commands: string;
  noCommands: string;
}

export interface FollowPageTranslation {
  backToProfile: string;
  followingCount: string;
  followersCount: string;
  notFollowingAnyone: string;
  noFollowers: string;
}

export interface CommandTranslation {
  backToCommands: string;
  by: string;
  edit: string;
  content: string;
  howToUse: string;
  instruction1: string;
  instruction2: string;
  instruction3: string;
  instruction4: string;
  backToCommand: string;
}

export interface EditCommandTranslation {
  title: string;
}

export interface ActionsTranslation {
  copy: string;
  copied: string;
  follow: string;
  following: string;
  likeCommand: string;
  unlikeCommand: string;
  signInToLike: string;
}

export interface ModalTranslation {
  signInToLike: string;
  signInToLikeDesc: string;
  signInToFollow: string;
  signInToFollowDesc: string;
  signInToCreate: string;
  signInToCreateDesc: string;
  signInRequired: string;
  signInRequiredDesc: string;
  maybeLater: string;
  likedBy: string;
  likes: string;
  like: string;
  noLikes: string;
}

export interface EmptyTranslation {
  noCommands: string;
  noCommandsCreate: string;
  noLikes: string;
}

export interface MessagesTranslation {
  duplicateCommand: string;
  createFailed: string;
  usernameTooShort: string;
  updateUsernameFailed: string;
  updateProfileFailed: string;
  profileUpdated: string;
  commandUpdated: string;
  updateCommandFailed: string;
  deleteConfirm: string;
  commandDeleted: string;
  deleteCommandFailed: string;
  likeError: string;
  likeErrorDesc: string;
}

export interface CommonTranslation {
  noDate: string;
  userNotFound: string;
  commandNotFound: string;
  anonymousUser: string;
  backToHome: string;
}

// メイン翻訳インターフェース
export interface Translation {
  metadata: MetadataTranslation;
  nav: NavigationTranslation;
  home: HomeTranslation;
  auth: AuthTranslation;
  notFound: NotFoundTranslation;
  newCommand: NewCommandTranslation;
  form: FormTranslation;
  settings: SettingsTranslation;
  profile: ProfileTranslation;
  followPage: FollowPageTranslation;
  command: CommandTranslation;
  editCommand: EditCommandTranslation;
  actions: ActionsTranslation;
  modal: ModalTranslation;
  empty: EmptyTranslation;
  messages: MessagesTranslation;
  common: CommonTranslation;
}