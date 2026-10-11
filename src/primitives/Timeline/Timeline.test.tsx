import { render, screen } from '@testing-library/react';
import Timeline from './Timeline';
import type { TimelineItem } from './Timeline';

const baseItems: TimelineItem[] = [
  {
    id: '1',
    timestamp: 'Jan 1, 2024',
    title: 'First event',
    description: 'Something happened',
  },
  {
    id: '2',
    timestamp: 'Jan 2, 2024',
    title: 'Second event',
  },
  {
    id: '3',
    timestamp: 'Jan 3, 2024',
    title: 'Third event',
    description: 'Another thing happened',
  },
];

describe('Timeline', () => {
  it('renders all item titles', () => {
    render(<Timeline items={baseItems} />);
    expect(screen.getByText('First event')).toBeInTheDocument();
    expect(screen.getByText('Second event')).toBeInTheDocument();
    expect(screen.getByText('Third event')).toBeInTheDocument();
  });

  it('renders timestamps', () => {
    render(<Timeline items={baseItems} />);
    expect(screen.getByText('Jan 1, 2024')).toBeInTheDocument();
    expect(screen.getByText('Jan 2, 2024')).toBeInTheDocument();
    expect(screen.getByText('Jan 3, 2024')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<Timeline items={baseItems} />);
    expect(screen.getByText('Something happened')).toBeInTheDocument();
    expect(screen.getByText('Another thing happened')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    render(<Timeline items={baseItems} />);
    // Second item has no description — verify the description container is absent
    const descriptions = document.querySelectorAll('[class*="description"]');
    expect(descriptions).toHaveLength(2);
  });

  it('renders avatar when avatar prop provided on item', () => {
    const items: TimelineItem[] = [
      {
        id: '1',
        timestamp: 'Jan 1, 2024',
        title: 'With avatar',
        avatar: { name: 'Jane Doe', src: 'https://example.com/jane.jpg' },
      },
    ];
    render(<Timeline items={items} />);
    // Avatar renders the name as title attribute on the wrapper div
    expect(screen.getByTitle('Jane Doe')).toBeInTheDocument();
  });

  it('renders icon when icon prop provided and no avatar', () => {
    const items: TimelineItem[] = [
      {
        id: '1',
        timestamp: 'Jan 1, 2024',
        title: 'With icon',
        icon: <svg data-testid="custom-icon" />,
      },
    ];
    render(<Timeline items={items} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('avatar takes precedence over icon when both provided', () => {
    const items: TimelineItem[] = [
      {
        id: '1',
        timestamp: 'Jan 1, 2024',
        title: 'Avatar wins',
        icon: <svg data-testid="custom-icon" />,
        avatar: { name: 'Jane Doe' },
      },
    ];
    render(<Timeline items={items} />);
    expect(screen.getByTitle('Jane Doe')).toBeInTheDocument();
    expect(screen.queryByTestId('custom-icon')).not.toBeInTheDocument();
  });

  it('applies variant class to item dot', () => {
    const items: TimelineItem[] = [
      { id: '1', timestamp: 'Jan 1, 2024', title: 'Success', variant: 'success' },
      { id: '2', timestamp: 'Jan 2, 2024', title: 'Error', variant: 'error' },
      { id: '3', timestamp: 'Jan 3, 2024', title: 'Warning', variant: 'warning' },
      { id: '4', timestamp: 'Jan 4, 2024', title: 'Info', variant: 'info' },
    ];
    const { container } = render(<Timeline items={items} />);
    expect(container.querySelector('.success')).toBeInTheDocument();
    expect(container.querySelector('.error')).toBeInTheDocument();
    expect(container.querySelector('.warning')).toBeInTheDocument();
    expect(container.querySelector('.info')).toBeInTheDocument();
  });
});
