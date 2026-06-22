import { useEffect } from 'react';
import { ANGULAR_VERSION } from '../../angular-version';

/**
 * Ported from the Angular standalone component `app-test-directive`
 * (`src/app/components/test-directive/test-directive.component.ts`). The
 * Angular constructor's `console.info` side effect runs once on mount via
 * `useEffect`.
 */
export const TestDirectiveComponent = () => {
  const version = ANGULAR_VERSION;

  useEffect(() => {
    console.info('test-directive initialized...');
  }, []);

  return (
    <div data-testid="angular-version-directive" className="test-directive">
      Angular Version: {version}
    </div>
  );
};
