import React, { useRef } from 'react';
import styles from './BezierEditor.module.css';

interface BezierEditorProps {
  value: [number, number, number, number];
  onChange: (value: [number, number, number, number]) => void;
}

const COLOR_CURVE = 'var(--admin-border-highlight)';
const COLOR_HANDLE = 'var(--admin-border-highlight)';
const COLOR_BORDER = 'var(--admin-surface-info-secondary)';
const COLOR_DIAGONAL = 'var(--admin-surface-info-secondary)';
const COLOR_ANCHOR_FILL = 'var(--admin-surface-primary)';
const COLOR_ANCHOR_STROKE = 'var(--admin-border-highlight)';
const ANCHOR_RADIUS = 4;
const HANDLE_RADIUS = 5;

const SVG_W = 200;
const SVG_H = 200;
const PAD = 50;
const DRAW_X = PAD;
const DRAW_Y = PAD;
const DRAW_W = SVG_W - PAD * 2;
const DRAW_H = SVG_H - PAD * 2;

function toSvgCoord(vx: number, vy: number) {
  return {
    x: DRAW_X + vx * DRAW_W,
    y: DRAW_Y + (1 - vy) * DRAW_H,
  };
}

function toValueCoord(px: number, py: number) {
  return {
    vx: (px - DRAW_X) / DRAW_W,
    vy: 1 - (py - DRAW_Y) / DRAW_H,
  };
}

const BezierEditor: React.FC<BezierEditorProps> = ({ value, onChange }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef<'p1' | 'p2' | null>(null);

  const [x1, y1, x2, y2] = value;

  const P0 = toSvgCoord(0, 0);
  const P3 = toSvgCoord(1, 1);
  const P1 = toSvgCoord(x1, y1);
  const P2 = toSvgCoord(x2, y2);

  const handlePointerDown = (point: 'p1' | 'p2') => (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = point;
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragging.current || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = SVG_W / rect.width;
    const scaleY = SVG_H / rect.height;
    const px = (e.clientX - rect.left) * scaleX;
    const py = (e.clientY - rect.top) * scaleY;
    const { vx, vy } = toValueCoord(px, py);
    const clampedX = Math.max(0, Math.min(1, vx));
    if (dragging.current === 'p1') {
      onChange([clampedX, vy, value[2], value[3]]);
    } else {
      onChange([value[0], value[1], clampedX, vy]);
    }
  };

  const handlePointerUp = () => {
    dragging.current = null;
  };

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      className={styles.canvas}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Dashed bounding rectangle */}
      <rect
        x={DRAW_X}
        y={DRAW_Y}
        width={DRAW_W}
        height={DRAW_H}
        fill="none"
        stroke={COLOR_BORDER}
        strokeDasharray="4 3"
      />

      {/* Linear reference line */}
      <line
        x1={P0.x}
        y1={P0.y}
        x2={P3.x}
        y2={P3.y}
        stroke={COLOR_DIAGONAL}
        strokeWidth="1"
      />

      {/* Handle line: P0 → P1 */}
      <line
        x1={P0.x}
        y1={P0.y}
        x2={P1.x}
        y2={P1.y}
        stroke={COLOR_HANDLE}
        strokeWidth="1"
      />

      {/* Handle line: P3 → P2 */}
      <line
        x1={P3.x}
        y1={P3.y}
        x2={P2.x}
        y2={P2.y}
        stroke={COLOR_HANDLE}
        strokeWidth="1"
      />

      {/* Bezier curve path */}
      <path
        d={`M ${P0.x} ${P0.y} C ${P1.x} ${P1.y}, ${P2.x} ${P2.y}, ${P3.x} ${P3.y}`}
        fill="none"
        stroke={COLOR_CURVE}
        strokeWidth="1.5"
      />

      {/* P0 — open circle, fixed anchor (bottom-left) */}
      <circle
        cx={P0.x}
        cy={P0.y}
        r={ANCHOR_RADIUS}
        fill={COLOR_ANCHOR_FILL}
        stroke={COLOR_ANCHOR_STROKE}
        strokeWidth="1.5"
      />

      {/* P3 — open circle, fixed anchor (top-right) */}
      <circle
        cx={P3.x}
        cy={P3.y}
        r={ANCHOR_RADIUS}
        fill={COLOR_ANCHOR_FILL}
        stroke={COLOR_ANCHOR_STROKE}
        strokeWidth="1.5"
      />

      {/* P1 — draggable control point */}
      <circle
        cx={P1.x}
        cy={P1.y}
        r={HANDLE_RADIUS}
        fill={COLOR_CURVE}
        style={{ cursor: 'grab' }}
        onPointerDown={handlePointerDown('p1')}
      />

      {/* P2 — draggable control point */}
      <circle
        cx={P2.x}
        cy={P2.y}
        r={HANDLE_RADIUS}
        fill={COLOR_CURVE}
        style={{ cursor: 'grab' }}
        onPointerDown={handlePointerDown('p2')}
      />
    </svg>
  );
};

export default BezierEditor;
