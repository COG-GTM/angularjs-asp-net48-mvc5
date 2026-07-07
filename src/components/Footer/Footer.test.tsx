import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('links to React and Vite', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'React' })).toHaveAttribute('href', 'https://react.dev');
    expect(screen.getByRole('link', { name: 'Vite' })).toHaveAttribute('href', 'https://vite.dev');
  });
});
