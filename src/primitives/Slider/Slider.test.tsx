import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Slider from './Slider';

describe('Slider', () => {
  const defaultProps = {
    value: 50,
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders a slider element', () => {
    render(<Slider {...defaultProps} />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('sets aria-valuemin, aria-valuemax, and aria-valuenow', () => {
    render(<Slider {...defaultProps} min={10} max={200} value={75} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '10');
    expect(slider).toHaveAttribute('aria-valuemax', '200');
    expect(slider).toHaveAttribute('aria-valuenow', '75');
  });

  it('sets aria-orientation to horizontal', () => {
    render(<Slider {...defaultProps} />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('applies md size class by default', () => {
    const { container } = render(<Slider {...defaultProps} />);
    expect(container.firstElementChild?.className).toContain('md');
  });

  it('applies sm size class', () => {
    const { container } = render(<Slider {...defaultProps} size="sm" />);
    expect(container.firstElementChild?.className).toContain('sm');
  });

  it('applies disabled class and aria-disabled', () => {
    const { container } = render(<Slider {...defaultProps} disabled />);
    expect(container.firstElementChild?.className).toContain('disabled');
    expect(screen.getByRole('slider')).toHaveAttribute('aria-disabled', 'true');
  });

  it('sets tabIndex to -1 when disabled', () => {
    render(<Slider {...defaultProps} disabled />);
    expect(screen.getByRole('slider')).toHaveAttribute('tabindex', '-1');
  });

  it('sets tabIndex to 0 when not disabled', () => {
    render(<Slider {...defaultProps} />);
    expect(screen.getByRole('slider')).toHaveAttribute('tabindex', '0');
  });

  it('renders two slider thumbs in range mode', () => {
    render(<Slider value={[20, 80]} onChange={vi.fn()} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders).toHaveLength(2);
    expect(sliders[0]).toHaveAttribute('aria-valuenow', '20');
    expect(sliders[1]).toHaveAttribute('aria-valuenow', '80');
  });

  it('renders start and end labels', () => {
    render(<Slider {...defaultProps} labels={{ start: 'Low', end: 'High' }} />);
    expect(screen.getByText('Low')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
  });

  it('renders step labels', () => {
    render(<Slider {...defaultProps} step={25} stepLabels={[0, 25, 50, 75, 100]} />);
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('75')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('renders string step labels', () => {
    render(<Slider {...defaultProps} step={50} stepLabels={['Low', 'Mid', 'High']} />);
    expect(screen.getByText('Low')).toBeInTheDocument();
    expect(screen.getByText('Mid')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
  });

  it('shows tooltip text when showTooltip is true', () => {
    render(<Slider {...defaultProps} value={42} showTooltip />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('uses tooltipFormat for tooltip text', () => {
    render(
      <Slider {...defaultProps} value={75} showTooltip tooltipFormat={(v) => `${v}%`} />,
    );
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('does not render tooltip when showTooltip is false', () => {
    render(<Slider {...defaultProps} value={42} />);
    expect(screen.queryByText('42')).not.toBeInTheDocument();
  });

  describe('keyboard interaction', () => {
    it('increases value on ArrowRight', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Slider value={50} onChange={onChange} />);

      const slider = screen.getByRole('slider');
      slider.focus();
      await user.keyboard('{ArrowRight}');

      expect(onChange).toHaveBeenCalledWith(51);
    });

    it('decreases value on ArrowLeft', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Slider value={50} onChange={onChange} />);

      const slider = screen.getByRole('slider');
      slider.focus();
      await user.keyboard('{ArrowLeft}');

      expect(onChange).toHaveBeenCalledWith(49);
    });

    it('uses step size for keyboard increments', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Slider value={50} onChange={onChange} step={10} />);

      const slider = screen.getByRole('slider');
      slider.focus();
      await user.keyboard('{ArrowRight}');

      expect(onChange).toHaveBeenCalledWith(60);
    });

    it('jumps to min on Home key', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Slider value={50} onChange={onChange} min={0} max={100} />);

      const slider = screen.getByRole('slider');
      slider.focus();
      await user.keyboard('{Home}');

      expect(onChange).toHaveBeenCalledWith(0);
    });

    it('jumps to max on End key', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Slider value={50} onChange={onChange} min={0} max={100} />);

      const slider = screen.getByRole('slider');
      slider.focus();
      await user.keyboard('{End}');

      expect(onChange).toHaveBeenCalledWith(100);
    });

    it('does not change value on keyboard when disabled', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Slider value={50} onChange={onChange} disabled />);

      const slider = screen.getByRole('slider');
      slider.focus();
      await user.keyboard('{ArrowRight}');

      expect(onChange).not.toHaveBeenCalled();
    });

    it('clamps to max on ArrowRight at max', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Slider value={100} onChange={onChange} min={0} max={100} />);

      const slider = screen.getByRole('slider');
      slider.focus();
      await user.keyboard('{ArrowRight}');

      expect(onChange).toHaveBeenCalledWith(100);
    });

    it('increases value on ArrowUp', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Slider value={50} onChange={onChange} />);

      const slider = screen.getByRole('slider');
      slider.focus();
      await user.keyboard('{ArrowUp}');

      expect(onChange).toHaveBeenCalledWith(51);
    });

    it('decreases value on ArrowDown', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Slider value={50} onChange={onChange} />);

      const slider = screen.getByRole('slider');
      slider.focus();
      await user.keyboard('{ArrowDown}');

      expect(onChange).toHaveBeenCalledWith(49);
    });

    it('does not call onChange for unhandled keys', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Slider value={50} onChange={onChange} />);

      const slider = screen.getByRole('slider');
      slider.focus();
      await user.keyboard('{Tab}');

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('track click', () => {
    beforeEach(() => {
      vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
        left: 0, width: 100, top: 0, bottom: 10, right: 100, height: 10, x: 0, y: 0, toJSON: () => ({}),
      });
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('clicking track moves the thumb to the clicked position', () => {
      const onChange = vi.fn();
      const { container } = render(<Slider value={0} onChange={onChange} min={0} max={100} />);
      const trackArea = container.querySelector('[class*="trackArea"]') as HTMLElement;
      // clientX=75 on a 100px track = value 75
      trackArea.dispatchEvent(new PointerEvent('pointerdown', { clientX: 75, bubbles: true }));
      expect(onChange).toHaveBeenCalledWith(75);
    });

    it('clicking track in range mode moves the nearest thumb', () => {
      const onChange = vi.fn();
      const { container } = render(<Slider value={[20, 80]} onChange={onChange} min={0} max={100} />);
      const trackArea = container.querySelector('[class*="trackArea"]') as HTMLElement;
      // clientX=10 is closer to thumb at 20 than thumb at 80 → moves first thumb
      trackArea.dispatchEvent(new PointerEvent('pointerdown', { clientX: 10, bubbles: true }));
      expect(onChange).toHaveBeenCalledWith([10, 80]);
    });

    it('clicking track in range mode moves the farther thumb when closer to it', () => {
      const onChange = vi.fn();
      const { container } = render(<Slider value={[20, 80]} onChange={onChange} min={0} max={100} />);
      const trackArea = container.querySelector('[class*="trackArea"]') as HTMLElement;
      // clientX=90 is closer to thumb at 80 than thumb at 20 → moves second thumb
      trackArea.dispatchEvent(new PointerEvent('pointerdown', { clientX: 90, bubbles: true }));
      expect(onChange).toHaveBeenCalledWith([20, 90]);
    });

    it('does not move the thumb when disabled', () => {
      const onChange = vi.fn();
      const { container } = render(<Slider value={0} onChange={onChange} disabled />);
      const trackArea = container.querySelector('[class*="trackArea"]') as HTMLElement;
      trackArea.dispatchEvent(new PointerEvent('pointerdown', { clientX: 50, bubbles: true }));
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('range mode keyboard', () => {
    it('changes first thumb with ArrowRight', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Slider value={[20, 80]} onChange={onChange} />);

      const sliders = screen.getAllByRole('slider');
      sliders[0].focus();
      await user.keyboard('{ArrowRight}');

      expect(onChange).toHaveBeenCalledWith([21, 80]);
    });

    it('changes second thumb with ArrowRight', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Slider value={[20, 80]} onChange={onChange} />);

      const sliders = screen.getAllByRole('slider');
      sliders[1].focus();
      await user.keyboard('{ArrowRight}');

      expect(onChange).toHaveBeenCalledWith([20, 81]);
    });
  });

  it('passes custom className', () => {
    const { container } = render(<Slider {...defaultProps} className="custom" />);
    expect(container.firstElementChild?.className).toContain('custom');
  });

  it('passes id to the root element', () => {
    const { container } = render(<Slider {...defaultProps} id="my-slider" />);
    expect(container.firstElementChild).toHaveAttribute('id', 'my-slider');
  });
});
