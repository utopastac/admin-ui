import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Textarea from './Textarea';

describe('Textarea', () => {
  it('renders without crashing', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Textarea label="Description" id="desc" />);
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('renders error message when error prop given', () => {
    render(<Textarea error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('renders helperText when provided', () => {
    render(<Textarea helperText="Maximum 500 characters" />);
    expect(screen.getByText('Maximum 500 characters')).toBeInTheDocument();
  });

  it('fires onChange with correct event', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} />);
    await user.type(screen.getByRole('textbox'), 'Hello');
    expect(handleChange).toHaveBeenCalled();
    const lastCall = handleChange.mock.calls[handleChange.mock.calls.length - 1][0];
    expect(lastCall.target.value).toBe('Hello');
  });

  it('disables the textarea when disabled prop is true', () => {
    render(<Textarea disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('sets rows attribute from rows prop', () => {
    render(<Textarea rows={6} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '6');
  });

  it('passes placeholder through to the textarea', () => {
    render(<Textarea placeholder="Enter your message here" />);
    expect(screen.getByPlaceholderText('Enter your message here')).toBeInTheDocument();
  });

  it('associates label with textarea via htmlFor and id', () => {
    render(<Textarea label="Feedback" id="feedback-textarea" />);
    const label = screen.getByText('Feedback');
    expect(label).toHaveAttribute('for', 'feedback-textarea');
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'feedback-textarea');
  });
});
