export type ThemeSetting = 'light' | 'dark' | 'system';

export type ResolvedTheme = 'light' | 'dark';

export interface Settings {
  theme: ThemeSetting;
  fontSize: number;
  spacing: number;
  openLinksInNewTab: boolean;
}

export interface AppInfo {
  reactVersion: string;
  routerVersion: string;
  environment: string;
}
