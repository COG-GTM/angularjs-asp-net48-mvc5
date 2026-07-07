import { render, screen } from '@testing-library/react';
import { version } from 'react';
import TestDirective from './TestDirective';

describe('TestDirective', () => {
  it('displays the React version', () => {
    render(<TestDirective />);
    expect(screen.getByTestId('react-version-directive')).toHaveTextContent(
      `React Version: ${version}`,
    );
  });
});
