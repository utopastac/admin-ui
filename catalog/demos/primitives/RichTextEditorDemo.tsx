import React, { useState } from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { RichTextEditor, Badge } from '@/primitives';

const RichTextEditorProps: PropRow[] = [
  { prop: 'value', type: 'string', default: "''", description: 'Current HTML (or markdown) content of the editor.' },
  { prop: 'onChange', type: '(output: string) => void', description: 'Called on every change with the full output string.' },
  { prop: 'placeholder', type: 'string', description: 'Placeholder text shown when the editor is empty.' },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Prevents editing when true.' },
  { prop: 'minHeight', type: 'string', default: "'160px'", description: 'Minimum height of the editable area.' },
  { prop: 'outputFormat', type: "'html' | 'markdown'", default: "'html'", options: ['html', 'markdown'], description: 'Output format emitted by onChange.' },
  { prop: 'popover', type: 'boolean', default: 'false', description: 'Renders the editor inside a popover triggered by a preview button.' },
  { prop: 'className', type: 'string', default: "''", description: 'Additional CSS class applied to the root element.' },
  { prop: 'actions', type: 'React.ReactNode', description: 'Content rendered between the toolbar and the editor area.' },
  { prop: 'offsetX', type: 'number', default: '0', description: 'Horizontal offset for the popover anchor.' },
  { prop: 'offsetY', type: 'number', default: '0', description: 'Vertical offset for the popover anchor.' },
];

const INITIAL_HTML = `<h2>Quarterly Review: Platform Reliability</h2><p>Over the past quarter, the infrastructure team made <strong>significant progress</strong> on reducing <em>mean time to recovery</em> across all production services.</p><p>Key highlights include a <strong>40% reduction</strong> in incident escalations and the rollout of automated runbooks. Full details are available in the <a href="#">reliability report</a>.</p>`;

export default function RichTextEditorDemo() {
  const [liveHtml, setLiveHtml] = useState('');

  return (
    <DemoSection
      title="RichTextEditor"
      description="A self-contained rich text editing module. Supports headings, bold, italic, links, and other inline formatting. Emits HTML on every change."
    >
      <DemoShowcase code={`import { RichTextEditor } from 'admin-ui';

const [body, setBody] = useState('');

<RichTextEditor
  placeholder="Start writing…"
  onChange={(html) => setBody(html)}
/>`}>
        <RichTextEditor
          placeholder="Start writing…"
          onChange={(html) => setLiveHtml(html)}
        />
      </DemoShowcase>
      <PropsTable props={RichTextEditorProps} />

      <DemoSubsection label="Default (empty with placeholder)">
        <RichTextEditor placeholder="Add a description for this item…" onChange={() => {}} />
      </DemoSubsection>

      <DemoSubsection label="With initial content">
        <RichTextEditor
          value={INITIAL_HTML}
          onChange={() => {}}
        />
      </DemoSubsection>

      <DemoSubsection label="Disabled">
        <RichTextEditor
          value={`<p>This content is <strong>read-only</strong> and cannot be edited while the editor is in a disabled state.</p>`}
          disabled
          onChange={() => {}}
        />
      </DemoSubsection>

      <DemoSubsection label="Custom min-height">
        <RichTextEditor
          placeholder="This editor has a taller minimum height, suitable for longer-form content like policy documents or release notes…"
          minHeight="320px"
          onChange={() => {}}
        />
      </DemoSubsection>

      <DemoSubsection label="Live HTML output">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-m)' }}>
          <RichTextEditor
            placeholder="Type something to see the HTML output below…"
            onChange={(html) => setLiveHtml(html)}
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
            }}
          >
            {liveHtml || <span style={{ opacity: 0.5 }}>HTML output appears here…</span>}
          </pre>
        </div>
      </DemoSubsection>

      <DemoSubsection label="Popover mode">
        <RichTextEditor
          placeholder="Click to open editor…"
          popover
          onChange={() => {}}
        />
      </DemoSubsection>

      <DemoSubsection label="Popover mode with initial content">
        <RichTextEditor
          value={INITIAL_HTML}
          placeholder="Click to edit…"
          popover
          onChange={() => {}}
        />
      </DemoSubsection>

      <DemoSubsection label="Actions slot (inline tags between toolbar and editor)">
        <RichTextEditor
          placeholder="Use {{variable}} syntax to reference dynamic values…"
          actions={
            <div style={{ display: 'flex', gap: 'var(--admin-space-xs)', padding: 'var(--admin-space-xs) var(--admin-space-s)', flexWrap: 'wrap' }}>
              <Badge variant="info" size="sm">{'{{firstName}}'}</Badge>
              <Badge variant="info" size="sm">{'{{lastName}}'}</Badge>
              <Badge variant="info" size="sm">{'{{company}}'}</Badge>
              <Badge variant="info" size="sm">{'{{role}}'}</Badge>
            </div>
          }
          onChange={() => {}}
        />
      </DemoSubsection>

      <DemoSubsection label="Markdown output">
        <MarkdownOutputDemo />
      </DemoSubsection>
    </DemoSection>
  );
}

function MarkdownOutputDemo() {
  const [md, setMd] = useState('');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-m)' }}>
      <RichTextEditor
        placeholder="Type something to see Markdown output below…"
        outputFormat="markdown"
        onChange={setMd}
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
        }}
      >
        {md || <span style={{ opacity: 0.5 }}>Markdown output appears here…</span>}
      </pre>
    </div>
  );
}
