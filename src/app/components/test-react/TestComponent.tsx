import React, { useEffect } from 'react';
import { version as reactVersion } from 'react';

/**
 * Props for TestComponent.
 *
 * In the original Angular component, the version was read from
 * `@angular/core`'s VERSION.full. The React equivalent accepts
 * an optional version prop; when omitted it falls back to
 * displaying the React version (mirroring the Angular component's
 * behaviour of showing its own framework version).
 */
interface TestComponentProps {
  /** Framework version string to display. Defaults to React.version. */
  version?: string;
}

/**
 * React port of the Angular `TestComponent` (selector: `app-test`).
 *
 * Original Angular file: src/app/components/test/test.component.ts
 *
 * Displays the framework version information.
 */
export const TestComponent: React.FC<TestComponentProps> = ({ version }) => {
  const displayVersion = version ?? reactVersion;

  // ngOnInit equivalent: log when the component mounts
  useEffect(() => {
    console.info('test-component initialized...');
  }, []);

  return (
    <div data-testid="angular-version" className="test-component">
      Angular Version: {displayVersion}
    </div>
  );
};
