// Language preference utilities
export type SupportedLanguage = 'en' | 'tr';

const LANGUAGE_STORAGE_KEY = 'language';
const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

/**
 * Get saved language preference from localStorage
 */
export function getSavedLanguage(): SupportedLanguage {
  try {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === 'en' || saved === 'tr') {
        return saved;
      }
    }
  } catch (error) {
    console.warn('Failed to read language from localStorage:', error);
  }
  return DEFAULT_LANGUAGE;
}

/**
 * Save language preference to localStorage
 */
export function saveLanguage(language: SupportedLanguage): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    }
  } catch (error) {
    console.warn('Failed to save language to localStorage:', error);
  }
}

/**
 * Check if a string is a valid supported language
 */
export function isValidLanguage(lang: string): lang is SupportedLanguage {
  return lang === 'en' || lang === 'tr';
}
