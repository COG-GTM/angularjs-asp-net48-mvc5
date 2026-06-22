import { useEffect } from 'react';
import { ANGULAR_VERSION } from '../../angular-version';

/**
 * Ported from the Angular standalone component `app-test`
 * (`src/app/components/test/test.component.ts`). The `ngOnInit` lifecycle hook
 * is replaced by a `useEffect` with an empty dependency array.
 */
export const TestComponent = () => {
  const version = ANGULAR_VERSION;

  useEffect(() => {
    console.info('test-component initialized...');
  }, []);

  return (
    <div data-testid="angular-version" className="test-component">
      Angular Version: {version}
    </div>
  );
};
