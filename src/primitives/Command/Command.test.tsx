import { render, screen, fireEvent } from '@testing-library/react';
import Command, { CommandDialog } from './Command';
import type { CommandGroup } from './Command';

const groups: CommandGroup[] = [
  {
    label: 'Navigation',
    items: [
      { id: 'home', label: 'Go to Home', onSelect: vi.fn() },
      { id: 'settings', label: 'Open Settings', onSelect: vi.fn() },
    ],
  },
  {
    label: 'Actions',
    items: [
      { id: 'new', label: 'New Document', onSelect: vi.fn(), shortcut: '⌘N' },
    ],
  },
];

describe('Command', () => {
  it('renders all items', () => {
    render(<Command groups={groups} />);
    expect(screen.getByText('Go to Home')).toBeTruthy();
    expect(screen.getByText('Open Settings')).toBeTruthy();
    expect(screen.getByText('New Document')).toBeTruthy();
  });

  it('renders group labels', () => {
    render(<Command groups={groups} />);
    expect(screen.getByText('Navigation')).toBeTruthy();
    expect(screen.getByText('Actions')).toBeTruthy();
  });

  it('renders shortcut badge', () => {
    render(<Command groups={groups} />);
    expect(screen.getByText('⌘N')).toBeTruthy();
  });

  it('filters items by query', () => {
    render(<Command groups={groups} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'settings' } });
    expect(screen.queryByText('Go to Home')).toBeNull();
    expect(screen.getByText('Open Settings')).toBeTruthy();
  });

  it('hides groups with no matches', () => {
    render(<Command groups={groups} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'New' } });
    expect(screen.queryByText('Navigation')).toBeNull();
    expect(screen.getByText('Actions')).toBeTruthy();
  });

  it('shows empty state when nothing matches', () => {
    render(<Command groups={groups} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'zzznomatch' } });
    expect(screen.getByText('No results.')).toBeTruthy();
  });

  it('calls onClose on Escape', () => {
    const onClose = vi.fn();
    render(<Command groups={groups} onClose={onClose} />);
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onSelect and onClose on Enter', () => {
    const onSelect = vi.fn();
    const onClose = vi.fn();
    const g: CommandGroup[] = [{ items: [{ id: 'x', label: 'X', onSelect }] }];
    render(<Command groups={g} onClose={onClose} />);
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('uses custom placeholder', () => {
    render(<Command groups={[]} placeholder="Type a command…" />);
    expect(screen.getByPlaceholderText('Type a command…')).toBeTruthy();
  });

  it('uses custom empty message', () => {
    render(<Command groups={[]} emptyMessage="Nothing here." />);
    expect(screen.getByText('Nothing here.')).toBeTruthy();
  });
});

describe('CommandDialog', () => {
  it('renders nothing when closed', () => {
    render(<CommandDialog open={false} onClose={vi.fn()} groups={groups} />);
    expect(screen.queryByText('Go to Home')).toBeNull();
  });

  it('renders items when open', () => {
    render(<CommandDialog open={true} onClose={vi.fn()} groups={groups} />);
    expect(screen.getByText('Go to Home')).toBeTruthy();
  });

  it('calls onOpen when ⌘K is pressed', () => {
    const onOpen = vi.fn();
    render(<CommandDialog open={false} onClose={vi.fn()} onOpen={onOpen} groups={groups} />);
    fireEvent.keyDown(document, { key: 'k', metaKey: true });
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn();
    render(<CommandDialog open={true} onClose={onClose} groups={groups} />);
    // The backdrop is the first fixed div rendered
    const backdrop = document.querySelector('[class*="backdrop"]') as HTMLElement;
    if (backdrop) fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
