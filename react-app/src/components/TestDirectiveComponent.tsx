import { useEffect } from 'react';
import { FRAMEWORK_VERSION } from '../version';

/**
 * Migrated from Angular `TestDirectiveComponent`
 * (src/app/components/test-directive/test-directive.component.ts,
 *  selector `app-test-directive`).
 *
 * Angular original:
 *   - `version = VERSION.full`
 *   - constructor logged 'test-directive initialized...'
 * React equivalent: the log runs once in `useEffect(() => {...}, [])`.
 */
export const TestDirectiveComponent = () => {
  useEffect(() => {
    console.info('test-directive initialized...');
  }, []);

  return (
    <div data-testid="angular-version-directive" className="test-directive">
      Angular Version: {FRAMEWORK_VERSION}
    </div>
  );
};
