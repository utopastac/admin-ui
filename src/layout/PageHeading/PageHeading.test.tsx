import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PageHeading from './PageHeading';

describe('PageHeading', () => {
  it('renders the title as an h1', () => {
    render(<PageHeading title="Dashboard" />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Dashboard');
  });

  it('renders the description when provided', () => {
    render(<PageHeading title="Dashboard" description="Overview of your account" />);
    expect(screen.getByText('Overview of your account')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    const { container } = render(<PageHeading title="Dashboard" />);
    const description = container.querySelector('p');
    expect(description).not.toBeInTheDocument();
  });

  it('renders actions slot when provided', () => {
    render(
      <PageHeading title="Users" actions={<button>Add User</button>} />,
    );
    expect(screen.getByText('Add User')).toBeInTheDocument();
  });

  it('does not render actions area when not provided', () => {
    const { container } = render(<PageHeading title="Users" />);
    const actions = container.querySelectorAll('[class*="actions"]');
    expect(actions).toHaveLength(0);
  });

  it('applies custom className', () => {
    const { container } = render(<PageHeading title="Test" className="custom-heading" />);
    expect(container.firstElementChild).toHaveClass('custom-heading');
  });

  it('renders title and description together', () => {
    render(
      <PageHeading title="Settings" description="Manage your preferences" />,
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Settings');
    expect(screen.getByText('Manage your preferences')).toBeInTheDocument();
  });

  it('renders with all props provided', () => {
    render(
      <PageHeading
        title="Reports"
        description="View and export reports"
        actions={<button>Export</button>}
        className="reports-heading"
      />,
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Reports');
    expect(screen.getByText('View and export reports')).toBeInTheDocument();
    expect(screen.getByText('Export')).toBeInTheDocument();
  });
});
