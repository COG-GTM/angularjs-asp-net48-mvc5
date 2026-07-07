import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Built with <a href="https://react.dev" target="_blank" rel="noopener noreferrer">React</a>
        {' '}&amp;{' '}
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">Vite</a>
      </p>
    </footer>
  );
}
