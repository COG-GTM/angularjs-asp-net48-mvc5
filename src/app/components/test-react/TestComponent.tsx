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
  /** Label to display before the version. Defaults to "React" when using the React version fallback. */
  label?: string;
}

/**
 * React port of the Angular `TestComponent` (selector: `app-test`).
 *
 * Original Angular file: src/app/components/test/test.component.ts
 *
 * Displays the framework version information.
 */
export const TestComponent: React.FC<TestComponentProps> = ({ version, label }) => {
  const isAngularVersion = version !== undefined;
  const displayVersion = version ?? reactVersion;
  const displayLabel = label ?? (isAngularVersion ? 'Angular' : 'React');

  // ngOnInit equivalent: log when the component mounts
  useEffect(() => {
    console.info('test-component initialized...');
  }, []);

  return (
    <div data-testid="angular-version" className="test-component">
      {displayLabel} Version: {displayVersion}
    </div>
  );
};
