import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SideNav from './SideNav';
import type { SideNavSectionData } from './SideNavSection';

const sections: SideNavSectionData[] = [
  {
    label: 'Alpha',
    collapsible: true,
    defaultOpen: false,
    items: [
      { id: 'a1', label: 'Alpha One' },
      { id: 'a2', label: 'Alpha Two' },
    ],
  },
  {
    label: 'Beta',
    items: [
      { id: 'b1', label: 'Beta One' },
      { id: 'b2', label: 'Beta Two' },
    ],
  },
];

describe('useKeyboardNav (via SideNav)', () => {
  it('moves focus to the next item on ArrowDown', async () => {
    const user = userEvent.setup();
    render(<SideNav sections={sections} onSelect={() => {}} />);
    const beta1 = screen.getByRole('button', { name: 'Beta One' });
    beta1.focus();
    await user.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Beta Two' }));
  });

  it('moves focus to the previous item on ArrowUp', async () => {
    const user = userEvent.setup();
    render(<SideNav sections={sections} onSelect={() => {}} />);
    const beta2 = screen.getByRole('button', { name: 'Beta Two' });
    beta2.focus();
    await user.keyboard('{ArrowUp}');
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Beta One' }));
  });

  it('does not move past the last item on ArrowDown', async () => {
    const user = userEvent.setup();
    render(<SideNav sections={sections} onSelect={() => {}} />);
    const last = screen.getByRole('button', { name: 'Beta Two' });
    last.focus();
    await user.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(last);
  });

  it('expands a collapsed section on ArrowRight', async () => {
    const user = userEvent.setup();
    render(<SideNav sections={sections} onSelect={() => {}} />);
    const alphaHeader = screen.getByRole('button', { name: /Alpha/ });
    alphaHeader.focus();
    expect(alphaHeader.getAttribute('aria-expanded')).toBe('false');
    await user.keyboard('{ArrowRight}');
    expect(alphaHeader.getAttribute('aria-expanded')).toBe('true');
  });

  it('collapses an expanded section on ArrowLeft', async () => {
    const user = userEvent.setup();
    render(
      <SideNav
        sections={[
          {
            label: 'MySection',
            collapsible: true,
            defaultOpen: true,
            items: [{ id: 'a1', label: 'My Item' }],
          },
        ]}
        onSelect={() => {}}
      />,
    );
    const header = screen.getByRole('button', { name: /MySection/ });
    header.focus();
    expect(header.getAttribute('aria-expanded')).toBe('true');
    await user.keyboard('{ArrowLeft}');
    expect(header.getAttribute('aria-expanded')).toBe('false');
  });

  it('clears the search query on Escape when searchable', async () => {
    const user = userEvent.setup();
    render(<SideNav sections={sections} onSelect={() => {}} searchable />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await user.type(input, 'beta');
    expect(input.value).toBe('beta');
    // Fire Escape on the nav root — jsdom respects bubbling.
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(input.value).toBe('');
  });

  describe('roving tabindex', () => {
    it('sets tabIndex=0 on the first focusable item and -1 on the rest initially', () => {
      render(<SideNav sections={sections} onSelect={() => {}} />);
      const items = document.querySelectorAll<HTMLElement>('[data-sidenav-item]');
      expect(items.length).toBeGreaterThan(0);
      // First item is the Alpha section toggle.
      expect(items[0].tabIndex).toBe(0);
      for (let i = 1; i < items.length; i++) {
        expect(items[i].tabIndex).toBe(-1);
      }
    });

    it('updates tabIndex so Tab returns to the last-focused item', async () => {
      const user = userEvent.setup();
      render(<SideNav sections={sections} onSelect={() => {}} />);
      const beta1 = screen.getByRole('button', { name: 'Beta One' });
      beta1.focus();
      // After focus, beta1 should be tabIndex=0; nothing else should be.
      expect(beta1.tabIndex).toBe(0);
      const items = document.querySelectorAll<HTMLElement>('[data-sidenav-item]');
      const tabbable = Array.from(items).filter((i) => i.tabIndex === 0);
      expect(tabbable).toHaveLength(1);
      expect(tabbable[0]).toBe(beta1);

      await user.keyboard('{ArrowDown}');
      const beta2 = screen.getByRole('button', { name: 'Beta Two' });
      expect(document.activeElement).toBe(beta2);
      expect(beta2.tabIndex).toBe(0);
      expect(beta1.tabIndex).toBe(-1);
    });
  });

  describe('Home / End', () => {
    it('Home focuses the first focusable item', async () => {
      const user = userEvent.setup();
      render(<SideNav sections={sections} onSelect={() => {}} />);
      const beta2 = screen.getByRole('button', { name: 'Beta Two' });
      beta2.focus();
      await user.keyboard('{Home}');
      const items = document.querySelectorAll<HTMLElement>('[data-sidenav-item]');
      expect(document.activeElement).toBe(items[0]);
    });

    it('End focuses the last focusable item', async () => {
      const user = userEvent.setup();
      render(<SideNav sections={sections} onSelect={() => {}} />);
      const items = document.querySelectorAll<HTMLElement>('[data-sidenav-item]');
      (items[0] as HTMLElement).focus();
      await user.keyboard('{End}');
      expect(document.activeElement).toBe(items[items.length - 1]);
    });
  });

  describe('type-ahead', () => {
    it('single-char type-ahead focuses the next item starting with that letter', async () => {
      const user = userEvent.setup();
      const s: SideNavSectionData[] = [
        {
          label: 'Group',
          items: [
            { id: '1', label: 'Apples' },
            { id: '2', label: 'Bananas' },
            { id: '3', label: 'Cherries' },
          ],
        },
      ];
      render(<SideNav sections={s} onSelect={() => {}} />);
      const apples = screen.getByRole('button', { name: 'Apples' });
      apples.focus();
      await user.keyboard('b');
      expect(document.activeElement).toBe(
        screen.getByRole('button', { name: 'Bananas' }),
      );
    });

    it('single-char type-ahead cycles through multiple matches', async () => {
      const user = userEvent.setup();
      const s: SideNavSectionData[] = [
        {
          label: 'Group',
          items: [
            { id: '1', label: 'Banana' },
            { id: '2', label: 'Blueberry' },
            { id: '3', label: 'Blackberry' },
          ],
        },
      ];
      render(<SideNav sections={s} onSelect={() => {}} />);
      const banana = screen.getByRole('button', { name: 'Banana' });
      banana.focus();
      // With stale buffer wiped (no prior input), first 'b' stays on banana
      // only if buffer starts fresh — but the hook searches starting AFTER
      // the current item for single-char, so it advances.
      await user.keyboard('b');
      expect(document.activeElement).toBe(
        screen.getByRole('button', { name: 'Blueberry' }),
      );
      await user.keyboard('b');
      expect(document.activeElement).toBe(
        screen.getByRole('button', { name: 'Blackberry' }),
      );
      await user.keyboard('b');
      // Wraps back to Banana.
      expect(document.activeElement).toBe(
        screen.getByRole('button', { name: 'Banana' }),
      );
    });

    it('multi-char type-ahead matches accumulated prefix within the timeout', () => {
      vi.useFakeTimers();
      try {
        const s: SideNavSectionData[] = [
          {
            label: 'Group',
            items: [
              { id: '1', label: 'Alpha' },
              { id: '2', label: 'Bravo' },
              { id: '3', label: 'Beta' },
              { id: '4', label: 'Charlie' },
            ],
          },
        ];
        render(<SideNav sections={s} onSelect={() => {}} />);
        const alpha = screen.getByRole('button', { name: 'Alpha' });
        alpha.focus();
        const navRoot = alpha.closest('[class*="sideNav"]') as HTMLElement;
        // First 'b' — buffer = 'b'. Searches after Alpha -> finds Bravo.
        fireEvent.keyDown(navRoot, { key: 'b' });
        expect(document.activeElement).toBe(
          screen.getByRole('button', { name: 'Bravo' }),
        );
        // Second 'e' within the timeout — buffer = 'be'. Should match Beta.
        vi.advanceTimersByTime(100);
        fireEvent.keyDown(navRoot, { key: 'e' });
        expect(document.activeElement).toBe(
          screen.getByRole('button', { name: 'Beta' }),
        );
      } finally {
        vi.useRealTimers();
      }
    });

    it('skips aria-disabled items during type-ahead', async () => {
      const user = userEvent.setup();
      // We can't put aria-disabled on items via SideNavItemData, but we
      // can set it directly on rendered buttons to simulate. Easiest:
      // render, then tag the unwanted button as aria-disabled.
      const s: SideNavSectionData[] = [
        {
          label: 'Group',
          items: [
            { id: '1', label: 'Apple' },
            { id: '2', label: 'Banana' },
            { id: '3', label: 'Blueberry' },
          ],
        },
      ];
      render(<SideNav sections={s} onSelect={() => {}} />);
      const banana = screen.getByRole('button', { name: 'Banana' });
      banana.setAttribute('aria-disabled', 'true');
      const apple = screen.getByRole('button', { name: 'Apple' });
      apple.focus();
      await user.keyboard('b');
      // Should skip Banana and land on Blueberry.
      expect(document.activeElement).toBe(
        screen.getByRole('button', { name: 'Blueberry' }),
      );
    });
  });

  describe('aria-disabled items', () => {
    it('ArrowDown skips items with aria-disabled="true"', async () => {
      const user = userEvent.setup();
      render(<SideNav sections={sections} onSelect={() => {}} />);
      const beta1 = screen.getByRole('button', { name: 'Beta One' });
      const beta2 = screen.getByRole('button', { name: 'Beta Two' });
      beta2.setAttribute('aria-disabled', 'true');
      beta1.focus();
      await user.keyboard('{ArrowDown}');
      // Beta Two is skipped; focus stays on beta1 (it was already the last
      // focusable item).
      expect(document.activeElement).toBe(beta1);
    });
  });

  describe('focus outside nav', () => {
    it('ArrowDown focuses first item when focus starts outside nav', () => {
      render(
        <>
          <button type="button">Outside</button>
          <SideNav sections={sections} onSelect={() => {}} />
        </>,
      );
      const outside = screen.getByRole('button', { name: 'Outside' });
      outside.focus();
      expect(document.activeElement).toBe(outside);
      const navRoot = document.querySelector('[class*="sideNav"]') as HTMLElement;
      fireEvent.keyDown(navRoot, { key: 'ArrowDown' });
      const items = document.querySelectorAll<HTMLElement>('[data-sidenav-item]');
      expect(document.activeElement).toBe(items[0]);
    });

    it('ArrowUp focuses last item when focus starts outside nav', () => {
      render(
        <>
          <button type="button">Outside</button>
          <SideNav sections={sections} onSelect={() => {}} />
        </>,
      );
      const outside = screen.getByRole('button', { name: 'Outside' });
      outside.focus();
      const navRoot = document.querySelector('[class*="sideNav"]') as HTMLElement;
      fireEvent.keyDown(navRoot, { key: 'ArrowUp' });
      const items = document.querySelectorAll<HTMLElement>('[data-sidenav-item]');
      expect(document.activeElement).toBe(items[items.length - 1]);
    });
  });
});
