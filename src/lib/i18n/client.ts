'use client';

import { useTranslations, useLocale } from 'next-intl';

// 現在のロケール取得
export { useLocale };

// よく使用される翻訳の簡潔なフック
export const useNavTranslations = () => useTranslations('nav');
export const useHomeTranslations = () => useTranslations('home');
export const useAuthTranslations = () => useTranslations('auth');
export const useNewCommandTranslations = () => useTranslations('newCommand');
export const useFormTranslations = () => useTranslations('form');
export const useSettingsTranslations = () => useTranslations('settings');
export const useProfileTranslations = () => useTranslations('profile');
export const useCommandTranslations = () => useTranslations('command');
export const useActionsTranslations = () => useTranslations('actions');
export const useModalTranslations = () => useTranslations('modal');
export const useMessagesTranslations = () => useTranslations('messages');
export const useCommonTranslations = () => useTranslations('common');