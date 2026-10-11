import { render, screen, fireEvent } from '@testing-library/react';
import { Home } from 'lucide-react';
import SideNavTabStrip from './SideNavTabStrip';
import type { SideNavTabData } from './SideNavTabStrip';

const tabs: SideNavTabData[] = [
  { id: 'tab-1', label: 'Home' },
  { id: 'tab-2', label: 'Profile' },
  { id: 'tab-3', label: 'Settings' },
];

describe('SideNavTabStrip', () => {
  it('renders all tab labels', () => {
    render(<SideNavTabStrip tabs={tabs} onTabSelect={() => {}} />);
    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('Profile')).toBeTruthy();
    expect(screen.getByText('Settings')).toBeTruthy();
  });

  it('calls onTabSelect with the tab id when a tab is clicked', () => {
    const onTabSelect = vi.fn();
    render(<SideNavTabStrip tabs={tabs} onTabSelect={onTabSelect} />);
    fireEvent.click(screen.getByText('Profile'));
    expect(onTabSelect).toHaveBeenCalledWith('tab-2');
  });

  it('active tab has aria-current="page"', () => {
    render(<SideNavTabStrip tabs={tabs} activeTabId="tab-1" onTabSelect={() => {}} />);
    const homeButton = screen.getByRole('button', { name: 'Home' });
    expect(homeButton.getAttribute('aria-current')).toBe('page');
  });

  it('inactive tabs do not have aria-current', () => {
    render(<SideNavTabStrip tabs={tabs} activeTabId="tab-1" onTabSelect={() => {}} />);
    const profileButton = screen.getByRole('button', { name: 'Profile' });
    expect(profileButton.getAttribute('aria-current')).toBeNull();
  });

  it('renders a separator hr before a tab when separator=true', () => {
    const tabsWithSeparator: SideNavTabData[] = [
      { id: 'tab-1', label: 'Home' },
      { id: 'tab-2', label: 'Divider Tab', separator: true },
    ];
    const { container } = render(<SideNavTabStrip tabs={tabsWithSeparator} onTabSelect={() => {}} />);
    const hr = container.querySelector('hr');
    expect(hr).toBeTruthy();
  });

  it('does not render a separator hr when separator is not set', () => {
    const { container } = render(<SideNavTabStrip tabs={tabs} onTabSelect={() => {}} />);
    expect(container.querySelector('hr')).toBeNull();
  });

  it('renders with an icon without crashing', () => {
    const tabsWithIcon: SideNavTabData[] = [
      { id: 'tab-1', label: 'Home', icon: Home },
    ];
    render(<SideNavTabStrip tabs={tabsWithIcon} onTabSelect={() => {}} />);
    expect(screen.getByText('Home')).toBeTruthy();
  });

  it('renders a nav element with an aria-label', () => {
    render(<SideNavTabStrip tabs={tabs} onTabSelect={() => {}} />);
    const nav = screen.getByRole('navigation');
    expect(nav.getAttribute('aria-label')).toBeTruthy();
  });
});
