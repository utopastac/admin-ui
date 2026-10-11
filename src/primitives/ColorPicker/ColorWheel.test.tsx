import { render, fireEvent } from '@testing-library/react';
import ColorWheel, { hsvToHex, hexToHsv } from './ColorWheel';

const mockRect = {
  left: 0,
  top: 0,
  width: 200,
  height: 200,
  right: 200,
  bottom: 200,
  x: 0,
  y: 0,
  toJSON: () => ({}),
};

describe('ColorWheel', () => {
  const defaultProps = {
    hue: 0,
    saturation: 1,
    brightness: 1,
    onChange: () => {},
  };

  describe('rendering', () => {
    it('renders without crashing', () => {
      const { container } = render(<ColorWheel {...defaultProps} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('renders two canvas elements', () => {
      const { container } = render(<ColorWheel {...defaultProps} />);
      const canvases = container.querySelectorAll('canvas');
      expect(canvases).toHaveLength(2);
    });

    it('renders with the default size (200)', () => {
      const { container } = render(<ColorWheel {...defaultProps} />);
      const wrapper = container.firstChild as HTMLElement;
      // The outer div has width set to size (200) as inline style
      expect(wrapper.style.width).toBe('200px');
    });

    it('renders with a custom size prop', () => {
      const { container } = render(<ColorWheel {...defaultProps} size={300} />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.style.width).toBe('300px');
    });

    it('canvas elements survive jsdom (getContext returns null) without throwing', () => {
      // jsdom returns null for getContext('2d') — the component guards against this
      expect(() => render(<ColorWheel {...defaultProps} />)).not.toThrow();
    });

    it('renders with hue=120 (green) without crashing', () => {
      const { container } = render(
        <ColorWheel hue={120} saturation={1} brightness={1} onChange={() => {}} />,
      );
      expect(container.querySelectorAll('canvas')).toHaveLength(2);
    });

    it('renders with hue=240 (blue) and low brightness without crashing', () => {
      const { container } = render(
        <ColorWheel hue={240} saturation={0.5} brightness={0.5} onChange={() => {}} />,
      );
      expect(container.querySelectorAll('canvas')).toHaveLength(2);
    });
  });

  describe('mouse interaction', () => {
    beforeEach(() => {
      Element.prototype.getBoundingClientRect = vi.fn(() => mockRect as DOMRect);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('mousedown on the SV canvas does not throw', () => {
      const onChange = vi.fn();
      const { container } = render(
        <ColorWheel {...defaultProps} onChange={onChange} />,
      );
      const [svCanvas] = container.querySelectorAll('canvas');
      expect(() =>
        fireEvent.mouseDown(svCanvas, { clientX: 100, clientY: 100 }),
      ).not.toThrow();
    });

    it('mousedown on the hue canvas does not throw', () => {
      const onChange = vi.fn();
      const { container } = render(
        <ColorWheel {...defaultProps} onChange={onChange} />,
      );
      const canvases = container.querySelectorAll('canvas');
      const hueCanvas = canvases[1];
      expect(() =>
        fireEvent.mouseDown(hueCanvas, { clientX: 100, clientY: 10 }),
      ).not.toThrow();
    });
  });
});

describe('hsvToHex', () => {
  it('converts red (h=0, s=1, v=1) to #ff0000', () => {
    expect(hsvToHex(0, 1, 1)).toBe('#ff0000');
  });

  it('converts green (h=120, s=1, v=1) to #00ff00', () => {
    expect(hsvToHex(120, 1, 1)).toBe('#00ff00');
  });

  it('converts blue (h=240, s=1, v=1) to #0000ff', () => {
    expect(hsvToHex(240, 1, 1)).toBe('#0000ff');
  });

  it('converts black (h=0, s=0, v=0) to #000000', () => {
    expect(hsvToHex(0, 0, 0)).toBe('#000000');
  });

  it('converts white (h=0, s=0, v=1) to #ffffff', () => {
    expect(hsvToHex(0, 0, 1)).toBe('#ffffff');
  });
});

describe('hexToHsv', () => {
  it('converts #ff0000 to { h: 0, s: 1, v: 1 }', () => {
    expect(hexToHsv('#ff0000')).toEqual({ h: 0, s: 1, v: 1 });
  });

  it('converts #ffffff to { h: 0, s: 0, v: 1 }', () => {
    expect(hexToHsv('#ffffff')).toEqual({ h: 0, s: 0, v: 1 });
  });

  it('converts #000000 to { h: 0, s: 0, v: 0 }', () => {
    expect(hexToHsv('#000000')).toEqual({ h: 0, s: 0, v: 0 });
  });

  it('converts #00ff00 to h=120', () => {
    const result = hexToHsv('#00ff00');
    expect(result.h).toBe(120);
    expect(result.s).toBe(1);
    expect(result.v).toBe(1);
  });

  it('round-trips: hsvToHex → hexToHsv returns original values', () => {
    const hex = hsvToHex(200, 0.8, 0.9);
    const { h, s, v } = hexToHsv(hex);
    // Allow small floating-point rounding from the round-trip
    expect(h).toBeGreaterThanOrEqual(198);
    expect(h).toBeLessThanOrEqual(202);
    expect(s).toBeCloseTo(0.8, 1);
    expect(v).toBeCloseTo(0.9, 1);
  });
});
