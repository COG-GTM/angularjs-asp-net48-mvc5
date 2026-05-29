import { version } from 'react';

export function TestComponent() {
  return (
    <div data-testid="angular-version" className="test-component">
      React Version: {version}
    </div>
  );
}
