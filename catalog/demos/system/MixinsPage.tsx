import React from 'react';
import { ChevronDown } from 'lucide-react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { CopyButton } from '../../shared/CopyButton';
import styles from './MixinsPage.module.css';

type MixinDef = { mixin: string; desc: string; preview: React.ReactNode };

const disabledMixins: MixinDef[] = [
  {
    mixin: 'disabled-state',
    desc: 'For non-button elements — opacity + pointer-events:none',
    preview: <div className={styles.previewDisabledState}>List item</div>,
  },
  {
    mixin: 'disabled-button',
    desc: 'For <button> elements — opacity + cursor:not-allowed',
    preview: <button className={styles.previewDisabledButton} disabled>Button</button>,
  },
];

const accessibilityMixins: MixinDef[] = [
  {
    mixin: 'visually-hidden',
    desc: 'Hides element visually while keeping it accessible to screen readers',
    preview: (
      <div className={styles.previewVisuallyHidden}>
        <span className={styles.previewVisuallyHiddenLabel}>Hidden</span>
        <span className={styles.previewVisuallyHiddenVisible}>← hidden to eyes</span>
      </div>
    ),
  },
];

const textMixins: MixinDef[] = [
  {
    mixin: 'text-truncate',
    desc: 'Single-line text truncation with ellipsis',
    preview: <span className={styles.previewTextTruncate}>This is a very long label that will be truncated</span>,
  },
];

const iconButtonMixins: MixinDef[] = [
  {
    mixin: 'icon-button',
    desc: 'Structural base for small square icon-only buttons — apply size and border-radius separately',
    preview: (
      <button className={styles.previewIconButton}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      </button>
    ),
  },
];

const focusMixins: MixinDef[] = [
  {
    mixin: 'focus-ring',
    desc: 'Standard outset focus ring — use on most interactive elements',
    preview: <div className={styles.previewFocusRing}>Button</div>,
  },
  {
    mixin: 'focus-ring-inset',
    desc: 'Inset focus ring — use when outset would be clipped by overflow:hidden',
    preview: <div className={styles.previewFocusRingInset}>Button</div>,
  },
];

const popoverMixins: MixinDef[] = [
  {
    mixin: 'popover-panel',
    desc: 'Standard dropdown / popover surface with background, border, and shadow',
    preview: (
      <div className={styles.previewPopover}>
        <div className={styles.previewPopoverItem}>Option one</div>
        <div className={styles.previewPopoverItem}>Option two</div>
        <div className={styles.previewPopoverItem}>Option three</div>
      </div>
    ),
  },
];

const inputMixins: MixinDef[] = [
  {
    mixin: 'input-base',
    desc: 'Shared appearance for <input> and <textarea> — background, border, hover, focus states',
    preview: <input className={styles.previewInputBase} placeholder="Placeholder…" readOnly />,
  },
  {
    mixin: 'input-wrapper',
    desc: 'Compound input container wrapping an <input> alongside other elements — uses :focus-within',
    preview: (
      <div className={styles.previewInputWrapper}>
        <span className={styles.previewSwatch} />
        <input className={styles.previewInputInner} placeholder="Placeholder…" readOnly />
      </div>
    ),
  },
  {
    mixin: 'input-sm',
    desc: 'Small text input (28px) — includes input-base, height, padding, and radius',
    preview: <input className={styles.previewInputSm} placeholder="Small input…" readOnly />,
  },
  {
    mixin: 'input-md',
    desc: 'Standard text input (36px) — includes input-base, height, padding, and radius',
    preview: <input className={styles.previewInputMd} placeholder="Medium input…" readOnly />,
  },
  {
    mixin: 'input-trigger',
    desc: 'Clickable element styled as an input (Select, ColorPicker triggers) — uses focus-visible',
    preview: (
      <div className={styles.previewInputTrigger}>
        <span className={styles.previewTriggerText}>Select…</span>
        <ChevronDown size={14} />
      </div>
    ),
  },
];

function MixinRow({ mixin, desc, preview }: MixinDef) {
  return (
    <div className={styles.row}>
      <div className={styles.previewCell}>{preview}</div>
      <div className={styles.rowMain}>
        <code className={styles.mixinName}>@mixin {mixin}</code>
        <span className={styles.desc}>{desc}</span>
      </div>
      <CopyButton value={`@mixin ${mixin};`} />
    </div>
  );
}

export default function MixinsPage() {
  return (
    <div className={styles.page}>
      <DemoSection title="Component Mixins" description="Structural PostCSS mixins from mixins.css for common component patterns. Use @mixin in CSS Modules files.">
        <DemoSubsection label="Disabled States">
          <div className={styles.list}>
            {disabledMixins.map((m) => <MixinRow key={m.mixin} {...m} />)}
          </div>
        </DemoSubsection>

        <DemoSubsection label="Accessibility">
          <div className={styles.list}>
            {accessibilityMixins.map((m) => <MixinRow key={m.mixin} {...m} />)}
          </div>
        </DemoSubsection>

        <DemoSubsection label="Text">
          <div className={styles.list}>
            {textMixins.map((m) => <MixinRow key={m.mixin} {...m} />)}
          </div>
        </DemoSubsection>

        <DemoSubsection label="Icon Button">
          <div className={styles.list}>
            {iconButtonMixins.map((m) => <MixinRow key={m.mixin} {...m} />)}
          </div>
        </DemoSubsection>

        <DemoSubsection label="Focus Rings">
          <div className={styles.list}>
            {focusMixins.map((m) => <MixinRow key={m.mixin} {...m} />)}
          </div>
        </DemoSubsection>

        <DemoSubsection label="Popover">
          <div className={styles.list}>
            {popoverMixins.map((m) => <MixinRow key={m.mixin} {...m} />)}
          </div>
        </DemoSubsection>

        <DemoSubsection label="Inputs">
          <div className={styles.list}>
            {inputMixins.map((m) => <MixinRow key={m.mixin} {...m} />)}
          </div>
        </DemoSubsection>
      </DemoSection>
    </div>
  );
}
