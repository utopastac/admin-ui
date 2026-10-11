import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import sharedStyles from '../../shared/styles.module.css';
import AnimationPicker from '@/primitives/AnimationPicker';

const AnimationPickerProps: PropRow[] = [
  { prop: 'value', type: 'string', default: 'undefined', description: 'The current CSS transition value, e.g. "300ms ease-out".' },
  { prop: 'onChange', type: '(value: string) => void', description: 'Called with the serialized CSS transition string when the value changes.' },
  { prop: 'onChangeState', type: '(state: AnimationState) => void', default: 'undefined', description: 'Called with the structured AnimationState object on change.' },
  { prop: 'inline', type: 'boolean', default: 'false', description: 'When true, renders the picker panel inline instead of in a popover.' },
  { prop: 'label', type: 'string', default: 'undefined', description: 'Label text rendered above or beside the picker.' },
  { prop: 'labelPosition', type: "'top' | 'left'", default: "'top'", description: 'Controls whether the label is placed above or to the left.', options: ['top', 'left'] },
  { prop: 'labelWidth', type: 'number | string', default: 'undefined', description: 'Width of the label when labelPosition is "left".' },
  { prop: 'id', type: 'string', default: 'undefined', description: 'HTML id applied to the trigger button.' },
  { prop: 'offsetX', type: 'number', default: '0', description: 'Horizontal offset for the popover.' },
  { prop: 'offsetY', type: 'number', default: '0', description: 'Vertical offset for the popover.' },
];

export default function AnimationPickerDemo() {
  const [transition, setTransition] = useState('300ms ease-out');
  const [linear, setLinear] = useState('300ms linear');
  const [ease, setEase] = useState('300ms ease');
  const [easeIn, setEaseIn] = useState('300ms ease-in');
  const [easeOut, setEaseOut] = useState('300ms ease-out');
  const [easeInOut, setEaseInOut] = useState('300ms ease-in-out');
  const [spring, setSpring] = useState('400ms cubic-bezier(0.34, 1.56, 0.64, 1)');
  const [labelTop, setLabelTop] = useState('300ms ease-out');
  const [labelLeft, setLabelLeft] = useState('300ms ease-out');
  const [inline, setInline] = useState('300ms ease-out');

  return (
    <DemoSection
      title="AnimationPicker"
      description="A picker for CSS transition values — duration, easing function, and delay. Supports named easing presets and custom cubic-bezier curves. By default renders as a trigger that opens the picker in a popover; pass inline to render the panel directly."
    >
      <DemoShowcase code={`import { AnimationPicker } from 'admin-ui';

const [transition, setTransition] = useState('300ms ease-out');

<AnimationPicker
  label="Transition"
  value={transition}
  onChange={setTransition}
/>`}>
        <div style={{ width: '280px' }}>
          <AnimationPicker label="Transition" value={transition} onChange={setTransition} />
        </div>
      </DemoShowcase>

      <PropsTable props={AnimationPickerProps} />

      <DemoSubsection label="Easing presets">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--admin-space-m)' }}>
          <AnimationPicker label="Linear" value={linear} onChange={setLinear} />
          <AnimationPicker label="Ease" value={ease} onChange={setEase} />
          <AnimationPicker label="Ease in" value={easeIn} onChange={setEaseIn} />
          <AnimationPicker label="Ease out" value={easeOut} onChange={setEaseOut} />
          <AnimationPicker label="Ease in-out" value={easeInOut} onChange={setEaseInOut} />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Custom bezier — overshoot spring">
        <div style={{ width: '280px' }}>
          <AnimationPicker
            label="Spring transition"
            value={spring}
            onChange={setSpring}
          />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Label positions">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-m)', width: '280px' }}>
          <AnimationPicker
            label="Enter duration"
            labelPosition="top"
            value={labelTop}
            onChange={setLabelTop}
          />
          <AnimationPicker
            label="Exit duration"
            labelPosition="left"
            value={labelLeft}
            onChange={setLabelLeft}
          />
        </div>
      </DemoSubsection>

      <DemoSubsection label="Inline">
        <AnimationPicker
          label="Page transition"
          inline={true}
          value={inline}
          onChange={setInline}
        />
      </DemoSubsection>
    </DemoSection>
  );
}
