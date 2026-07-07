import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSettings } from '../../context/SettingsContext';
import Settings from '../Settings/Settings';
import styles from './Header.module.scss';

export default function Header() {
  const { resolvedTheme } = useSettings();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <header className={styles.header} data-theme={resolvedTheme}>
      <nav className={styles.nav}>
        <NavLink to="/" className={styles.brand} data-testid="title">
          XLTS for AngularJS with .NET Framework
        </NavLink>
        <button
          type="button"
          className={styles.settingsToggle}
          onClick={() => setSettingsOpen((o) => !o)}
          aria-label="Toggle settings"
        >
          {settingsOpen ? '✕' : '⚙'}
        </button>
      </nav>
      {settingsOpen && <Settings />}
    </header>
  );
}
