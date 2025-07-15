const INTRO_STORAGE_KEY = 'melih-dev-intro-shown';

export const introUtils = {
  // Check if intro has been shown before
  hasSeenIntro: (): boolean => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(INTRO_STORAGE_KEY) === 'true';
  },

  // Mark intro as shown
  markIntroAsShown: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(INTRO_STORAGE_KEY, 'true');
  },

  // Reset intro (for testing purposes)
  resetIntro: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(INTRO_STORAGE_KEY);
  },

  // Force show intro (for testing purposes)
  forceShowIntro: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(INTRO_STORAGE_KEY);
    window.location.reload();
  }
};

// Development helper - add to window for testing
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).introUtils = introUtils;
} 