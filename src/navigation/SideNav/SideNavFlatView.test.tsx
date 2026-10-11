import React from 'react';
import { render, screen } from '@testing-library/react';
import SideNavFlatView from './SideNavFlatView';
import { SideNavContext } from './SideNavContext';
import type { SideNavSectionData } from './SideNavSection';
import type { SideNavTopLevelSectionData } from './SideNavTopLevelSection';

function renderWithContext(ui: React.ReactElement) {
  return render(
    <SideNavContext.Provider
      value={{ onSelect: () => {}, highContrast: false, fullWidth: false, activeId: undefined }}
    >
      {ui}
    </SideNavContext.Provider>,
  );
}

const sections: SideNavSectionData[] = [
  { label: 'Group', items: [{ id: 'a', label: 'Alpha' }] },
];

const topLevelSections: SideNavTopLevelSectionData[] = [
  {
    label: 'Top',
    sections: [{ items: [{ id: 'a', label: 'Alpha' }] }],
  },
];

describe('SideNavFlatView', () => {
  it('renders flat sections when topLevelSections is empty', () => {
    renderWithContext(
      <SideNavFlatView sections={sections} topLevelSections={[]} searchActive={false} />,
    );
    expect(screen.getByText('Group')).toBeInTheDocument();
    expect(screen.getByText('Alpha')).toBeInTheDocument();
  });

  it('renders top-level sections when provided', () => {
    renderWithContext(
      <SideNavFlatView sections={[]} topLevelSections={topLevelSections} searchActive={false} />,
    );
    expect(screen.getByRole('button', { name: /Top/ })).toBeInTheDocument();
    expect(screen.getByText('Alpha')).toBeInTheDocument();
  });

  it('renders "No results" when flat sections are empty and search is active', () => {
    renderWithContext(
      <SideNavFlatView sections={[]} topLevelSections={[]} searchActive={true} />,
    );
    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  it('does not render "No results" when search is inactive', () => {
    renderWithContext(
      <SideNavFlatView sections={[]} topLevelSections={[]} searchActive={false} />,
    );
    expect(screen.queryByText('No results')).not.toBeInTheDocument();
  });
});
