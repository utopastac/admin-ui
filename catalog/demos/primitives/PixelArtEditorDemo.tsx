import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PixelArtEditor } from '@/primitives';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';

const PixelArtEditorProps: PropRow[] = [
  { prop: 'width', type: 'number', description: 'Logical canvas width in pixels (number of columns)' },
  { prop: 'height', type: 'number', description: 'Logical canvas height in pixels (number of rows)' },
  { prop: 'value', type: 'string', description: 'Current SVG string value' },
  { prop: 'onChange', type: '(svg: string) => void', description: 'Called with the full SVG string on every edit' },
  { prop: 'palette', type: 'string[]', description: 'Colour swatches shown in the toolbar' },
  { prop: 'popover', type: 'boolean', default: 'false', description: 'When true, renders as a popover trigger instead of inline' },
  { prop: 'popoverWidth', type: 'number', description: 'Width in px for the popover editor panel' },
  { prop: 'triggerHeight', type: 'number', description: 'Height in px for the popover trigger preview image (width scales proportionally)' },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'When true, prevents all drawing interactions' },
  { prop: 'className', type: 'string', description: 'Additional class name applied to the root element' },
  { prop: 'offsetX', type: 'number', default: '0', description: 'Horizontal offset for the popover' },
  { prop: 'offsetY', type: 'number', default: '0', description: 'Vertical offset for the popover' },
  { prop: 'defaultOpen', type: 'boolean', default: 'false', description: 'When true, opens the popover immediately on mount' },
  { prop: 'pngExportScale', type: 'number', default: '8', description: 'Integer scale factor applied when exporting to PNG — each logical pixel becomes this many raster pixels' },
  { prop: 'sizes', type: 'number[]', description: 'Optional list of preset square grid sizes. When provided, a toolbar picker is rendered; selecting a size clears the canvas and resizes the grid. `width` seeds the initial size; `height` is ignored' },
  { prop: 'onSizeChange', type: '(width: number, height: number) => void', description: 'Fired when the grid size changes via the picker' },
];

const RETRO_PALETTE = [
  '#000000',
  '#ffffff',
  '#ff0000',
  '#00aa00',
  '#0000ff',
  '#ffff00',
  '#ff8800',
  '#aa00aa',
  '#00aaaa',
  '#aaaaaa',
  '#555555',
  '#ff5555',
  '#55ff55',
  '#5555ff',
  '#ffaa00',
  '#ff55ff',
];

const MONO_PALETTE = ['#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff'];

export default function PixelArtEditorDemo() {
  const [svg16, setSvg16] = useState('');
  const [svg32, setSvg32] = useState('');

  return (
    <DemoSection
      title="PixelArtEditor"
      description="A pixel-level canvas editor with paint, eraser, fill, eyedropper, line, rectangle, pen, and marquee selection tools. Emits a compact SVG string on every change. Supports inline and popover display modes."
    >
      <DemoShowcase code={`import { PixelArtEditor } from 'admin-ui';

const [svg, setSvg] = useState('');

<PixelArtEditor
  width={16}
  height={16}
  palette={['#000000', '#ffffff', '#ff0000', '#00aa00', '#0000ff', '#ffff00']}
  sizes={[8, 16, 32, 64]}
  onChange={(s) => setSvg(s)}
/>`}>
        <div style={{ width: 400 }}>
          <PixelArtEditor
            width={16}
            height={16}
            palette={RETRO_PALETTE}
            sizes={[8, 16, 32, 64]}
            onChange={(s) => setSvg16(s)}
          />
        </div>
      </DemoShowcase>
      <PropsTable props={PixelArtEditorProps} />

      <DemoSubsection label="16×16 with retro palette (live SVG output)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-m)' }}>
          <PixelArtEditor
            width={16}
            height={16}
            palette={RETRO_PALETTE}
            onChange={(s) => setSvg16(s)}
          />
          <pre
            style={{
              margin: 0,
              padding: 'var(--admin-space-s)',
              background: 'var(--admin-surface-subtle)',
              borderRadius: 'var(--admin-radius-s)',
              fontSize: 'var(--admin-font-size-xs)',
              color: 'var(--admin-text-secondary)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
              minHeight: '2.5rem',
              maxHeight: '10rem',
              overflowY: 'auto',
            }}
          >
            {svg16 || <span style={{ opacity: 0.5 }}>SVG output appears here…</span>}
          </pre>
        </div>
      </DemoSubsection>

      <DemoSubsection label="32×32 inline editor">
        <PixelArtEditor
          width={32}
          height={32}
          palette={RETRO_PALETTE}
          onChange={(s) => setSvg32(s)}
        />
      </DemoSubsection>

      <DemoSubsection label="Monochrome palette">
        <PixelArtEditor
          width={16}
          height={16}
          palette={MONO_PALETTE}
          onChange={() => {}}
        />
      </DemoSubsection>

      <DemoSubsection label="Popover mode">
        <PixelArtEditor
          width={16}
          height={16}
          palette={RETRO_PALETTE}
          popover
          onChange={() => {}}
        />
      </DemoSubsection>

      <DemoSubsection label="Popover mode — triggerHeight">
        <div style={{ display: 'flex', gap: 'var(--admin-space-m)', alignItems: 'center' }}>
          <PixelArtEditor
            width={16}
            height={16}
            palette={RETRO_PALETTE}
            popover
            triggerHeight={24}
            onChange={() => {}}
          />
          <PixelArtEditor
            width={16}
            height={16}
            palette={RETRO_PALETTE}
            popover
            triggerHeight={48}
            onChange={() => {}}
          />
          <PixelArtEditor
            width={16}
            height={16}
            palette={RETRO_PALETTE}
            popover
            triggerHeight={96}
            onChange={() => {}}
          />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Popover mode — 32×32">
        <PixelArtEditor
          width={32}
          height={32}
          palette={RETRO_PALETTE}
          popover
          onChange={() => {}}
        />
      </DemoSubsection>

      <DemoSubsection label="Disabled">
        <PixelArtEditor
          width={16}
          height={16}
          palette={RETRO_PALETTE}
          disabled
          onChange={() => {}}
        />
      </DemoSubsection>

      <DemoSubsection label="Narrow — swatch scrolling">
        <div style={{ width: 240 }}>
          <PixelArtEditor
            width={16}
            height={16}
            palette={RETRO_PALETTE}
            onChange={() => {}}
          />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Disabled popover mode">
        <PixelArtEditor
          width={16}
          height={16}
          palette={RETRO_PALETTE}
          popover
          disabled
          onChange={() => {}}
        />
      </DemoSubsection>
    </DemoSection>
  );
}
