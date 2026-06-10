import './WelcomePage.css';
import {
  AngularLogo,
  EXTERNAL_LINK_PATH,
  GithubIcon,
  XIcon,
  YoutubeIcon,
} from './AngularLogo';

interface WelcomePageProps {
  /** Equivalent of the Angular `title` signal (default 'angular-app'). */
  title?: string;
}

interface PillLink {
  title: string;
  link: string;
}

// Ported 1:1 from the Angular `@for` loop in src/app/app.html.
const PILL_LINKS: PillLink[] = [
  { title: 'Explore the Docs', link: 'https://angular.dev' },
  { title: 'Learn with Tutorials', link: 'https://angular.dev/tutorials' },
  {
    title: 'Prompt and best practices for AI',
    link: 'https://angular.dev/ai/develop-with-ai',
  },
  { title: 'CLI Docs', link: 'https://angular.dev/tools/cli' },
  {
    title: 'Angular Language Service',
    link: 'https://angular.dev/tools/language-service',
  },
  { title: 'Angular DevTools', link: 'https://angular.dev/tools/devtools' },
];

/**
 * Migrated from the Angular root component template (src/app/app.html).
 * Angular directives translated:
 *   - `{{ title() }}` -> `{title}` prop interpolation
 *   - `@for (...) { ... }` -> `PILL_LINKS.map(...)`
 *   - `[href]="item.link"` -> `href={item.link}`
 */
export const WelcomePage = ({ title = 'angular-app' }: WelcomePageProps) => {
  return (
    <div className="welcome">
      <main className="main">
        <div className="content">
          <div className="left-side">
            <AngularLogo />
            <h1>Hello, {title}</h1>
            <p>Congratulations! Your app is running. 🎉</p>
          </div>
          <div className="divider" role="separator" aria-label="Divider"></div>
          <div className="right-side">
            <div className="pill-group">
              {PILL_LINKS.map((item) => (
                <a
                  className="pill"
                  href={item.link}
                  target="_blank"
                  rel="noopener"
                  key={item.title}
                >
                  <span>{item.title}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="14"
                    viewBox="0 -960 960 960"
                    width="14"
                    fill="currentColor"
                  >
                    <path d={EXTERNAL_LINK_PATH} />
                  </svg>
                </a>
              ))}
            </div>
            <div className="social-links">
              <a
                href="https://github.com/angular/angular"
                aria-label="Github"
                target="_blank"
                rel="noopener"
              >
                <GithubIcon />
              </a>
              <a
                href="https://x.com/angular"
                aria-label="X"
                target="_blank"
                rel="noopener"
              >
                <XIcon />
              </a>
              <a
                href="https://www.youtube.com/channel/UCbn1OgGei-DV7aSRo_HaAiw"
                aria-label="Youtube"
                target="_blank"
                rel="noopener"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
