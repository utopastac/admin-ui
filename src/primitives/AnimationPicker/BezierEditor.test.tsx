import { render, fireEvent } from '@testing-library/react';
import BezierEditor from './BezierEditor';

// Mock getBoundingClientRect for all elements so pointer math resolves
// to a known 200×200 coordinate space.
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

describe('BezierEditor', () => {
  beforeEach(() => {
    Element.prototype.getBoundingClientRect = vi.fn(() => mockRect as DOMRect);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders an svg element', () => {
    const { container } = render(
      <BezierEditor value={[0.25, 0.1, 0.25, 1]} onChange={() => {}} />,
    );
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('renders without crashing with default ease value [0.25, 0.1, 0.25, 1]', () => {
    const { container } = render(
      <BezierEditor value={[0.25, 0.1, 0.25, 1]} onChange={() => {}} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('renders without crashing with linear value [0, 0, 1, 1]', () => {
    const { container } = render(
      <BezierEditor value={[0, 0, 1, 1]} onChange={() => {}} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('renders without crashing with ease-in value [0.42, 0, 1, 1]', () => {
    const { container } = render(
      <BezierEditor value={[0.42, 0, 1, 1]} onChange={() => {}} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('has exactly two draggable handle circles (with onPointerDown)', () => {
    const { container } = render(
      <BezierEditor value={[0.25, 0.1, 0.25, 1]} onChange={() => {}} />,
    );
    const svg = container.querySelector('svg')!;
    const circles = svg.querySelectorAll('circle');
    // 4 circles total: 2 fixed anchors (P0, P3) + 2 draggable handles (P1, P2)
    // The draggable handles have style cursor:grab and an onPointerDown handler
    const draggable = Array.from(circles).filter(
      (c) => c.style.cursor === 'grab',
    );
    expect(draggable).toHaveLength(2);
  });

  it('pointerDown on P1 handle followed by pointerMove on SVG calls onChange', () => {
    const onChange = vi.fn();
    const { container } = render(
      <BezierEditor value={[0.25, 0.1, 0.25, 1]} onChange={onChange} />,
    );
    const svg = container.querySelector('svg')!;
    const circles = svg.querySelectorAll('circle');
    const [p1Handle] = Array.from(circles).filter(
      (c) => c.style.cursor === 'grab',
    );

    // Simulate setPointerCapture so the event doesn't throw
    p1Handle.setPointerCapture = vi.fn();

    fireEvent.pointerDown(p1Handle, { pointerId: 1, clientX: 75, clientY: 175 });
    fireEvent.pointerMove(svg, { clientX: 100, clientY: 100 });

    expect(onChange).toHaveBeenCalledTimes(1);
    const [newValue] = onChange.mock.calls[0] as [[number, number, number, number]];
    expect(newValue).toHaveLength(4);
    // x1 should be clamped to [0, 1]
    expect(newValue[0]).toBeGreaterThanOrEqual(0);
    expect(newValue[0]).toBeLessThanOrEqual(1);
  });

  it('pointerDown on P2 handle followed by pointerMove on SVG calls onChange with updated x2/y2', () => {
    const onChange = vi.fn();
    const { container } = render(
      <BezierEditor value={[0.25, 0.1, 0.25, 1]} onChange={onChange} />,
    );
    const svg = container.querySelector('svg')!;
    const circles = svg.querySelectorAll('circle');
    const handles = Array.from(circles).filter(
      (c) => c.style.cursor === 'grab',
    );
    const p2Handle = handles[1];

    p2Handle.setPointerCapture = vi.fn();

    fireEvent.pointerDown(p2Handle, { pointerId: 2, clientX: 125, clientY: 50 });
    fireEvent.pointerMove(svg, { clientX: 150, clientY: 80 });

    expect(onChange).toHaveBeenCalledTimes(1);
    // x1 and y1 are unchanged; x2 and y2 reflect the drag
    const [newValue] = onChange.mock.calls[0] as [[number, number, number, number]];
    expect(newValue[0]).toBe(0.25); // x1 unchanged
    expect(newValue[1]).toBe(0.1);  // y1 unchanged
  });

  it('pointerUp after drag stops further onChange calls on move', () => {
    const onChange = vi.fn();
    const { container } = render(
      <BezierEditor value={[0.25, 0.1, 0.25, 1]} onChange={onChange} />,
    );
    const svg = container.querySelector('svg')!;
    const circles = svg.querySelectorAll('circle');
    const [p1Handle] = Array.from(circles).filter(
      (c) => c.style.cursor === 'grab',
    );

    p1Handle.setPointerCapture = vi.fn();

    fireEvent.pointerDown(p1Handle, { pointerId: 1, clientX: 75, clientY: 175 });
    fireEvent.pointerUp(svg);
    // Move after release — onChange should NOT be called again
    fireEvent.pointerMove(svg, { clientX: 120, clientY: 120 });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders with a custom value and does not throw', () => {
    const { container } = render(
      <BezierEditor value={[0.68, -0.6, 0.32, 1.6]} onChange={() => {}} />,
    );
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
