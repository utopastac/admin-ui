import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tooltip from './Tooltip';

describe('Tooltip', () => {
  it('renders children without tooltip in the DOM by default', () => {
    render(
      <Tooltip content="Help text">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('does not set aria-describedby on the trigger when hidden', () => {
    render(
      <Tooltip content="Help text">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-describedby');
  });

  it('shows tooltip on mouseenter and removes it from DOM on mouseleave', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Help text">
        <button>Hover me</button>
      </Tooltip>
    );

    await user.hover(screen.getByRole('button'));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByRole('tooltip')).toHaveTextContent('Help text');

    await user.unhover(screen.getByRole('button'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip on focus and removes it on blur', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Help text">
        <button>Hover me</button>
      </Tooltip>
    );

    await user.tab();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    await user.tab();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('applies the top placement class by default', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Help text">
        <button>Hover me</button>
      </Tooltip>
    );

    await user.hover(screen.getByRole('button'));
    expect(screen.getByRole('tooltip').className).toContain('top');
  });

  it('applies the bottom placement class', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Help text" placement="bottom">
        <button>Hover me</button>
      </Tooltip>
    );

    await user.hover(screen.getByRole('button'));
    expect(screen.getByRole('tooltip').className).toContain('bottom');
  });

  it('applies the left placement class', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Help text" placement="left">
        <button>Hover me</button>
      </Tooltip>
    );

    await user.hover(screen.getByRole('button'));
    expect(screen.getByRole('tooltip').className).toContain('left');
  });

  it('applies the right placement class', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Help text" placement="right">
        <button>Hover me</button>
      </Tooltip>
    );

    await user.hover(screen.getByRole('button'));
    expect(screen.getByRole('tooltip').className).toContain('right');
  });

  it('has role="tooltip" on the tooltip element', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Help text">
        <button>Hover me</button>
      </Tooltip>
    );

    await user.hover(screen.getByRole('button'));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('sets aria-describedby on the trigger pointing to the tooltip element when visible', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Help text">
        <button>Hover me</button>
      </Tooltip>
    );

    const trigger = screen.getByRole('button');
    expect(trigger).not.toHaveAttribute('aria-describedby');

    await user.hover(trigger);
    const tooltip = screen.getByRole('tooltip');
    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);
  });

  describe('delay prop', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('delays showing the tooltip by the specified amount', () => {
      render(
        <Tooltip content="Help text" delay={300}>
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(300);
      });
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    it('cancels the delayed tooltip on mouseleave before delay completes', () => {
      render(
        <Tooltip content="Help text" delay={300}>
          <button>Hover me</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button'));
      act(() => {
        vi.advanceTimersByTime(100);
      });
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

      fireEvent.mouseLeave(screen.getByRole('button'));
      act(() => {
        vi.advanceTimersByTime(300);
      });
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('applies custom className to the wrapper', () => {
    const { container } = render(
      <Tooltip content="Help text" className="custom-class">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(container.firstElementChild?.className).toContain('custom-class');
  });
});
