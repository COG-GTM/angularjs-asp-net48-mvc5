import { version } from 'react';

export function TestDirective() {
  return (
    <div data-testid="angular-version-directive" className="test-directive">
      React Version: {version}
    </div>
  );
}
