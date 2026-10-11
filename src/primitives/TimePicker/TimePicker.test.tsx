import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TimePicker from './TimePicker';

describe('TimePicker', () => {
  const defaultProps = {
    value: '09:00',
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing with required props', () => {
    render(<TimePicker {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('shows label when provided', () => {
    render(<TimePicker {...defaultProps} label="Start Time" id="start" />);
    expect(screen.getByText('Start Time')).toBeInTheDocument();
  });

  it('displays formatted time in input (24h format)', () => {
    render(<TimePicker {...defaultProps} value="14:30" />);
    expect(screen.getByRole('textbox')).toHaveValue('14:30');
  });

  it('displays formatted time in input (12h format, shows AM/PM)', () => {
    render(<TimePicker {...defaultProps} value="14:30" format="12h" />);
    expect(screen.getByRole('textbox')).toHaveValue('2:30 PM');
  });

  it('opens dropdown on input click', async () => {
    const user = userEvent.setup();
    render(<TimePicker {...defaultProps} />);
    await user.click(screen.getByRole('textbox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('shows time slots at correct interval (default 30 min)', async () => {
    const user = userEvent.setup();
    render(<TimePicker {...defaultProps} />);
    await user.click(screen.getByRole('textbox'));
    // 24 hours * 2 slots per hour = 48 slots
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(48);
  });

  it('shows time slots at custom interval (15 min)', async () => {
    const user = userEvent.setup();
    render(<TimePicker {...defaultProps} interval={15} />);
    await user.click(screen.getByRole('textbox'));
    // 24 hours * 4 slots per hour = 96 slots
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(96);
  });

  it('selecting a slot calls onChange with HH:mm value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TimePicker value="" onChange={onChange} />);
    await user.click(screen.getByRole('textbox'));
    // Click the "10:00" slot
    await user.click(screen.getByRole('option', { name: '10:00' }));
    expect(onChange).toHaveBeenCalledWith('10:00');
  });

  it('closes dropdown after selection', async () => {
    const user = userEvent.setup();
    render(<TimePicker {...defaultProps} />);
    await user.click(screen.getByRole('textbox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.click(screen.getByRole('option', { name: '10:00' }));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('min/max disables out-of-range time slots', async () => {
    const user = userEvent.setup();
    render(
      <TimePicker {...defaultProps} min="09:00" max="17:00" />,
    );
    await user.click(screen.getByRole('textbox'));
    // 08:30 should be disabled
    const earlySlot = screen.getByRole('option', { name: '08:30' });
    expect(earlySlot).toBeDisabled();
    // 17:30 should be disabled
    const lateSlot = screen.getByRole('option', { name: '17:30' });
    expect(lateSlot).toBeDisabled();
    // 09:00 should not be disabled
    const validSlot = screen.getByRole('option', { name: '09:00' });
    expect(validSlot).not.toBeDisabled();
  });

  it('shows error text when error prop provided', () => {
    render(<TimePicker {...defaultProps} error="Invalid time" />);
    expect(screen.getByText('Invalid time')).toBeInTheDocument();
  });

  it('shows helper text when helperText prop provided', () => {
    render(<TimePicker {...defaultProps} helperText="Select a time" />);
    expect(screen.getByText('Select a time')).toBeInTheDocument();
  });

  it('disabled state prevents opening dropdown', async () => {
    const user = userEvent.setup();
    render(<TimePicker {...defaultProps} disabled />);
    await user.click(screen.getByRole('textbox'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes on Escape key', async () => {
    const user = userEvent.setup();
    render(<TimePicker {...defaultProps} />);
    await user.click(screen.getByRole('textbox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes on click outside', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <span data-testid="outside">Outside</span>
        <TimePicker {...defaultProps} />
      </div>,
    );
    await user.click(screen.getByRole('textbox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.click(screen.getByTestId('outside'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
