import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DatePicker from './DatePicker';

const defaultProps = {
  value: '2026-03-05',
  onChange: vi.fn(),
};

describe('DatePicker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing (single mode)', () => {
    render(<DatePicker {...defaultProps} />);
    expect(screen.getByDisplayValue('Mar 5, 2026')).toBeInTheDocument();
  });

  it('shows label when provided', () => {
    render(<DatePicker {...defaultProps} label="Start Date" id="dp" />);
    expect(screen.getByText('Start Date')).toBeInTheDocument();
  });

  it('displays formatted date in input', () => {
    render(<DatePicker {...defaultProps} value="2026-12-25" />);
    expect(screen.getByDisplayValue('Dec 25, 2026')).toBeInTheDocument();
  });

  it('opens calendar on input click', async () => {
    const user = userEvent.setup();
    render(<DatePicker {...defaultProps} />);
    await user.click(screen.getByDisplayValue('Mar 5, 2026'));
    expect(screen.getByRole('grid', { name: /calendar/i })).toBeInTheDocument();
  });

  it('shows current month with correct days', async () => {
    const user = userEvent.setup();
    render(<DatePicker {...defaultProps} value="2026-03-05" />);
    await user.click(screen.getByDisplayValue('Mar 5, 2026'));
    // March 2026 header
    expect(screen.getByText('March 2026')).toBeInTheDocument();
    // March has 31 days
    expect(screen.getByRole('button', { name: '2026-03-01' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2026-03-31' })).toBeInTheDocument();
  });

  it('navigates to next month', async () => {
    const user = userEvent.setup();
    render(<DatePicker {...defaultProps} value="2026-03-05" />);
    await user.click(screen.getByDisplayValue('Mar 5, 2026'));
    await user.click(screen.getByRole('button', { name: /next month/i }));
    expect(screen.getByText('April 2026')).toBeInTheDocument();
  });

  it('navigates to previous month', async () => {
    const user = userEvent.setup();
    render(<DatePicker {...defaultProps} value="2026-03-05" />);
    await user.click(screen.getByDisplayValue('Mar 5, 2026'));
    await user.click(screen.getByRole('button', { name: /previous month/i }));
    expect(screen.getByText('February 2026')).toBeInTheDocument();
  });

  it('selecting a date calls onChange with YYYY-MM-DD string (single mode)', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DatePicker value="2026-03-05" onChange={onChange} />);
    await user.click(screen.getByDisplayValue('Mar 5, 2026'));
    await user.click(screen.getByRole('button', { name: '2026-03-10' }));
    expect(onChange).toHaveBeenCalledWith('2026-03-10');
  });

  it('closes after selection in single mode', async () => {
    const user = userEvent.setup();
    render(<DatePicker {...defaultProps} />);
    await user.click(screen.getByDisplayValue('Mar 5, 2026'));
    expect(screen.getByRole('grid', { name: /calendar/i })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '2026-03-10' }));
    expect(screen.queryByRole('grid', { name: /calendar/i })).not.toBeInTheDocument();
  });

  describe('range mode with empty value (calendar defaults to today)', () => {
    beforeEach(() => {
      vi.useFakeTimers({ toFake: ['Date'] });
      vi.setSystemTime(new Date('2026-03-15'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('selecting two dates calls onChange with [start, end] array', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <DatePicker
          mode="range"
          value={['', '']}
          onChange={onChange}
        />,
      );
      await user.click(screen.getByPlaceholderText('Select date range'));
      await user.click(screen.getByRole('button', { name: '2026-03-05' }));
      // Should not call onChange yet — only first date selected
      expect(onChange).not.toHaveBeenCalled();
      await user.click(screen.getByRole('button', { name: '2026-03-12' }));
      expect(onChange).toHaveBeenCalledWith(['2026-03-05', '2026-03-12']);
    });

    it('swaps dates if end is before start', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <DatePicker
          mode="range"
          value={['', '']}
          onChange={onChange}
        />,
      );
      await user.click(screen.getByPlaceholderText('Select date range'));
      await user.click(screen.getByRole('button', { name: '2026-03-20' }));
      await user.click(screen.getByRole('button', { name: '2026-03-05' }));
      expect(onChange).toHaveBeenCalledWith(['2026-03-05', '2026-03-20']);
    });
  });

  it('min/max disables out-of-range dates', async () => {
    const user = userEvent.setup();
    render(
      <DatePicker
        value="2026-03-15"
        onChange={vi.fn()}
        min="2026-03-10"
        max="2026-03-20"
      />,
    );
    await user.click(screen.getByDisplayValue('Mar 15, 2026'));
    // Day 5 should be disabled (before min)
    const day5 = screen.getByRole('button', { name: '2026-03-05' });
    expect(day5).toBeDisabled();
    // Day 25 should be disabled (after max)
    const day25 = screen.getByRole('button', { name: '2026-03-25' });
    expect(day25).toBeDisabled();
    // Day 15 should be enabled
    const day15 = screen.getByRole('button', { name: '2026-03-15' });
    expect(day15).not.toBeDisabled();
  });

  it('shows error text when error prop provided', () => {
    render(<DatePicker {...defaultProps} error="Date is required" />);
    expect(screen.getByText('Date is required')).toBeInTheDocument();
  });

  it('shows helper text when helperText prop provided', () => {
    render(<DatePicker {...defaultProps} helperText="Select a date" />);
    expect(screen.getByText('Select a date')).toBeInTheDocument();
  });

  it('does not show helper text when error is present', () => {
    render(
      <DatePicker
        {...defaultProps}
        error="Date is required"
        helperText="Select a date"
      />,
    );
    expect(screen.getByText('Date is required')).toBeInTheDocument();
    expect(screen.queryByText('Select a date')).not.toBeInTheDocument();
  });

  it('disabled state prevents opening', async () => {
    const user = userEvent.setup();
    render(<DatePicker {...defaultProps} disabled />);
    await user.click(screen.getByDisplayValue('Mar 5, 2026'));
    expect(screen.queryByRole('grid', { name: /calendar/i })).not.toBeInTheDocument();
  });

  it('closes on Escape key', async () => {
    const user = userEvent.setup();
    render(<DatePicker {...defaultProps} />);
    await user.click(screen.getByDisplayValue('Mar 5, 2026'));
    expect(screen.getByRole('grid', { name: /calendar/i })).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('grid', { name: /calendar/i })).not.toBeInTheDocument();
  });

  it('closes on click outside', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <span data-testid="outside">Outside</span>
        <DatePicker {...defaultProps} />
      </div>,
    );
    await user.click(screen.getByDisplayValue('Mar 5, 2026'));
    expect(screen.getByRole('grid', { name: /calendar/i })).toBeInTheDocument();
    await user.click(screen.getByTestId('outside'));
    expect(screen.queryByRole('grid', { name: /calendar/i })).not.toBeInTheDocument();
  });

  it('displays formatted range in input', () => {
    render(
      <DatePicker
        mode="range"
        value={['2026-03-05', '2026-03-12']}
        onChange={vi.fn()}
      />,
    );
    expect(screen.getByDisplayValue('Mar 5 \u2013 Mar 12, 2026')).toBeInTheDocument();
  });
});
