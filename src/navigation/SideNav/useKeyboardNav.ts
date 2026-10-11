import { useCallback, useEffect, useRef } from 'react';
import type React from 'react';

interface UseKeyboardNavOptions {
  /** Called when Escape is pressed and should clear active state (typically a search query). */
  onEscape?: () => void;
}

/**
 * Return shape:
 *   - handleKeyDown: keydown handler for the SideNav root.
 *   - containerRef: ref callback to attach to the nav container. Used to:
 *       1. seed the roving tabindex (first focusable item = 0, rest = -1)
 *          on mount and whenever the set of focusable items changes;
 *       2. delegate focus events so arrow-key movement updates tabindex
 *          in lockstep with focus.
 *
 * Keyboard behaviour:
 *   - ArrowDown / ArrowUp: move focus through `[data-sidenav-item]` buttons
 *     (skipping `disabled` and `aria-disabled="true"`). Wrapping is not used;
 *     focus clamps at the ends. If focus is outside the nav, ArrowDown
 *     focuses the first item and ArrowUp focuses the last.
 *   - Home / End: focus first / last focusable item.
 *   - ArrowRight: expand the focused section toggle (items with
 *     aria-expanded="false"); no-op otherwise.
 *   - ArrowLeft: collapse the focused section toggle (items with
 *     aria-expanded="true"); no-op otherwise.
 *   - Printable characters: type-ahead — focus the next item whose visible
 *     label starts with the buffered string (case-insensitive). The buffer
 *     resets after ~500ms of idle.
 *   - Escape: invokes `onEscape` (typically clears the nav search query).
 *
 * Roving tabindex: exactly one `[data-sidenav-item]` is tabbable at a time
 * (`tabIndex=0`); the rest are `tabIndex=-1`. Focusing any item via arrow
 * keys or mouse updates the tabbable item, so a subsequent Tab returns to
 * the last-focused nav item rather than cycling through every item.
 */

const TYPEAHEAD_TIMEOUT_MS = 500;

function isFocusable(el: HTMLElement): boolean {
  if (el.hasAttribute('disabled')) return false;
  if (el.getAttribute('aria-disabled') === 'true') return false;
  return true;
}

function getFocusableItems(root: HTMLElement): HTMLElement[] {
  return Array.from(
    root.querySelectorAll<HTMLElement>('[data-sidenav-item]'),
  ).filter(isFocusable);
}

/** Visible label for type-ahead. Prefers `aria-label`, falls back to textContent. */
function getItemLabel(el: HTMLElement): string {
  const aria = el.getAttribute('aria-label');
  if (aria && aria.trim()) return aria.trim();
  return (el.textContent ?? '').trim();
}

/**
 * Apply roving tabindex. Items that are not focusable (disabled /
 * aria-disabled) are excluded from the tab cycle entirely. Among focusable
 * items, `preferred` (if supplied and focusable) gets tabIndex=0; otherwise
 * the first focusable item does. All other focusable items get tabIndex=-1.
 */
function applyRovingTabindex(root: HTMLElement, preferred?: HTMLElement) {
  const all = Array.from(
    root.querySelectorAll<HTMLElement>('[data-sidenav-item]'),
  );
  const focusables = all.filter(isFocusable);
  if (focusables.length === 0) return;
  const chosen =
    preferred && focusables.includes(preferred) ? preferred : focusables[0];
  for (const el of all) {
    if (!isFocusable(el)) {
      // Disabled items: make them non-tabbable but don't fight any
      // disabled-attribute semantics — tabIndex=-1 is harmless either way.
      el.tabIndex = -1;
      continue;
    }
    el.tabIndex = el === chosen ? 0 : -1;
  }
}

export function useKeyboardNav({ onEscape }: UseKeyboardNavOptions = {}) {
  // Type-ahead buffer state. Stored in refs so it survives re-renders
  // without triggering them.
  const typeaheadBufferRef = useRef('');
  const typeaheadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The nav container element, captured via ref callback. We attach a focus
  // listener here so that mouse / programmatic focus changes on nav items
  // keep the roving tabindex in sync.
  const containerElRef = useRef<HTMLDivElement | null>(null);
  const mutationObserverRef = useRef<MutationObserver | null>(null);

  const clearTypeahead = useCallback(() => {
    typeaheadBufferRef.current = '';
    if (typeaheadTimerRef.current) {
      clearTimeout(typeaheadTimerRef.current);
      typeaheadTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (typeaheadTimerRef.current) {
        clearTimeout(typeaheadTimerRef.current);
      }
      if (mutationObserverRef.current) {
        mutationObserverRef.current.disconnect();
      }
    };
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const nav = e.currentTarget;
      const key = e.key;

      if (key === 'Escape') {
        if (onEscape) {
          onEscape();
          e.preventDefault();
        }
        clearTypeahead();
        return;
      }

      // Don't hijack keystrokes aimed at a text field (e.g. the nav search
      // input). Arrow navigation, Home/End, and type-ahead should all be
      // forwarded to the input so users can type normally.
      const eventTarget = e.target as HTMLElement | null;
      if (eventTarget) {
        const tag = eventTarget.tagName;
        const isEditable =
          tag === 'INPUT' ||
          tag === 'TEXTAREA' ||
          tag === 'SELECT' ||
          eventTarget.isContentEditable;
        if (isEditable) return;
      }

      const items = getFocusableItems(nav);
      if (items.length === 0) return;

      const active = document.activeElement as HTMLElement | null;
      const activeIsInNav = !!active && nav.contains(active);
      const currentIndex = activeIsInNav && active ? items.indexOf(active) : -1;

      const focusAt = (idx: number) => {
        const target = items[idx];
        if (!target) return;
        target.focus();
        applyRovingTabindex(nav, target);
      };

      if (key === 'ArrowDown') {
        e.preventDefault();
        clearTypeahead();
        // Focus outside nav -> first item. Otherwise clamp to last.
        const next = currentIndex < 0 ? 0 : Math.min(items.length - 1, currentIndex + 1);
        focusAt(next);
        return;
      }

      if (key === 'ArrowUp') {
        e.preventDefault();
        clearTypeahead();
        // Focus outside nav -> last item. Otherwise clamp to first.
        const next = currentIndex < 0 ? items.length - 1 : Math.max(0, currentIndex - 1);
        focusAt(next);
        return;
      }

      if (key === 'Home') {
        e.preventDefault();
        clearTypeahead();
        focusAt(0);
        return;
      }

      if (key === 'End') {
        e.preventDefault();
        clearTypeahead();
        focusAt(items.length - 1);
        return;
      }

      if (key === 'ArrowRight' || key === 'ArrowLeft') {
        // Expand / collapse the focused section if it is a section toggle
        // (has aria-expanded). Otherwise no-op.
        if (currentIndex < 0) return;
        const focused = items[currentIndex];
        const expandedAttr = focused.getAttribute('aria-expanded');
        if (expandedAttr === null) return;
        const isExpanded = expandedAttr === 'true';

        // We use `.click()` here to reuse the section toggle's existing
        // onClick handler (React state update). This is acceptable for
        // buttons: keyboard activation of a <button> semantically *is* a
        // click, so synthesising one has no functional difference from a
        // user pressing Enter/Space on that button. Avoids coupling the
        // hook to SideNavSection's internal state management.
        if (key === 'ArrowRight' && !isExpanded) {
          e.preventDefault();
          clearTypeahead();
          focused.click();
        } else if (key === 'ArrowLeft' && isExpanded) {
          e.preventDefault();
          clearTypeahead();
          focused.click();
        }
        return;
      }

      // Type-ahead. Only handle single printable characters (length 1,
      // excluding modifiers). Modifier keys alone have key.length > 1
      // (e.g. "Shift"), so the length check is sufficient to exclude them.
      // We still skip if Ctrl/Alt/Meta are held so we don't interfere with
      // browser / OS shortcuts.
      if (key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
        // Ignore pure whitespace (space is Enter/Space activation for
        // buttons; let the browser handle it).
        if (key === ' ') return;

        const ch = key.toLowerCase();
        const prev = typeaheadBufferRef.current;
        // Standard WAI-ARIA behaviour: if the same character is pressed
        // repeatedly with no other chars in between, treat each press as a
        // single-char cycle through matches rather than accumulating.
        const isRepeatChar = prev.length > 0 && prev.split('').every((c) => c === ch);
        typeaheadBufferRef.current = isRepeatChar ? ch : prev + ch;
        const buf = typeaheadBufferRef.current;

        // Reset the buffer timer.
        if (typeaheadTimerRef.current) clearTimeout(typeaheadTimerRef.current);
        typeaheadTimerRef.current = setTimeout(() => {
          typeaheadBufferRef.current = '';
          typeaheadTimerRef.current = null;
        }, TYPEAHEAD_TIMEOUT_MS);

        // Search starting from the item after the current one, wrapping.
        // For single-char (or repeat-char cycles), advance past the current
        // item so repeated presses cycle through matches. For multi-char
        // accumulation, also consider the current item first so a prefix
        // that matches the focused label doesn't jump away.
        const n = items.length;
        const singleChar = buf.length === 1;
        const startAt = currentIndex < 0 ? -1 : currentIndex;

        if (!singleChar && currentIndex >= 0) {
          const label = getItemLabel(items[currentIndex]).toLowerCase();
          if (label.startsWith(buf)) {
            e.preventDefault();
            applyRovingTabindex(nav, items[currentIndex]);
            return;
          }
        }

        for (let i = 1; i <= n; i++) {
          const idx = ((startAt + i) % n + n) % n;
          const label = getItemLabel(items[idx]).toLowerCase();
          if (label.startsWith(buf)) {
            e.preventDefault();
            focusAt(idx);
            return;
          }
        }
      }
    },
    [onEscape, clearTypeahead],
  );

  // Focus-in handler kept stable across renders.
  const onFocusIn = useCallback((e: FocusEvent) => {
    const container = containerElRef.current;
    if (!container) return;
    const target = e.target as HTMLElement | null;
    if (!target || !target.hasAttribute('data-sidenav-item')) return;
    if (!isFocusable(target)) return;
    applyRovingTabindex(container, target);
  }, []);

  // Ref callback: attach listeners and seed roving tabindex whenever the
  // container element changes.
  const containerRef = useCallback((node: HTMLDivElement | null) => {
    // Tear down previous observer / listener if we're swapping nodes.
    const prev = containerElRef.current;
    if (prev) {
      prev.removeEventListener('focusin', onFocusIn as EventListener);
    }
    if (mutationObserverRef.current) {
      mutationObserverRef.current.disconnect();
      mutationObserverRef.current = null;
    }

    containerElRef.current = node;
    if (!node) return;

    // Keep roving tabindex in sync with focus changes that originate from
    // anywhere (mouse clicks, programmatic .focus()).
    node.addEventListener('focusin', onFocusIn as EventListener);

    // Seed initial state.
    applyRovingTabindex(node);

    // Re-seed whenever nav items are added / removed (filtering, expanding
    // sections, switching tabs).
    const observer = new MutationObserver(() => {
      const current = containerElRef.current;
      if (!current) return;
      const active = document.activeElement as HTMLElement | null;
      const preferred =
        active && current.contains(active) && active.hasAttribute('data-sidenav-item')
          ? active
          : undefined;
      applyRovingTabindex(current, preferred);
    });
    observer.observe(node, { childList: true, subtree: true });
    mutationObserverRef.current = observer;
  }, [onFocusIn]);

  return { handleKeyDown, containerRef };
}
