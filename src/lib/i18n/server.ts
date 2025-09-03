import { getTranslations, getLocale } from 'next-intl/server';

// 現在のロケール取得
export { getLocale };

// よく使用される翻訳の簡潔なエイリアス
export const getNavTranslations = () => getTranslations('nav');
export const getHomeTranslations = () => getTranslations('home');
export const getAuthTranslations = () => getTranslations('auth');
export const getFormTranslations = () => getTranslations('form');
export const getSettingsTranslations = () => getTranslations('settings');
export const getProfileTranslations = () => getTranslations('profile');
export const getCommandTranslations = () => getTranslations('command');
export const getActionsTranslations = () => getTranslations('actions');
export const getModalTranslations = () => getTranslations('modal');
export const getMessagesTranslations = () => getTranslations('messages');
export const getCommonTranslations = () => getTranslations('common');
export const getMetadataTranslations = () => getTranslations('metadata');
export const getEmptyTranslations = () => getTranslations('empty');
export const getNewCommandTranslations = () => getTranslations('newCommand');
export const getEditCommandTranslations = () => getTranslations('editCommand');
export const getFollowPageTranslations = () => getTranslations('followPage');
export const getNotFoundTranslations = () => getTranslations('notFound');