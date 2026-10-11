import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, beforeEach, afterEach } from 'vitest';
import AppLayout from './AppLayout';

vi.mock('@/primitives/ToolbarButton/ToolbarButton', () => ({
  default: ({ onClick, 'aria-label': ariaLabel, title }: any) => (
    <button onClick={onClick} aria-label={ariaLabel} title={title}>
      {ariaLabel}
    </button>
  ),
}));

describe('AppLayout', () => {
  let matchMediaMatches: boolean;

  beforeEach(() => {
    matchMediaMatches = false;
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) => ({
        media: query,
        get matches() {
          return matchMediaMatches;
        },
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders topNav slot', () => {
    render(
      <AppLayout topNav={<div>Top Nav</div>}>
        <div>Content</div>
      </AppLayout>
    );
    expect(screen.getByText('Top Nav')).toBeTruthy();
  });

  it('renders children', () => {
    render(
      <AppLayout topNav={<div>Top Nav</div>}>
        <div>Content</div>
      </AppLayout>
    );
    expect(screen.getByText('Content')).toBeTruthy();
  });

  it('renders sideNav when provided', () => {
    render(
      <AppLayout topNav={<div>Top Nav</div>} sideNav={<div>Side Nav</div>}>
        <div>Content</div>
      </AppLayout>
    );
    expect(screen.getByText('Side Nav')).toBeTruthy();
  });

  it('renders panel when provided', () => {
    render(
      <AppLayout topNav={<div>Top Nav</div>} panel={<div>Panel</div>}>
        <div>Content</div>
      </AppLayout>
    );
    expect(screen.getByText('Panel')).toBeTruthy();
  });

  it('renders all slots together', () => {
    render(
      <AppLayout
        topNav={<div>Top Nav</div>}
        sideNav={<div>Side Nav</div>}
        panel={<div>Panel</div>}
      >
        <div>Content</div>
      </AppLayout>
    );
    expect(screen.getByText('Top Nav')).toBeTruthy();
    expect(screen.getByText('Side Nav')).toBeTruthy();
    expect(screen.getByText('Panel')).toBeTruthy();
    expect(screen.getByText('Content')).toBeTruthy();
  });

  it('omits sideNav when not provided', () => {
    const { container } = render(
      <AppLayout topNav={<div>Top Nav</div>}>
        <div>Content</div>
      </AppLayout>
    );
    expect(container.querySelector(`.sideNav`)).toBeNull();
  });

  it('does not render the mobile nav drawer on desktop', () => {
    render(
      <AppLayout
        topNav={<div>Top Nav</div>}
        sideNav={<div>Side Nav</div>}
        mobileNavOpen
      >
        <div>Content</div>
      </AppLayout>
    );
    expect(screen.queryByTestId('app-layout-mobile-nav')).toBeNull();
  });

  it('renders the mobile nav drawer when open on mobile', () => {
    matchMediaMatches = true;
    render(
      <AppLayout
        topNav={<div>Top Nav</div>}
        sideNav={<div>Drawer Nav</div>}
        mobileNavOpen
      >
        <div>Content</div>
      </AppLayout>
    );
    expect(screen.getByTestId('app-layout-mobile-nav')).toBeTruthy();
    expect(screen.getAllByText('Drawer Nav').length).toBeGreaterThanOrEqual(1);
  });

  it('calls onMobileNavOpenChange(false) when the drawer closes', async () => {
    matchMediaMatches = true;
    const user = userEvent.setup();
    const onMobileNavOpenChange = vi.fn();
    render(
      <AppLayout
        topNav={<div>Top Nav</div>}
        sideNav={<div>Drawer Nav</div>}
        mobileNavOpen
        onMobileNavOpenChange={onMobileNavOpenChange}
      >
        <div>Content</div>
      </AppLayout>
    );

    await user.click(screen.getByLabelText('Close'));
    expect(onMobileNavOpenChange).toHaveBeenCalledWith(false);
  });
});
