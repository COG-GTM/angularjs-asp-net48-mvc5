import { useEffect } from 'react';
import { version } from 'react';

/**
 * Port of Angular's `TestComponent` (`app-test`).
 * Displays the framework version, mirroring the original which showed
 * `VERSION.full`. Declared but not rendered in the page (matches the Angular
 * module, which imports it without using it in the template).
 */
export default function Test() {
  useEffect(() => {
    console.info('test-component initialized...');
  }, []);

  return (
    <div data-testid="react-version" className="test-component">
      React Version: {version}
    </div>
  );
}
