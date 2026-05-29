import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Landing from './Landing';

function renderLanding() {
  return render(
    <BrowserRouter>
      <Landing />
    </BrowserRouter>
  );
}

describe('Landing', () => {
  it('renders the page title', () => {
    renderLanding();
    expect(screen.getByTestId('title')).toHaveTextContent('XLTS for AngularJS with .NET Framework');
  });

  it('renders the app name', () => {
    renderLanding();
    expect(screen.getByText('Hello, react-app')).toBeInTheDocument();
  });

  it('renders TestComponent and TestDirective', () => {
    renderLanding();
    expect(screen.getByTestId('angular-version')).toBeInTheDocument();
    expect(screen.getByTestId('angular-version-directive')).toBeInTheDocument();
  });

  it('renders resource links', () => {
    renderLanding();
    expect(screen.getByText('Explore the Docs')).toBeInTheDocument();
    expect(screen.getByText('Learn with Tutorials')).toBeInTheDocument();
  });
});
