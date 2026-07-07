import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home', () => {
  it('renders the heading and both version components', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /hello, react/i })).toBeInTheDocument();
    expect(screen.getByTestId('react-version')).toBeInTheDocument();
    expect(screen.getByTestId('react-version-directive')).toBeInTheDocument();
  });

  it('renders the documentation pills', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: 'React Docs' })).toHaveAttribute('href', 'https://react.dev');
  });
});
