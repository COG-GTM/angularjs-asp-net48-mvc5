import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { ResolvedTheme, Settings, ThemeSetting } from '../types';

const STORAGE_KEY = 'app-settings';

const DEFAULT_SETTINGS: Settings = {
  theme: 'system',
  fontSize: 16,
  spacing: 8,
  openLinksInNewTab: false,
};

interface SettingsContextValue {
  settings: Settings;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemeSetting) => void;
  setFontSize: (fontSize: number) => void;
  setSpacing: (spacing: number) => void;
  setOpenLinksInNewTab: (openLinksInNewTab: boolean) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

function readStoredSettings(): Settings {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return DEFAULT_SETTINGS;
    }

    return { ...DEFAULT_SETTINGS, ...(JSON.parse(stored) as Partial<Settings>) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function persistSettings(settings: Settings): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Storage can be unavailable (private mode, quota); settings stay in memory.
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(readStoredSettings);
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>('light');

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      return;
    }

    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = (matches: boolean) => setSystemTheme(matches ? 'dark' : 'light');

    apply(query.matches);

    const listener = (event: MediaQueryListEvent) => apply(event.matches);
    query.addEventListener('change', listener);

    return () => query.removeEventListener('change', listener);
  }, []);

  const update = useCallback((patch: Partial<Settings>) => {
    setSettings((current) => {
      const next = { ...current, ...patch };
      persistSettings(next);
      return next;
    });
  }, []);

  const value = useMemo<SettingsContextValue>(() => {
    const resolvedTheme: ResolvedTheme =
      settings.theme === 'system' ? systemTheme : settings.theme;

    return {
      settings,
      resolvedTheme,
      setTheme: (theme) => update({ theme }),
      setFontSize: (fontSize) => update({ fontSize }),
      setSpacing: (spacing) => update({ spacing }),
      setOpenLinksInNewTab: (openLinksInNewTab) => update({ openLinksInNewTab }),
      resetSettings: () => {
        persistSettings(DEFAULT_SETTINGS);
        setSettings(DEFAULT_SETTINGS);
      },
    };
  }, [settings, systemTheme, update]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }

  return context;
}

export { DEFAULT_SETTINGS, STORAGE_KEY };
