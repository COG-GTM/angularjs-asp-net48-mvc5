import { act, render, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { SettingsProvider, useSettings } from './SettingsContext';

const wrapper = ({ children }: { children: ReactNode }) => (
  <SettingsProvider>{children}</SettingsProvider>
);

describe('SettingsContext', () => {
  it('defaults to the system theme', () => {
    const { result } = renderHook(() => useSettings(), { wrapper });
    expect(result.current.settings.theme).toBe('system');
    // matchMedia mock reports matches: false → light
    expect(result.current.resolvedTheme).toBe('light');
  });

  it('persists theme changes to localStorage', () => {
    const { result } = renderHook(() => useSettings(), { wrapper });
    act(() => result.current.setTheme('dark'));
    expect(result.current.settings.theme).toBe('dark');
    expect(result.current.resolvedTheme).toBe('dark');
    expect(JSON.parse(localStorage.getItem('app-settings') ?? '{}').theme).toBe('dark');
  });

  it('initializes from previously stored settings', () => {
    localStorage.setItem('app-settings', JSON.stringify({ theme: 'light' }));
    const { result } = renderHook(() => useSettings(), { wrapper });
    expect(result.current.settings.theme).toBe('light');
  });

  it('throws when used outside a provider', () => {
    function Bad() {
      useSettings();
      return null;
    }
    expect(() => render(<Bad />)).toThrow(/SettingsProvider/);
  });
});
