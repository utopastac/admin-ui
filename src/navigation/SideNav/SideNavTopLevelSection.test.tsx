import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SideNavTopLevelSection from './SideNavTopLevelSection';
import { SideNavContext } from './SideNavContext';
import type { SideNavTopLevelSectionData } from './SideNavTopLevelSection';

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

const sectionWithItems: SideNavTopLevelSectionData = {
  label: 'Main',
  sections: [
    {
      label: 'General',
      items: [
        { id: 'item-1', label: 'Overview' },
        { id: 'item-2', label: 'Settings' },
      ],
    },
  ],
};

describe('SideNavTopLevelSection', () => {
  it('renders the section label in the header button', () => {
    renderWithContext(<SideNavTopLevelSection section={sectionWithItems} />);
    expect(screen.getByRole('button', { name: /Main/i })).toBeTruthy();
  });

  it('content is visible by default (defaultOpen defaults to true)', () => {
    renderWithContext(<SideNavTopLevelSection section={sectionWithItems} />);
    expect(screen.getByText('Overview')).toBeTruthy();
    expect(screen.getByText('Settings')).toBeTruthy();
  });

  it('content is hidden when defaultOpen=false', () => {
    const section: SideNavTopLevelSectionData = { ...sectionWithItems, defaultOpen: false };
    renderWithContext(<SideNavTopLevelSection section={section} />);
    expect(screen.queryByText('Overview')).toBeNull();
    expect(screen.queryByText('Settings')).toBeNull();
  });

  it('clicking the header button toggles content visibility closed', () => {
    renderWithContext(<SideNavTopLevelSection section={sectionWithItems} />);
    fireEvent.click(screen.getByRole('button', { name: /Main/i }));
    expect(screen.queryByText('Overview')).toBeNull();
  });

  it('clicking the header button on a closed section opens the content', () => {
    const section: SideNavTopLevelSectionData = { ...sectionWithItems, defaultOpen: false };
    renderWithContext(<SideNavTopLevelSection section={section} />);
    fireEvent.click(screen.getByRole('button', { name: /Main/i }));
    expect(screen.getByText('Overview')).toBeTruthy();
  });

  it('aria-expanded is true when section is open', () => {
    renderWithContext(<SideNavTopLevelSection section={sectionWithItems} />);
    expect(screen.getByRole('button', { name: /Main/i }).getAttribute('aria-expanded')).toBe('true');
  });

  it('aria-expanded is false when section is closed', () => {
    const section: SideNavTopLevelSectionData = { ...sectionWithItems, defaultOpen: false };
    renderWithContext(<SideNavTopLevelSection section={section} />);
    expect(screen.getByRole('button', { name: /Main/i }).getAttribute('aria-expanded')).toBe('false');
  });

  it('renders nested section items inside the expanded content', () => {
    renderWithContext(<SideNavTopLevelSection section={sectionWithItems} />);
    expect(screen.getByText('Overview')).toBeTruthy();
    expect(screen.getByText('Settings')).toBeTruthy();
  });

  it('calls onSelect when a nested item is clicked', () => {
    const onSelect = vi.fn();
    renderWithContext(<SideNavTopLevelSection section={sectionWithItems} />, { onSelect });
    fireEvent.click(screen.getByText('Overview'));
    expect(onSelect).toHaveBeenCalledWith('item-1');
  });
});
