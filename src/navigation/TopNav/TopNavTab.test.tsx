import { render, screen, fireEvent, act } from '@testing-library/react';
import { useRef, useState } from 'react';
import { Star } from 'lucide-react';
import TopNavTab from './TopNavTab';
import type { TopNavTabData } from './TopNavTab';

const tab: TopNavTabData = { id: 'home', label: 'Home' };

const dropdownTab: TopNavTabData = {
  id: 'create',
  label: 'Create',
  dropdownGroups: [
    {
      header: 'Content',
      items: [
        { id: 'new-flow', label: 'New Flow', onClick: vi.fn() },
        { id: 'new-template', label: 'New Template', icon: Star, onClick: vi.fn() },
      ],
    },
    {
      header: 'Tools',
      items: [
        { id: 'disabled-item', label: 'Disabled', disabled: true, onClick: vi.fn() },
      ],
    },
  ],
};

/**
 * Mirrors the open/close state management that TopNav provides.
 * Required because TopNavTab dropdown is fully controlled by its parent.
 */
function DropdownWrapper({ tab, ...rest }: React.ComponentProps<typeof TopNavTab>) {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsOpen(true);
  };
  const scheduleClose = () => {
    timerRef.current = setTimeout(() => setIsOpen(false), 150);
  };
  const closeDropdown = () => setIsOpen(false);

  return (
    <TopNavTab
      tab={tab}
      isDropdownOpen={isOpen}
      onDropdownOpen={openDropdown}
      onDropdownClose={closeDropdown}
      onDropdownScheduleClose={scheduleClose}
      {...rest}
    />
  );
}

// --- Plain tab (no dropdown) ---

describe('TopNavTab — plain', () => {
  it('renders tab label', () => {
    render(<TopNavTab tab={tab} />);
    expect(screen.getByText('Home')).toBeTruthy();
  });

  it('renders as a button element', () => {
    render(<TopNavTab tab={tab} />);
    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('calls onSelect with tab id when clicked', () => {
    const onSelect = vi.fn();
    render(<TopNavTab tab={tab} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onSelect).toHaveBeenCalledWith('home');
  });

  it('does not throw when onSelect is not provided', () => {
    render(<TopNavTab tab={tab} />);
    expect(() => fireEvent.click(screen.getByRole('button'))).not.toThrow();
  });

  it('works with size="lg"', () => {
    render(<TopNavTab tab={tab} size="lg" />);
    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('works with size="sm" (default)', () => {
    render(<TopNavTab tab={tab} size="sm" />);
    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('renders as active when isActive=true', () => {
    render(<TopNavTab tab={tab} isActive />);
    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('calls onSelect with the correct id for a different tab', () => {
    const onSelect = vi.fn();
    const otherTab: TopNavTabData = { id: 'settings', label: 'Settings' };
    render(<TopNavTab tab={otherTab} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onSelect).toHaveBeenCalledWith('settings');
  });
});

// --- Dropdown tab ---

describe('TopNavTab — dropdown', () => {
  it('renders the trigger button with aria-haspopup="menu"', () => {
    render(<DropdownWrapper tab={dropdownTab} />);
    expect(screen.getByRole('button', { name: /create/i })).toHaveAttribute('aria-haspopup', 'menu');
  });

  it('starts with the dropdown closed (aria-expanded="false")', () => {
    render(<DropdownWrapper tab={dropdownTab} />);
    expect(screen.getByRole('button', { name: /create/i })).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens the dropdown on mouseEnter of the wrapper', () => {
    const { container } = render(<DropdownWrapper tab={dropdownTab} />);
    fireEvent.mouseEnter(container.firstElementChild as HTMLElement);
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('closes the dropdown on mouseLeave after delay', () => {
    vi.useFakeTimers();
    const { container } = render(<DropdownWrapper tab={dropdownTab} />);
    const wrapper = container.firstElementChild as HTMLElement;

    fireEvent.mouseEnter(wrapper);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    fireEvent.mouseLeave(wrapper);
    act(() => { vi.advanceTimersByTime(200); });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    vi.useRealTimers();
  });

  it('renders group headers', () => {
    const { container } = render(<DropdownWrapper tab={dropdownTab} />);
    fireEvent.mouseEnter(container.firstElementChild as HTMLElement);
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Tools')).toBeInTheDocument();
  });

  it('renders a divider between groups', () => {
    const { container } = render(<DropdownWrapper tab={dropdownTab} />);
    fireEvent.mouseEnter(container.firstElementChild as HTMLElement);
    expect(screen.getAllByRole('separator').length).toBeGreaterThanOrEqual(1);
  });

  it('renders all item labels', () => {
    const { container } = render(<DropdownWrapper tab={dropdownTab} />);
    fireEvent.mouseEnter(container.firstElementChild as HTMLElement);
    expect(screen.getByText('New Flow')).toBeInTheDocument();
    expect(screen.getByText('New Template')).toBeInTheDocument();
    expect(screen.getByText('Disabled')).toBeInTheDocument();
  });

  it('calls item onClick and closes the dropdown when an item is clicked', () => {
    const onClick = vi.fn();
    const t: TopNavTabData = {
      id: 'menu', label: 'Menu',
      dropdownGroups: [{ items: [{ id: 'a', label: 'Alpha', onClick }] }],
    };
    const { container } = render(<DropdownWrapper tab={t} />);
    fireEvent.mouseEnter(container.firstElementChild as HTMLElement);
    fireEvent.click(screen.getByText('Alpha'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('does not call onClick for a disabled item', () => {
    const onClick = vi.fn();
    const t: TopNavTabData = {
      id: 'menu', label: 'Menu',
      dropdownGroups: [{ items: [{ id: 'a', label: 'Locked', disabled: true, onClick }] }],
    };
    const { container } = render(<DropdownWrapper tab={t} />);
    fireEvent.mouseEnter(container.firstElementChild as HTMLElement);
    fireEvent.click(screen.getByText('Locked'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('opens the dropdown on ArrowDown keydown', () => {
    render(<DropdownWrapper tab={dropdownTab} />);
    fireEvent.keyDown(screen.getByRole('button', { name: /create/i }), { key: 'ArrowDown' });
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('opens the dropdown on Enter keydown', () => {
    render(<DropdownWrapper tab={dropdownTab} />);
    fireEvent.keyDown(screen.getByRole('button', { name: /create/i }), { key: 'Enter' });
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('closes the dropdown on Escape from the trigger', () => {
    const { container } = render(<DropdownWrapper tab={dropdownTab} />);
    fireEvent.mouseEnter(container.firstElementChild as HTMLElement);
    fireEvent.keyDown(screen.getByRole('button', { name: /create/i }), { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes the dropdown on Escape from an item', () => {
    const { container } = render(<DropdownWrapper tab={dropdownTab} />);
    fireEvent.mouseEnter(container.firstElementChild as HTMLElement);
    const item = screen.getByText('New Flow').closest('[role="menuitem"]') as HTMLElement;
    fireEvent.keyDown(item, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('does not call onSelect when the dropdown trigger is interacted with', () => {
    const onSelect = vi.fn();
    const { container } = render(<DropdownWrapper tab={dropdownTab} onSelect={onSelect} />);
    fireEvent.mouseEnter(container.firstElementChild as HTMLElement);
    expect(onSelect).not.toHaveBeenCalled();
  });
});
