import { DocPage } from '@/layout';
import AboutPageLayout from '../shared/AboutPageLayout';

const content = `# Build & Deploy

## Commands

| Command | What it does |
|---------|-------------|
| \`npm run dev\` | Start the catalog dev server (Vite serves \`catalog/index.html\`) |
| \`npm run build\` | Type-check then build the library (\`dist/index.js\` + \`dist/styles/style.css\`) |
| \`npm run typecheck\` | Type-check only (\`tsc --noEmit\`) |
| \`npm test\` | Run all tests in watch mode |
| \`npm test -- --run\` | Run tests once without watch |

## Before committing

Always run \`npm run build\` before committing. The \`dist/\` directory is checked into the repository so consumers can install directly from git without a build step.

\`\`\`bash
npm run build
git add dist/
git commit -m "Release vX.Y.Z — …"
\`\`\`

## The dist/ directory

\`dist/\` contains:

\`\`\`
dist/
  index.js            # ES module bundle (all components + utilities)
  index.d.ts          # TypeScript declarations
  styles/
    style.css         # All component styles + design tokens in one file
\`\`\`

Consumers import styles once:

\`\`\`tsx
import 'admin-ui/styles';
import { Button, SideNav } from 'admin-ui';
\`\`\`

## Testing

Tests use Vitest with jsdom, React Testing Library, and \`@testing-library/user-event\`. Test files live alongside their component (\`ComponentName.test.tsx\`).

Guidelines:

- Write behavior-focused tests — assert on what the component does, not CSS class names.
- For pointer/drag tests that rely on coordinates, mock \`Element.prototype.getBoundingClientRect\` to a known rect (jsdom returns zeros by default).
- Canvas and SVG-heavy components: test render, callbacks, and accessible controls only. Do not assert on canvas drawing output.
- Every component file gets its own test file, including sub-components co-located within a parent's directory.

## Catalog deployment

The catalog is published to [admin-ui.f-90.co.uk](https://admin-ui.f-90.co.uk) by the \`pages\` workflow on every push to \`main\`. That workflow runs \`npm run build:catalog\` and deploys \`catalog-dist\`.

The site is served from the domain root, so the Vite \`base\` stays \`/\`. Hash routing avoids redirect loops on GitHub Pages, which does not support server-side routes for single-page apps.
`;

export default function DevBuildDeployPage() {
  return <AboutPageLayout><DocPage content={content} centered={false} /></AboutPageLayout>;
}
