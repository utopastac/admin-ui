import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { CodeBlock } from '@/primitives';

const CodeBlockProps: PropRow[] = [
  { prop: 'children', type: 'string', description: 'The code string to display.' },
  { prop: 'language', type: 'string', description: 'Language for syntax highlighting. Also controls whether a header bar is shown.' },
  { prop: 'showLineNumbers', type: 'boolean', default: 'false', description: 'Whether to display line numbers.' },
  { prop: 'className', type: 'string', default: "''", description: 'Additional class names.' },
];

export default function CodeBlockDemo() {
  return (
    <DemoSection title="CodeBlock" description="Syntax-highlighted code display with optional language label, line numbers, and copy button.">
      <DemoShowcase code={`import { CodeBlock } from 'admin-ui';

<CodeBlock language="tsx">{\`const x = 42;\`}</CodeBlock>`}>
        <div style={{ width: '100%' }}>
          <CodeBlock language="tsx">{`const greeting: string = "Hello, world!";`}</CodeBlock>
        </div>
      </DemoShowcase>
      <PropsTable props={CodeBlockProps} />

      <DemoSubsection label="TypeScript / TSX">
        <CodeBlock language="tsx">{`import { useState } from 'react';

interface User {
  name: string;
  role: 'admin' | 'viewer';
}

function UserBadge({ name, role }: User) {
  const [active, setActive] = useState(true);

  return (
    <span className={role === 'admin' ? 'badge-admin' : 'badge'}>
      {name} {active && '✓'}
    </span>
  );
}`}</CodeBlock>
      </DemoSubsection>

      <DemoSubsection label="CSS">
        <CodeBlock language="css">{`.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--admin-space-m);
  padding: var(--admin-space-l);
  background: var(--admin-surface-primary);
  border-radius: 8px;
}`}</CodeBlock>
      </DemoSubsection>

      <DemoSubsection label="JSON">
        <CodeBlock language="json">{`{
  "name": "admin-ui",
  "version": "0.1.0",
  "dependencies": {
    "react": "^18.2.0",
    "highlight.js": "^11.11.1"
  }
}`}</CodeBlock>
      </DemoSubsection>

      <DemoSubsection label="Bash">
        <CodeBlock language="bash">{`#!/bin/bash
# Install dependencies and start dev server
npm install admin-ui
export NODE_ENV=development
npm run dev -- --port 3000`}</CodeBlock>
      </DemoSubsection>

      <DemoSubsection label="HTML">
        <CodeBlock language="html">{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Admin Dashboard</title>
  <link rel="stylesheet" href="admin-ui/styles" />
</head>
<body>
  <div id="root"></div>
</body>
</html>`}</CodeBlock>
      </DemoSubsection>

      <DemoSubsection label="With Line Numbers">
        <CodeBlock language="tsx" showLineNumbers>{`import { Button } from 'admin-ui';

function App() {
  const handleClick = () => {
    console.log('clicked');
  };

  return <Button variant="primary" onClick={handleClick}>Save</Button>;
}`}</CodeBlock>
      </DemoSubsection>

      <DemoSubsection label="Plain (No Language)">
        <CodeBlock>{`const x = 42;`}</CodeBlock>
      </DemoSubsection>
    </DemoSection>
  );
}
