import { act, render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('renders the provided message when online', () => {
    render(<ErrorMessage message="Boom" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Boom');
  });

  it('renders a default message when none is provided', () => {
    render(<ErrorMessage />);
    expect(screen.getByRole('alert')).toHaveTextContent('An unexpected error occurred.');
  });

  it('shows an offline notice when the browser goes offline', () => {
    render(<ErrorMessage message="Boom" />);
    act(() => {
      window.dispatchEvent(new Event('offline'));
    });
    expect(screen.getByRole('alert')).toHaveTextContent(/offline/i);
  });
});
