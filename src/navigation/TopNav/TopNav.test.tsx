import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TopNav from './TopNav';
import type { TopNavTabData } from './TopNavTab';

const tabs: TopNavTabData[] = [
  { id: 'flows', label: 'Flows' },
  { id: 'settings', label: 'Settings' },
  { id: 'logs', label: 'Logs' },
];

const defaultProps = {
  tabs,
  activeTabId: 'flows',
  onTabSelect: vi.fn(),
};

describe('TopNav', () => {
  it('renders all tabs', () => {
    render(<TopNav {...defaultProps} />);
    expect(screen.getByText('Flows')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Logs')).toBeInTheDocument();
  });

  it('marks the active tab', () => {
    render(<TopNav {...defaultProps} />);
    const activeTab = screen.getByText('Flows');
    expect(activeTab.className).toContain('active');
  });

  it('does not mark inactive tabs as active', () => {
    render(<TopNav {...defaultProps} />);
    const inactiveTab = screen.getByText('Settings');
    expect(inactiveTab.className).not.toContain('active');
  });

  it('calls onTabSelect when a tab is clicked', async () => {
    const user = userEvent.setup();
    const onTabSelect = vi.fn();
    render(<TopNav {...defaultProps} onTabSelect={onTabSelect} />);

    await user.click(screen.getByText('Settings'));
    expect(onTabSelect).toHaveBeenCalledWith('settings');
  });

  it('renders brand element when provided', () => {
    render(<TopNav {...defaultProps} brand={<span>MyApp</span>} />);
    expect(screen.getByText('MyApp')).toBeInTheDocument();
  });

  it('renders leading content before the brand', () => {
    render(
      <TopNav
        {...defaultProps}
        leading={<button type="button">Menu</button>}
        brand={<span>MyApp</span>}
      />,
    );
    const nav = screen.getByTestId('top-nav');
    const leading = screen.getByText('Menu');
    const brand = screen.getByText('MyApp');
    expect(nav.compareDocumentPosition(leading) & Node.DOCUMENT_POSITION_CONTAINED_BY).toBeTruthy();
    expect(
      leading.compareDocumentPosition(brand) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('does not render brand element when not provided', () => {
    const { container } = render(<TopNav {...defaultProps} />);
    const brandButtons = container.querySelectorAll('[class*="brand"]');
    expect(brandButtons).toHaveLength(0);
  });

  it('calls onBrandClick when the brand is clicked', async () => {
    const user = userEvent.setup();
    const onBrandClick = vi.fn();
    render(
      <TopNav {...defaultProps} brand={<span>MyApp</span>} onBrandClick={onBrandClick} />,
    );

    await user.click(screen.getByText('MyApp'));
    expect(onBrandClick).toHaveBeenCalledTimes(1);
  });

  it('renders actions slot when provided', () => {
    render(
      <TopNav {...defaultProps} actions={<button>Profile</button>} />,
    );
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('does not render actions area when not provided', () => {
    const { container } = render(<TopNav {...defaultProps} />);
    const actionsDiv = container.querySelectorAll('[class*="actions"]');
    expect(actionsDiv).toHaveLength(0);
  });

  it('applies custom className', () => {
    const { container } = render(<TopNav {...defaultProps} className="custom-nav" />);
    expect(container.firstElementChild).toHaveClass('custom-nav');
  });

  it('renders with empty tabs array', () => {
    render(<TopNav tabs={[]} onTabSelect={vi.fn()} />);
  });

  it('renders a separator before a tab when separator is true', () => {
    const tabsWithSep: TopNavTabData[] = [
      { id: 'a', label: 'A' },
      { id: 'b', label: 'B', separator: true },
    ];
    render(<TopNav tabs={tabsWithSep} onTabSelect={vi.fn()} />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('does not render separators when not specified', () => {
    render(<TopNav {...defaultProps} />);
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
  });

  it('applies size variant classes', () => {
    const { container } = render(<TopNav {...defaultProps} size="sm" />);
    expect(container.firstElementChild).toHaveClass('sm');

    const { container: containerLg } = render(<TopNav {...defaultProps} size="lg" />);
    expect(containerLg.firstElementChild).toHaveClass('lg');
  });

  it('renders a nav landmark with aria-label="Main navigation"', () => {
    render(<TopNav {...defaultProps} />);
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
  });

  it('active tab has aria-current="page"', () => {
    render(<TopNav {...defaultProps} activeTabId="flows" />);
    const flowsTab = screen.getByRole('button', { name: 'Flows' });
    expect(flowsTab).toHaveAttribute('aria-current', 'page');
  });

  it('inactive tabs do not have aria-current', () => {
    render(<TopNav {...defaultProps} activeTabId="flows" />);
    const settingsTab = screen.getByRole('button', { name: 'Settings' });
    expect(settingsTab).not.toHaveAttribute('aria-current');
  });
});

describe('TopNav — dropdown coordination', () => {
  const dropdownTabs: TopNavTabData[] = [
    {
      id: 'about',
      label: 'About',
      dropdownGroups: [{ items: [{ id: 'intro', label: 'Introduction' }] }],
    },
    {
      id: 'system',
      label: 'System',
      dropdownGroups: [{ items: [{ id: 'colors', label: 'Colors' }] }],
    },
  ];

  function getWrapper(label: string) {
    return screen.getByText(label).closest('[class*="wrapper"]') as HTMLElement;
  }

  it('opens a dropdown when its tab wrapper is hovered', () => {
    render(<TopNav tabs={dropdownTabs} />);
    fireEvent.mouseEnter(getWrapper('About'));
    expect(screen.getByText('Introduction')).toBeInTheDocument();
  });

  it('opening one dropdown immediately closes another', () => {
    render(<TopNav tabs={dropdownTabs} />);
    fireEvent.mouseEnter(getWrapper('About'));
    expect(screen.getByText('Introduction')).toBeInTheDocument();

    fireEvent.mouseEnter(getWrapper('System'));
    expect(screen.queryByText('Introduction')).not.toBeInTheDocument();
    expect(screen.getByText('Colors')).toBeInTheDocument();
  });

  it('closes the open dropdown after the delay when the mouse leaves', () => {
    vi.useFakeTimers();
    render(<TopNav tabs={dropdownTabs} />);
    fireEvent.mouseEnter(getWrapper('About'));
    expect(screen.getByText('Introduction')).toBeInTheDocument();

    fireEvent.mouseLeave(getWrapper('About'));
    act(() => { vi.advanceTimersByTime(200); });
    expect(screen.queryByText('Introduction')).not.toBeInTheDocument();

    vi.useRealTimers();
  });

  it('cancels the close timer when the mouse re-enters before the delay expires', () => {
    vi.useFakeTimers();
    render(<TopNav tabs={dropdownTabs} />);
    fireEvent.mouseEnter(getWrapper('About'));
    fireEvent.mouseLeave(getWrapper('About'));

    // Re-enter before the 150 ms delay fires.
    act(() => { vi.advanceTimersByTime(50); });
    fireEvent.mouseEnter(getWrapper('About'));
    act(() => { vi.advanceTimersByTime(200); });

    expect(screen.getByText('Introduction')).toBeInTheDocument();
    vi.useRealTimers();
  });
});
