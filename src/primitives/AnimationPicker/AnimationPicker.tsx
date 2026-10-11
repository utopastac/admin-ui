import React, { useState, useRef, useEffect, useCallback } from 'react';
import CompactInput from '../CompactInput';
import FieldGroup from '../FieldGroup';
import FieldLabel from '../FieldLabel';
import Popover from '../Popover';
import Select from '../Select';
import BezierEditor from './BezierEditor';
import AnimationPreview from './AnimationPreview';
import styles from './AnimationPicker.module.css';

// --- Types ---

export interface AnimationState {
  duration: number;
  easing: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'ios' | 'custom';
  bezier: [number, number, number, number];
}

export interface AnimationPickerProps {
  value?: string;
  onChange: (value: string) => void;
  onChangeState?: (state: AnimationState) => void;
  inline?: boolean;
  label?: string;
  labelPosition?: 'top' | 'left';
  labelWidth?: number | string;
  id?: string;
  offsetX?: number;
  offsetY?: number;
}

// --- Constants ---

const EASING_PRESETS = [
  { value: 'linear', label: 'Linear' },
  { value: 'ease', label: 'Ease' },
  { value: 'ease-in', label: 'Ease in' },
  { value: 'ease-out', label: 'Ease out' },
  { value: 'ease-in-out', label: 'Ease in out' },
  { value: 'ios', label: 'iOS' },
  { value: 'custom', label: 'Custom bezier' },
];

const PRESET_BEZIERS: Record<string, [number, number, number, number]> = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1],
  ios: [0.25, 0.46, 0.45, 0.94],
  custom: [0.25, 0.1, 0.25, 1],
};

// --- Parser ---

export function parseAnimationValue(css: string): AnimationState {
  const defaultState: AnimationState = {
    duration: 300,
    easing: 'ease-out',
    bezier: [0.25, 0.1, 0.25, 1],
  };

  if (!css?.trim()) return defaultState;

  const trimmed = css.trim();

  // Parse duration (e.g. "300ms" or "0.3s")
  const durationMatch = trimmed.match(/(\d+(?:\.\d+)?)(ms|s)/);
  let duration = defaultState.duration;
  if (durationMatch) {
    const val = parseFloat(durationMatch[1]);
    duration = durationMatch[2] === 's' ? Math.round(val * 1000) : Math.round(val);
  }

  // Parse cubic-bezier
  const cubicMatch = trimmed.match(/cubic-bezier\(\s*([\d.+-]+)\s*,\s*([\d.+-]+)\s*,\s*([\d.+-]+)\s*,\s*([\d.+-]+)\s*\)/);
  if (cubicMatch) {
    const bezier: [number, number, number, number] = [
      parseFloat(cubicMatch[1]),
      parseFloat(cubicMatch[2]),
      parseFloat(cubicMatch[3]),
      parseFloat(cubicMatch[4]),
    ];
    const ios = PRESET_BEZIERS.ios;
    const isIos = bezier.every((v, i) => v === ios[i]);
    return { duration, easing: isIos ? 'ios' : 'custom', bezier };
  }

  // Parse named easing
  const namedEasings = ['ease-in-out', 'ease-in', 'ease-out', 'ease', 'linear'];
  for (const name of namedEasings) {
    if (trimmed.includes(name)) {
      return {
        duration,
        easing: name as AnimationState['easing'],
        bezier: PRESET_BEZIERS[name],
      };
    }
  }

  return defaultState;
}

// --- Serializer ---

export function serializeAnimationValue(state: AnimationState): string {
  if (state.easing === 'custom' || state.easing === 'ios') {
    const [x1, y1, x2, y2] = state.bezier;
    return `${state.duration}ms cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
  }
  return `${state.duration}ms ${state.easing}`;
}

// --- Component ---

const AnimationPicker: React.FC<AnimationPickerProps> = ({
  value,
  onChange,
  onChangeState,
  inline = false,
  label,
  labelPosition = 'top',
  labelWidth,
  id,
  offsetX = 0,
  offsetY = 0,
}) => {
  const [state, setState] = useState<AnimationState>(() =>
    parseAnimationValue(value ?? ''),
  );
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setState(parseAnimationValue(value ?? ''));
  }, [value]);

  const emit = useCallback(
    (next: AnimationState) => {
      setState(next);
      onChange(serializeAnimationValue(next));
      onChangeState?.(next);
    },
    [onChange, onChangeState],
  );

  const handleDurationChange = (val: string) => {
    const parsed = parseInt(val, 10);
    const duration = isNaN(parsed) ? 0 : Math.max(0, Math.min(9999, parsed));
    emit({ ...state, duration });
  };

  const handleEasingChange = (val: string) => {
    const easing = val as AnimationState['easing'];
    let bezier = state.bezier;
    if (easing === 'custom') {
      // Initialize bezier from the previous named preset
      bezier = PRESET_BEZIERS[state.easing] ?? PRESET_BEZIERS.custom;
    }
    emit({ ...state, easing, bezier });
  };

  const handleBezierChange = (bezier: [number, number, number, number]) => {
    emit({ ...state, bezier });
  };

  const handleBezierPointChange = (index: number, val: string) => {
    const parsed = parseFloat(val);
    if (isNaN(parsed)) return;
    const mins = [0, -2, 0, -2];
    const maxs = [1, 3, 1, 3];
    const clamped = Math.max(mins[index], Math.min(maxs[index], parsed));
    const next: [number, number, number, number] = [...state.bezier] as [number, number, number, number];
    next[index] = clamped;
    emit({ ...state, bezier: next });
  };

  const timingFunction =
    state.easing === 'custom' || state.easing === 'ios'
      ? `cubic-bezier(${state.bezier.join(', ')})`
      : state.easing;

  const panel = (
    <div className={styles.panel}>
      {/* Curve row */}
      <div className={styles.row}>
        <div className={styles.rowFill}>
          <Select
            options={EASING_PRESETS}
            value={state.easing}
            onChange={handleEasingChange}
            labelPosition="left"
            labelWidth={56}
            label="Curve"
            size="sm"
          />
        </div>
      </div>

      {/* Bezier section — only when custom */}
      {state.easing === 'custom' && (
        <div className={styles.bezierSection}>
          <BezierEditor value={state.bezier} onChange={handleBezierChange} />
          <div className={styles.bezierReadout}>
            <FieldLabel label="Bezier" labelPosition="left" labelWidth={56} className={styles.rowFill}>
              <div className={styles.bezierInputs}>
                {state.bezier.map((v, i) => (
                  <CompactInput
                    key={i}
                    type="number"
                    value={String(parseFloat(v.toFixed(2)))}
                    onChange={(val) => handleBezierPointChange(i, val)}
                    step={0.01}
                    min={[0, -2, 0, -2][i]}
                    max={[1, 3, 1, 3][i]}
                    prefix=""
                    width={44}
                  />
                ))}
              </div>
            </FieldLabel>
          </div>
        </div>
      )}

      {/* Duration row */}
      <div className={styles.row}>
        <CompactInput
            className={styles.fillInput}
            type="number"
            value={String(state.duration)}
            onChange={handleDurationChange}
            min={0}
            max={9999}
            prefix="ms"
            labelPosition="left"
            labelWidth={56}
            label="Duration"
            scrub
          />
      </div>

      {/* Preview */}
      <AnimationPreview duration={state.duration} timingFunction={timingFunction} />
    </div>
  );

  if (inline) {
    if (label && labelPosition === 'left') {
      return (
        <FieldLabel label={label} labelPosition="left" labelWidth={labelWidth} htmlFor={id}>
          {panel}
        </FieldLabel>
      );
    }
    return (
      <FieldGroup label={label} htmlFor={id}>
        {panel}
      </FieldGroup>
    );
  }

  // Popover trigger mode
  const trigger = (
    <div className={styles.inputRow}>
      <button
        ref={anchorRef}
        className={styles.triggerInput}
        onClick={() => setIsOpen((o) => !o)}
        type="button"
        id={id}
      >
        <span className={styles.triggerValue}>{value || '300ms ease-out'}</span>
      </button>
      <Popover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        anchorRef={anchorRef}
        className={styles.dropdown}
        role="dialog"
        aria-label="Animation picker"
        offsetX={offsetX}
        offsetY={offsetY}
      >
        {panel}
      </Popover>
    </div>
  );

  if (label && labelPosition === 'left') {
    return (
      <FieldLabel label={label} labelPosition="left" labelWidth={labelWidth} htmlFor={id}>
        {trigger}
      </FieldLabel>
    );
  }

  return (
    <FieldGroup label={label} htmlFor={id}>
      {trigger}
    </FieldGroup>
  );
};

export default AnimationPicker;
