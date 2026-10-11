import { DemoSection } from '../../shared/DemoSection';
import { SystemTokenList } from '../../shared/SystemTokenList';
import styles from './ShadowsPage.module.css';

const shadowTokens = [
  { token: '--admin-shadow-sm',    label: 'sm',    description: 'Subtle control shadow (e.g. SegmentedControl pill)' },
  { token: '--admin-shadow-md',    label: 'md',    description: 'Standard dropdown / card shadow' },
  { token: '--admin-shadow-lg',    label: 'lg',    description: 'Large search / floating panel shadow' },
  { token: '--admin-shadow-xl',    label: 'xl',    description: 'Modal / dialog shadow' },
  { token: '--admin-shadow-panel', label: 'panel', description: 'Directional shadow for side panels' },
  { token: '--admin-panel-shadow', label: 'panel role', description: 'Themeable shadow role for floating panels and dropdowns' },
  { token: '--admin-card-shadow',  label: 'card role',  description: 'Themeable shadow role for hoverable cards' },
];

export default function ShadowsPage() {
  return (
    <DemoSection title="Shadows" description="Shadow tokens used throughout the design system. Applied via box-shadow on elevated surfaces.">
      <SystemTokenList
        previewWidth="96px"
        rows={shadowTokens.map(({ token, label, description }) => ({
          preview: <div className={styles.preview} style={{ boxShadow: `var(${token})` }} />,
          label,
          description,
          token,
        }))}
      />
    </DemoSection>
  );
}
