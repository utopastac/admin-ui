import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SectionHeading from './SectionHeading';

describe('SectionHeading', () => {
  it('renders the title', () => {
    render(<SectionHeading title="General" />);
    expect(screen.getByText('General')).toBeInTheDocument();
  });

  it('renders as h3 by default (md size)', () => {
    render(<SectionHeading title="General" />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('General');
  });

  it('renders as h2 for lg size', () => {
    render(<SectionHeading title="Overview" size="lg" />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Overview');
  });

  it('renders as h4 for sm size', () => {
    render(<SectionHeading title="Details" size="sm" />);
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Details');
  });

  it('renders the description when provided', () => {
    render(<SectionHeading title="Preferences" description="Customize your experience" />);
    expect(screen.getByText('Customize your experience')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    const { container } = render(<SectionHeading title="Preferences" />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs).toHaveLength(0);
  });

  it('renders actions slot when provided', () => {
    render(
      <SectionHeading title="Users" actions={<button>Add</button>} />,
    );
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('does not render actions area when not provided', () => {
    const { container } = render(<SectionHeading title="Users" />);
    const actions = container.querySelectorAll('[class*="actions"]');
    expect(actions).toHaveLength(0);
  });

  it('applies custom className', () => {
    const { container } = render(
      <SectionHeading title="Test" className="custom-section" />,
    );
    expect(container.firstElementChild).toHaveClass('custom-section');
  });

  it('applies the size class to the heading element', () => {
    render(<SectionHeading title="Large" size="lg" />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.className).toContain('lg');
  });

  it('renders with all props provided', () => {
    render(
      <SectionHeading
        title="Advanced"
        description="Power user settings"
        size="sm"
        actions={<button>Reset</button>}
        className="advanced-section"
      />,
    );
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Advanced');
    expect(screen.getByText('Power user settings')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });
});
