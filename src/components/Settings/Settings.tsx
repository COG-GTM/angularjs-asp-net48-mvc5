import { useSettings } from '../../context/SettingsContext';
import type { ThemePreference } from '../../types/settings';
import styles from './Settings.module.scss';

const THEME_OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
];

export default function Settings() {
  const { settings, setTheme } = useSettings();

  return (
    <div className={styles.settings}>
      <fieldset className={styles.fieldset}>
        <legend>Theme</legend>
        {THEME_OPTIONS.map(({ value, label }) => (
          <label key={value} className={styles.option}>
            <input
              type="radio"
              name="theme"
              value={value}
              checked={settings.theme === value}
              onChange={() => setTheme(value)}
            />
            {label}
          </label>
        ))}
      </fieldset>
    </div>
  );
}
