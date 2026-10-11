import React, { useState, useRef, useMemo } from 'react';
import ColorWheel, { hsvToHex, hexToHsv } from './ColorWheel';
import CompactInput from '../CompactInput';
import LabeledField from '../LabeledField';
import Popover from '../Popover';
import styles from './ColorPicker.module.css';

export interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  opacity?: number;
  onOpacityChange?: (opacity: number) => void;
  label?: string;
  labelPosition?: 'top' | 'left';
  labelWidth?: number | string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  id?: string;
  swatches?: string[];
  showHex?: boolean;
  offsetX?: number;
  offsetY?: number;
  /** Controlled open state. If provided, the component does not manage its own open/close. */
  isOpen?: boolean;
  /** Called when the popover should open or close in controlled mode. */
  onOpenChange?: (open: boolean) => void;
}

const HEX_REGEX = /^#[0-9a-fA-F]{6}$/;

const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  opacity,
  onOpacityChange,
  label,
  labelPosition = 'top',
  labelWidth,
  error,
  helperText,
  disabled = false,
  id,
  swatches,
  showHex = true,
  offsetX = 0,
  offsetY = 0,
  isOpen: controlledIsOpen,
  onOpenChange,
}) => {
  const isControlled = controlledIsOpen !== undefined;
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  const [independentHue, setIndependentHue] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const derivedHsv = useMemo(
    () => (HEX_REGEX.test(value) ? hexToHsv(value) : { h: 0, s: 1, v: 1 }),
    [value],
  );
  const hsv = {
    ...derivedHsv,
    h: independentHue !== null ? independentHue : derivedHsv.h,
  };

  const setIsOpen = (open: boolean) => {
    if (isControlled) {
      onOpenChange?.(open);
    } else {
      setInternalIsOpen(open);
    }
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleHexInput = (raw: string) => {
    const hex = '#' + raw.replace(/^#/, '');
    if (HEX_REGEX.test(hex)) {
      setIndependentHue(null);
      onChange(hex.toLowerCase());
    }
  };

  const handleWheelChange = (h: number, s: number, v: number) => {
    setIndependentHue(h);
    onChange(hsvToHex(h, s, v));
  };

  const swatchButton = (
    <button
      type="button"
      className={styles.swatch}
      style={{
        backgroundColor: HEX_REGEX.test(value) ? value : '#000000',
        opacity: opacity !== undefined ? opacity : 1,
      }}
      onClick={handleToggle}
      disabled={disabled}
      aria-label="Open color picker"
      data-testid="color-swatch"
    />
  );

  const picker = (
    <div ref={containerRef} className={styles.colorPicker}>
      <div className={styles.inputRow}>
        {showHex ? (
          <CompactInput
            id={id}
            prefix="#"
            value={value.replace(/^#/, '')}
            onChange={handleHexInput}
            error={!!error}
            prefixSlot={swatchButton}
          />
        ) : (
          <div className={`${styles.swatchFrame} ${error ? styles.swatchFrameError : ''}`}>
            {swatchButton}
          </div>
        )}
        {onOpacityChange && (
          <CompactInput
            prefix="%"
            type="number"
            value={String(Math.round((opacity ?? 1) * 100))}
            onChange={(v) => onOpacityChange(Math.min(100, Math.max(0, Number(v))) / 100)}
            min={0}
            max={100}
            scrub
            className={styles.opacityInput}
          />
        )}
      </div>

      <Popover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        anchorRef={containerRef}
        className={styles.dropdown}
        role="dialog"
        aria-label="Color picker"
        offsetX={offsetX}
        offsetY={offsetY}
      >
        <div className={styles.wheelContainer}>
          <ColorWheel
            hue={hsv.h}
            saturation={hsv.s}
            brightness={hsv.v}
            onChange={handleWheelChange}
          />
        </div>
        {swatches && swatches.length > 0 && (
          <div className={styles.swatchGrid}>
            {swatches.map((color) => (
              <button
                key={color}
                type="button"
                className={`${styles.swatchOption} ${value.toLowerCase() === color.toLowerCase() ? styles.swatchSelected : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => {
                  setIndependentHue(null);
                  onChange(color.toLowerCase());
                  setIsOpen(false);
                }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        )}
        <div>
          <CompactInput
            prefix="#"
            value={value.replace(/^#/, '')}
            onChange={handleHexInput}
          />
        </div>
      </Popover>
    </div>
  );

  return (
    <LabeledField label={label} labelPosition={labelPosition} labelWidth={labelWidth} htmlFor={id} disabled={disabled} error={error} helperText={helperText}>
      {picker}
    </LabeledField>
  );
};

export default ColorPicker;
