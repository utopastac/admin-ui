import React from 'react';
import * as LucideIcons from 'lucide-react';
import { DemoSection } from '../../shared/DemoSection';
import { InlineSearch } from '@/primitives';
import { Tooltip } from '@/overlays';
import styles from './IconsPage.module.css';

type IconComponent = React.FC<{ size?: number; color?: string; strokeWidth?: number }>;

const allIcons: [string, IconComponent][] = Object.entries(LucideIcons).filter(
  ([name, value]) =>
    typeof value === 'object' &&
    value !== null &&
    (value as { $$typeof?: unknown }).$$typeof !== undefined &&
    name[0] === name[0].toUpperCase() &&
    !name.endsWith('Icon')
) as [string, IconComponent][];

function IconTile({ name, Icon }: { name: string; Icon: IconComponent }) {
  const [copied, setCopied] = React.useState(false);

  function handleClick() {
    navigator.clipboard.writeText(name);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <Tooltip content={copied ? 'Copied!' : name} placement="top">
      <button
        onClick={handleClick}
        className={`${styles.tile} ${copied ? styles.copied : ''}`}
      >
        <Icon size={24} />
      </button>
    </Tooltip>
  );
}

export default function IconsPage() {
  const [query, setQuery] = React.useState('');

  const filtered = query.trim()
    ? allIcons.filter(([name]) => name.toLowerCase().includes(query.toLowerCase()))
    : allIcons;

  return (
    <div className={styles.page}>
      <DemoSection
        title="Icons"
        description={`${allIcons.length} icons from lucide-react. Click any icon to copy its name.`}
      >
        <div className={styles.content}>
          <div className={styles.toolbar}>
            <InlineSearch
              placeholder="Filter icons…"
              value={query}
              onChange={setQuery}
            />
          </div>

          {filtered.length === 0 ? (
            <p className={styles.empty}>No icons match "{query}"</p>
          ) : (
            <div className={styles.grid}>
              {filtered.map(([name, Icon]) => (
                <IconTile key={name} name={name} Icon={Icon} />
              ))}
            </div>
          )}
        </div>
      </DemoSection>

      <DemoSection
        title="Usage"
        description="lucide-react is a dependency of admin-ui and will be installed automatically."
      >
        <div className={styles.usageBody}>
          <p className={styles.usageNote}>
            Because <code>lucide-react</code> is listed in <code>admin-ui</code>'s{' '}
            <code>dependencies</code>, it is installed alongside <code>admin-ui</code>. You can
            import icons without listing it in your own <code>package.json</code>,
            though declaring it explicitly is recommended.
          </p>
          <pre className={styles.codeBlock}>{`import { Settings, Search, Plus } from 'lucide-react';`}</pre>
        </div>
      </DemoSection>
    </div>
  );
}
