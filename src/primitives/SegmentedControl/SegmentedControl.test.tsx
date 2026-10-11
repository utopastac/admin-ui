import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SegmentedControl from './SegmentedControl';

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' },
];

const optionsWithDisabled = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two', disabled: true },
  { value: 'three', label: 'Three' },
];

describe('SegmentedControl', () => {
  const defaultProps = {
    options,
    value: 'one',
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders a radiogroup with correct number of radio buttons', () => {
    render(<SegmentedControl {...defaultProps} />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('renders correct label text for each radio', () => {
    render(<SegmentedControl {...defaultProps} />);
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
    expect(screen.getByText('Three')).toBeInTheDocument();
  });

  it('marks the selected value with aria-checked="true" and others "false"', () => {
    render(<SegmentedControl {...defaultProps} value="two" />);
    const radios = screen.getAllByRole('radio');
    expect(radios[0]).toHaveAttribute('aria-checked', 'false');
    expect(radios[1]).toHaveAttribute('aria-checked', 'true');
    expect(radios[2]).toHaveAttribute('aria-checked', 'false');
  });

  it('marks the selected option with data-selected and others unselected', () => {
    render(<SegmentedControl {...defaultProps} value="two" />);
    const radios = screen.getAllByRole('radio');
    expect(radios[1]).toHaveAttribute('data-selected', 'true');
    expect(radios[0]).toHaveAttribute('data-selected', 'false');
    expect(radios[2]).toHaveAttribute('data-selected', 'false');
  });

  it('calls onChange with the value when an option is clicked', async () => {
    const user = userEvent.setup();
    render(<SegmentedControl {...defaultProps} />);
    await user.click(screen.getByText('Two'));
    expect(defaultProps.onChange).toHaveBeenCalledWith('two');
  });

  it('does not call onChange when a disabled segment is clicked', async () => {
    const user = userEvent.setup();
    render(<SegmentedControl {...defaultProps} options={optionsWithDisabled} />);
    await user.click(screen.getByText('Two'));
    expect(defaultProps.onChange).not.toHaveBeenCalled();
  });

  it('sets disabled attribute on a disabled option', () => {
    render(<SegmentedControl {...defaultProps} options={optionsWithDisabled} />);
    const radios = screen.getAllByRole('radio');
    expect(radios[1]).toBeDisabled();
    expect(radios[0]).not.toBeDisabled();
    expect(radios[2]).not.toBeDisabled();
  });

  it('disables all buttons when the whole control is disabled', () => {
    render(<SegmentedControl {...defaultProps} disabled />);
    const radios = screen.getAllByRole('radio');
    radios.forEach((radio) => {
      expect(radio).toBeDisabled();
    });
  });

  it('defaults to md class on the container', () => {
    render(<SegmentedControl {...defaultProps} />);
    const container = screen.getByTestId('segmented-control');
    expect(container.className).toContain('md');
  });

  it('applies sm class when size="sm"', () => {
    render(<SegmentedControl {...defaultProps} size="sm" />);
    const container = screen.getByTestId('segmented-control');
    expect(container.className).toContain('sm');
  });

  it('applies additional className to the container', () => {
    render(<SegmentedControl {...defaultProps} className="custom-class" />);
    const container = screen.getByTestId('segmented-control');
    expect(container.className).toContain('custom-class');
  });

  it('moves to next option on ArrowRight and calls onChange', async () => {
    const user = userEvent.setup();
    render(<SegmentedControl {...defaultProps} value="one" />);
    const radios = screen.getAllByRole('radio');
    radios[0].focus();
    await user.keyboard('{ArrowRight}');
    expect(defaultProps.onChange).toHaveBeenCalledWith('two');
  });

  it('wraps from first to last option on ArrowLeft', async () => {
    const user = userEvent.setup();
    render(<SegmentedControl {...defaultProps} value="one" />);
    const radios = screen.getAllByRole('radio');
    radios[0].focus();
    await user.keyboard('{ArrowLeft}');
    expect(defaultProps.onChange).toHaveBeenCalledWith('three');
  });

  it('skips disabled options on ArrowRight', async () => {
    const user = userEvent.setup();
    render(
      <SegmentedControl
        {...defaultProps}
        options={optionsWithDisabled}
        value="one"
      />
    );
    const radios = screen.getAllByRole('radio');
    radios[0].focus();
    await user.keyboard('{ArrowRight}');
    expect(defaultProps.onChange).toHaveBeenCalledWith('three');
  });

  describe('icon support', () => {
    const MockIcon = ({ size }: { size?: number }) => (
      <svg data-testid="mock-icon" width={size} height={size} />
    );

    const iconOnlyOptions = [
      { value: 'left', icon: MockIcon as any, ariaLabel: 'Align left' },
      { value: 'center', icon: MockIcon as any, ariaLabel: 'Align center' },
      { value: 'right', icon: MockIcon as any, ariaLabel: 'Align right' },
    ];

    const iconLabelOptions = [
      { value: 'list', label: 'List', icon: MockIcon as any },
      { value: 'grid', label: 'Grid', icon: MockIcon as any },
    ];

    it('renders icons when icon is provided', () => {
      render(
        <SegmentedControl
          options={iconOnlyOptions}
          value="left"
          onChange={vi.fn()}
        />
      );
      expect(screen.getAllByTestId('mock-icon')).toHaveLength(3);
    });

    it('sets aria-label on icon-only buttons using ariaLabel', () => {
      render(
        <SegmentedControl
          options={iconOnlyOptions}
          value="left"
          onChange={vi.fn()}
        />
      );
      const radios = screen.getAllByRole('radio');
      expect(radios[0]).toHaveAttribute('aria-label', 'Align left');
      expect(radios[1]).toHaveAttribute('aria-label', 'Align center');
      expect(radios[2]).toHaveAttribute('aria-label', 'Align right');
    });

    it('falls back to value as aria-label when ariaLabel is absent', () => {
      const opts = [{ value: 'bold', icon: MockIcon as any }];
      render(
        <SegmentedControl options={opts} value="bold" onChange={vi.fn()} />
      );
      expect(screen.getByRole('radio')).toHaveAttribute('aria-label', 'bold');
    });

    it('does not set aria-label when label is present and no ariaLabel is provided', () => {
      render(
        <SegmentedControl
          options={iconLabelOptions}
          value="list"
          onChange={vi.fn()}
        />
      );
      const radios = screen.getAllByRole('radio');
      expect(radios[0]).not.toHaveAttribute('aria-label');
      expect(radios[1]).not.toHaveAttribute('aria-label');
    });

    it('honors an explicit ariaLabel even when a visible label is present', () => {
      const opts = [
        { value: 'list', icon: MockIcon as any, label: 'List', ariaLabel: 'List view' },
        { value: 'grid', icon: MockIcon as any, label: 'Grid', ariaLabel: 'Grid view' },
      ];
      render(<SegmentedControl options={opts} value="list" onChange={vi.fn()} />);
      const radios = screen.getAllByRole('radio');
      expect(radios[0]).toHaveAttribute('aria-label', 'List view');
      expect(radios[1]).toHaveAttribute('aria-label', 'Grid view');
    });

    it('renders both icon and label when both provided', () => {
      render(
        <SegmentedControl
          options={iconLabelOptions}
          value="list"
          onChange={vi.fn()}
        />
      );
      expect(screen.getAllByTestId('mock-icon')).toHaveLength(2);
      expect(screen.getByText('List')).toBeInTheDocument();
      expect(screen.getByText('Grid')).toBeInTheDocument();
    });
  });

  describe('numeric values', () => {
    const numericOptions = [
      { value: 0, label: '0%' },
      { value: 50, label: '50%' },
      { value: 100, label: '100%' },
    ];

    it('marks the selected numeric option with aria-checked="true"', () => {
      render(
        <SegmentedControl
          options={numericOptions}
          value={50}
          onChange={vi.fn()}
        />
      );
      const radios = screen.getAllByRole('radio');
      expect(radios[0]).toHaveAttribute('aria-checked', 'false');
      expect(radios[1]).toHaveAttribute('aria-checked', 'true');
      expect(radios[2]).toHaveAttribute('aria-checked', 'false');
    });

    it('calls onChange with a number when a numeric option is clicked', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(
        <SegmentedControl
          options={numericOptions}
          value={0}
          onChange={onChange}
        />
      );
      await user.click(screen.getByText('100%'));
      expect(onChange).toHaveBeenCalledWith(100);
      expect(typeof onChange.mock.calls[0][0]).toBe('number');
    });

    it('falls back to stringified numeric value for aria-label when no label', () => {
      const MockIcon = ({ size }: { size?: number }) => (
        <svg data-testid="num-icon" width={size} height={size} />
      );
      const opts = [{ value: 42, icon: MockIcon as any }];
      render(
        <SegmentedControl options={opts} value={42} onChange={vi.fn()} />
      );
      expect(screen.getByRole('radio')).toHaveAttribute('aria-label', '42');
    });
  });

  describe('ReactNode labels', () => {
    it('renders a ReactNode label inside the segment', () => {
      const options = [
        {
          value: 'custom',
          label: <span data-testid="custom-label">Custom node</span>,
        },
        { value: 'plain', label: 'Plain' },
      ];
      render(
        <SegmentedControl
          options={options}
          value="custom"
          onChange={vi.fn()}
        />
      );
      const customLabel = screen.getByTestId('custom-label');
      expect(customLabel).toBeInTheDocument();
      expect(customLabel).toHaveTextContent('Custom node');
      // should still be inside a radio segment
      expect(customLabel.closest('button[role="radio"]')).not.toBeNull();
    });

    it('treats a ReactNode label as present for aria-label suppression', () => {
      const options = [
        {
          value: 'svg',
          label: <svg data-testid="inline-svg" width={12} height={12} />,
        },
      ];
      render(
        <SegmentedControl options={options} value="svg" onChange={vi.fn()} />
      );
      const radio = screen.getByRole('radio');
      expect(radio).not.toHaveAttribute('aria-label');
      expect(screen.getByTestId('inline-svg')).toBeInTheDocument();
    });
  });

  describe('data-value', () => {
    it('emits data-value on every segment for stable test targeting', () => {
      const opts = [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
        { value: 42, label: '42' },
      ];
      render(<SegmentedControl options={opts} value="a" onChange={vi.fn()} />);
      const radios = screen.getAllByRole('radio');
      expect(radios[0]).toHaveAttribute('data-value', 'a');
      expect(radios[1]).toHaveAttribute('data-value', 'b');
      expect(radios[2]).toHaveAttribute('data-value', '42');
    });
  });

  describe('pinned options', () => {
    const pinnedOptions = [
      { value: 'all', label: 'All', pin: 'left' as const },
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
      { value: 'three', label: 'Three' },
      { value: 'custom', label: 'Custom', pin: 'right' as const },
    ];

    it('renders pinned and unpinned options', () => {
      render(<SegmentedControl options={pinnedOptions} value="all" onChange={vi.fn()} />);
      expect(screen.getAllByRole('radio')).toHaveLength(5);
    });

    it('all options are selectable regardless of pin', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<SegmentedControl options={pinnedOptions} value="all" onChange={onChange} />);
      await user.click(screen.getByText('Custom'));
      expect(onChange).toHaveBeenCalledWith('custom');
    });

    it('keyboard nav traverses pinned and unpinned in order', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<SegmentedControl options={pinnedOptions} value="all" onChange={onChange} />);
      screen.getAllByRole('radio')[0].focus();
      await user.keyboard('{ArrowRight}');
      expect(onChange).toHaveBeenCalledWith('one');
    });
  });
});
