import { DocPage } from '@/layout';
import AboutPageLayout from '../shared/AboutPageLayout';
import content from '../../DECISIONS.md?raw';

function reverseTableRows(markdown: string): string {
  const lines = markdown.split('\n');
  const sepIndex = lines.findIndex((l) => /^\|[-| ]+\|$/.test(l.trim()));
  if (sepIndex === -1) return markdown;
  const before = lines.slice(0, sepIndex + 1);
  const rows = lines.slice(sepIndex + 1).filter((l) => l.trim().startsWith('|'));
  const after = lines.slice(sepIndex + 1).filter((l) => !l.trim().startsWith('|'));
  return [...before, ...rows.reverse(), ...after].join('\n');
}

export default function DecisionsPage() {
  return <AboutPageLayout><DocPage content={reverseTableRows(content)} centered={false} /></AboutPageLayout>;
}
