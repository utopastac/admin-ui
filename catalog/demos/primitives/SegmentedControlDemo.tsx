import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { SegmentedControl } from '@/primitives';
import { AlignLeft, AlignCenter, AlignRight, List, Grid, Map } from 'lucide-react';

const SegmentedControlProps: PropRow[] = [
  { prop: 'options', type: 'SegmentedControlOption[]', description: 'Array of option objects to render as segments.' },
  { prop: 'value', type: 'string', description: 'The currently selected option value.' },
  { prop: 'onChange', type: '(value: string) => void', description: 'Called when the selected segment changes.' },
  { prop: 'size', type: "'sm' | 'md'", default: "'md'", options: ['sm', 'md'], description: 'Size of the control.' },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables all segments when true.' },
  { prop: 'className', type: 'string', default: "''", description: 'Additional CSS class applied to the root element.' },
];

const viewOptions = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
  { value: 'map', label: 'Map' },
];

const frequencyOptions = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

const disabledSegmentOptions = [
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'archived', label: 'Archived', disabled: true },
];

const manyOptions = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
];

const scrollOptions = [
  { value: 'overview', label: 'Overview' },
  { value: 'activity', label: 'Activity' },
  { value: 'connections', label: 'Connections' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'notifications', label: 'Notifications' },
  { value: 'settings', label: 'Settings' },
  { value: 'billing', label: 'Billing' },
  { value: 'security', label: 'Security' },
];

const pinnedOptions = [
  { value: 'all', label: 'All', pin: 'left' as const },
  { value: 'overview', label: 'Overview' },
  { value: 'activity', label: 'Activity' },
  { value: 'connections', label: 'Connections' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'notifications', label: 'Notifications' },
  { value: 'settings', label: 'Settings' },
  { value: 'billing', label: 'Billing' },
  { value: 'security', label: 'Security' },
  { value: 'custom', label: 'Custom', pin: 'right' as const },
];

const alignOptions = [
  { value: 'left', icon: AlignLeft, ariaLabel: 'Align left' },
  { value: 'center', icon: AlignCenter, ariaLabel: 'Align center' },
  { value: 'right', icon: AlignRight, ariaLabel: 'Align right' },
];

const tooltipAlignOptions = [
  { value: 'left', icon: AlignLeft, ariaLabel: 'Align left', tooltip: 'Align left' },
  { value: 'center', icon: AlignCenter, ariaLabel: 'Align center', tooltip: 'Align center' },
  { value: 'right', icon: AlignRight, ariaLabel: 'Align right', tooltip: 'Align right' },
];

const viewIconLabelOptions = [
  { value: 'list', label: 'List', icon: List },
  { value: 'grid', label: 'Grid', icon: Grid },
  { value: 'map', label: 'Map', icon: Map },
];

export default function SegmentedControlDemo() {
  const [view, setView] = useState('list');
  const [viewSm, setViewSm] = useState('list');
  const [frequency, setFrequency] = useState('daily');
  const [disabledSeg, setDisabledSeg] = useState('active');
  const [disabledCtrl, setDisabledCtrl] = useState('weekly');
  const [manyValue, setManyValue] = useState('all');
  const [scrollValue, setScrollValue] = useState('overview');
  const [scrollSmValue, setScrollSmValue] = useState('overview');
  const [pinnedValue, setPinnedValue] = useState('all');
  const [pinnedSmValue, setPinnedSmValue] = useState('all');
  const [align, setAlign] = useState('left');
  const [alignSm, setAlignSm] = useState('left');
  const [viewIconLabel, setViewIconLabel] = useState('list');
  const [viewIconLabelSm, setViewIconLabelSm] = useState('list');
  const [tooltipAlign, setTooltipAlign] = useState('left');

  return (
    <DemoSection
      title="SegmentedControl"
      description="An iOS-style segmented control for switching between a set of mutually exclusive options. Supports sm and md sizes, individual disabled segments, and full control disabling."
    >
      <DemoShowcase code={`import { SegmentedControl } from 'admin-ui';

const options = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
  { value: 'map', label: 'Map' },
];

<SegmentedControl
  options={options}
  value={value}
  onChange={setValue}
/>`}>
        <SegmentedControl
          options={viewOptions}
          value={view}
          onChange={setView}
        />
      </DemoShowcase>
      <PropsTable props={SegmentedControlProps} />

      <DemoSubsection label='size="md" (default)'>
        <SegmentedControl
          options={viewOptions}
          value={view}
          onChange={setView}
        />
      </DemoSubsection>

      <DemoSubsection label='size="sm"'>
        <SegmentedControl
          options={viewOptions}
          value={viewSm}
          onChange={setViewSm}
          size="sm"
        />
      </DemoSubsection>

      <DemoSubsection label="Disabled segment">
        <SegmentedControl
          options={disabledSegmentOptions}
          value={disabledSeg}
          onChange={setDisabledSeg}
        />
      </DemoSubsection>

      <DemoSubsection label="Disabled control">
        <SegmentedControl
          options={frequencyOptions}
          value={disabledCtrl}
          onChange={setDisabledCtrl}
          disabled
        />
      </DemoSubsection>

      <DemoSubsection label="Many options">
        <SegmentedControl
          options={manyOptions}
          value={manyValue}
          onChange={setManyValue}
        />
      </DemoSubsection>

      <DemoSubsection label="Scrolling — many options (md)">
        <div style={{ width: 320 }}>
          <SegmentedControl
            options={scrollOptions}
            value={scrollValue}
            onChange={setScrollValue}
          />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Scrolling — many options (sm)">
        <div style={{ width: 320 }}>
          <SegmentedControl
            options={scrollOptions}
            value={scrollSmValue}
            onChange={setScrollSmValue}
            size="sm"
          />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Pinned options — All left, Custom right (md)">
        <div style={{ width: 320 }}>
          <SegmentedControl
            options={pinnedOptions}
            value={pinnedValue}
            onChange={setPinnedValue}
          />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Pinned options (sm)">
        <div style={{ width: 320 }}>
          <SegmentedControl
            options={pinnedOptions}
            value={pinnedSmValue}
            onChange={setPinnedSmValue}
            size="sm"
          />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Icon only (md)">
        <SegmentedControl
          options={alignOptions}
          value={align}
          onChange={setAlign}
        />
      </DemoSubsection>

      <DemoSubsection label="Icon only (sm)">
        <SegmentedControl
          options={alignOptions}
          value={alignSm}
          onChange={setAlignSm}
          size="sm"
        />
      </DemoSubsection>

      <DemoSubsection label="Icon + label (md)">
        <SegmentedControl
          options={viewIconLabelOptions}
          value={viewIconLabel}
          onChange={setViewIconLabel}
        />
      </DemoSubsection>

      <DemoSubsection label="With tooltips (icon only)">
        <SegmentedControl
          options={tooltipAlignOptions}
          value={tooltipAlign}
          onChange={setTooltipAlign}
        />
      </DemoSubsection>

      <DemoSubsection label="Icon + label (sm)">
        <SegmentedControl
          options={viewIconLabelOptions}
          value={viewIconLabelSm}
          onChange={setViewIconLabelSm}
          size="sm"
        />
      </DemoSubsection>
    </DemoSection>
  );
}
