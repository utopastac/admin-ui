import { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { InlineSearch } from '@/primitives';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';

const InlineSearchProps: PropRow[] = [
  { prop: 'value', type: 'string', description: 'Current input value' },
  { prop: 'onChange', type: '(value: string) => void', description: 'Called with the updated value on every change' },
  { prop: 'placeholder', type: 'string', description: 'Placeholder text for the input' },
  { prop: 'icon', type: "'search' | 'filter'", default: "'search'", options: ['search', 'filter'], description: 'Icon shown at the left of the input' },
  { prop: 'clearable', type: 'boolean', default: 'true', description: 'When true, shows a clear button when the input has a value' },
  { prop: 'id', type: 'string', description: 'HTML id forwarded to the input element' },
  { prop: 'className', type: 'string', description: 'Additional class name applied to the wrapper' },
  { prop: 'onBlur', type: '() => void', description: 'Called when the input loses focus' },
];

export default function InlineSearchDemo() {
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [noClearValue, setNoClearValue] = useState('');

  return (
    <DemoSection
      title="InlineSearch"
      description="A compact icon-prefixed search or filter input. Supports a clear button (default on) and search or filter icon variants."
    >
      <DemoShowcase code={`import { InlineSearch } from 'admin-ui';

const [value, setValue] = useState('');

<InlineSearch
  value={value}
  onChange={setValue}
  placeholder="Search…"
/>`}>
        <div style={{ width: 280 }}>
          <InlineSearch
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search…"
          />
        </div>
      </DemoShowcase>
      <PropsTable props={InlineSearchProps} />

      <DemoSubsection label="Filter icon">
        <div style={{ width: 280 }}>
          <InlineSearch
            value={filterValue}
            onChange={setFilterValue}
            placeholder="Filter items…"
            icon="filter"
          />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Without clear button">
        <div style={{ width: 280 }}>
          <InlineSearch
            value={noClearValue}
            onChange={setNoClearValue}
            placeholder="Search…"
            clearable={false}
          />
        </div>
      </DemoSubsection>
    </DemoSection>
  );
}
