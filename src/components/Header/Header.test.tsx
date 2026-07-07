import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { SettingsProvider } from '../../context/SettingsContext';

function renderHeader() {
  return render(
    <MemoryRouter>
      <SettingsProvider>
        <Header />
      </SettingsProvider>
    </MemoryRouter>,
  );
}

describe('Header', () => {
  it('renders the brand link with a stable test id', () => {
    renderHeader();
    expect(screen.getByTestId('title')).toBeInTheDocument();
  });

  it('toggles the settings panel when the gear button is clicked', async () => {
    const user = userEvent.setup();
    renderHeader();
    expect(screen.queryByRole('group', { name: /theme/i })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /toggle settings/i }));
    expect(screen.getByRole('group', { name: /theme/i })).toBeInTheDocument();
  });
});
