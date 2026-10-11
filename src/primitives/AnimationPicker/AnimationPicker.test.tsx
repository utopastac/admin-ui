import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AnimationPicker, { parseAnimationValue, serializeAnimationValue } from './AnimationPicker';

// --- Parser unit tests ---

describe('parseAnimationValue', () => {
  it('parses "300ms ease-out" correctly', () => {
    const state = parseAnimationValue('300ms ease-out');
    expect(state.duration).toBe(300);
    expect(state.easing).toBe('ease-out');
  });

  it('parses "500ms cubic-bezier(0, 0, 0.58, 1)" correctly', () => {
    const state = parseAnimationValue('500ms cubic-bezier(0, 0, 0.58, 1)');
    expect(state.duration).toBe(500);
    expect(state.easing).toBe('custom');
    expect(state.bezier[0]).toBeCloseTo(0);
    expect(state.bezier[1]).toBeCloseTo(0);
    expect(state.bezier[2]).toBeCloseTo(0.58);
    expect(state.bezier[3]).toBeCloseTo(1);
  });

  it('returns default state for empty input', () => {
    const state = parseAnimationValue('');
    expect(state.duration).toBeGreaterThan(0);
    expect(state.easing).toBeDefined();
    expect(Array.isArray(state.bezier)).toBe(true);
    expect(state.bezier).toHaveLength(4);
  });

  it('returns default state for invalid input', () => {
    const state = parseAnimationValue('not-a-transition');
    expect(state.duration).toBeGreaterThan(0);
    expect(state.easing).toBeDefined();
    expect(Array.isArray(state.bezier)).toBe(true);
  });
});

// --- Serializer unit tests ---

describe('serializeAnimationValue', () => {
  it('serializes named easing to CSS string', () => {
    const result = serializeAnimationValue({ duration: 300, easing: 'ease-out', bezier: [0, 0, 0, 0] });
    expect(result).toBe('300ms ease-out');
  });

  it('serializes custom easing to cubic-bezier CSS string', () => {
    const result = serializeAnimationValue({ duration: 500, easing: 'custom', bezier: [0, 0, 0.58, 1] });
    expect(result).toBe('500ms cubic-bezier(0, 0, 0.58, 1)');
  });
});

// --- Component tests ---

describe('AnimationPicker', () => {
  // --- Trigger (popover) mode ---

  describe('trigger mode (default)', () => {
    it('renders a trigger button when inline is not set', () => {
      render(<AnimationPicker value="300ms ease-out" onChange={vi.fn()} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('trigger button displays the current value string', () => {
      render(<AnimationPicker value="300ms ease-out" onChange={vi.fn()} />);
      expect(screen.getByRole('button', { name: /300ms ease-out/i })).toBeInTheDocument();
    });
  });

  // --- Inline mode ---

  describe('inline mode', () => {
    it('renders the panel directly without a trigger button when inline={true}', () => {
      render(<AnimationPicker value="300ms ease-out" onChange={vi.fn()} inline />);
      // No collapsed trigger — the panel is directly visible
      expect(screen.queryByRole('button', { name: /300ms ease-out/i })).not.toBeInTheDocument();
    });

    it('shows an easing selector when inline={true}', () => {
      render(<AnimationPicker value="300ms ease-out" onChange={vi.fn()} inline />);
      // Select renders a button trigger showing the current easing option
      expect(screen.getByRole('button', { name: /ease out/i })).toBeInTheDocument();
    });

    it('shows a duration input when inline={true}', () => {
      render(<AnimationPicker value="300ms ease-out" onChange={vi.fn()} inline />);
      expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    });
  });

  // --- Label ---

  describe('label prop', () => {
    it('renders label text when label prop is provided', () => {
      render(<AnimationPicker value="300ms ease-out" onChange={vi.fn()} inline label="Transition" />);
      expect(screen.getByText('Transition')).toBeInTheDocument();
    });
  });

  // --- Inline panel content ---

  describe('inline panel content', () => {
    it('shows "Ease out" in the easing selector when value is "300ms ease-out"', () => {
      render(<AnimationPicker value="300ms ease-out" onChange={vi.fn()} inline />);
      expect(screen.getByText(/ease out/i)).toBeInTheDocument();
    });

    it('shows bezier section when easing is custom', () => {
      render(<AnimationPicker value="300ms cubic-bezier(0.42, 0, 0.58, 1)" onChange={vi.fn()} inline />);
      // Bezier editor or readout inputs should be visible
      const spinbuttons = screen.getAllByRole('spinbutton');
      // At minimum: duration + 4 bezier handles = 5 inputs
      expect(spinbuttons.length).toBeGreaterThanOrEqual(5);
    });

    it('does not show bezier section when easing is a preset', () => {
      render(<AnimationPicker value="300ms ease-out" onChange={vi.fn()} inline />);
      const spinbuttons = screen.getAllByRole('spinbutton');
      // Only the duration input — no bezier handle inputs
      expect(spinbuttons).toHaveLength(1);
    });
  });

  // --- onChange ---

  describe('onChange', () => {
    it('fires onChange with updated CSS string when duration is changed', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<AnimationPicker value="300ms ease-out" onChange={onChange} inline />);

      const durationInput = screen.getByRole('spinbutton');
      await user.clear(durationInput);
      await user.type(durationInput, '400');
      expect(onChange).toHaveBeenCalled();
      const lastCall: string = onChange.mock.calls[onChange.mock.calls.length - 1][0];
      expect(lastCall).toContain('ease-out');
    });
  });
});
