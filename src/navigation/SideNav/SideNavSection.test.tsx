import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SideNavSection from './SideNavSection';
import { SideNavContext } from './SideNavContext';
import type { SideNavSectionData } from './SideNavSection';

function renderWithContext(
  ui: React.ReactElement,
  { onSelect = () => {} }: { onSelect?: (id: string) => void } = {},
) {
  return render(
    <SideNavContext.Provider value={{ onSelect, highContrast: false, fullWidth: false, activeId: undefined }}>
      {ui}
    </SideNavContext.Provider>,
  );
}

const items = [
  { id: 'item-1', label: 'Overview' },
  { id: 'item-2', label: 'Settings' },
];

describe('SideNavSection', () => {
  it('renders the section label', () => {
    const section: SideNavSectionData = { label: 'General', items };
    renderWithContext(<SideNavSection section={section} />);
    expect(screen.getByText('General')).toBeTruthy();
  });

  it('renders all items in the section', () => {
    const section: SideNavSectionData = { label: 'General', items };
    renderWithContext(<SideNavSection section={section} />);
    expect(screen.getByText('Overview')).toBeTruthy();
    expect(screen.getByText('Settings')).toBeTruthy();
  });

  it('renders without a label when label is omitted', () => {
    const section: SideNavSectionData = { items };
    renderWithContext(<SideNavSection section={section} />);
    // Items still render
    expect(screen.getByText('Overview')).toBeTruthy();
    // No section-heading text or aria-expanded toggle; item buttons have no aria-expanded
    screen.getAllByRole('button').forEach((btn) => {
      expect(btn.getAttribute('aria-expanded')).toBeNull();
    });
  });

  it('calls onSelect with the item id when an item is clicked', () => {
    const onSelect = vi.fn();
    const section: SideNavSectionData = { label: 'General', items };
    renderWithContext(<SideNavSection section={section} />, { onSelect });
    fireEvent.click(screen.getByText('Overview'));
    expect(onSelect).toHaveBeenCalledWith('item-1');
  });

  it('collapsible section starts open by default', () => {
    const section: SideNavSectionData = { label: 'General', items, collapsible: true };
    renderWithContext(<SideNavSection section={section} />);
    expect(screen.getByText('Overview')).toBeTruthy();
    expect(screen.getByRole('button', { name: /General/i }).getAttribute('aria-expanded')).toBe('true');
  });

  it('collapsible section starts closed when defaultOpen=false', () => {
    const section: SideNavSectionData = { label: 'General', items, collapsible: true, defaultOpen: false };
    renderWithContext(<SideNavSection section={section} />);
    expect(screen.queryByText('Overview')).toBeNull();
  });

  it('clicking toggle on a collapsed section reveals items', () => {
    const section: SideNavSectionData = { label: 'General', items, collapsible: true, defaultOpen: false };
    renderWithContext(<SideNavSection section={section} />);
    fireEvent.click(screen.getByRole('button', { name: /General/i }));
    expect(screen.getByText('Overview')).toBeTruthy();
  });

  it('clicking toggle on an open collapsible section hides items', () => {
    const section: SideNavSectionData = { label: 'General', items, collapsible: true };
    renderWithContext(<SideNavSection section={section} />);
    fireEvent.click(screen.getByRole('button', { name: /General/i }));
    expect(screen.queryByText('Overview')).toBeNull();
  });

  it('aria-expanded is false when section is collapsed', () => {
    const section: SideNavSectionData = { label: 'General', items, collapsible: true, defaultOpen: false };
    renderWithContext(<SideNavSection section={section} />);
    expect(screen.getByRole('button', { name: /General/i }).getAttribute('aria-expanded')).toBe('false');
  });
});
