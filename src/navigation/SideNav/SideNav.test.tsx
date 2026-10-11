import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SideNav from './SideNav';
import type { SideNavSectionData } from './SideNavSection';
import type { SideNavTopLevelSectionData } from './SideNavTopLevelSection';

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
      { id: 'input', label: 'Input' },
    ],
  },
];

const defaultProps = {
  sections,
  onSelect: vi.fn(),
};

describe('SideNav', () => {
  it('renders section labels', () => {
    render(<SideNav {...defaultProps} />);
    expect(screen.getByText('Getting Started')).toBeInTheDocument();
    expect(screen.getByText('Components')).toBeInTheDocument();
  });

  it('renders all navigation items', () => {
    render(<SideNav {...defaultProps} />);
    expect(screen.getByText('Introduction')).toBeInTheDocument();
    expect(screen.getByText('Setup')).toBeInTheDocument();
    expect(screen.getByText('Button')).toBeInTheDocument();
    expect(screen.getByText('Input')).toBeInTheDocument();
  });

  it('renders a nav element', () => {
    render(<SideNav {...defaultProps} />);
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument();
  });

  it('calls onSelect with the item id when clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<SideNav {...defaultProps} onSelect={onSelect} />);

    await user.click(screen.getByText('Button'));
    expect(onSelect).toHaveBeenCalledWith('button');
  });

  it('highlights the active item', () => {
    render(<SideNav {...defaultProps} activeId="setup" />);
    const setupButton = screen.getByRole('button', { name: 'Setup' });
    expect(setupButton.className).toContain('active');
  });

  it('does not highlight non-active items', () => {
    render(<SideNav {...defaultProps} activeId="setup" />);
    const introButton = screen.getByRole('button', { name: 'Introduction' });
    expect(introButton.className).not.toContain('active');
  });

  it('applies custom className', () => {
    const { container } = render(<SideNav {...defaultProps} className="my-nav" />);
    expect(container.firstElementChild).toHaveClass('my-nav');
  });

  describe('searchable', () => {
    it('shows a search input when searchable is true', () => {
      render(<SideNav {...defaultProps} searchable />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('does not show a search input by default', () => {
      render(<SideNav {...defaultProps} />);
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });

    it('hides search input when collapsed', () => {
      render(<SideNav {...defaultProps} searchable defaultCollapsed />);
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });

    it('uses custom search placeholder', () => {
      render(<SideNav {...defaultProps} searchable searchPlaceholder="Find items" />);
      expect(screen.getByPlaceholderText('Find items')).toBeInTheDocument();
    });

    it('filters items based on search query', async () => {
      const user = userEvent.setup();
      render(<SideNav {...defaultProps} searchable />);

      await user.type(screen.getByRole('textbox'), 'button');

      expect(screen.getByText('Button')).toBeInTheDocument();
      expect(screen.queryByText('Introduction')).not.toBeInTheDocument();
      expect(screen.queryByText('Setup')).not.toBeInTheDocument();
      expect(screen.queryByText('Input')).not.toBeInTheDocument();
    });

    it('filters case-insensitively', async () => {
      const user = userEvent.setup();
      render(<SideNav {...defaultProps} searchable />);

      await user.type(screen.getByRole('textbox'), 'INTRO');

      expect(screen.getByText('Introduction')).toBeInTheDocument();
      expect(screen.queryByText('Button')).not.toBeInTheDocument();
    });

    it('shows "No results" when search matches nothing', async () => {
      const user = userEvent.setup();
      render(<SideNav {...defaultProps} searchable />);

      await user.type(screen.getByRole('textbox'), 'zzzzz');

      expect(screen.getByText('No results')).toBeInTheDocument();
    });

    it('shows a clear button when there is a search query', async () => {
      const user = userEvent.setup();
      render(<SideNav {...defaultProps} searchable />);

      await user.type(screen.getByRole('textbox'), 'test');

      expect(screen.getByLabelText('Clear')).toBeInTheDocument();
    });

    it('clears the search when the clear button is clicked', async () => {
      const user = userEvent.setup();
      render(<SideNav {...defaultProps} searchable />);

      await user.type(screen.getByRole('textbox'), 'zzzzz');
      expect(screen.getByText('No results')).toBeInTheDocument();

      await user.click(screen.getByLabelText('Clear'));

      expect(screen.getByText('Introduction')).toBeInTheDocument();
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('hides sections with no matching items', async () => {
      const user = userEvent.setup();
      render(<SideNav {...defaultProps} searchable />);

      await user.type(screen.getByRole('textbox'), 'button');

      // 'Components' section stays because 'Button' matches
      expect(screen.getByText('Components')).toBeInTheDocument();
      // 'Getting Started' section is hidden because no items match
      expect(screen.queryByText('Getting Started')).not.toBeInTheDocument();
    });
  });

  describe('topLevelSections', () => {
    const topLevelSections: SideNavTopLevelSectionData[] = [
      {
        label: 'Main',
        defaultOpen: true,
        sections: [
          {
            label: 'Overview',
            items: [
              { id: 'home', label: 'Home' },
              { id: 'dashboard', label: 'Dashboard' },
            ],
          },
        ],
      },
      {
        label: 'Settings',
        defaultOpen: false,
        sections: [
          {
            items: [
              { id: 'general', label: 'General' },
              { id: 'billing', label: 'Billing' },
            ],
          },
        ],
      },
    ];

    it('renders top-level accordion headers', () => {
      render(
        <SideNav sections={[]} topLevelSections={topLevelSections} onSelect={vi.fn()} />,
      );
      expect(screen.getByText('Main')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('shows content when section is open by default', () => {
      render(
        <SideNav sections={[]} topLevelSections={topLevelSections} onSelect={vi.fn()} />,
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('hides content when section is closed by default', () => {
      render(
        <SideNav sections={[]} topLevelSections={topLevelSections} onSelect={vi.fn()} />,
      );
      expect(screen.queryByText('General')).not.toBeInTheDocument();
      expect(screen.queryByText('Billing')).not.toBeInTheDocument();
    });

    it('toggles content when accordion header is clicked', async () => {
      const user = userEvent.setup();
      render(
        <SideNav sections={[]} topLevelSections={topLevelSections} onSelect={vi.fn()} />,
      );

      await user.click(screen.getByText('Settings'));
      expect(screen.getByText('General')).toBeInTheDocument();
      expect(screen.getByText('Billing')).toBeInTheDocument();

      await user.click(screen.getByText('Settings'));
      expect(screen.queryByText('General')).not.toBeInTheDocument();
      expect(screen.queryByText('Billing')).not.toBeInTheDocument();
    });

    it('calls onSelect when item in top-level section is clicked', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      render(
        <SideNav sections={[]} topLevelSections={topLevelSections} onSelect={onSelect} />,
      );

      await user.click(screen.getByText('Dashboard'));
      expect(onSelect).toHaveBeenCalledWith('dashboard');
    });
  });

  describe('collapsible sections', () => {
    const collapsibleSections: SideNavSectionData[] = [
      {
        label: 'Open Section',
        collapsible: true,
        defaultOpen: true,
        items: [
          { id: 'item-a', label: 'Item A' },
          { id: 'item-b', label: 'Item B' },
        ],
      },
      {
        label: 'Closed Section',
        collapsible: true,
        defaultOpen: false,
        items: [
          { id: 'item-c', label: 'Item C' },
          { id: 'item-d', label: 'Item D' },
        ],
      },
    ];

    it('renders collapsible section headers as buttons', () => {
      render(<SideNav sections={collapsibleSections} onSelect={vi.fn()} />);
      expect(screen.getByRole('button', { name: /Open Section/ })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Closed Section/ })).toBeInTheDocument();
    });

    it('shows content of open collapsible sections', () => {
      render(<SideNav sections={collapsibleSections} onSelect={vi.fn()} />);
      expect(screen.getByText('Item A')).toBeInTheDocument();
      expect(screen.getByText('Item B')).toBeInTheDocument();
    });

    it('hides content of closed collapsible sections', () => {
      render(<SideNav sections={collapsibleSections} onSelect={vi.fn()} />);
      expect(screen.queryByText('Item C')).not.toBeInTheDocument();
      expect(screen.queryByText('Item D')).not.toBeInTheDocument();
    });

    it('toggles content when collapsible header is clicked', async () => {
      const user = userEvent.setup();
      render(<SideNav sections={collapsibleSections} onSelect={vi.fn()} />);

      // Close the open section
      await user.click(screen.getByRole('button', { name: /Open Section/ }));
      expect(screen.queryByText('Item A')).not.toBeInTheDocument();

      // Re-open it
      await user.click(screen.getByRole('button', { name: /Open Section/ }));
      expect(screen.getByText('Item A')).toBeInTheDocument();
    });

    it('sets aria-expanded correctly', () => {
      render(<SideNav sections={collapsibleSections} onSelect={vi.fn()} />);
      expect(screen.getByRole('button', { name: /Open Section/ })).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByRole('button', { name: /Closed Section/ })).toHaveAttribute('aria-expanded', 'false');
    });

    it('defaults to open when defaultOpen is not specified', () => {
      const sections: SideNavSectionData[] = [
        {
          label: 'Default Open',
          collapsible: true,
          items: [{ id: 'item-x', label: 'Item X' }],
        },
      ];
      render(<SideNav sections={sections} onSelect={vi.fn()} />);
      expect(screen.getByText('Item X')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Default Open/ })).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('collapsible', () => {
    it('renders the toggle button by default', () => {
      render(<SideNav {...defaultProps} />);
      expect(screen.getByRole('button', { name: 'Collapse sidebar' })).toBeInTheDocument();
    });

    it('does not render the toggle button when collapsible is false', () => {
      render(<SideNav {...defaultProps} collapsible={false} />);
      expect(screen.queryByRole('button', { name: /sidebar/i })).not.toBeInTheDocument();
    });

    it('starts expanded by default', () => {
      render(<SideNav {...defaultProps} />);
      expect(screen.getByText('Introduction')).toBeInTheDocument();
    });

    it('starts collapsed when defaultCollapsed is true', () => {
      render(<SideNav {...defaultProps} defaultCollapsed />);
      expect(screen.queryByText('Introduction')).not.toBeInTheDocument();
    });

    it('toggle button label says "Expand sidebar" when collapsed', () => {
      render(<SideNav {...defaultProps} defaultCollapsed />);
      expect(screen.getByRole('button', { name: 'Expand sidebar' })).toBeInTheDocument();
    });

    it('expands when toggle is clicked while collapsed', async () => {
      const user = userEvent.setup();
      render(<SideNav {...defaultProps} defaultCollapsed />);

      await user.click(screen.getByRole('button', { name: 'Expand sidebar' }));

      expect(screen.getByText('Introduction')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Collapse sidebar' })).toBeInTheDocument();
    });

    it('collapses when toggle is clicked while expanded', async () => {
      const user = userEvent.setup();
      render(<SideNav {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }));

      expect(screen.queryByText('Introduction')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Expand sidebar' })).toBeInTheDocument();
    });

    it('calls onCollapsedChange with true when collapsed', async () => {
      const user = userEvent.setup();
      const onCollapsedChange = vi.fn();
      render(<SideNav {...defaultProps} onCollapsedChange={onCollapsedChange} />);

      await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }));

      expect(onCollapsedChange).toHaveBeenCalledWith(true);
    });

    it('calls onCollapsedChange with false when expanded', async () => {
      const user = userEvent.setup();
      const onCollapsedChange = vi.fn();
      render(<SideNav {...defaultProps} defaultCollapsed onCollapsedChange={onCollapsedChange} />);

      await user.click(screen.getByRole('button', { name: 'Expand sidebar' }));

      expect(onCollapsedChange).toHaveBeenCalledWith(false);
    });

    it('hides footer when collapsed', () => {
      render(<SideNav {...defaultProps} defaultCollapsed footer={<span>Footer content</span>} />);
      expect(screen.queryByText('Footer content')).not.toBeInTheDocument();
    });
  });

  it('renders sections without labels', () => {
    const unlabeledSections: SideNavSectionData[] = [
      { items: [{ id: 'home', label: 'Home' }] },
    ];
    render(<SideNav sections={unlabeledSections} onSelect={vi.fn()} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  describe('nested children', () => {
    const nestedSections: SideNavSectionData[] = [
      {
        label: 'Interventions',
        items: [
          {
            id: 'cat:nudges',
            label: 'Nudges',
            children: [
              { id: 'int:cookie-banner', label: 'Cookie banner' },
              { id: 'int:dark-pattern', label: 'Dark pattern alert' },
            ],
          },
          {
            id: 'cat:friction',
            label: 'Friction',
            children: [
              { id: 'int:speed-bump', label: 'Speed bump' },
            ],
          },
          { id: 'standalone', label: 'Standalone item' },
        ],
      },
    ];

    it('renders parent items with children', () => {
      render(<SideNav sections={nestedSections} onSelect={vi.fn()} />);

      expect(screen.getByText('Nudges')).toBeInTheDocument();
      expect(screen.getByText('Cookie banner')).toBeInTheDocument();
      expect(screen.getByText('Dark pattern alert')).toBeInTheDocument();
      expect(screen.getByText('Friction')).toBeInTheDocument();
      expect(screen.getByText('Speed bump')).toBeInTheDocument();
    });

    it('calls onSelect when a child item is clicked', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      render(<SideNav sections={nestedSections} onSelect={onSelect} />);

      await user.click(screen.getByText('Cookie banner'));
      expect(onSelect).toHaveBeenCalledWith('int:cookie-banner');
    });

    it('calls onSelect when a parent item with children is clicked', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      render(<SideNav sections={nestedSections} onSelect={onSelect} />);

      await user.click(screen.getByText('Nudges'));
      expect(onSelect).toHaveBeenCalledWith('cat:nudges');
    });

    it('highlights active child item', () => {
      render(<SideNav sections={nestedSections} onSelect={vi.fn()} activeId="int:cookie-banner" />);
      const childButton = screen.getByRole('button', { name: 'Cookie banner' });
      expect(childButton.className).toContain('active');
    });

    it('highlights active parent item', () => {
      render(<SideNav sections={nestedSections} onSelect={vi.fn()} activeId="cat:nudges" />);
      const parentButton = screen.getByRole('button', { name: 'Nudges' });
      expect(parentButton.className).toContain('active');
    });

    it('works alongside items without children', () => {
      render(<SideNav sections={nestedSections} onSelect={vi.fn()} />);

      // Parent items with children
      expect(screen.getByText('Nudges')).toBeInTheDocument();
      expect(screen.getByText('Friction')).toBeInTheDocument();

      // Child items
      expect(screen.getByText('Cookie banner')).toBeInTheDocument();
      expect(screen.getByText('Dark pattern alert')).toBeInTheDocument();
      expect(screen.getByText('Speed bump')).toBeInTheDocument();

      // Standalone item without children
      expect(screen.getByText('Standalone item')).toBeInTheDocument();
    });
  });
});
