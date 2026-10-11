import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GradientPicker, { parseCssGradient, serializeCssGradient } from './GradientPicker';
import type { GradientState } from './GradientPicker';

// --- Parser / serializer unit tests ---

describe('parseCssGradient', () => {
  it('parses a basic linear gradient', () => {
    const state = parseCssGradient('linear-gradient(90deg, #d9d9d9 0%, #737373 100%)');
    expect(state.type).toBe('linear');
    expect(state.angle).toBe(90);
    expect(state.stops).toHaveLength(2);
    expect(state.stops[0].color).toBe('#d9d9d9');
    expect(state.stops[0].position).toBe(0);
    expect(state.stops[1].color).toBe('#737373');
    expect(state.stops[1].position).toBe(100);
  });

  it('parses a radial gradient', () => {
    const state = parseCssGradient('radial-gradient(circle, #ffffff 0%, #000000 100%)');
    expect(state.type).toBe('radial');
    expect(state.stops).toHaveLength(2);
  });

  it('parses rgba stop opacity', () => {
    const state = parseCssGradient('linear-gradient(90deg, rgba(255,0,0,0.5) 0%, #000000 100%)');
    expect(state.stops[0].opacity).toBeCloseTo(0.5);
    expect(state.stops[0].color).toBe('#ff0000');
  });

  it('parses "to right" direction', () => {
    const state = parseCssGradient('linear-gradient(to right, #ffffff 0%, #000000 100%)');
    expect(state.angle).toBe(90);
  });

  it('returns default state for invalid input', () => {
    const state = parseCssGradient('not-a-gradient');
    expect(state.type).toBe('linear');
    expect(state.stops).toHaveLength(2);
  });

  it('returns default state for empty string', () => {
    const state = parseCssGradient('');
    expect(state.stops).toHaveLength(2);
  });
});

describe('serializeCssGradient', () => {
  it('serializes a linear gradient', () => {
    const state: GradientState = {
      type: 'linear',
      angle: 90,
      stops: [
        { id: '1', color: '#d9d9d9', position: 0, opacity: 1 },
        { id: '2', color: '#737373', position: 100, opacity: 1 },
      ],
    };
    expect(serializeCssGradient(state)).toBe('linear-gradient(90deg, #d9d9d9 0%, #737373 100%)');
  });

  it('serializes a radial gradient', () => {
    const state: GradientState = {
      type: 'radial',
      angle: 0,
      stops: [
        { id: '1', color: '#ffffff', position: 0, opacity: 1 },
        { id: '2', color: '#000000', position: 100, opacity: 1 },
      ],
    };
    expect(serializeCssGradient(state)).toBe('radial-gradient(circle, #ffffff 0%, #000000 100%)');
  });

  it('serializes stops with opacity as rgba', () => {
    const state: GradientState = {
      type: 'linear',
      angle: 0,
      stops: [
        { id: '1', color: '#ff0000', position: 0, opacity: 0.5 },
        { id: '2', color: '#000000', position: 100, opacity: 1 },
      ],
    };
    const result = serializeCssGradient(state);
    expect(result).toContain('rgba(255,0,0,0.5)');
  });

  it('sorts stops by position', () => {
    const state: GradientState = {
      type: 'linear',
      angle: 0,
      stops: [
        { id: '2', color: '#000000', position: 100, opacity: 1 },
        { id: '1', color: '#ffffff', position: 0, opacity: 1 },
      ],
    };
    const result = serializeCssGradient(state);
    expect(result).toBe('linear-gradient(0deg, #ffffff 0%, #000000 100%)');
  });

  it('round-trips a parsed gradient', () => {
    const original = 'linear-gradient(45deg, #d9d9d9 0%, #737373 100%)';
    const state = parseCssGradient(original);
    expect(serializeCssGradient(state)).toBe(original);
  });
});

// --- Component tests ---

const defaultProps = {
  value: 'linear-gradient(90deg, #d9d9d9 0%, #737373 100%)',
  onChange: vi.fn(),
  inline: true,
};

describe('GradientPicker', () => {
  it('renders the gradient bar', () => {
    render(<GradientPicker {...defaultProps} />);
    expect(screen.getByLabelText(/gradient bar/i)).toBeInTheDocument();
  });

  it('renders stop handles for each stop', () => {
    render(<GradientPicker {...defaultProps} />);
    const handles = screen.getAllByLabelText(/color stop at/i);
    expect(handles).toHaveLength(2);
  });

  it('renders the stops list', () => {
    render(<GradientPicker {...defaultProps} />);
    expect(screen.getByText('Stops')).toBeInTheDocument();
  });

  it('renders position inputs for each stop', () => {
    render(<GradientPicker {...defaultProps} />);
    // Two stops → two "%" prefix inputs
    const percentLabels = screen.getAllByText('%');
    expect(percentLabels.length).toBeGreaterThanOrEqual(2);
  });

  it('renders the gradient type selector', () => {
    render(<GradientPicker {...defaultProps} />);
    expect(screen.getByText('Linear')).toBeInTheDocument();
  });

  it('shows angle input for linear gradient', () => {
    render(<GradientPicker {...defaultProps} />);
    expect(screen.getByText('°')).toBeInTheDocument();
  });

  it('hides angle input for radial gradient', async () => {
    render(<GradientPicker {...defaultProps} value="radial-gradient(circle, #d9d9d9 0%, #737373 100%)" />);
    expect(screen.queryByText('°')).not.toBeInTheDocument();
  });

  it('calls onChange when a stop position is edited', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<GradientPicker inline value="linear-gradient(90deg, #d9d9d9 0%, #737373 100%)" onChange={onChange} />);

    const posInputs = screen.getAllByRole('spinbutton');
    await user.clear(posInputs[0]);
    await user.type(posInputs[0], '20');
    expect(onChange).toHaveBeenCalled();
  });

  it('renders the add stop button', () => {
    render(<GradientPicker {...defaultProps} />);
    expect(screen.getByLabelText('Add stop')).toBeInTheDocument();
  });

  it('adds a stop when the add button is clicked', async () => {
    const user = userEvent.setup();
    render(<GradientPicker {...defaultProps} />);

    await user.click(screen.getByLabelText('Add stop'));
    const handles = screen.getAllByLabelText(/color stop at/i);
    expect(handles).toHaveLength(3);
  });

  it('remove buttons are disabled when only two stops remain', () => {
    render(<GradientPicker {...defaultProps} />);
    const removeButtons = screen.getAllByLabelText(/remove stop/i);
    removeButtons.forEach((btn) => expect(btn).toBeDisabled());
  });

  it('enables remove buttons when there are more than two stops', async () => {
    const user = userEvent.setup();
    render(<GradientPicker {...defaultProps} />);

    await user.click(screen.getByLabelText('Add stop'));
    const removeButtons = screen.getAllByLabelText(/remove stop/i);
    removeButtons.forEach((btn) => expect(btn).not.toBeDisabled());
  });

  it('removes a stop when remove button is clicked', async () => {
    const user = userEvent.setup();
    render(<GradientPicker {...defaultProps} />);
    await user.click(screen.getByLabelText('Add stop'));
    expect(screen.getAllByLabelText(/color stop at/i)).toHaveLength(3);

    await user.click(screen.getAllByLabelText(/remove stop/i)[0]);
    expect(screen.getAllByLabelText(/color stop at/i)).toHaveLength(2);
  });

  it('renders flip and reverse buttons', () => {
    render(<GradientPicker {...defaultProps} />);
    expect(screen.getByLabelText('Flip direction')).toBeInTheDocument();
    expect(screen.getByLabelText('Reverse stops')).toBeInTheDocument();
  });

  it('calls onChange when flip direction is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<GradientPicker inline value="linear-gradient(90deg, #d9d9d9 0%, #737373 100%)" onChange={onChange} />);

    await user.click(screen.getByLabelText('Flip direction'));
    expect(onChange).toHaveBeenCalled();
    const result: string = onChange.mock.calls[0][0];
    expect(result).toContain('270deg');
  });

  it('renders an optional label', () => {
    render(<GradientPicker {...defaultProps} label="Background" />);
    expect(screen.getByText('Background')).toBeInTheDocument();
  });

  describe('trigger (popover) mode', () => {
    it('renders a gradient strip trigger by default', () => {
      render(<GradientPicker value="linear-gradient(90deg, #d9d9d9 0%, #737373 100%)" onChange={vi.fn()} />);
      expect(screen.getByLabelText('Open gradient picker')).toBeInTheDocument();
    });

    it('does not show the picker panel before the trigger is clicked', () => {
      render(<GradientPicker value="linear-gradient(90deg, #d9d9d9 0%, #737373 100%)" onChange={vi.fn()} />);
      expect(screen.queryByLabelText(/gradient bar/i)).not.toBeInTheDocument();
    });

    it('shows the picker panel after the trigger is clicked', async () => {
      const user = userEvent.setup();
      render(<GradientPicker value="linear-gradient(90deg, #d9d9d9 0%, #737373 100%)" onChange={vi.fn()} />);
      await user.click(screen.getByLabelText('Open gradient picker'));
      expect(screen.getByLabelText(/gradient bar/i)).toBeInTheDocument();
    });
  });
});
