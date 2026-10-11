import React, { useEffect, useRef, useState } from 'react';
import styles from './PageContents.module.css';

export interface PageContentsItem {
  label: string;
  href: string;
  children?: PageContentsItem[];
}

export interface PageContentsProps {
  items: PageContentsItem[];
  /** Optional heading rendered above the links, e.g. "On this page" */
  label?: string;
  /** Truncate long link labels with an ellipsis instead of wrapping. */
  truncate?: boolean;
}

/** Extract all hrefs from a flat+nested item tree (max 2 levels). */
function flattenHrefs(items: PageContentsItem[]): string[] {
  const hrefs: string[] = [];
  for (const item of items) {
    hrefs.push(item.href);
    if (item.children) {
      for (const child of item.children) {
        hrefs.push(child.href);
      }
    }
  }
  return hrefs;
}

/** Find the deepest item in the tree whose href matches, and return it plus its parent chain. */
function findActiveChain(
  items: PageContentsItem[],
  activeHref: string,
): Set<string> {
  const active = new Set<string>();
  for (const item of items) {
    if (item.children) {
      for (const child of item.children) {
        if (child.href === activeHref) {
          active.add(child.href);
          active.add(item.href); // mark parent as active too
          return active;
        }
      }
    }
    if (item.href === activeHref) {
      active.add(item.href);
      return active;
    }
  }
  return active;
}

const PageContents: React.FC<PageContentsProps> = ({ items, label, truncate = false }) => {
  const [activeHref, setActiveHref] = useState<string | null>(null);
  // Track all currently-intersecting sections for tiebreak logic
  const intersectingRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const hrefs = flattenHrefs(items);
    if (hrefs.length === 0) return;

    const intersecting = intersectingRef.current;
    const lastHref = hrefs[hrefs.length - 1];

    const elements: Array<{ href: string; el: HTMLElement }> = hrefs
      .flatMap((href) => {
        const id = href.startsWith('#') ? href.slice(1) : href;
        const el = document.getElementById(id);
        return el ? [{ href, el }] : [];
      });

    if (elements.length === 0) return;

    const isAtBottom = () =>
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 5;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const match = elements.find((e) => (e.el as Element) === entry.target);
          if (!match) continue;
          if (entry.isIntersecting) {
            intersecting.set(
              match.href,
              entry.boundingClientRect.top,
            );
          } else {
            intersecting.delete(match.href);
          }
        }

        // If scrolled to the bottom, always keep the last item active.
        if (isAtBottom()) {
          setActiveHref(lastHref);
          return;
        }

        if (intersecting.size === 0) return;

        // Prefer the intersecting section whose top is closest to (but >= 0) the viewport top.
        // Fall back to the one with the lowest boundingClientRect.top overall.
        let best: string | null = null;
        let bestTop = Infinity;
        let fallbackTop = Infinity;
        let fallback: string | null = null;

        for (const [href, top] of intersecting) {
          if (top >= 0 && top < bestTop) {
            bestTop = top;
            best = href;
          }
          if (top < fallbackTop) {
            fallbackTop = top;
            fallback = href;
          }
        }

        setActiveHref(best ?? fallback);
      },
      { rootMargin: '-10% 0px -80% 0px' },
    );

    for (const { el } of elements) {
      observer.observe(el);
    }

    // Scroll-to-bottom: activate the last item when the page is fully scrolled.
    function handleScroll() {
      if (isAtBottom()) {
        setActiveHref(lastHref);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      intersecting.clear();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items]);

  const activeChain = activeHref ? findActiveChain(items, activeHref) : new Set<string>();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveHref(href);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav aria-label={label ?? 'Page contents'} className={styles.nav}>
      {label && <p className={styles.label}>{label}</p>}
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.href} className={styles.item}>
            <a
              href={item.href}
              className={[styles.link, truncate && styles.truncate, activeChain.has(item.href) && styles.active].filter(Boolean).join(' ')}
              onClick={(e) => handleClick(e, item.href)}
            >
              {item.label}
            </a>
            {item.children && item.children.length > 0 && (
              <ul className={styles.childList}>
                {item.children.map((child) => (
                  <li key={child.href} className={styles.item}>
                    <a
                      href={child.href}
                      className={[styles.link, styles.childLink, truncate && styles.truncate, activeChain.has(child.href) && styles.active].filter(Boolean).join(' ')}
                      onClick={(e) => handleClick(e, child.href)}
                    >
                      {child.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PageContents;
