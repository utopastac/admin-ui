import { DocPage } from '@/layout';
import AboutPageLayout from '../shared/AboutPageLayout';

const content = `# About Admin UI

A lightweight React component library for building admin interfaces quickly and consistently.

## What is Admin UI?

Admin UI provides a curated set of design tokens, primitives, and navigation components purpose-built for admin-style interfaces — dashboards, settings panels, data tables, internal tools, and back-office applications. It gives you the building blocks to assemble polished admin pages without starting from scratch.

## Getting Started

Install the package and import the stylesheet. All design tokens and component styles are bundled into a single CSS file.

\`\`\`bash
npm install admin-ui
\`\`\`

\`\`\`tsx
import 'admin-ui/styles';
import { Button, Card, SideNav, TopNav } from 'admin-ui';
\`\`\`

## Design Principles

- **Consistency through tokens** — All colors, spacing, and typography flow from semantic design tokens with the \`--admin-*\` prefix.
- **Composable primitives** — Small, focused components that combine to build complex interfaces. No opinionated page layouts.
- **Zero configuration** — Import the stylesheet, use the components. No theme providers, no context wrappers.
- **Accessible defaults** — Components ship with proper ARIA attributes, keyboard navigation, and focus management.

## What's Included

- **Design Tokens** — Colors, spacing, typography, radii, and shadows as CSS custom properties.
- **Primitives** — Button, Input, Card, Table, Select, Toggle, CodeBlock, and more.
- **Navigation** — TopNav, SideNav, Breadcrumb, Pagination, and Tabs.
- **Overlays** — Modal, AlertDialog, and ContextMenu.
- **Layout** — PageHeading, SectionHeading, DocPage, and PageFooter.
`;

export default function AboutPage() {
  return <AboutPageLayout><DocPage content={content} centered={false} /></AboutPageLayout>;
}
