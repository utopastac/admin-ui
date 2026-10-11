import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditableText from './EditableText';

type WrapperProps = {
  initial?: string;
  onChangeSpy?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  ariaLabel?: string;
  onEditStart?: () => void;
  onEditEnd?: (reason: 'commit' | 'cancel') => void;
  onCancel?: () => void;
};

function Wrapper({
  initial = 'Initial',
  onChangeSpy,
  ...rest
}: WrapperProps) {
  const [val, setVal] = useState(initial);
  return (
    <EditableText
      value={val}
      onChange={(next) => {
        setVal(next);
        onChangeSpy?.(next);
      }}
      {...rest}
    />
  );
}

describe('EditableText', () => {
  it('renders the value as a span in display mode initially', () => {
    render(<Wrapper initial="Hello" />);
    const span = screen.getByRole('button', { name: 'Hello' });
    expect(span).toBeInTheDocument();
    expect(span.tagName).toBe('SPAN');
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('enters edit mode on double-click', async () => {
    const user = userEvent.setup();
    render(<Wrapper initial="Hello" />);
    const span = screen.getByRole('button', { name: 'Hello' });
    await user.dblClick(span);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('Hello');
  });

  it('enters edit mode when pressing Enter on the span', async () => {
    const user = userEvent.setup();
    render(<Wrapper initial="Hello" />);
    const span = screen.getByRole('button', { name: 'Hello' });
    span.focus();
    await user.keyboard('{Enter}');
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('Hello');
  });

  it('focuses the input and selects its text on entering edit mode', async () => {
    const user = userEvent.setup();
    render(<Wrapper initial="Hello" />);
    await user.dblClick(screen.getByRole('button', { name: 'Hello' }));
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(document.activeElement).toBe(input);
    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe(input.value.length);
  });

  it('commits on Enter: fires onChange with new value, exits edit mode, fires onEditEnd("commit")', async () => {
    const user = userEvent.setup();
    const onChangeSpy = vi.fn();
    const onEditEnd = vi.fn();
    render(<Wrapper initial="Hello" onChangeSpy={onChangeSpy} onEditEnd={onEditEnd} />);
    await user.dblClick(screen.getByRole('button', { name: 'Hello' }));
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await user.clear(input);
    await user.type(input, 'World');
    await user.keyboard('{Enter}');
    expect(onChangeSpy).toHaveBeenCalledWith('World');
    expect(onEditEnd).toHaveBeenCalledWith('commit');
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'World' })).toBeInTheDocument();
  });

  it('reverts on Escape: no onChange, exits edit mode, fires onCancel and onEditEnd("cancel")', async () => {
    const user = userEvent.setup();
    const onChangeSpy = vi.fn();
    const onCancel = vi.fn();
    const onEditEnd = vi.fn();
    render(
      <Wrapper
        initial="Hello"
        onChangeSpy={onChangeSpy}
        onCancel={onCancel}
        onEditEnd={onEditEnd}
      />,
    );
    await user.dblClick(screen.getByRole('button', { name: 'Hello' }));
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await user.clear(input);
    await user.type(input, 'Changed');
    await user.keyboard('{Escape}');
    expect(onChangeSpy).not.toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onEditEnd).toHaveBeenCalledWith('cancel');
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Hello' })).toBeInTheDocument();
  });

  it('commits on blur when the value is non-empty and changed', async () => {
    const user = userEvent.setup();
    const onChangeSpy = vi.fn();
    const onEditEnd = vi.fn();
    render(<Wrapper initial="Hello" onChangeSpy={onChangeSpy} onEditEnd={onEditEnd} />);
    await user.dblClick(screen.getByRole('button', { name: 'Hello' }));
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await user.clear(input);
    await user.type(input, 'World');
    await user.tab();
    expect(onChangeSpy).toHaveBeenCalledWith('World');
    expect(onEditEnd).toHaveBeenCalledWith('commit');
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('reverts on blur when the input is empty/whitespace-only', async () => {
    const user = userEvent.setup();
    const onChangeSpy = vi.fn();
    const onCancel = vi.fn();
    const onEditEnd = vi.fn();
    render(
      <Wrapper
        initial="Hello"
        onChangeSpy={onChangeSpy}
        onCancel={onCancel}
        onEditEnd={onEditEnd}
      />,
    );
    await user.dblClick(screen.getByRole('button', { name: 'Hello' }));
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await user.clear(input);
    await user.type(input, '   ');
    await user.tab();
    expect(onChangeSpy).not.toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onEditEnd).toHaveBeenCalledWith('cancel');
    expect(screen.getByRole('button', { name: 'Hello' })).toBeInTheDocument();
  });

  it('does not call onChange when committing an unchanged value but still exits edit mode and fires onEditEnd("commit")', async () => {
    const user = userEvent.setup();
    const onChangeSpy = vi.fn();
    const onEditEnd = vi.fn();
    render(<Wrapper initial="Hello" onChangeSpy={onChangeSpy} onEditEnd={onEditEnd} />);
    await user.dblClick(screen.getByRole('button', { name: 'Hello' }));
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('Hello');
    await user.keyboard('{Enter}');
    expect(onChangeSpy).not.toHaveBeenCalled();
    expect(onEditEnd).toHaveBeenCalledWith('commit');
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Hello' })).toBeInTheDocument();
  });

  it('fires onEditStart when entering edit mode', async () => {
    const user = userEvent.setup();
    const onEditStart = vi.fn();
    render(<Wrapper initial="Hello" onEditStart={onEditStart} />);
    await user.dblClick(screen.getByRole('button', { name: 'Hello' }));
    expect(onEditStart).toHaveBeenCalledTimes(1);
  });

  it('does nothing on double-click or Enter when disabled and is not focusable/role="button"', async () => {
    const user = userEvent.setup();
    const onEditStart = vi.fn();
    render(<Wrapper initial="Hello" disabled onEditStart={onEditStart} />);
    // No role="button" on the span when disabled.
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    const span = screen.getByText('Hello');
    // Not focusable.
    const tabIndex = span.getAttribute('tabindex');
    expect(tabIndex === null || tabIndex === '-1').toBe(true);
    // Double-click does nothing.
    await user.dblClick(span);
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(onEditStart).not.toHaveBeenCalled();
    // Enter key does nothing either.
    span.focus();
    await user.keyboard('{Enter}');
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(onEditStart).not.toHaveBeenCalled();
  });

  it('passes placeholder through to the input element', async () => {
    const user = userEvent.setup();
    render(<Wrapper initial="Hello" placeholder="Type a name" />);
    await user.dblClick(screen.getByRole('button', { name: 'Hello' }));
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Type a name');
  });

  it('applies ariaLabel to the span aria-label attribute', () => {
    render(<Wrapper initial="Hello" ariaLabel="Edit title" />);
    const span = screen.getByRole('button', { name: 'Edit title' });
    expect(span).toHaveAttribute('aria-label', 'Edit title');
  });
});
