import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, Download } from 'lucide-react';
import ToolbarButton from '@/primitives/ToolbarButton';
import type { PageContentsItem } from '@/navigation';
import styles from './DocPage.module.css';

export interface DocPageProps {
  content: string;
  centered?: boolean;
  maxWidth?: number | string;
  className?: string;
}

function slugify(text: string): string {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function headingId(children: React.ReactNode): string {
  return slugify(
    Array.isArray(children)
      ? children.map((c) => (typeof c === 'string' ? c : '')).join('')
      : String(children ?? '')
  );
}

const headingComponents = (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const).reduce((acc, tag) => {
  acc[tag] = ({ children, ...props }: { children?: React.ReactNode }) => {
    const id = headingId(children);
    return React.createElement(tag, { id, ...props }, children);
  };
  return acc;
}, {} as Record<string, React.FC<{ children?: React.ReactNode }>>);

export function extractHeadings(content: string): PageContentsItem[] {
  const lines = content.split('\n');
  const result: PageContentsItem[] = [];
  let currentParent: PageContentsItem | null = null;

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)/);
    const h1 = line.match(/^#\s+(.+)/);

    if (h2) {
      const label = h2[1].trim();
      const item: PageContentsItem = { label, href: `#${slugify(label)}` };
      if (currentParent) {
        currentParent.children = currentParent.children ?? [];
        currentParent.children.push(item);
      } else {
        result.push(item);
      }
    } else if (h1) {
      const label = h1[1].trim();
      currentParent = { label, href: `#${slugify(label)}` };
      result.push(currentParent);
    }
  }

  return result;
}

function deriveFilename(content: string): string {
  const match = content.match(/^#\s+(.+)/m);
  if (!match) return 'document.md';
  return match[1].trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.md';
}

export default function DocPage({ content, centered = true, maxWidth, className }: DocPageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content).catch((err) => {
      console.error('[DocPage] Clipboard write failed:', err);
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = deriveFilename(content);
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={[styles.root, centered && styles.centered, className].filter(Boolean).join(' ')}
      style={maxWidth !== undefined ? { maxWidth } : undefined}
    >
      <div className={styles.actions}>
        <ToolbarButton
          icon={copied ? Check : Copy}
          size="sm"
          onClick={handleCopy}
          aria-label="Copy as markdown"
          tooltip="Copy as markdown"
        />
        <ToolbarButton
          icon={Download}
          size="sm"
          onClick={handleDownload}
          aria-label="Download .md"
          tooltip="Download .md"
        />
      </div>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={headingComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
