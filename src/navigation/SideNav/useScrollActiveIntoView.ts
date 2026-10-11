import { useEffect } from 'react';
import type React from 'react';

/**
 * Scrolls the element with `data-nav-id="{activeId}"` inside `navRef` into
 * view when it would otherwise be above or below the visible region. A
 * double `requestAnimationFrame` defers the measurement until after the
 * surrounding layout (e.g. newly-rendered sections) has settled.
 *
 * No-ops when `activeId` is undefined or the ref is not attached.
 *
 * @param navRef        Ref to the scrollable nav container.
 * @param activeId      The id of the currently active nav item.
 * @param scrollOffset  Extra pixels to scroll past the active item.
 * @param deps          Extra dependencies that should re-trigger scrolling
 *                      (typically the set of rendered sections).
 */
export function useScrollActiveIntoView(
  navRef: React.RefObject<HTMLDivElement | null>,
  activeId: string | undefined,
  scrollOffset: number,
  deps: React.DependencyList,
): void {
  useEffect(() => {
    if (!activeId || !navRef.current) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const nav = navRef.current;
        const activeEl = nav?.querySelector(
          `[data-nav-id="${CSS.escape(activeId)}"]`,
        ) as HTMLElement | null;
        if (!activeEl || !nav) return;
        const navRect = nav.getBoundingClientRect();
        const elRect = activeEl.getBoundingClientRect();
        if (elRect.top < navRect.top) {
          nav.scrollTop += elRect.top - navRect.top - scrollOffset;
        } else if (elRect.bottom > navRect.bottom) {
          nav.scrollTop += elRect.bottom - navRect.bottom + scrollOffset;
        }
      });
    });
    // The `deps` array is an opaque dependency list supplied by the caller —
    // we intentionally spread it so consumers decide what should re-trigger
    // the scroll. activeId and scrollOffset are always relevant.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, scrollOffset, ...deps]);
}
