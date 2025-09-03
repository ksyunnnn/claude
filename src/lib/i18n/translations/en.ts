import type { Translation } from '../types';

export const en = {
  metadata: {
    title: "Slash Commands - Share Custom Slash Commands",
    description: "Share and discover custom slash commands for Claude Code",
    siteName: "Slash Commands"
  },
  nav: {
    logo: "Slash Commands",
    newCommand: "New Command",
    myCommands: "My Commands",
    settings: "Settings",
    githubRepository: "GitHub Repository"
  },
  home: {
    title: "Share Your Claude Code Commands",
    description: "Discover and share custom slash commands for Claude Code. Enhance your development workflow with community-created commands."
  },
  auth: {
    signInWithGitHub: "Sign in with GitHub",
    signOut: "Sign out",
    freeToJoin: "Free to join • Takes less than a minute"
  },
  notFound: {
    title: "Page Not Found",
    description: "The command you're looking for doesn't exist or has been moved.",
    backToHome: "Back to Home",
    browseCommands: "Browse Commands",
    lookingForSomething: "Looking for something specific?",
    createNewCommand: "Create a new command"
  },
  newCommand: {
    title: "Create New Command",
    backToHome: "Back to home"
  },
  form: {
    commandName: "Command Name",
    commandNamePlaceholder: "e.g., create-react-component",
    description: "Description (Optional)",
    descriptionPlaceholder: "Brief description of what this command does",
    commandContent: "Command Content",
    contentPlaceholder: "Paste your command content here...",
    urlPreview: "This will be used in the URL as: /{username}/{slug}",
    makePublic: "Make this command public",
    creating: "Creating...",
    create: "Create Command",
    cancel: "Cancel",
    saving: "Saving...",
    saveChanges: "Save Changes",
    deleteCommand: "Delete Command"
  },
  settings: {
    title: "Settings",
    profile: "Profile",
    language: "Language",
    languagePreference: "Language Preference",
    languageDescription: "Choose your preferred language for the interface",
    account: "Account",
    signOutAction: "Sign out",
    signOutDescription: "Sign out of your account"
  },
  profile: {
    username: "Username",
    usernamePlaceholder: "ksyunnnn",
    usernameHelp: "This will be used in your profile URL (e.g., /{username})",
    fullName: "Full Name",
    fullNamePlaceholder: "John Doe",
    anonymousUser: "Anonymous User",
    followers: "followers",
    follower: "follower",
    following: "following",
    commands: "Commands",
    noCommands: "No commands yet"
  },
  followPage: {
    backToProfile: "← Back to profile",
    followingCount: "Following {count} users",
    followersCount: "{count} followers",
    notFollowingAnyone: "Not following anyone yet",
    noFollowers: "No followers yet"
  },
  command: {
    backToCommands: "Back to {username}'s commands",
    by: "by",
    edit: "Edit",
    content: "Command Content",
    howToUse: "How to use",
    instruction1: "Copy the command content above",
    instruction2: "Create a file named {filename} in your .claude/commands directory",
    instruction3: "Paste the content and save the file",
    instruction4: "Use /{commandName} in Claude Code to run this command",
    backToCommand: "Back to command"
  },
  editCommand: {
    title: "Edit Command"
  },
  actions: {
    copy: "Copy",
    copied: "Copied!",
    follow: "Follow",
    following: "Following",
    likeCommand: "Like this command ({count} likes)",
    unlikeCommand: "Unlike this command ({count} likes)",
    signInToLike: "Sign in to like this command"
  },
  modal: {
    signInToLike: "Sign in to like commands",
    signInToLikeDesc: "Join our community to show appreciation for great commands and discover personalized content.",
    signInToFollow: "Sign in to follow users",
    signInToFollowDesc: "Follow users to see their latest commands and build your network.",
    signInToCreate: "Sign in to create commands",
    signInToCreateDesc: "Share your own commands with the community and help others learn.",
    signInRequired: "Sign in required",
    signInRequiredDesc: "Please sign in to access this feature.",
    maybeLater: "Maybe later",
    likedBy: "Liked by",
    likes: "likes",
    like: "like",
    noLikes: "No likes yet"
  },
  empty: {
    noCommands: "No commands yet",
    noCommandsCreate: "No commands yet. Be the first to share!",
    noLikes: "No likes yet"
  },
  messages: {
    duplicateCommand: "You already have a command with this name",
    createFailed: "Failed to create command",
    usernameTooShort: "Username must be 3-20 characters",
    updateUsernameFailed: "Failed to update username",
    updateProfileFailed: "Failed to update profile",
    profileUpdated: "Profile updated successfully!",
    commandUpdated: "Command updated successfully",
    updateCommandFailed: "Failed to update command",
    deleteConfirm: "Are you sure you want to delete this command? This action cannot be undone.",
    commandDeleted: "Command deleted successfully",
    deleteCommandFailed: "Failed to delete command",
    likeError: "Like feature is temporarily unavailable",
    likeErrorDesc: "Please try again later"
  },
  common: {
    noDate: "No date",
    userNotFound: "User Not Found",
    commandNotFound: "Command Not Found",
    anonymousUser: "Anonymous User",
    backToHome: "Back to home",
    languageSwitching: "Switching language...",
    languageSwitchingDesc: "Please wait a moment"
  }
} as const satisfies Translation;