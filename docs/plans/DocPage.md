# Feature Plan: DocPage

## Summary
DocPage is a general-purpose layout component that accepts a markdown string, parses it at runtime via `react-markdown` + `remark-gfm`, and renders it with full typographic styling mapped to the `--admin-*` design token system. It covers all standard markdown elements: headings (h1-h6), paragraphs, lists (ordered/unordered), links, inline code, fenced code blocks, tables, blockquotes, horizontal rules, images, task lists, and strikethrough.

## Goals
- Accept a `content` string prop containing raw markdown and render it as styled HTML
- Style every markdown element using `--admin-*` tokens via a CSS Module
- Support the full CommonMark feature set plus GFM extensions (tables, task lists, strikethrough)
- Be usable by library consumers in their own admin apps

## Out of Scope
- Syntax highlighting in code blocks (just monospace + background styling)
- Table of contents generation or sidebar navigation
- MDX / JSX-in-markdown support
- Editing or live-preview capabilities

## Technical Approach
| Element | Implementation |
|---|---|
| Container | `<div>` with `.root` CSS Module class, `max-width: 72ch` |
| Markdown parsing | `react-markdown` with `remark-gfm` plugin |
| Headings | PostCSS heading mixins, subtle bottom border on h1/h2 |
| Body text | `@mixin type-body-l` for paragraphs and lists |
| Code blocks | `--admin-font-mono`, `--admin-background-extra-subtle` bg, border |
| Inline code | Mono font, `--admin-background-subtle` bg, small padding |
| Tables | Full width, collapsed borders, emphasis-weight headers |
| Blockquotes | Prominent left border, extra-subtle bg, italic secondary text |
| Links | `--admin-text-highlight` color, underline on hover |

Key decisions:
- Folder: `src/layout/DocPage/`
- Composed from: `react-markdown` + `remark-gfm` (external), no internal admin-ui components
- Token usage: heading/body mixins for typography, surface/background tokens for code/blockquote, border tokens for tables/hr, space tokens for vertical rhythm

## Component Decomposition
No decomposition -- component is simple enough to implement as a single file.

Decomposition rationale: DocPage is a thin wrapper around ReactMarkdown with a comprehensive CSS Module. No sub-parts are meaningful outside this context.

## Key Files
| File | Change Type | Notes |
|---|---|---|
| `src/layout/DocPage/DocPage.tsx` | New | Component implementation + `DocPageProps` export |
| `src/layout/DocPage/DocPage.module.css` | New | Comprehensive markdown element styling with `--admin-*` tokens |
| `src/layout/DocPage/index.ts` | New | Barrel export |
| `src/layout/index.ts` | Modify | Add `DocPage` and `DocPageProps` export |
| `src/index.ts` | Modify | Add `DocPage` and `DocPageProps` to layout export line |
| `catalog/demos/layout/DocPageDemo.tsx` | New | Demo with comprehensive markdown sample |
| `catalog/demos/layout/index.ts` | Modify | Add `DocPageDemo` export |
| `catalog/demos/index.ts` | Modify | Add import + `'doc-page': DocPageDemo` entry |
| `catalog/data/navigation.ts` | Modify | Add `{ id: 'doc-page', label: 'DocPage' }` to Layout section |
| `package.json` | Modify | Add `react-markdown` and `remark-gfm` dependencies |
| `docs/plans/DocPage.md` | New | This document |

## Risks & Unknowns
- `react-markdown` and `remark-gfm` become runtime dependencies for the library

## Success Criteria
- Component renders all markdown element types correctly in the catalog demo
- Every styled element uses `--admin-*` tokens
- Build passes cleanly (`npm run build`)
- Consumers can `import { DocPage } from 'admin-ui'` and pass a markdown string
