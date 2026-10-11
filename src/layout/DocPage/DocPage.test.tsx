import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ReactMarkdown from 'react-markdown';
import DocPage, { extractHeadings } from './DocPage';

// Default mock: renders children as plain text for most tests.
// Uses vi.fn() so individual tests can call mockImplementation.
vi.mock('react-markdown', () => ({
  default: vi.fn(({ children }: { children: string }) => (
    <div data-testid="markdown">{children}</div>
  )),
}));

vi.mock('remark-gfm', () => ({
  default: () => {},
}));

describe('DocPage', () => {
  it('renders markdown content', () => {
    render(<DocPage content="# Hello World" />);
    expect(screen.getByTestId('markdown')).toHaveTextContent('# Hello World');
  });

  it('renders with empty content', () => {
    render(<DocPage content="" />);
    expect(screen.getByTestId('markdown')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<DocPage content="test" className="custom" />);
    expect(container.firstElementChild).toHaveClass('custom');
  });

  it('passes content string to ReactMarkdown', () => {
    const content = '## Heading\n\nSome paragraph text with **bold** and *italic*.';
    render(<DocPage content={content} />);
    expect(screen.getByTestId('markdown')).toHaveTextContent(
      '## Heading Some paragraph text with **bold** and *italic*.'
    );
  });

  it('renders a root div wrapper', () => {
    const { container } = render(<DocPage content="test" />);
    expect(container.firstElementChild?.tagName).toBe('DIV');
  });
});

describe('extractHeadings', () => {
  it('returns empty array for content with no headings', () => {
    expect(extractHeadings('Just some plain text.\nNo headings here.')).toEqual([]);
  });

  it('returns flat list for # headings only', () => {
    const content = '# First\n# Second\n# Third';
    expect(extractHeadings(content)).toEqual([
      { label: 'First', href: '#first' },
      { label: 'Second', href: '#second' },
      { label: 'Third', href: '#third' },
    ]);
  });

  it('returns nested structure for mixed # and ##', () => {
    const content = '# Overview\n## Getting Started\n## Installation\n# Reference\n## API';
    expect(extractHeadings(content)).toEqual([
      {
        label: 'Overview',
        href: '#overview',
        children: [
          { label: 'Getting Started', href: '#getting-started' },
          { label: 'Installation', href: '#installation' },
        ],
      },
      {
        label: 'Reference',
        href: '#reference',
        children: [{ label: 'API', href: '#api' }],
      },
    ]);
  });

  it('## without a preceding # becomes a top-level item', () => {
    const content = '## Standalone Section\n## Another Section';
    expect(extractHeadings(content)).toEqual([
      { label: 'Standalone Section', href: '#standalone-section' },
      { label: 'Another Section', href: '#another-section' },
    ]);
  });

  it('slugs heading text correctly', () => {
    const content = '# Hello World!\n## React & TypeScript: A Guide';
    expect(extractHeadings(content)).toEqual([
      {
        label: 'Hello World!',
        href: '#hello-world',
        children: [{ label: 'React & TypeScript: A Guide', href: '#react-typescript-a-guide' }],
      },
    ]);
  });
});

describe('DocPage heading IDs', () => {
  afterEach(() => {
    vi.mocked(ReactMarkdown).mockImplementation(
      ({ children }: { children: string }) => <div data-testid="markdown">{children}</div>
    );
  });

  it('renders h1 with correct id when components prop is used', () => {
    vi.mocked(ReactMarkdown).mockImplementation(
      ({ components }: { components?: Record<string, React.FC<{ children?: React.ReactNode }>> }) => {
        const H1 = components?.h1;
        return H1 ? <H1>Hello World</H1> : null;
      }
    );

    const { container } = render(<DocPage content="# Hello World" />);
    const h1 = container.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1?.getAttribute('id')).toBe('hello-world');
  });

  it('renders h2 with correct id when components prop is used', () => {
    vi.mocked(ReactMarkdown).mockImplementation(
      ({ components }: { components?: Record<string, React.FC<{ children?: React.ReactNode }>> }) => {
        const H2 = components?.h2;
        return H2 ? <H2>Getting Started</H2> : null;
      }
    );

    const { container } = render(<DocPage content="## Getting Started" />);
    const h2 = container.querySelector('h2');
    expect(h2).not.toBeNull();
    expect(h2?.getAttribute('id')).toBe('getting-started');
  });
});
