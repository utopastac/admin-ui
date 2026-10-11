import { DemoSection } from '../../shared/DemoSection';
import { SystemTokenList } from '../../shared/SystemTokenList';
import styles from './BorderRadiusPage.module.css';

const radiusTokens = [
  { token: '--admin-radius-xs',   label: 'xs',   value: '6px'    },
  { token: '--admin-radius-sm',   label: 'sm',   value: '8px'    },
  { token: '--admin-radius-md',   label: 'md',   value: '10px'   },
  { token: '--admin-radius-lg',   label: 'lg',   value: '12px'   },
  { token: '--admin-radius-xl',   label: 'xl',   value: '16px'   },
  { token: '--admin-radius-pill', label: 'pill', value: '9999px' },
];

const semanticTokens = [
  { token: '--admin-interactive-radius', label: 'interactive', desc: 'Nav items, toolbar buttons, menu rows' },
  { token: '--admin-button-radius',      label: 'button',      desc: 'Primary, secondary, ghost buttons'    },
];

const focusTokens = [
  { token: '--admin-focus-ring-width',  label: 'focus width',  desc: 'Focus ring outline width'  },
  { token: '--admin-focus-ring-style',  label: 'focus style',  desc: 'Focus ring outline style'  },
  { token: '--admin-focus-ring-offset', label: 'focus offset', desc: 'Outset focus ring offset' },
];

export default function BorderRadiusPage() {
  return (
    <DemoSection title="Border Radius" description="Radius scale and semantic aliases.">
      <SystemTokenList
        rows={radiusTokens.map(({ token, label, value }) => ({
          preview: <div className={styles.swatch} style={{ borderRadius: `var(${token})` }} />,
          label,
          value,
          token,
        }))}
      />

      <div className={styles.semanticHeading}>Semantic aliases</div>
      <SystemTokenList
        rows={semanticTokens.map(({ token, label, desc }) => ({
          preview: <div className={styles.swatch} style={{ borderRadius: `var(${token})` }} />,
          label,
          description: desc,
          token,
        }))}
      />

      <div className={styles.semanticHeading}>Focus ring geometry</div>
      <SystemTokenList
        rows={focusTokens.map(({ token, label, desc }) => ({
          preview: (
            <div
              className={styles.swatch}
              style={{
                outline: 'var(--admin-focus-ring-width) var(--admin-focus-ring-style) var(--admin-interactive-focus)',
                outlineOffset: 'var(--admin-focus-ring-offset)',
              }}
            />
          ),
          label,
          description: desc,
          token,
        }))}
      />
    </DemoSection>
  );
}
