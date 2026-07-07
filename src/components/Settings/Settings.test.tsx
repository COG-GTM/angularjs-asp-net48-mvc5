import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Settings from './Settings';
import { SettingsProvider } from '../../context/SettingsContext';

describe('Settings', () => {
  it('reflects and updates the selected theme', async () => {
    const user = userEvent.setup();
    render(
      <SettingsProvider>
        <Settings />
      </SettingsProvider>,
    );

    const dark = screen.getByRole('radio', { name: 'Dark' }) as HTMLInputElement;
    const system = screen.getByRole('radio', { name: 'System' }) as HTMLInputElement;
    expect(system.checked).toBe(true);

    await user.click(dark);
    expect(dark.checked).toBe(true);
    expect(JSON.parse(localStorage.getItem('app-settings') ?? '{}').theme).toBe('dark');
  });
});
