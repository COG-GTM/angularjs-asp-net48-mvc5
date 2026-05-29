import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TestDirective } from './TestDirective';

describe('TestDirective', () => {
  it('renders React version', () => {
    render(<TestDirective />);
    const el = screen.getByTestId('angular-version-directive');
    expect(el).toBeInTheDocument();
    expect(el.textContent).toMatch(/React Version: \d+\.\d+\.\d+/);
  });

  it('has test-directive class', () => {
    render(<TestDirective />);
    expect(screen.getByTestId('angular-version-directive')).toHaveClass('test-directive');
  });
});
