import React from 'react';
import VersionCard from './components/VersionCard';
import TechInfo from './components/TechInfo';

const REACT_VERSION = React.version;
const VITE_VERSION = '5.x';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 data-testid="title">React with .NET Framework</h1>
          <p className="subtitle">
            Modernised frontend — migrated from AngularJS to React
          </p>
        </div>
      </header>

      <main className="app-main">
        <section className="version-grid">
          <VersionCard
            label="React Version"
            version={REACT_VERSION}
            testId="react-version"
            icon="⚛"
            accentColor="#61dafb"
          />
          <VersionCard
            label="Build Tool"
            version={`Vite ${VITE_VERSION}`}
            testId="vite-version"
            icon="⚡"
            accentColor="#646cff"
          />
        </section>

        <section className="tech-section">
          <h2 className="section-title">Technology Stack</h2>
          <div className="tech-grid">
            <TechInfo
              name="React"
              description="Modern component-based UI library with hooks"
              badge="Frontend"
            />
            <TechInfo
              name="Vite"
              description="Next-generation frontend build tool"
              badge="Build"
            />
            <TechInfo
              name="ASP.NET MVC 5"
              description="Server-side framework on .NET Framework 4.8"
              badge="Backend"
            />
          </div>
        </section>

        <section className="migration-note">
          <h2 className="section-title">Migration Summary</h2>
          <div className="note-card">
            <ul className="migration-list">
              <li>
                <strong>AngularJS module</strong> replaced with React functional
                components
              </li>
              <li>
                <strong>test.component.js</strong> migrated to{' '}
                <code>VersionCard</code> component
              </li>
              <li>
                <strong>test.directive.js</strong> migrated to{' '}
                <code>TechInfo</code> component
              </li>
              <li>
                <strong>jQuery dependency</strong> removed — using React state
                and effects
              </li>
              <li>
                <strong>Responsive layout</strong> with CSS Grid and modern
                styling
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>
          Built with React {REACT_VERSION} &middot; ASP.NET MVC 5 &middot; .NET
          Framework 4.8
        </p>
      </footer>
    </div>
  );
}

export default App;
