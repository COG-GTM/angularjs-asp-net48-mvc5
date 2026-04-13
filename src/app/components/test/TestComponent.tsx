import React, { useEffect } from 'react';

/**
 * React port of Angular TestComponent
 *
 * Original Angular component: test.component.ts
 * - @Input: none
 * - @Output: none
 * - Services: VERSION from @angular/core
 * - Lifecycle: ngOnInit → useEffect (console.info)
 */

interface TestComponentProps {
  /** Version string to display. In Angular this came from VERSION.full */
  version: string;
}

export const TestComponent: React.FC<TestComponentProps> = ({ version }) => {
  // Replaces ngOnInit
  useEffect(() => {
    console.info('test-component initialized...');
  }, []);

  return (
    <div data-testid="angular-version" className="test-component">
      React Version: {version}
    </div>
  );
};
