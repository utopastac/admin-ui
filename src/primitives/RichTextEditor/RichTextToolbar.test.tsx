import { render, screen, fireEvent } from '@testing-library/react';
import RichTextToolbar from './RichTextToolbar';

const defaultProps = {
  onBold: vi.fn(),
  onItalic: vi.fn(),
  onHeadingChange: vi.fn(),
  onLinkSubmit: vi.fn(),
  boldActive: false,
  italicActive: false,
  currentHeading: 'p',
  showLinkInput: false,
  onLinkButtonClick: vi.fn(),
  onLinkCancel: vi.fn(),
};

describe('RichTextToolbar', () => {
  it('renders Bold button', () => {
    render(<RichTextToolbar {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Bold' })).toBeTruthy();
  });

  it('renders Italic button', () => {
    render(<RichTextToolbar {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Italic' })).toBeTruthy();
  });

  it('renders Insert link button', () => {
    render(<RichTextToolbar {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Insert link' })).toBeTruthy();
  });

  it('calls onBold when Bold clicked', () => {
    const onBold = vi.fn();
    render(<RichTextToolbar {...defaultProps} onBold={onBold} />);
    fireEvent.click(screen.getByRole('button', { name: 'Bold' }));
    expect(onBold).toHaveBeenCalledTimes(1);
  });

  it('calls onItalic when Italic clicked', () => {
    const onItalic = vi.fn();
    render(<RichTextToolbar {...defaultProps} onItalic={onItalic} />);
    fireEvent.click(screen.getByRole('button', { name: 'Italic' }));
    expect(onItalic).toHaveBeenCalledTimes(1);
  });

  it('calls onLinkButtonClick when link button clicked', () => {
    const onLinkButtonClick = vi.fn();
    render(<RichTextToolbar {...defaultProps} onLinkButtonClick={onLinkButtonClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Insert link' }));
    expect(onLinkButtonClick).toHaveBeenCalledTimes(1);
  });

  it('link input is not shown when showLinkInput=false', () => {
    render(<RichTextToolbar {...defaultProps} showLinkInput={false} />);
    expect(screen.queryByLabelText('Link URL')).toBeNull();
  });

  it('link input is shown when showLinkInput=true', () => {
    render(<RichTextToolbar {...defaultProps} showLinkInput />);
    expect(screen.getByLabelText('Link URL')).toBeTruthy();
  });

  it('renders without crash when disabled=true', () => {
    render(<RichTextToolbar {...defaultProps} disabled />);
    expect(screen.getByRole('button', { name: 'Bold' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Italic' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Insert link' })).toBeTruthy();
  });

  it('passes onLinkSubmit and onLinkCancel to link input when shown', () => {
    const onLinkCancel = vi.fn();
    render(<RichTextToolbar {...defaultProps} showLinkInput onLinkCancel={onLinkCancel} />);
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onLinkCancel).toHaveBeenCalledTimes(1);
  });
});
