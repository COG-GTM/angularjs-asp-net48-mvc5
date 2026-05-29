import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TestComponent } from './TestComponent';

describe('TestComponent', () => {
  it('renders React version', () => {
    render(<TestComponent />);
    const el = screen.getByTestId('angular-version');
    expect(el).toBeInTheDocument();
    expect(el.textContent).toMatch(/React Version: \d+\.\d+\.\d+/);
  });

  it('has test-component class', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('angular-version')).toHaveClass('test-component');
  });
});
