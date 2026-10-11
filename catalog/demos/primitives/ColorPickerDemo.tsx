import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import ColorPicker from '@/primitives/ColorPicker';

const ColorPickerProps: PropRow[] = [
  { prop: 'value', type: 'string', description: 'Current hex color value (e.g. "#3b82f6").' },
  { prop: 'onChange', type: '(value: string) => void', description: 'Called when the color changes.' },
  { prop: 'opacity', type: 'number', description: 'Current opacity (0–1). When provided, enables the opacity control.' },
  { prop: 'onOpacityChange', type: '(opacity: number) => void', description: 'Called when opacity changes.' },
  { prop: 'label', type: 'string', description: 'Label text rendered above or beside the input.' },
  { prop: 'labelPosition', type: 'string', default: "'top'", options: ['top', 'left'], description: 'Position of the label.' },
  { prop: 'labelWidth', type: 'number | string', description: 'Fixed width for the label.' },
  { prop: 'error', type: 'string', description: 'Error message to display.' },
  { prop: 'helperText', type: 'string', description: 'Helper text displayed below the input.' },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Whether the picker is disabled.' },
  { prop: 'id', type: 'string', description: 'ID forwarded to the underlying input.' },
  { prop: 'swatches', type: 'string[]', description: 'Preset color swatches shown in the popover.' },
  { prop: 'showHex', type: 'boolean', default: 'true', description: 'Whether to show the hex text input.' },
  { prop: 'offsetX', type: 'number', default: '0', description: 'Horizontal offset for the popover.' },
  { prop: 'offsetY', type: 'number', default: '0', description: 'Vertical offset for the popover.' },
  { prop: 'isOpen', type: 'boolean', description: 'Controlled open state for the popover.' },
  { prop: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when the popover open state should change.' },
];

export default function ColorPickerDemo() {
  const [basic, setBasic] = useState('#3b82f6');
  const [labeled, setLabeled] = useState('#3b82f6');
  const [withError, setWithError] = useState('#zzzzzz');
  const [withHelper, setWithHelper] = useState('#10b981');
  const [disabled, setDisabled] = useState('#6366f1');
  const [colorSwatches, setColorSwatches] = useState('#3b82f6');
  const [leftLabel, setLeftLabel] = useState('#8b5cf6');
  const [opacityColor, setOpacityColor] = useState('#ef4444');
  const [opacity, setOpacity] = useState(0.75);
  const [aligned1, setAligned1] = useState('#3b82f6');
  const [aligned1Opacity, setAligned1Opacity] = useState(1);
  const [aligned2, setAligned2] = useState('#10b981');
  const [aligned2Opacity, setAligned2Opacity] = useState(0.5);
  const [swatchOnly, setSwatchOnly] = useState('#8b5cf6');
  const [swatchOnlyOpacity, setSwatchOnlyOpacity] = useState(1);

  return (
    <DemoSection
      title="ColorPicker"
      description="A color picker with hex input, Figma-style saturation/brightness area, hue bar, optional opacity control, and preset swatches."
    >
      <DemoShowcase code={`import { ColorPicker } from 'admin-ui';

const [color, setColor] = useState('#3b82f6');

<ColorPicker label="Brand Color" value={color} onChange={setColor} />`}>
        <div style={{ width: '280px' }}>
          <ColorPicker label="Brand Color" value={labeled} onChange={setLabeled} id="color-showcase" />
        </div>
      </DemoShowcase>
      <PropsTable props={ColorPickerProps} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--admin-space-l)' }}>
        <DemoSubsection label="Basic">
          <ColorPicker
            value={basic}
            onChange={setBasic}
            id="color-basic"
          />
        </DemoSubsection>

        <DemoSubsection label="With Label (top)">
          <ColorPicker
            label="Theme Color"
            value={labeled}
            onChange={setLabeled}
            id="color-labeled"
          />
        </DemoSubsection>

        <DemoSubsection label="Label Left">
          <ColorPicker
            label="Fill"
            labelPosition="left"
            value={leftLabel}
            onChange={setLeftLabel}
          />
        </DemoSubsection>

        <DemoSubsection label="With Opacity">
          <ColorPicker
            label="Overlay"
            value={opacityColor}
            onChange={setOpacityColor}
            opacity={opacity}
            onOpacityChange={setOpacity}
          />
        </DemoSubsection>

        <DemoSubsection label="Aligned with labelWidth">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-xs)' }}>
            <ColorPicker
              label="Fill"
              labelPosition="left"
              labelWidth={52}
              value={aligned1}
              onChange={setAligned1}
              opacity={aligned1Opacity}
              onOpacityChange={setAligned1Opacity}
            />
            <ColorPicker
              label="Stroke"
              labelPosition="left"
              labelWidth={52}
              value={aligned2}
              onChange={setAligned2}
              opacity={aligned2Opacity}
              onOpacityChange={setAligned2Opacity}
            />
          </div>
        </DemoSubsection>

        <DemoSubsection label="With Swatches">
          <div style={{ width: '280px' }}>
            <ColorPicker
              label="Brand Color"
              value={colorSwatches}
              onChange={setColorSwatches}
              swatches={['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899']}
            />
          </div>
        </DemoSubsection>

        <DemoSubsection label="With Error">
          <ColorPicker
            label="Accent Color"
            value={withError}
            onChange={setWithError}
            error="Please enter a valid hex color"
            id="color-error"
          />
        </DemoSubsection>

        <DemoSubsection label="With Helper Text">
          <ColorPicker
            label="Success Color"
            value={withHelper}
            onChange={setWithHelper}
            helperText="Enter a 7-character hex color (e.g. #10b981)"
            id="color-helper"
          />
        </DemoSubsection>

        <DemoSubsection label="Disabled">
          <ColorPicker
            label="Locked Color"
            value={disabled}
            onChange={setDisabled}
            disabled
            id="color-disabled"
          />
        </DemoSubsection>

        <DemoSubsection label="Swatch only (showHex=false)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-xs)' }}>
            <ColorPicker
              label="Fill"
              labelPosition="left"
              labelWidth={52}
              value={swatchOnly}
              onChange={setSwatchOnly}
              opacity={swatchOnlyOpacity}
              onOpacityChange={setSwatchOnlyOpacity}
              showHex={false}
            />
          </div>
        </DemoSubsection>
      </div>
    </DemoSection>
  );
}
