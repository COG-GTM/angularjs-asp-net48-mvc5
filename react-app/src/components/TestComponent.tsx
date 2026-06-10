import { useEffect } from 'react';
import { FRAMEWORK_VERSION } from '../version';

/**
 * Migrated from Angular `TestComponent`
 * (src/app/components/test/test.component.ts, selector `app-test`).
 *
 * Angular original:
 *   - `version = VERSION.full`
 *   - `ngOnInit()` logged 'test-component initialized...'
 * React equivalent: the log runs once in `useEffect(() => {...}, [])`.
 */
export const TestComponent = () => {
  useEffect(() => {
    console.info('test-component initialized...');
  }, []);

  return (
    <div data-testid="angular-version" className="test-component">
      Angular Version: {FRAMEWORK_VERSION}
    </div>
  );
};
