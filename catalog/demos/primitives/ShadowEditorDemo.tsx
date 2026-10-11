import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import ShadowEditor from '@/primitives/ShadowEditor';
import type { PhoneShadow, ShadowPreset } from '@/primitives/ShadowEditor';

const ShadowEditorProps: PropRow[] = [
  { prop: 'value', type: 'PhoneShadow', description: 'Current shadow configuration object.' },
  { prop: 'onChange', type: '(partial: Partial<PhoneShadow>) => void', description: 'Called with updated fields when any value changes.' },
  { prop: 'label', type: 'string', description: 'Field label text.' },
  { prop: 'labelPosition', type: "'top' | 'left'", options: ['top', 'left'], description: 'Position of the label relative to the field.' },
  { prop: 'labelWidth', type: 'number | string', description: 'Fixed width applied to the label.' },
  { prop: 'showBezel', type: 'boolean', default: 'true', description: 'Whether to show the Bezel section in the popover.' },
  { prop: 'shadowPresets', type: 'ShadowPreset[]', description: 'Preset shadow swatches shown at the bottom of the popover.' },
  { prop: 'onPresetSelect', type: '(value: Partial<PhoneShadow>) => void', description: 'Called when a preset swatch is clicked.' },
  { prop: 'offsetX', type: 'number', default: '0', description: 'Horizontal offset for the popover.' },
  { prop: 'offsetY', type: 'number', default: '0', description: 'Vertical offset for the popover.' },
];

const DEFAULT_SHADOW: PhoneShadow = {
  bezelWidth: 8,
  bezelColor: '#1f2937',
  offsetX: 0,
  offsetY: 20,
  blur: 40,
  spread: 0,
  shadowColor: '#000000',
  shadowOpacity: 0.5,
};

const SHADOW_PRESETS: ShadowPreset[] = [
  { label: 'None', value: { shadowOpacity: 0 } },
  { label: 'Soft', value: { offsetX: 0, offsetY: 4, blur: 16, spread: 0, shadowColor: '#000000', shadowOpacity: 0.12 } },
  { label: 'Medium', value: { offsetX: 0, offsetY: 8, blur: 24, spread: 0, shadowColor: '#000000', shadowOpacity: 0.25 } },
  { label: 'Deep', value: { offsetX: 0, offsetY: 20, blur: 40, spread: 0, shadowColor: '#000000', shadowOpacity: 0.5 } },
  { label: 'Dramatic', value: { offsetX: 0, offsetY: 32, blur: 64, spread: -8, shadowColor: '#000000', shadowOpacity: 0.7 } },
];

export default function ShadowEditorDemo() {
  const [shadow, setShadow] = useState<PhoneShadow>(DEFAULT_SHADOW);
  const [shadowOnly, setShadowOnly] = useState<PhoneShadow>({
    ...DEFAULT_SHADOW,
    bezelWidth: 0,
    offsetY: 12,
    blur: 24,
    spread: -4,
    shadowOpacity: 0.3,
  });
  const [withPresets, setWithPresets] = useState<PhoneShadow>({
    ...DEFAULT_SHADOW,
    bezelWidth: 0,
    offsetY: 8,
    blur: 16,
    spread: 0,
    shadowOpacity: 0.2,
  });

  const boxShadow = `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${shadow.spread}px rgba(0,0,0,${shadow.shadowOpacity})`;

  return (
    <DemoSection
      title="ShadowEditor"
      description="An editor for phone bezel and drop shadow settings. Opens a popover with sliders and color pickers for fine-grained control."
    >
      <DemoShowcase code={`import { ShadowEditor } from 'admin-ui';
import type { PhoneShadow } from 'admin-ui';

const [shadow, setShadow] = useState<PhoneShadow>({
  bezelWidth: 8,
  bezelColor: '#1f2937',
  offsetX: 0,
  offsetY: 20,
  blur: 40,
  spread: 0,
  shadowColor: '#000000',
  shadowOpacity: 0.5,
});

<ShadowEditor
  value={shadow}
  onChange={(partial) => setShadow((prev) => ({ ...prev, ...partial }))}
/>`}>
        <div style={{ width: '280px' }}>
          <ShadowEditor
            value={shadow}
            onChange={(partial) => setShadow((prev) => ({ ...prev, ...partial }))}
          />
        </div>
      </DemoShowcase>
      <PropsTable props={ShadowEditorProps} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--admin-space-l)' }}>
        <DemoSubsection label="With bezel + live preview">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-m)' }}>
            <ShadowEditor
              value={shadow}
              onChange={(partial) => setShadow((prev) => ({ ...prev, ...partial }))}
            />
            <div style={{
              width: 120,
              height: 200,
              borderRadius: 16,
              backgroundColor: '#f3f4f6',
              border: shadow.bezelWidth > 0 ? `${shadow.bezelWidth}px solid ${shadow.bezelColor}` : undefined,
              boxShadow,
              margin: '20px auto',
            }} />
          </div>
        </DemoSubsection>

        <DemoSubsection label="Shadow only (showBezel=false)">
          <ShadowEditor
            value={shadowOnly}
            onChange={(partial) => setShadowOnly((prev) => ({ ...prev, ...partial }))}
            showBezel={false}
          />
        </DemoSubsection>

        <DemoSubsection label="With presets">
          <ShadowEditor
            value={withPresets}
            onChange={(partial) => setWithPresets((prev) => ({ ...prev, ...partial }))}
            showBezel={false}
            shadowPresets={SHADOW_PRESETS}
            onPresetSelect={(val) => {
              setWithPresets((prev) => ({ ...prev, ...val }));
            }}
          />
        </DemoSubsection>
      </div>
    </DemoSection>
  );
}
