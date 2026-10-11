import React, { useEffect, useState, useMemo } from 'react';
import { InlineSearch } from '@/primitives';
import { PageHeading } from '@/layout';
import { CopyButton } from '../../shared/CopyButton';
import styles from './ColorsPage.module.css';

// ── Primitive color ramps ────────────────────────────────────────────────────

const PRIMITIVE_RAMPS: { name: string; prefix: string; steps: string[] }[] = [
  { name: 'Black', prefix: '--admin-black', steps: ['2', '5', '10', '20', '30', '40', '50', '60', '70', '80', '85', '90', '100'] },
  { name: 'Black (alpha)', prefix: '--admin-black-alpha', steps: ['2', '5', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'] },
  { name: 'White', prefix: '--admin-white', steps: ['100'] },
  { name: 'White (alpha)', prefix: '--admin-white-alpha', steps: ['5', '10', '20', '30', '40', '50', '60', '70', '80', '90'] },
  { name: 'Blue', prefix: '--admin-blue', steps: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '150'] },
  { name: 'Orange', prefix: '--admin-orange', steps: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '150'] },
  { name: 'Green', prefix: '--admin-green', steps: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '150'] },
  { name: 'Red', prefix: '--admin-red', steps: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '150'] },
];

// ── Semantic token groups ────────────────────────────────────────────────────

type TokenDef = { token: string; desc: string };
type TokenGroup = { label: string; tokens: TokenDef[] };

const SEMANTIC_GROUPS: TokenGroup[] = [
  {
    label: 'Text',
    tokens: [
      { token: '--admin-text-primary', desc: 'Primary text' },
      { token: '--admin-text-secondary', desc: 'Secondary text' },
      { token: '--admin-text-subtle', desc: 'Subtle / muted text' },
      { token: '--admin-text-placeholder', desc: 'Input placeholder text' },
      { token: '--admin-text-highlight', desc: 'Links and highlights' },
      { token: '--admin-link-text', desc: 'Link text' },
      { token: '--admin-link-hover-text', desc: 'Link hover text' },
      { token: '--admin-icon-primary', desc: 'Primary icon color' },
      { token: '--admin-icon-secondary', desc: 'Secondary icon color' },
      { token: '--admin-icon-muted', desc: 'Muted icon color' },
      { token: '--admin-text-warning', desc: 'Warning text' },
      { token: '--admin-text-error', desc: 'Error text' },
      { token: '--admin-text-success', desc: 'Success text' },
      { token: '--admin-text-info', desc: 'Info text' },
      { token: '--admin-text-annotation', desc: 'Annotation text' },
      { token: '--admin-text-inverted-primary', desc: 'Inverted primary' },
      { token: '--admin-text-inverted-secondary', desc: 'Inverted secondary' },
      { token: '--admin-text-inverted-subtle', desc: 'Inverted subtle' },
      { token: '--admin-text-inverted-extra-subtle', desc: 'Inverted extra-subtle' },
    ],
  },
  {
    label: 'Surface',
    tokens: [
      { token: '--admin-surface-primary', desc: 'Primary surface' },
      { token: '--admin-surface-secondary', desc: 'Secondary surface' },
      { token: '--admin-surface-mid', desc: 'Mid-tone surface' },
      { token: '--admin-surface-subtle', desc: 'Subtle surface' },
      { token: '--admin-surface-extra-subtle', desc: 'Extra-subtle surface' },
      { token: '--admin-surface-action', desc: 'Action surface (buttons)' },
      { token: '--admin-surface-highlight', desc: 'Highlight (brand)' },
      { token: '--admin-surface-inverted-primary', desc: 'Inverted primary' },
      { token: '--admin-surface-inverted-subtle', desc: 'Inverted subtle' },
      { token: '--admin-surface-inverted-extra-subtle', desc: 'Inverted extra-subtle' },
      { token: '--admin-surface-warning-primary', desc: 'Warning primary' },
      { token: '--admin-surface-warning-secondary', desc: 'Warning secondary' },
      { token: '--admin-surface-warning-subtle', desc: 'Warning subtle' },
      { token: '--admin-surface-success-primary', desc: 'Success primary' },
      { token: '--admin-surface-success-secondary', desc: 'Success secondary' },
      { token: '--admin-surface-success-subtle', desc: 'Success subtle' },
      { token: '--admin-surface-error-primary', desc: 'Error primary' },
      { token: '--admin-surface-error-secondary', desc: 'Error secondary' },
      { token: '--admin-surface-error-subtle', desc: 'Error subtle' },
      { token: '--admin-surface-info-primary', desc: 'Info primary' },
      { token: '--admin-surface-info-secondary', desc: 'Info secondary' },
      { token: '--admin-surface-info-subtle', desc: 'Info subtle' },
    ],
  },
  {
    label: 'Page',
    tokens: [
      { token: '--admin-page-background', desc: 'Whole-page canvas background' },
      { token: '--admin-chrome-background', desc: 'Navigation chrome background' },
      { token: '--admin-topnav-backdrop-filter', desc: 'Top navigation backdrop filter' },
    ],
  },
  {
    label: 'Component Roles',
    tokens: [
      { token: '--admin-panel-background', desc: 'Floating panel background' },
      { token: '--admin-panel-backdrop-filter', desc: 'Floating panel backdrop filter' },
      { token: '--admin-panel-border', desc: 'Floating panel border' },
      { token: '--admin-card-background', desc: 'Card background' },
      { token: '--admin-card-border', desc: 'Card border' },
      { token: '--admin-neutral-badge-bg', desc: 'Neutral badge and pill background' },
      { token: '--admin-neutral-badge-text', desc: 'Neutral badge and pill text' },
      { token: '--admin-neutral-badge-border', desc: 'Neutral badge and pill border' },
      { token: '--admin-table-header-background', desc: 'Table header background' },
      { token: '--admin-table-row-hover', desc: 'Table row hover background' },
      { token: '--admin-table-row-selected', desc: 'Table row selected background' },
      { token: '--admin-table-border', desc: 'Table row border' },
      { token: '--admin-separator-color', desc: 'Internal separator color' },
    ],
  },
  {
    label: 'Border',
    tokens: [
      { token: '--admin-border-prominent', desc: 'Prominent border' },
      { token: '--admin-border-subtle', desc: 'Subtle border' },
      { token: '--admin-border-highlight', desc: 'Highlight border (focus)' },
      { token: '--admin-border-inverted-prominent', desc: 'Inverted prominent' },
      { token: '--admin-border-inverted-subtle', desc: 'Inverted subtle' },
      { token: '--admin-border-info', desc: 'Info border' },
      { token: '--admin-border-success', desc: 'Success border' },
      { token: '--admin-border-warning', desc: 'Warning border' },
      { token: '--admin-border-error', desc: 'Error border' },
    ],
  },
  {
    label: 'Interactive & Elevation',
    tokens: [
      { token: '--admin-interactive-hover', desc: 'Hover state' },
      { token: '--admin-interactive-active', desc: 'Active state' },
      { token: '--admin-interactive-selected', desc: 'Selected state' },
      { token: '--admin-interactive-selected-text', desc: 'Selected item text' },
      { token: '--admin-interactive-selected-prominent', desc: 'Selected state (prominent)' },
      { token: '--admin-nav-selected', desc: 'Navigation selected state' },
      { token: '--admin-nav-selected-text', desc: 'Navigation selected text' },
      { token: '--admin-interactive-focus', desc: 'Focus state' },
      { token: '--admin-overlay', desc: 'Overlay backdrop' },
      { token: '--admin-overlay-backdrop-filter', desc: 'Overlay backdrop filter' },
    ],
  },
  {
    label: 'Input',
    tokens: [
      { token: '--admin-input-background', desc: 'Input background' },
      { token: '--admin-input-border', desc: 'Input border' },
      { token: '--admin-control-hover-border', desc: 'Input/control hover border' },
      { token: '--admin-input-border-focus', desc: 'Input focus border' },
    ],
  },
];

// ── Hex extraction ───────────────────────────────────────────────────────────

function rgbToHex(rgb: string): string {
  const match = rgb.match(/rgba?\(\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\s*\)/i);
  if (!match) return rgb;
  const [, r, g, b, a] = match;
  const hex = [r, g, b].map((v) => Math.round(Number(v)).toString(16).padStart(2, '0')).join('');
  const alpha = a !== undefined && Number(a) < 1
    ? Math.round(Number(a) * 255).toString(16).padStart(2, '0')
    : '';
  return '#' + hex + alpha;
}

function formatTokenValue(raw: string): string {
  const value = raw.trim();
  if (!value) return '';
  if (/^rgba?\(/i.test(value)) return rgbToHex(value).toUpperCase();
  if (value.startsWith('#')) return value.toUpperCase();
  return value;
}

function readDocumentThemeKey() {
  const root = document.documentElement;
  return `${root.getAttribute('data-theme') ?? ''}|${root.getAttribute('data-admin-theme') ?? ''}`;
}

function useDocumentThemeKey() {
  const [themeKey, setThemeKey] = useState(readDocumentThemeKey);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setThemeKey(readDocumentThemeKey());
    const observer = new MutationObserver(sync);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-admin-theme'],
    });
    return () => observer.disconnect();
  }, []);

  return themeKey;
}

function useComputedDisplayValue(token: string, themeKey: string) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const [value, setValue] = React.useState('');
  React.useEffect(() => {
    if (!ref.current) return;
    setValue(formatTokenValue(getComputedStyle(ref.current).getPropertyValue(token)));
  }, [token, themeKey]);
  return { ref, value };
}

// ── Token row ────────────────────────────────────────────────────────────────

function TokenRow({ token, desc, themeKey }: TokenDef & { themeKey: string }) {
  const { ref, value } = useComputedDisplayValue(token, themeKey);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(`var(${token})`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={styles.row}>
      <button
        ref={ref}
        className={styles.rowSwatch}
        style={{ background: `var(${token})` }}
        onClick={copy}
        title={`Click to copy var(${token})`}
      >
        <span className={styles.rowSwatchOverlay}>
          {copied
            ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            : <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
          }
        </span>
      </button>
      <code className={styles.rowToken}>{token}</code>
      <span className={styles.rowDesc}>{desc}</span>
      <div className={styles.rowHex}>
        <code className={styles.rowHexValue} title={value}>{value}</code>
        <CopyButton value={value} />
      </div>
    </div>
  );
}

// ── Ramp swatch ──────────────────────────────────────────────────────────────

function RampSwatch({ token, step }: { token: string; step: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(`var(${token})`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={styles.rampItem}>
      <button
        className={styles.rampSwatch}
        style={{ backgroundColor: `var(${token})` }}
        onClick={copy}
        title={`Click to copy var(${token})`}
      >
        {copied && (
          <span className={styles.rampCopied}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        )}
      </button>
      <span className={styles.rampStep}>{step}</span>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ColorsPage() {
  const [search, setSearch] = useState('');
  const themeKey = useDocumentThemeKey();

  const filteredGroups = useMemo(() => {
    if (!search) return SEMANTIC_GROUPS;
    const q = search.toLowerCase();
    return SEMANTIC_GROUPS.map((group) => ({
      ...group,
      tokens: group.tokens.filter(
        ({ token, desc }) => token.toLowerCase().includes(q) || desc.toLowerCase().includes(q)
      ),
    })).filter((g) => g.tokens.length > 0);
  }, [search]);

  const filteredRamps = useMemo(() => {
    if (!search) return PRIMITIVE_RAMPS;
    const q = search.toLowerCase();
    return PRIMITIVE_RAMPS.filter(
      (r) => r.name.toLowerCase().includes(q) || r.prefix.toLowerCase().includes(q)
    );
  }, [search]);

  const noResults = filteredGroups.length === 0 && filteredRamps.length === 0;

  return (
    <div className={styles.page}>
      <PageHeading title="Colors" description="Design tokens for color — semantic tokens for UI surfaces, text, and status signals, plus the underlying primitive color ramps." />
      <div className={styles.content}>
        <div className={styles.toolbar}>
          <InlineSearch value={search} onChange={setSearch} placeholder="Search tokens…" />
        </div>

        {filteredGroups.length > 0 && (
          <section>
            <h3 className={styles.sectionHeading}>Semantic tokens</h3>
            <div className={styles.groups}>
              {filteredGroups.map((group) => (
                <div key={group.label}>
                  <div className={styles.groupHeading}>{group.label}</div>
                  <div className={styles.groupRows}>
                    {group.tokens.map(({ token, desc }) => (
                      <TokenRow key={token} token={token} desc={desc} themeKey={themeKey} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {filteredRamps.length > 0 && (
          <section>
            <h3 className={styles.sectionHeading}>Primitive colors</h3>
            <div className={styles.ramps}>
              {filteredRamps.map((ramp) => (
                <div key={ramp.name}>
                  <div className={styles.groupHeading}>{ramp.name}</div>
                  <div className={styles.rampRow}>
                    {ramp.steps.map((step) => (
                      <RampSwatch key={step} token={`${ramp.prefix}-${step}`} step={step} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {noResults && (
          <p className={styles.empty}>No tokens match "{search}"</p>
        )}
      </div>
    </div>
  );
}
