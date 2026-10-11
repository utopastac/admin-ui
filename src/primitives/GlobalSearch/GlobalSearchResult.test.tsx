import { render, screen } from '@testing-library/react';
import GlobalSearchResult from './GlobalSearchResult';
import type { GlobalSearchResultData } from './GlobalSearch';

const baseResult: GlobalSearchResultData = {
  id: '1',
  title: 'Dashboard',
};

describe('GlobalSearchResult', () => {
  it('renders the result title', () => {
    render(<GlobalSearchResult result={baseResult} active={false} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    const result: GlobalSearchResultData = {
      ...baseResult,
      description: 'View your metrics',
    };
    render(<GlobalSearchResult result={result} active={false} />);
    expect(screen.getByText('View your metrics')).toBeInTheDocument();
  });

  it('omits description when not provided', () => {
    render(<GlobalSearchResult result={baseResult} active={false} />);
    // No description element at all
    const { container } = render(<GlobalSearchResult result={baseResult} active={false} />);
    expect(container.querySelectorAll('[class*="resultDescription"]')).toHaveLength(0);
  });

  it('renders icon when provided', () => {
    const result: GlobalSearchResultData = {
      ...baseResult,
      icon: <span>★</span>,
    };
    render(<GlobalSearchResult result={result} active={false} />);
    expect(screen.getByText('★')).toBeInTheDocument();
  });

  it('omits icon when not provided', () => {
    const { container } = render(<GlobalSearchResult result={baseResult} active={false} />);
    expect(container.querySelectorAll('[class*="resultIcon"]')).toHaveLength(0);
  });

  it('renders without crashing when active is true', () => {
    render(<GlobalSearchResult result={baseResult} active={true} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders without crashing when active is false', () => {
    render(<GlobalSearchResult result={baseResult} active={false} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders both icon and description together', () => {
    const result: GlobalSearchResultData = {
      id: '2',
      title: 'Settings',
      description: 'App settings',
      icon: <span data-testid="settings-icon">⚙</span>,
    };
    render(<GlobalSearchResult result={result} active={false} />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('App settings')).toBeInTheDocument();
    expect(screen.getByTestId('settings-icon')).toBeInTheDocument();
  });
});
