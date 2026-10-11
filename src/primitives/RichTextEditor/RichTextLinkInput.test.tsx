import { render, screen, fireEvent } from '@testing-library/react';
import RichTextLinkInput from './RichTextLinkInput';

describe('RichTextLinkInput', () => {
  it('renders URL input', () => {
    render(<RichTextLinkInput onSubmit={vi.fn()} onCancel={vi.fn()} />);
    expect(screen.getByLabelText('Link URL')).toBeTruthy();
  });

  it('renders Apply button', () => {
    render(<RichTextLinkInput onSubmit={vi.fn()} onCancel={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Apply' })).toBeTruthy();
  });

  it('renders Cancel button', () => {
    render(<RichTextLinkInput onSubmit={vi.fn()} onCancel={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeTruthy();
  });

  it('Apply button is disabled when input is empty', () => {
    render(<RichTextLinkInput onSubmit={vi.fn()} onCancel={vi.fn()} />);
    const applyButton = screen.getByRole('button', { name: 'Apply' }) as HTMLButtonElement;
    expect(applyButton.disabled).toBe(true);
  });

  it('Apply button is enabled when input has value', () => {
    render(<RichTextLinkInput onSubmit={vi.fn()} onCancel={vi.fn()} />);
    const input = screen.getByLabelText('Link URL');
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    const applyButton = screen.getByRole('button', { name: 'Apply' }) as HTMLButtonElement;
    expect(applyButton.disabled).toBe(false);
  });

  it('calls onSubmit with trimmed URL when form submitted', () => {
    const onSubmit = vi.fn();
    render(<RichTextLinkInput onSubmit={onSubmit} onCancel={vi.fn()} />);
    const input = screen.getByLabelText('Link URL');
    fireEvent.change(input, { target: { value: '  https://example.com  ' } });
    fireEvent.submit(input.closest('form')!);
    expect(onSubmit).toHaveBeenCalledWith('https://example.com');
  });

  it('does not call onSubmit when URL is empty', () => {
    const onSubmit = vi.fn();
    render(<RichTextLinkInput onSubmit={onSubmit} onCancel={vi.fn()} />);
    const input = screen.getByLabelText('Link URL');
    fireEvent.submit(input.closest('form')!);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('calls onCancel when Cancel clicked', () => {
    const onCancel = vi.fn();
    render(<RichTextLinkInput onSubmit={vi.fn()} onCancel={onCancel} />);
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when Escape pressed in input', () => {
    const onCancel = vi.fn();
    render(<RichTextLinkInput onSubmit={vi.fn()} onCancel={onCancel} />);
    const input = screen.getByLabelText('Link URL');
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('does not call onCancel when other key pressed in input', () => {
    const onCancel = vi.fn();
    render(<RichTextLinkInput onSubmit={vi.fn()} onCancel={onCancel} />);
    const input = screen.getByLabelText('Link URL');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onCancel).not.toHaveBeenCalled();
  });
});
