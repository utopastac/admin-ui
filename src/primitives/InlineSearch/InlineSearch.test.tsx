import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InlineSearch from './InlineSearch';

describe('InlineSearch', () => {
  it('renders the input', () => {
    render(<InlineSearch value="" onChange={() => {}} placeholder="Filter…" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('calls onChange when typing', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<InlineSearch value="" onChange={handleChange} />);
    await user.type(screen.getByRole('textbox'), 'a');
    expect(handleChange).toHaveBeenCalledWith('a');
  });

  it('shows clear button when value is non-empty', () => {
    render(<InlineSearch value="hello" onChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
  });

  it('does not show clear button when value is empty', () => {
    render(<InlineSearch value="" onChange={() => {}} />);
    expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
  });

  it('calls onChange with empty string when clear is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<InlineSearch value="hello" onChange={handleChange} />);
    await user.click(screen.getByRole('button', { name: 'Clear' }));
    expect(handleChange).toHaveBeenCalledWith('');
  });

  it('does not show clear button when clearable is false', () => {
    render(<InlineSearch value="hello" onChange={() => {}} clearable={false} />);
    expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
  });
});
