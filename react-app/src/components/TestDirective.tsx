import { version } from 'react';

/**
 * Port of Angular's `TestDirectiveComponent` (`app-test-directive`).
 * Logs on construction and displays the framework version. Declared but not
 * rendered in the page (matches the Angular module).
 */
export default function TestDirective() {
  console.info('test-directive initialized...');

  return (
    <div data-testid="react-version-directive" className="test-directive">
      React Version: {version}
    </div>
  );
}
