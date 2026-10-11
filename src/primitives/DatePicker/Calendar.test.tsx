import { render, screen, fireEvent } from '@testing-library/react';
import Calendar from './Calendar';

describe('Calendar', () => {
  const noop = () => {};

  // Use a fixed selectedDate to control which month is displayed
  const FIXED_DATE = '2025-06-15';

  it('renders a grid with role="grid" and aria-label="Calendar"', () => {
    render(
      <Calendar mode="single" selectedDate={FIXED_DATE} onSelectDate={noop} />,
    );
    expect(screen.getByRole('grid', { name: 'Calendar' })).toBeTruthy();
  });

  it('renders the month and year in the header', () => {
    render(
      <Calendar mode="single" selectedDate={FIXED_DATE} onSelectDate={noop} />,
    );
    expect(screen.getByText('June 2025')).toBeTruthy();
  });

  it('renders a "Previous month" button', () => {
    render(
      <Calendar mode="single" selectedDate={FIXED_DATE} onSelectDate={noop} />,
    );
    expect(screen.getByRole('button', { name: 'Previous month' })).toBeTruthy();
  });

  it('renders a "Next month" button', () => {
    render(
      <Calendar mode="single" selectedDate={FIXED_DATE} onSelectDate={noop} />,
    );
    expect(screen.getByRole('button', { name: 'Next month' })).toBeTruthy();
  });

  it('renders a day button for a specific date in the month', () => {
    render(
      <Calendar mode="single" selectedDate={FIXED_DATE} onSelectDate={noop} />,
    );
    // June 2025 has 30 days — check that the 15th is rendered
    expect(screen.getByRole('button', { name: '2025-06-15' })).toBeTruthy();
  });

  it('clicking Previous month navigates to the previous month', () => {
    render(
      <Calendar mode="single" selectedDate={FIXED_DATE} onSelectDate={noop} />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));
    expect(screen.getByText('May 2025')).toBeTruthy();
  });

  it('clicking Next month navigates to the next month', () => {
    render(
      <Calendar mode="single" selectedDate={FIXED_DATE} onSelectDate={noop} />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(screen.getByText('July 2025')).toBeTruthy();
  });

  it('navigating across a year boundary (December → January) works', () => {
    render(
      <Calendar mode="single" selectedDate="2025-12-01" onSelectDate={noop} />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(screen.getByText('January 2026')).toBeTruthy();
  });

  it('navigating backwards across a year boundary (January → December) works', () => {
    render(
      <Calendar mode="single" selectedDate="2025-01-01" onSelectDate={noop} />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));
    expect(screen.getByText('December 2024')).toBeTruthy();
  });

  it('calls onSelectDate with the correct date string when a day is clicked', () => {
    const onSelectDate = vi.fn();
    render(
      <Calendar mode="single" selectedDate={FIXED_DATE} onSelectDate={onSelectDate} />,
    );
    fireEvent.click(screen.getByRole('button', { name: '2025-06-20' }));
    expect(onSelectDate).toHaveBeenCalledTimes(1);
    expect(onSelectDate).toHaveBeenCalledWith('2025-06-20');
  });

  it('disables a day that is before the min date', () => {
    render(
      <Calendar
        mode="single"
        selectedDate={FIXED_DATE}
        onSelectDate={noop}
        min="2025-06-10"
      />,
    );
    const earlyButton = screen.getByRole('button', { name: '2025-06-05' });
    expect(earlyButton).toBeDisabled();
  });

  it('disables a day that is after the max date', () => {
    render(
      <Calendar
        mode="single"
        selectedDate={FIXED_DATE}
        onSelectDate={noop}
        max="2025-06-20"
      />,
    );
    const lateButton = screen.getByRole('button', { name: '2025-06-25' });
    expect(lateButton).toBeDisabled();
  });

  it('does not disable a day that is within min/max range', () => {
    render(
      <Calendar
        mode="single"
        selectedDate={FIXED_DATE}
        onSelectDate={noop}
        min="2025-06-10"
        max="2025-06-20"
      />,
    );
    const inRangeButton = screen.getByRole('button', { name: '2025-06-15' });
    expect(inRangeButton).not.toBeDisabled();
  });

  it('renders in range mode without crashing', () => {
    render(
      <Calendar
        mode="range"
        selectedDate="2025-06-10"
        selectedEndDate="2025-06-20"
        onSelectDate={noop}
      />,
    );
    expect(screen.getByRole('grid', { name: 'Calendar' })).toBeTruthy();
  });

  it('renders in single mode without crashing', () => {
    render(
      <Calendar mode="single" selectedDate={FIXED_DATE} onSelectDate={noop} />,
    );
    expect(screen.getByRole('grid', { name: 'Calendar' })).toBeTruthy();
  });

  it('renders all days of the month', () => {
    render(
      <Calendar mode="single" selectedDate={FIXED_DATE} onSelectDate={noop} />,
    );
    // June 2025 has 30 days
    expect(screen.getByRole('button', { name: '2025-06-01' })).toBeTruthy();
    expect(screen.getByRole('button', { name: '2025-06-30' })).toBeTruthy();
  });
});
