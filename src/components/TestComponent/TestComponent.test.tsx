import { render, screen } from '@testing-library/react';
import { version } from 'react';
import TestComponent from './TestComponent';

describe('TestComponent', () => {
  it('displays the React version', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('react-version')).toHaveTextContent(`React Version: ${version}`);
  });
});
