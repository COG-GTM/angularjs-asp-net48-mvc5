export type ThemePreference = 'light' | 'dark' | 'system';

export type ResolvedTheme = 'light' | 'dark';

export interface Settings {
  /** The user's chosen theme preference. */
  theme: ThemePreference;
}

export const DEFAULT_SETTINGS: Settings = {
  theme: 'system',
};
