import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useRef } from 'react';
import Popover from './Popover';

function TestHarness({
  isOpen,
  onClose,
  matchWidth,
  className,
}: {
  isOpen: boolean;
  onClose: () => void;
  matchWidth?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button ref={ref}>Anchor</button>
      <Popover isOpen={isOpen} onClose={onClose} anchorRef={ref} matchWidth={matchWidth} className={className}>
        <div>Popover content</div>
      </Popover>
    </>
  );
}

describe('Popover', () => {
  it('renders nothing when closed', () => {
    render(<TestHarness isOpen={false} onClose={() => {}} />);
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
  });

  it('renders content when open', () => {
    render(<TestHarness isOpen={false} onClose={() => {}} />);
    // Re-render as open
    render(<TestHarness isOpen={true} onClose={() => {}} />);
    expect(screen.getByText('Popover content')).toBeInTheDocument();
  });

  it('portals content to document.body', () => {
    const { container } = render(<TestHarness isOpen={true} onClose={() => {}} />);
    // Content should NOT be inside the container — it's portaled
    expect(container.querySelector('[class*="popover"]')).toBeNull();
    // But it should be in the document
    expect(screen.getByText('Popover content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<TestHarness isOpen={true} onClose={() => {}} className="my-custom" />);
    const content = screen.getByText('Popover content').parentElement;
    expect(content).toHaveClass('my-custom');
  });

  it('calls onClose on Escape key', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<TestHarness isOpen={true} onClose={onClose} />);
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on click outside', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <TestHarness isOpen={true} onClose={onClose} />
      </div>,
    );
    await user.click(screen.getByTestId('outside'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking inside the popover', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<TestHarness isOpen={true} onClose={onClose} />);
    await user.click(screen.getByText('Popover content'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not call onClose when clicking the anchor', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<TestHarness isOpen={true} onClose={onClose} />);
    await user.click(screen.getByText('Anchor'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not close parent when clicking inside a nested popover', async () => {
    const user = userEvent.setup();
    const parentClose = vi.fn();

    function NestedHarness() {
      const parentAnchor = useRef<HTMLButtonElement>(null);
      const childAnchor = useRef<HTMLButtonElement>(null);
      return (
        <>
          <button ref={parentAnchor}>Parent Anchor</button>
          <Popover isOpen={true} onClose={parentClose} anchorRef={parentAnchor}>
            <div>
              <button ref={childAnchor}>Child Anchor</button>
              <Popover isOpen={true} onClose={() => {}} anchorRef={childAnchor}>
                <div>Child content</div>
              </Popover>
            </div>
          </Popover>
        </>
      );
    }

    render(<NestedHarness />);
    await user.click(screen.getByText('Child content'));
    expect(parentClose).not.toHaveBeenCalled();
  });
});
