import TestComponent from '../../components/TestComponent/TestComponent';
import TestDirective from '../../components/TestDirective/TestDirective';
import styles from './Home.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <div className={styles.leftSide}>
          <h1>Hello, React</h1>
          <p>The application has been migrated from Angular to React + Vite.</p>
        </div>
        <div className={styles.divider} role="separator" aria-label="Divider" />
        <div className={styles.rightSide}>
          <div className={styles.pillGroup}>
            {[
              { title: 'React Docs', link: 'https://react.dev' },
              { title: 'Vite Docs', link: 'https://vite.dev' },
              { title: 'React Router', link: 'https://reactrouter.com' },
              { title: 'TypeScript', link: 'https://www.typescriptlang.org' },
            ].map((item) => (
              <a
                key={item.title}
                className={styles.pill}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      </div>
      <section className={styles.versions}>
        <TestComponent />
        <TestDirective />
      </section>
    </main>
  );
}
