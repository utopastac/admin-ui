import { renderHook } from '@testing-library/react';
import { useScrollActiveIntoView } from './useScrollActiveIntoView';

/**
 * Build a nav container with an active item whose bounding rect can be
 * controlled per-test by mocking `getBoundingClientRect`. Returns the nav
 * element so tests can inspect/assert `scrollTop`.
 */
function buildNav({
  activeId,
  navRect,
  elRect,
}: {
  activeId: string;
  navRect: DOMRect;
  elRect: DOMRect;
}) {
  const nav = document.createElement('div');
  const item = document.createElement('div');
  item.setAttribute('data-nav-id', activeId);
  nav.appendChild(item);
  document.body.appendChild(nav);

  nav.getBoundingClientRect = () => navRect;
  item.getBoundingClientRect = () => elRect;

  return { nav, item };
}

function rect(top: number, bottom: number): DOMRect {
  return {
    top,
    bottom,
    left: 0,
    right: 0,
    x: 0,
    y: top,
    width: 0,
    height: bottom - top,
    toJSON: () => ({}),
  } as DOMRect;
}

describe('useScrollActiveIntoView', () => {
  beforeEach(() => {
    // Make requestAnimationFrame synchronous so we don't have to wait for
    // two frames inside the test.
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      cb(0);
      return 0 as unknown as number;
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = '';
  });

  it('does nothing when activeId is undefined', () => {
    const nav = document.createElement('div');
    nav.scrollTop = 50;
    const ref = { current: nav };

    renderHook(() => useScrollActiveIntoView(ref, undefined, 40, []));

    expect(nav.scrollTop).toBe(50);
  });

  it('does nothing when ref is null', () => {
    const ref = { current: null };

    // Should not throw.
    expect(() =>
      renderHook(() => useScrollActiveIntoView(ref, 'item-1', 40, [])),
    ).not.toThrow();
  });

  it('adjusts scrollTop when the active element is above the viewport', () => {
    // Nav spans 100..500; active item sits at 50..80, i.e. above the top.
    const { nav } = buildNav({
      activeId: 'item-1',
      navRect: rect(100, 500),
      elRect: rect(50, 80),
    });
    nav.scrollTop = 200;

    const ref = { current: nav };
    renderHook(() => useScrollActiveIntoView(ref, 'item-1', 40, []));

    // elRect.top - navRect.top - offset = 50 - 100 - 40 = -90
    // So scrollTop should be 200 + (-90) = 110.
    expect(nav.scrollTop).toBe(110);
  });

  it('adjusts scrollTop when the active element is below the viewport', () => {
    // Nav spans 100..500; active item sits at 520..560, i.e. below bottom.
    const { nav } = buildNav({
      activeId: 'item-1',
      navRect: rect(100, 500),
      elRect: rect(520, 560),
    });
    nav.scrollTop = 0;

    const ref = { current: nav };
    renderHook(() => useScrollActiveIntoView(ref, 'item-1', 40, []));

    // elRect.bottom - navRect.bottom + offset = 560 - 500 + 40 = 100
    expect(nav.scrollTop).toBe(100);
  });

  it('does nothing when the active element is already fully visible', () => {
    // Nav spans 100..500; active item sits at 200..260, fully within viewport.
    const { nav } = buildNav({
      activeId: 'item-1',
      navRect: rect(100, 500),
      elRect: rect(200, 260),
    });
    nav.scrollTop = 42;

    const ref = { current: nav };
    renderHook(() => useScrollActiveIntoView(ref, 'item-1', 40, []));

    expect(nav.scrollTop).toBe(42);
  });

  it('safely handles activeIds with special CSS characters via CSS.escape', () => {
    const tricky = 'weird"id';
    const { nav } = buildNav({
      activeId: tricky,
      navRect: rect(100, 500),
      elRect: rect(50, 80),
    });
    nav.scrollTop = 200;

    const ref = { current: nav };
    renderHook(() => useScrollActiveIntoView(ref, tricky, 40, []));

    expect(nav.scrollTop).toBe(110);
  });
});
