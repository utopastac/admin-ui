import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { ArrowLeftRight, RefreshCw, Plus, Minus } from 'lucide-react';
import ColorPicker from '../ColorPicker';
import CompactInput from '../CompactInput';
import LabeledField from '../LabeledField';
import Popover from '../Popover';
import Select from '../Select';
import styles from './GradientPicker.module.css';

// --- Types ---

export interface GradientStop {
  id: string;
  /** Hex color string, e.g. '#d9d9d9' */
  color: string;
  /** 0–100 */
  position: number;
  /** 0–1 */
  opacity: number;
}

export interface GradientState {
  type: 'linear' | 'radial';
  /** Degrees, only used for linear. */
  angle: number;
  stops: GradientStop[];
}

// --- Parser ---

function splitGradientParts(inner: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = '';
  for (const char of inner) {
    if (char === '(') { depth++; current += char; }
    else if (char === ')') { depth--; current += char; }
    else if (char === ',' && depth === 0) { parts.push(current); current = ''; }
    else { current += char; }
  }
  if (current.trim()) parts.push(current);
  return parts;
}

function parseStop(part: string, id: string): GradientStop | null {
  const trimmed = part.trim();

  // rgba(r,g,b,a) position%
  const rgbaMatch = trimmed.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)\s*([\d.]+)?%?/);
  if (rgbaMatch) {
    const r = parseInt(rgbaMatch[1]);
    const g = parseInt(rgbaMatch[2]);
    const b = parseInt(rgbaMatch[3]);
    const a = rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1;
    const pos = rgbaMatch[5] !== undefined ? parseFloat(rgbaMatch[5]) : 0;
    const color = '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
    return { id, color, position: pos, opacity: a };
  }

  // #hex position%
  const hexMatch = trimmed.match(/(#[0-9a-fA-F]{3,8})\s*([\d.]+)?%?/);
  if (hexMatch) {
    let color = hexMatch[1];
    if (color.length === 4) {
      color = '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
    }
    const pos = hexMatch[2] !== undefined ? parseFloat(hexMatch[2]) : 0;
    return { id, color: color.toLowerCase(), position: pos, opacity: 1 };
  }

  return null;
}

export function parseCssGradient(css: string): GradientState {
  const defaultState: GradientState = {
    type: 'linear',
    angle: 90,
    stops: [
      { id: 'a', color: '#d9d9d9', position: 0, opacity: 1 },
      { id: 'b', color: '#737373', position: 100, opacity: 1 },
    ],
  };

  if (!css?.trim()) return defaultState;

  const trimmed = css.trim();
  const isLinear = trimmed.startsWith('linear-gradient');
  const isRadial = trimmed.startsWith('radial-gradient');
  if (!isLinear && !isRadial) return defaultState;

  const inner = trimmed.slice(trimmed.indexOf('(') + 1, trimmed.lastIndexOf(')'));
  const parts = splitGradientParts(inner);
  if (parts.length < 2) return defaultState;

  let angle = 90;
  let stopStartIndex = 0;

  if (isLinear) {
    const first = parts[0].trim();
    const angleMatch = first.match(/^(-?\d+(?:\.\d+)?)deg$/);
    const toMatch = first.match(/^to\s+(right|left|top|bottom)$/i);
    if (angleMatch) {
      angle = parseFloat(angleMatch[1]);
      stopStartIndex = 1;
    } else if (toMatch) {
      const dir = toMatch[1].toLowerCase();
      angle = dir === 'right' ? 90 : dir === 'left' ? 270 : dir === 'bottom' ? 180 : 0;
      stopStartIndex = 1;
    }
  } else {
    // radial: skip "circle" / "ellipse" descriptor
    if (/^(circle|ellipse)/.test(parts[0].trim())) stopStartIndex = 1;
  }

  let counter = 0;
  const stops: GradientStop[] = [];
  for (let i = stopStartIndex; i < parts.length; i++) {
    const stop = parseStop(parts[i], String(++counter));
    if (stop) stops.push(stop);
  }
  if (stops.length < 2) return defaultState;

  return { type: isLinear ? 'linear' : 'radial', angle, stops };
}

// --- Serializer ---

export function serializeCssGradient(state: GradientState): string {
  const sorted = [...state.stops].sort((a, b) => a.position - b.position);
  const stopStrs = sorted.map((s) => {
    if (s.opacity < 1) {
      const r = parseInt(s.color.slice(1, 3), 16);
      const g = parseInt(s.color.slice(3, 5), 16);
      const b = parseInt(s.color.slice(5, 7), 16);
      const a = Math.round(s.opacity * 100) / 100;
      return `rgba(${r},${g},${b},${a}) ${s.position}%`;
    }
    return `${s.color} ${s.position}%`;
  });

  if (state.type === 'radial') {
    return `radial-gradient(circle, ${stopStrs.join(', ')})`;
  }
  return `linear-gradient(${state.angle}deg, ${stopStrs.join(', ')})`;
}

// --- Helpers ---

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

function interpolateColor(stops: GradientStop[], position: number): string {
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  if (position <= sorted[0].position) return sorted[0].color;
  if (position >= sorted[sorted.length - 1].position) return sorted[sorted.length - 1].color;
  for (let i = 0; i < sorted.length - 1; i++) {
    const a = sorted[i];
    const b = sorted[i + 1];
    if (position >= a.position && position <= b.position) {
      const t = (position - a.position) / (b.position - a.position);
      const lerp = (ca: string, cb: string, ch: number) =>
        Math.round(parseInt(ca.slice(ch, ch + 2), 16) + (parseInt(cb.slice(ch, ch + 2), 16) - parseInt(ca.slice(ch, ch + 2), 16)) * t);
      const r = lerp(a.color, b.color, 1);
      const g = lerp(a.color, b.color, 3);
      const bl = lerp(a.color, b.color, 5);
      return '#' + [r, g, bl].map((v) => v.toString(16).padStart(2, '0')).join('');
    }
  }
  return sorted[0].color;
}

// --- Component ---

export interface GradientPickerProps {
  /** A CSS gradient string, e.g. 'linear-gradient(90deg, #d9d9d9 0%, #737373 100%)' */
  value: string;
  onChange: (value: string) => void;
  /**
   * When false (default), renders a gradient strip trigger that opens the picker
   * in a popover — like ColorPicker. When true, renders the picker panel directly.
   */
  inline?: boolean;
  label?: string;
  labelPosition?: 'top' | 'left';
  labelWidth?: number | string;
  id?: string;
  offsetX?: number;
  offsetY?: number;
}

const GradientPicker: React.FC<GradientPickerProps> = ({
  value,
  onChange,
  inline = false,
  label,
  labelPosition = 'top',
  labelWidth,
  id,
  offsetX = 0,
  offsetY = 0,
}) => {
  const [state, setState] = useState<GradientState>(() => parseCssGradient(value));
  const [selectedId, setSelectedId] = useState<string>(() => parseCssGradient(value).stops[0]?.id ?? '');
  const [isOpen, setIsOpen] = useState(false);
  const [colorPickerOpenId, setColorPickerOpenId] = useState<string | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: string; startX: number; startPos: number } | null>(null);
  const lastEmittedRef = useRef<string>(value);

  const emit = useCallback(
    (next: GradientState) => {
      const serialized = serializeCssGradient(next);
      lastEmittedRef.current = serialized;
      setState(next);
      onChange(serialized);
    },
    [onChange],
  );

  useEffect(() => {
    if (value !== lastEmittedRef.current) {
      lastEmittedRef.current = value;
      const parsed = parseCssGradient(value);
      setState(parsed);
      setSelectedId(parsed.stops[0]?.id ?? '');
    }
  }, [value]);

  // Always render bar left→right regardless of angle
  const barCss = useMemo(
    () => serializeCssGradient({ ...state, type: 'linear', angle: 90 }),
    [state],
  );

  // --- Bar interaction ---

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    setColorPickerOpenId(null);
    const bar = barRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const pos = Math.round(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)));
    const color = interpolateColor(state.stops, pos);
    const newStop: GradientStop = { id: uid(), color, position: pos, opacity: 1 };
    const next = { ...state, stops: [...state.stops, newStop] };
    setSelectedId(newStop.id);
    emit(next);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>, stopId: string) => {
    e.preventDefault();
    setColorPickerOpenId(null);
    setSelectedId(stopId);
    const stop = state.stops.find((s) => s.id === stopId);
    if (!stop) return;
    dragRef.current = { id: stopId, startX: e.clientX, startPos: stop.position };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragRef.current) return;
    const bar = barRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const deltaPos = ((e.clientX - dragRef.current.startX) / rect.width) * 100;
    const newPos = Math.round(Math.max(0, Math.min(100, dragRef.current.startPos + deltaPos)));
    const next = {
      ...state,
      stops: state.stops.map((s) => (s.id === dragRef.current!.id ? { ...s, position: newPos } : s)),
    };
    setState(next);
    onChange(serializeCssGradient(next));
  };

  const handlePointerUp = () => {
    dragRef.current = null;
  };

  // --- Stop CRUD ---

  const addStop = () => {
    const sorted = [...state.stops].sort((a, b) => a.position - b.position);
    let pos = 50;
    if (sorted.length >= 2) {
      let maxGap = 0;
      for (let i = 0; i < sorted.length - 1; i++) {
        const gap = sorted[i + 1].position - sorted[i].position;
        if (gap > maxGap) {
          maxGap = gap;
          pos = Math.round((sorted[i].position + sorted[i + 1].position) / 2);
        }
      }
    }
    const newStop: GradientStop = { id: uid(), color: interpolateColor(state.stops, pos), position: pos, opacity: 1 };
    const next = { ...state, stops: [...state.stops, newStop] };
    setSelectedId(newStop.id);
    emit(next);
  };

  const removeStop = (id: string) => {
    if (state.stops.length <= 2) return;
    const next = { ...state, stops: state.stops.filter((s) => s.id !== id) };
    if (selectedId === id) setSelectedId(next.stops[0].id);
    emit(next);
  };

  const updateStop = (id: string, patch: Partial<GradientStop>) => {
    emit({ ...state, stops: state.stops.map((s) => (s.id === id ? { ...s, ...patch } : s)) });
  };

  // --- Direction controls ---

  const flipDirection = () => {
    emit({ ...state, angle: (state.angle + 180) % 360 });
  };

  const reverseStops = () => {
    emit({ ...state, stops: state.stops.map((s) => ({ ...s, position: 100 - s.position })) });
  };

  const sortedStops = useMemo(
    () => [...state.stops].sort((a, b) => a.position - b.position),
    [state.stops],
  );

  const panel = (
    <div className={styles.gradientPicker}>
      {/* Type / angle row */}
      <div className={styles.typeRow}>
        <Select
          size="sm"
          value={state.type}
          onChange={(v) => emit({ ...state, type: v as 'linear' | 'radial' })}
          options={[
            { value: 'linear', label: 'Linear' },
            { value: 'radial', label: 'Radial' },
          ]}
          className={styles.typeSelect}
        />
        {state.type === 'linear' && (
          <CompactInput
            prefix="°"
            type="number"
            value={String(state.angle)}
            onChange={(v) => emit({ ...state, angle: ((parseInt(v) || 0) + 360) % 360 })}
            min={0}
            max={359}
            scrub
            className={styles.angleInput}
          />
        )}
        <div className={styles.typeRowActions}>
          {state.type === 'linear' && (
            <button type="button" className={styles.iconButton} onClick={flipDirection} aria-label="Flip direction">
              <ArrowLeftRight size={14} />
            </button>
          )}
          <button type="button" className={styles.iconButton} onClick={reverseStops} aria-label="Reverse stops">
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Gradient bar */}
      <div className={styles.barWrapper}>
        <div
          ref={barRef}
          className={styles.bar}
          style={{ background: barCss }}
          onClick={handleBarClick}
          aria-label="Gradient bar — click to add a stop"
        >
          {state.stops.map((stop) => (
            <button
              key={stop.id}
              type="button"
              className={`${styles.stopHandle} ${stop.id === selectedId ? styles.stopHandleSelected : ''}`}
              style={{ left: `${stop.position}%`, backgroundColor: stop.color }}
              onPointerDown={(e) => handlePointerDown(e, stop.id)}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onClick={(e) => { e.stopPropagation(); setSelectedId(stop.id); }}
              aria-label={`Color stop at ${stop.position}%`}
            />
          ))}
        </div>
      </div>

      {/* Stops list */}
      <div className={styles.stopsHeader}>
        <span className={styles.stopsLabel}>Stops</span>
        <button type="button" className={styles.iconButton} onClick={addStop} aria-label="Add stop">
          <Plus size={14} />
        </button>
      </div>

      <div className={styles.stopsList}>
        {sortedStops.map((stop) => (
          <div key={stop.id} className={styles.stopEntry}>
            <div
              className={`${styles.stopRow} ${stop.id === selectedId ? styles.stopRowSelected : ''}`}
              onClick={() => setSelectedId(stop.id)}
            >
              <CompactInput
                prefix="%"
                type="number"
                value={String(stop.position)}
                onChange={(v) => updateStop(stop.id, { position: Math.max(0, Math.min(100, parseInt(v) || 0)) })}
                min={0}
                max={100}
                scrub
                className={styles.positionInput}
              />
              <div className={styles.colorPickerWrapper}>
                <ColorPicker
                  value={stop.color}
                  onChange={(c) => updateStop(stop.id, { color: c })}
                  opacity={stop.opacity}
                  onOpacityChange={(o) => updateStop(stop.id, { opacity: o })}
                  isOpen={colorPickerOpenId === stop.id}
                  onOpenChange={(open) => setColorPickerOpenId(open ? stop.id : null)}
                />
              </div>
            </div>
            <button
              type="button"
              className={styles.iconButton}
              onClick={(e) => { e.stopPropagation(); removeStop(stop.id); }}
              disabled={state.stops.length <= 2}
              aria-label={`Remove stop at ${stop.position}%`}
            >
              <Minus size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  if (inline) {
    return (
      <LabeledField label={label} labelPosition={labelPosition} labelWidth={labelWidth} htmlFor={id}>
        {panel}
      </LabeledField>
    );
  }

  // Popover trigger mode
  const trigger = (
    <div ref={triggerRef} className={styles.inputRow}>
      <button
        type="button"
        id={id}
        className={styles.triggerInput}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open gradient picker"
      >
        <span className={styles.triggerSwatch} style={{ background: value }} />
        <span className={styles.triggerValue}>{value.replace(/^[\w-]+\(/, '').replace(/\)$/, '')}</span>
      </button>
      <Popover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        anchorRef={triggerRef}
        className={styles.dropdown}
        role="dialog"
        aria-label="Gradient picker"
        offsetX={offsetX}
        offsetY={offsetY}
      >
        {panel}
      </Popover>
    </div>
  );

  return (
    <LabeledField label={label} labelPosition={labelPosition} labelWidth={labelWidth} htmlFor={id}>
      {trigger}
    </LabeledField>
  );
};

export default GradientPicker;
