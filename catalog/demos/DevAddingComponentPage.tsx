import { DocPage } from '@/layout';
import AboutPageLayout from '../shared/AboutPageLayout';

const content = `# Adding a Component

Use the \`/admin-ui-component\` skill when building a new component — it scaffolds the four files and wires up the barrel exports. This page describes what that process produces.

## 1. Choose a category

| Category | Use when |
|----------|----------|
| \`primitives/\` | A leaf component that doesn't position itself |
| \`overlays/\` | A floating or fixed-position UI element |
| \`layout/\` | A structural component that arranges other components |
| \`navigation/\` | Part of the nav system (SideNav, TopNav, etc.) |

## 2. Scaffold the four files

Create a directory under the appropriate category:

\`\`\`
primitives/MyComponent/
  MyComponent.tsx
  MyComponent.module.css
  MyComponent.test.tsx
  index.ts
\`\`\`

**index.ts** is always a one-liner:

\`\`\`ts
export { default } from './MyComponent';
\`\`\`

## 3. Implement the component

Define a props interface and export it alongside the component:

\`\`\`tsx
export interface MyComponentProps {
  /** Description of each prop. */
  label: string;
  size?: 's' | 'm' | 'l';
  className?: string;
}

export default function MyComponent({ label, size = 'm', className }: MyComponentProps) {
  return (
    <div className={[styles.root, styles[size], className].filter(Boolean).join(' ')}>
      {label}
    </div>
  );
}
\`\`\`

Use \`resolveSize\` from \`src/primitives/resolveSize.ts\` when accepting size props with aliases (\`sm\`/\`small\`, \`md\`/\`medium\`, \`lg\`/\`large\`).

## 4. Wire up barrel exports

Add to the category barrel (e.g. \`primitives/index.ts\`):

\`\`\`ts
export type { MyComponentProps } from './MyComponent/MyComponent';
export { default as MyComponent } from './MyComponent';
\`\`\`

Then add to \`src/index.ts\`:

\`\`\`ts
export type { MyComponentProps } from './primitives/MyComponent/MyComponent';
export { MyComponent } from './primitives';
\`\`\`

## 5. Write the test file

Every component needs a test file. See [CSS Conventions](/about/dev-css-conventions) for style rules and the [Testing](/about/dev-build-deploy) section of Build & Deploy for test commands.

\`\`\`tsx
describe('MyComponent', () => {
  it('renders the label', () => {
    render(<MyComponent label="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
\`\`\`

## 6. Add a catalog demo

Create \`catalog/demos/MyComponentDemo.tsx\` and register it in \`catalog/demos/index.ts\` and \`catalog/data/navigation.ts\`.
`;

export default function DevAddingComponentPage() {
  return <AboutPageLayout><DocPage content={content} centered={false} /></AboutPageLayout>;
}
