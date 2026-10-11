import React, { useState, useRef, useCallback } from 'react';
import CompactInput from '../CompactInput';
import ColorPicker from '../ColorPicker';
import FieldLabel from '../FieldLabel';
import Popover from '../Popover';
import styles from './ShadowEditor.module.css';

const BEZEL_SWATCHES = ['#1f2937', '#111827', '#000000', '#374151', '#4b5563', '#6b7280'];
const SHADOW_SWATCHES = ['#000000', '#1f2937', '#111827', '#1e3a5f', '#3b0764', '#7f1d1d'];

export interface PhoneShadow {
  bezelWidth: number;
  bezelColor: string;
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  shadowColor: string;
  shadowOpacity: number;
}

export interface ShadowPreset {
  label: string;
  value: Partial<PhoneShadow>;
}

export interface ShadowEditorProps {
  value: PhoneShadow;
  onChange: (partial: Partial<PhoneShadow>) => void;
  label?: string;
  labelPosition?: 'top' | 'left';
  labelWidth?: number | string;
  /** Whether to show the Bezel section in the popover. Defaults to true. */
  showBezel?: boolean;
  /** Preset shadow swatches shown at the bottom of the popover. */
  shadowPresets?: ShadowPreset[];
  /** Called when a preset swatch is clicked with its structured values. */
  onPresetSelect?: (value: Partial<PhoneShadow>) => void;
  offsetX?: number;
  offsetY?: number;
}

/**
 * Build a CSS box-shadow string for the preset swatch preview.
 * Shadow values are scaled down proportionally from phone-sized values
 * (reference: ~200px tall phone) to swatch size (48px tall).
 */
const SWATCH_SCALE = 48 / 200;

function presetToCSS(v: Partial<PhoneShadow>): string {
  const opacity = v.shadowOpacity ?? 0;
  if (opacity === 0) return 'none';
  const color = v.shadowColor ?? '#000000';
  const h = color.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const x = Math.round((v.offsetX ?? 0) * SWATCH_SCALE);
  const y = Math.round((v.offsetY ?? 0) * SWATCH_SCALE);
  const blur = Math.round((v.blur ?? 0) * SWATCH_SCALE);
  const spread = Math.round((v.spread ?? 0) * SWATCH_SCALE);
  return `${x}px ${y}px ${blur}px ${spread}px rgba(${r},${g},${b},${opacity})`;
}

const ShadowEditor: React.FC<ShadowEditorProps> = ({ value, onChange, label, labelPosition, labelWidth, showBezel = true, shadowPresets, onPresetSelect, offsetX = 0, offsetY = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const update = useCallback(
    (field: keyof PhoneShadow, val: number | string) => {
      onChange({ [field]: val });
    },
    [onChange],
  );

  const summaryLabel = [
    showBezel && value.bezelWidth > 0 ? `Bezel ${value.bezelWidth}px` : null,
    `${value.offsetX}px ${value.offsetY}px ${value.blur}px ${value.spread}px`,
    `${Math.round(value.shadowOpacity * 100)}%`,
  ].filter(Boolean).join(' · ');

  const editor = (
    <div className={styles.container}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={styles.triggerLabel}>{summaryLabel}</span>
      </button>

      <Popover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        anchorRef={triggerRef}
        className={styles.dropdown}
        matchWidth
        role="dialog"
        aria-label="Shadow editor"
        offsetX={offsetX}
        offsetY={offsetY}
      >
        {showBezel && (
          <div className={styles.group}>
            <h5 className={styles.groupHeader}>Bezel</h5>
            <CompactInput
              label="Width"
              labelPosition="left"
              prefix="px"
              type="number"
              value={String(value.bezelWidth)}
              onChange={(v) => update('bezelWidth', Number(v))}
              min={0}
              max={16}
              scrub
              labelWidth={52}
            />
            <ColorPicker
              label="Color"
              labelPosition="left"
              labelWidth={52}
              value={value.bezelColor}
              onChange={(v) => update('bezelColor', v)}
              swatches={BEZEL_SWATCHES}
            />
          </div>
        )}

        <div className={styles.group}>
          {showBezel && <h5 className={styles.groupHeader}>Drop shadow</h5>}
          <CompactInput
            label="Offset X"
            labelPosition="left"
            prefix="px"
            type="number"
            value={String(value.offsetX)}
            onChange={(v) => update('offsetX', Number(v))}
            min={-40}
            max={40}
            scrub
            labelWidth={52}
          />
          <CompactInput
            label="Offset Y"
            labelPosition="left"
            prefix="px"
            type="number"
            value={String(value.offsetY)}
            onChange={(v) => update('offsetY', Number(v))}
            min={-40}
            max={40}
            scrub
            labelWidth={52}
          />
          <CompactInput
            label="Blur"
            labelPosition="left"
            prefix="px"
            type="number"
            value={String(value.blur)}
            onChange={(v) => update('blur', Number(v))}
            min={0}
            max={100}
            scrub
            labelWidth={52}
          />
          <CompactInput
            label="Spread"
            labelPosition="left"
            prefix="px"
            type="number"
            value={String(value.spread)}
            onChange={(v) => update('spread', Number(v))}
            min={-20}
            max={40}
            scrub
            labelWidth={52}
          />
          <ColorPicker
            label="Color"
            labelPosition="left"
            labelWidth={52}
            value={value.shadowColor}
            onChange={(v) => update('shadowColor', v)}
            opacity={value.shadowOpacity}
            onOpacityChange={(v) => update('shadowOpacity', v)}
            swatches={SHADOW_SWATCHES}
          />
        </div>

        {shadowPresets && shadowPresets.length > 0 && (
          <div className={styles.presets}>
            {shadowPresets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                className={styles.presetSwatch}
                style={{ boxShadow: presetToCSS(preset.value) }}
                title={preset.label}
                onClick={() => onPresetSelect?.(preset.value)}
              />
            ))}
          </div>
        )}
      </Popover>
    </div>
  );

  if (!label) return editor;

  return (
    <FieldLabel label={label} labelPosition={labelPosition} labelWidth={labelWidth}>
      {editor}
    </FieldLabel>
  );
};

export default ShadowEditor;
