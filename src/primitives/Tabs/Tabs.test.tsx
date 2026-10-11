import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tabs from './Tabs';
import type { TabItem } from './Tabs';

const tabs: TabItem[] = [
  { id: 'general', label: 'General' },
  { id: 'advanced', label: 'Advanced' },
  { id: 'about', label: 'About' },
];

describe('Tabs', () => {
  const defaultProps = {
    tabs,
    activeId: 'general',
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders a tablist', () => {
    render(<Tabs {...defaultProps} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders all tabs', () => {
    render(<Tabs {...defaultProps} />);
    const tabElements = screen.getAllByRole('tab');
    expect(tabElements).toHaveLength(3);
    expect(tabElements[0]).toHaveTextContent('General');
    expect(tabElements[1]).toHaveTextContent('Advanced');
    expect(tabElements[2]).toHaveTextContent('About');
  });

  it('marks the active tab with aria-selected="true"', () => {
    render(<Tabs {...defaultProps} activeId="advanced" />);
    const tabElements = screen.getAllByRole('tab');
    expect(tabElements[0]).toHaveAttribute('aria-selected', 'false');
    expect(tabElements[1]).toHaveAttribute('aria-selected', 'true');
    expect(tabElements[2]).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onChange with the tab id when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Tabs tabs={tabs} activeId="general" onChange={onChange} />);
    await user.click(screen.getByText('Advanced'));
    expect(onChange).toHaveBeenCalledWith('advanced');
  });

  it('applies the active class to the selected tab', () => {
    render(<Tabs {...defaultProps} activeId="general" />);
    const tabElements = screen.getAllByRole('tab');
    expect(tabElements[0].className).toContain('active');
    expect(tabElements[1].className).not.toContain('active');
  });

  it('defaults to md size', () => {
    render(<Tabs {...defaultProps} />);
    const tablist = screen.getByRole('tablist');
    expect(tablist.className).toContain('md');
  });

  it('applies sm size class', () => {
    render(<Tabs {...defaultProps} size="sm" />);
    const tablist = screen.getByRole('tablist');
    expect(tablist.className).toContain('sm');
  });

  it('applies additional className', () => {
    render(<Tabs {...defaultProps} className="extra" />);
    const tablist = screen.getByRole('tablist');
    expect(tablist.className).toContain('extra');
  });

  it('renders tabs as buttons', () => {
    render(<Tabs {...defaultProps} />);
    const tabElements = screen.getAllByRole('tab');
    tabElements.forEach((tab) => {
      expect(tab.tagName).toBe('BUTTON');
    });
  });
});
