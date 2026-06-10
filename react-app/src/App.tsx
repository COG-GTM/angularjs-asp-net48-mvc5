import { BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import { WelcomePage } from './components/WelcomePage';
import { TestComponent } from './components/TestComponent';
import { TestDirectiveComponent } from './components/TestDirectiveComponent';

/**
 * Migrated from the Angular root component `App` (src/app/app.ts) and its
 * `AppModule` (src/app/app.module.ts).
 *
 * - `title = signal('angular-app')` -> plain `title` constant passed as a prop.
 * - `RouterModule.forRoot(routes)` with an empty `routes` array and the
 *   `<router-outlet />` in app.html -> `<BrowserRouter>` + empty `<Routes>`.
 *   (No client-side routes are defined, identical to the Angular app.)
 * - `TestComponent` / `TestDirectiveComponent` were declared in `AppModule`;
 *   they are rendered here so their version readout is visible and the existing
 *   E2E specs (data-testid `angular-version` / `angular-version-directive`)
 *   continue to resolve against the React app.
 */
const App = () => {
  const title = 'angular-app';

  return (
    <BrowserRouter>
      <WelcomePage title={title} />
      <TestComponent />
      <TestDirectiveComponent />
      {/* Equivalent of Angular's <router-outlet /> (no routes defined). */}
      <Routes />
    </BrowserRouter>
  );
};

export default App;
