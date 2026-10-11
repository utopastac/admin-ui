import { useState, useEffect } from 'react';

/** Matches the `@mixin mobile` / `--admin-breakpoint-md` (768px) boundary. */
export const ADMIN_MOBILE_QUERY = '(max-width: 767px)';

/**
 * Subscribe to a CSS media query. Returns whether it currently matches.
 * SSR / non-browser environments return `false`.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQueryList = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener('change', onChange);
    return () => mediaQueryList.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
