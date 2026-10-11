import { filterItemsByQuery } from './filterItemsByQuery';
import type { SideNavSectionData } from './SideNavSection';

const sections: SideNavSectionData[] = [
  {
    label: 'Getting Started',
    items: [
      { id: 'intro', label: 'Introduction' },
      { id: 'setup', label: 'Setup' },
    ],
  },
  {
    label: 'Components',
    items: [
      { id: 'button', label: 'Button' },
      {
        id: 'forms',
        label: 'Forms',
        children: [
          { id: 'input', label: 'Input' },
          { id: 'select', label: 'Select' },
        ],
      },
    ],
  },
];

describe('filterItemsByQuery', () => {
  it('returns the input sections unchanged when query is empty', () => {
    expect(filterItemsByQuery(sections, '')).toBe(sections);
  });

  it('matches top-level item labels', () => {
    const result = filterItemsByQuery(sections, 'button');
    expect(result).toHaveLength(1);
    expect(result[0].label).toBe('Components');
    expect(result[0].items).toHaveLength(1);
    expect(result[0].items[0].id).toBe('button');
  });

  it('matches nested child labels and preserves the parent', () => {
    const result = filterItemsByQuery(sections, 'input');
    expect(result).toHaveLength(1);
    const parent = result[0].items[0];
    expect(parent.id).toBe('forms');
    expect(parent.children).toHaveLength(1);
    expect(parent.children?.[0].id).toBe('input');
  });

  it('keeps all children when the parent label itself matches', () => {
    const result = filterItemsByQuery(sections, 'forms');
    const parent = result[0].items[0];
    expect(parent.children).toHaveLength(2);
  });

  it('matches case-insensitively', () => {
    const result = filterItemsByQuery(sections, 'INTRO');
    expect(result).toHaveLength(1);
    expect(result[0].items).toHaveLength(1);
    expect(result[0].items[0].id).toBe('intro');
  });

  it('drops sections with no surviving items', () => {
    const result = filterItemsByQuery(sections, 'zzzzz');
    expect(result).toHaveLength(0);
  });

  it('drops non-matching children when the parent label does not match', () => {
    const result = filterItemsByQuery(sections, 'select');
    const parent = result[0].items[0];
    expect(parent.id).toBe('forms');
    expect(parent.children).toHaveLength(1);
    expect(parent.children?.[0].id).toBe('select');
  });
});
