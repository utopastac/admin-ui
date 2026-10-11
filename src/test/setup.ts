import '@testing-library/jest-dom';

// jsdom does not implement ResizeObserver — provide a no-op stub so components
// that use it (e.g. Popover) don't throw in tests.
if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// jsdom does not implement IntersectionObserver — provide a no-op stub so
// components that use it (e.g. PageContents) don't throw in tests. Tests that
// need to drive the intersection callback can replace it via vi.stubGlobal.
if (typeof globalThis.IntersectionObserver === 'undefined') {
  globalThis.IntersectionObserver = class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
    root = null;
    rootMargin = '';
    thresholds = [];
  } as unknown as typeof IntersectionObserver;
}
