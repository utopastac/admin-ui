import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ADMIN_MOBILE_QUERY, useMediaQuery } from './useMediaQuery';

describe('useMediaQuery', () => {
  let listeners: Array<(event: MediaQueryListEvent) => void>;
  let matches: boolean;

  beforeEach(() => {
    listeners = [];
    matches = false;

    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) => ({
        media: query,
        get matches() {
          return matches;
        },
        onchange: null,
        addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => {
          listeners.push(listener);
        },
        removeEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => {
          listeners = listeners.filter((l) => l !== listener);
        },
        dispatchEvent: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('exports ADMIN_MOBILE_QUERY matching the mobile breakpoint', () => {
    expect(ADMIN_MOBILE_QUERY).toBe('(max-width: 767px)');
  });

  it('returns the initial matchMedia result', () => {
    matches = true;
    const { result } = renderHook(() => useMediaQuery(ADMIN_MOBILE_QUERY));
    expect(result.current).toBe(true);
  });

  it('updates when the media query changes', () => {
    const { result } = renderHook(() => useMediaQuery(ADMIN_MOBILE_QUERY));
    expect(result.current).toBe(false);

    act(() => {
      matches = true;
      listeners.forEach((listener) => {
        listener({ matches: true } as MediaQueryListEvent);
      });
    });

    expect(result.current).toBe(true);
  });
});
