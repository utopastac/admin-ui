import { render, screen, fireEvent } from '@testing-library/react';
import SideNavTabbedView from './SideNavTabbedView';
import type { SideNavTabConfig } from './SideNav';

const tabs: SideNavTabConfig[] = [
  { id: 'primitives', label: 'Primitives', sections: [] },
  { id: 'overlays', label: 'Overlays', sections: [] },
];

describe('SideNavTabbedView', () => {
  it('renders the tab strip and children content', () => {
    render(
      <SideNavTabbedView
        tabs={tabs}
        activeTabId="primitives"
        onTabSelect={() => {}}
        highContrast={false}
        hideTabStrip={false}
      >
        <div>content</div>
      </SideNavTabbedView>,
    );
    expect(screen.getByText('Primitives')).toBeInTheDocument();
    expect(screen.getByText('Overlays')).toBeInTheDocument();
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('hides the tab strip when hideTabStrip is true', () => {
    render(
      <SideNavTabbedView
        tabs={tabs}
        activeTabId="primitives"
        onTabSelect={() => {}}
        highContrast={false}
        hideTabStrip={true}
      >
        <div>content</div>
      </SideNavTabbedView>,
    );
    expect(screen.queryByText('Primitives')).not.toBeInTheDocument();
    expect(screen.queryByText('Overlays')).not.toBeInTheDocument();
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('calls onTabSelect when a tab is clicked', () => {
    const onTabSelect = vi.fn();
    render(
      <SideNavTabbedView
        tabs={tabs}
        activeTabId="primitives"
        onTabSelect={onTabSelect}
        highContrast={false}
        hideTabStrip={false}
      >
        <div>content</div>
      </SideNavTabbedView>,
    );
    fireEvent.click(screen.getByText('Overlays'));
    expect(onTabSelect).toHaveBeenCalledWith('overlays');
  });
});
