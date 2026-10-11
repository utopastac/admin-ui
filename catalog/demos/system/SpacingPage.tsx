import { DemoSection } from '../../shared/DemoSection';
import { SystemTokenList } from '../../shared/SystemTokenList';
import styles from './SpacingPage.module.css';

const spacingTokens = [
  { token: '--admin-space-xxl', label: 'xxl', value: '48px' },
  { token: '--admin-space-xl',  label: 'xl',  value: '24px' },
  { token: '--admin-space-l',   label: 'l',   value: '16px' },
  { token: '--admin-space-m',   label: 'm',   value: '12px' },
  { token: '--admin-space-s',   label: 's',   value: '8px'  },
  { token: '--admin-space-xs',  label: 'xs',  value: '4px'  },
];

export default function SpacingPage() {
  return (
    <DemoSection title="Spacing" description="The spacing scale used throughout the design system. All values use rem units.">
      <SystemTokenList
        rows={spacingTokens.map(({ token, label, value }) => ({
          preview: <div className={styles.swatch} style={{ width: `var(${token})` }} />,
          label,
          value,
          token,
        }))}
      />
    </DemoSection>
  );
}
