import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PageContents from './PageContents';
import type { PageContentsItem } from './PageContents';

// ── IntersectionObserver mock ──────────────────────────────────────────────

const observeMock = vi.fn();
const unobserveMock = vi.fn();
const disconnectMock = vi.fn();

// Capture the latest callback so tests can fire it manually
let intersectionCallback: IntersectionObserverCallback;

beforeEach(() => {
  class MockIntersectionObserver {
    constructor(cb: IntersectionObserverCallback) {
      intersectionCallback = cb;
    }
    observe = observeMock;
    unobserve = unobserveMock;
    disconnect = disconnectMock;
  }

  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  observeMock.mockClear();
  unobserveMock.mockClear();
  disconnectMock.mockClear();
});

// ── Fixtures ───────────────────────────────────────────────────────────────

const flatItems: PageContentsItem[] = [
  { label: 'Introduction', href: '#intro' },
  { label: 'Usage', href: '#usage' },
  { label: 'API', href: '#api' },
];

const nestedItems: PageContentsItem[] = [
  {
    label: 'Guide',
    href: '#guide',
    children: [
      { label: 'Getting started', href: '#getting-started' },
      { label: 'Configuration', href: '#configuration' },
    ],
  },
  { label: 'Reference', href: '#reference' },
];

// ── Tests ──────────────────────────────────────────────────────────────────

describe('PageContents', () => {
  it('renders all top-level items', () => {
    render(<PageContents items={flatItems} />);
    expect(screen.getByText('Introduction')).toBeInTheDocument();
    expect(screen.getByText('Usage')).toBeInTheDocument();
    expect(screen.getByText('API')).toBeInTheDocument();
  });

  it('renders children when present', () => {
    render(<PageContents items={nestedItems} />);
    expect(screen.getByText('Guide')).toBeInTheDocument();
    expect(screen.getByText('Getting started')).toBeInTheDocument();
    expect(screen.getByText('Configuration')).toBeInTheDocument();
    expect(screen.getByText('Reference')).toBeInTheDocument();
  });

  it('does not render label when not provided', () => {
    render(<PageContents items={flatItems} />);
    // The nav aria-label should default but no visible <p> should appear
    expect(screen.queryByText('On this page')).not.toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<PageContents items={flatItems} label="On this page" />);
    expect(screen.getByText('On this page')).toBeInTheDocument();
  });

  it('uses label as aria-label on the nav', () => {
    render(<PageContents items={flatItems} label="Contents" />);
    expect(screen.getByRole('navigation', { name: 'Contents' })).toBeInTheDocument();
  });

  it('uses default aria-label when label not provided', () => {
    render(<PageContents items={flatItems} />);
    expect(screen.getByRole('navigation', { name: 'Page contents' })).toBeInTheDocument();
  });

  describe('click behaviour', () => {
    it('calls scrollIntoView on the target element when a link is clicked', async () => {
      const user = userEvent.setup();

      // Set up a mock target element in the document
      const targetEl = document.createElement('section');
      targetEl.id = 'intro';
      const scrollIntoViewMock = vi.fn();
      targetEl.scrollIntoView = scrollIntoViewMock;
      document.body.appendChild(targetEl);

      render(<PageContents items={flatItems} />);

      await user.click(screen.getByText('Introduction'));

      expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });

      document.body.removeChild(targetEl);
    });

    it('prevents the default anchor navigation on click', () => {
      render(<PageContents items={flatItems} />);

      const link = screen.getByText('Usage').closest('a')!;

      // Dispatch a synthetic click and capture whether preventDefault was called
      let defaultPrevented = false;
      const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
      // Patch preventDefault before dispatching so we can observe it
      const origPreventDefault = clickEvent.preventDefault.bind(clickEvent);
      Object.defineProperty(clickEvent, 'preventDefault', {
        value: () => {
          defaultPrevented = true;
          origPreventDefault();
        },
        writable: true,
      });

      link.dispatchEvent(clickEvent);
      expect(defaultPrevented).toBe(true);
    });
  });

  describe('active state via IntersectionObserver', () => {
    // Ensure the scroll-to-bottom heuristic (window.innerHeight + scrollY >=
    // body.offsetHeight - 5) doesn't short-circuit the intersection logic in
    // jsdom, where the body has no real height.
    let offsetHeightSpy: ReturnType<typeof vi.spyOn>;
    beforeEach(() => {
      offsetHeightSpy = vi
        .spyOn(document.body, 'offsetHeight', 'get')
        .mockReturnValue(10000);
    });
    afterEach(() => {
      offsetHeightSpy.mockRestore();
    });

    it('applies active class to the correct item when IntersectionObserver fires', () => {
      // Create DOM elements for the sections
      const introEl = document.createElement('section');
      introEl.id = 'intro';
      document.body.appendChild(introEl);

      render(<PageContents items={flatItems} />);

      // Fire the intersection callback for #intro
      act(() => {
        intersectionCallback(
          [
            {
              target: introEl,
              isIntersecting: true,
              boundingClientRect: { top: 50 } as DOMRectReadOnly,
            } as IntersectionObserverEntry,
          ],
          {} as IntersectionObserver,
        );
      });

      const introLink = screen.getByText('Introduction').closest('a')!;
      expect(introLink.className).toContain('active');

      // Other links should not be active
      const usageLink = screen.getByText('Usage').closest('a')!;
      expect(usageLink.className).not.toContain('active');

      document.body.removeChild(introEl);
    });

    it('applies active class to the parent when a child is active', () => {
      const guideEl = document.createElement('section');
      guideEl.id = 'guide';
      const gettingStartedEl = document.createElement('section');
      gettingStartedEl.id = 'getting-started';
      document.body.appendChild(guideEl);
      document.body.appendChild(gettingStartedEl);

      render(<PageContents items={nestedItems} />);

      // Fire intersection for the child section
      act(() => {
        intersectionCallback(
          [
            {
              target: gettingStartedEl,
              isIntersecting: true,
              boundingClientRect: { top: 120 } as DOMRectReadOnly,
            } as IntersectionObserverEntry,
          ],
          {} as IntersectionObserver,
        );
      });

      const childLink = screen.getByText('Getting started').closest('a')!;
      expect(childLink.className).toContain('active');

      // Parent link should also be marked active
      const parentLink = screen.getByText('Guide').closest('a')!;
      expect(parentLink.className).toContain('active');

      document.body.removeChild(guideEl);
      document.body.removeChild(gettingStartedEl);
    });
  });
});
