import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SideNavItem from './SideNavItem';
import { SideNavContext } from './SideNavContext';
import type { SideNavItemData } from './SideNavItem';

const baseItem: SideNavItemData = { id: 'item-1', label: 'Dashboard' };

function renderWithContext(
  ui: React.ReactElement,
  {
    onSelect = () => {},
    activeId,
  }: { onSelect?: (id: string) => void; activeId?: string } = {},
) {
  return render(
    <SideNavContext.Provider
      value={{ onSelect, highContrast: false, fullWidth: false, activeId }}
    >
      {ui}
    </SideNavContext.Provider>,
  );
}

describe('SideNavItem', () => {
  it('renders the item label', () => {
    renderWithContext(<SideNavItem item={baseItem} />);
    expect(screen.getByText('Dashboard')).toBeTruthy();
  });

  it('calls onSelect with the item id when clicked', () => {
    const onSelect = vi.fn();
    renderWithContext(<SideNavItem item={baseItem} />, { onSelect });
    fireEvent.click(screen.getByRole('button'));
    expect(onSelect).toHaveBeenCalledWith('item-1');
  });

  it('renders detail text when provided', () => {
    const item: SideNavItemData = { ...baseItem, detail: 'Apr 11' };
    renderWithContext(<SideNavItem item={item} />);
    expect(screen.getByText('Apr 11')).toBeTruthy();
  });

  it('does not render detail text when not provided', () => {
    renderWithContext(<SideNavItem item={baseItem} />);
    expect(screen.queryByText('Apr 11')).toBeNull();
  });

  it('renders the index when provided', () => {
    const item: SideNavItemData = { ...baseItem, index: 3 };
    renderWithContext(<SideNavItem item={item} />);
    expect(screen.getByText('3')).toBeTruthy();
  });

  it('does not render an index element when index is not provided', () => {
    renderWithContext(<SideNavItem item={baseItem} />);
    // Only the label span should be present, no numeric text
    expect(screen.queryByText('0')).toBeNull();
  });

  it('renders a badge element when badge=true', () => {
    const item: SideNavItemData = { ...baseItem, badge: true };
    renderWithContext(<SideNavItem item={item} />);
    // Badge is an empty span — verify it exists via querySelector
    const button = screen.getByRole('button');
    // The button contains more than just the label span when badge is present
    expect(button.children.length).toBeGreaterThan(1);
  });

  it('renders nested children when item has children', () => {
    const item: SideNavItemData = {
      id: 'parent',
      label: 'Parent',
      children: [
        { id: 'child-1', label: 'Child One' },
        { id: 'child-2', label: 'Child Two' },
      ],
    };
    renderWithContext(<SideNavItem item={item} />);
    expect(screen.getByText('Parent')).toBeTruthy();
    expect(screen.getByText('Child One')).toBeTruthy();
    expect(screen.getByText('Child Two')).toBeTruthy();
  });

  it('marks a nested child as active when activeId matches its id', () => {
    const item: SideNavItemData = {
      id: 'parent',
      label: 'Parent',
      children: [
        { id: 'child-1', label: 'Child One' },
        { id: 'child-2', label: 'Child Two' },
      ],
    };
    renderWithContext(<SideNavItem item={item} />, { activeId: 'child-2' });
    const buttons = screen.getAllByRole('button');
    const childTwoButton = buttons.find((b) => b.getAttribute('data-nav-id') === 'child-2');
    expect(childTwoButton?.getAttribute('aria-current')).toBe('page');
  });

  it('calls onContextMenu with item id on right-click', () => {
    const onContextMenu = vi.fn();
    const item: SideNavItemData = { ...baseItem, onContextMenu };
    renderWithContext(<SideNavItem item={item} />);
    fireEvent.contextMenu(screen.getByRole('button'));
    expect(onContextMenu).toHaveBeenCalledWith('item-1', expect.anything());
  });

  it('calls onContextMenu on right-click for a parent item with children', () => {
    const onContextMenu = vi.fn();
    const item: SideNavItemData = {
      id: 'parent',
      label: 'Parent',
      onContextMenu,
      children: [{ id: 'child-1', label: 'Child One' }],
    };
    renderWithContext(<SideNavItem item={item} />);
    const buttons = screen.getAllByRole('button');
    const parentButton = buttons.find((b) => b.getAttribute('data-nav-id') === 'parent');
    fireEvent.contextMenu(parentButton!);
    expect(onContextMenu).toHaveBeenCalledWith('parent', expect.anything());
  });

  describe('parent items with children', () => {
    const parentWith = (extra: Partial<SideNavItemData>): SideNavItemData => ({
      id: 'parent',
      label: 'Parent',
      children: [{ id: 'child-1', label: 'Child One' }],
      ...extra,
    });

    const parentButton = () =>
      screen.getAllByRole('button').find((b) => b.getAttribute('data-nav-id') === 'parent');

    it('renders detail text, like a leaf item does', () => {
      renderWithContext(<SideNavItem item={parentWith({ detail: 'Experimental' })} />);
      expect(screen.getByText('Experimental')).toBeTruthy();
    });

    it('renders a badge', () => {
      renderWithContext(<SideNavItem item={parentWith({ badge: true })} />);
      expect(parentButton()!.children.length).toBeGreaterThan(1);
    });

    it('renders the index', () => {
      renderWithContext(<SideNavItem item={parentWith({ index: 4 })} />);
      expect(screen.getByText('4')).toBeTruthy();
    });

    it('does not render detail when the item has none', () => {
      renderWithContext(<SideNavItem item={parentWith({})} />);
      expect(screen.queryByText('Experimental')).toBeNull();
    });

    it('still renders its children', () => {
      renderWithContext(<SideNavItem item={parentWith({ detail: 'Experimental' })} />);
      expect(screen.getByText('Child One')).toBeTruthy();
    });
  });

  it('sets aria-current="page" on the active item', () => {
    renderWithContext(<SideNavItem item={baseItem} />, { activeId: baseItem.id });
    expect(screen.getByRole('button')).toHaveAttribute('aria-current', 'page');
  });

  it('does not set aria-current on an inactive item', () => {
    renderWithContext(<SideNavItem item={baseItem} />);
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-current');
  });
});
