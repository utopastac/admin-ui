import { renderHook, act } from '@testing-library/react';
import { useRef } from 'react';
import { usePixelArtSelection } from './usePixelArtSelection';
import type { PixelArtSelection } from './pixelArtUtils';

function setup(width = 10, cellSize = 16) {
  return renderHook(() => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const sel = usePixelArtSelection({ width, cellSize, selectionCanvasRef: canvasRef });
    return sel;
  });
}

describe('usePixelArtSelection', () => {
  it('starts with no selection and offset zero', () => {
    const { result } = setup();
    expect(result.current.selection).toBeNull();
    expect(result.current.marchingAntsOffset).toBe(0);
  });

  it('exposes stable refs for drag state', () => {
    const { result } = setup();
    expect(result.current.selectionDragMode.current).toBeNull();
    expect(result.current.liftedPixels.current).toBeNull();
    expect(result.current.basePixelsAfterLift.current).toBeNull();
    expect(result.current.selectionMoveOffset.current).toEqual([0, 0]);
    expect(result.current.strokeInsideSelection.current).toBe(true);
  });

  describe('selectionContainsCell — rect shape', () => {
    const rect: PixelArtSelection = { shape: 'rect', x1: 2, y1: 2, x2: 4, y2: 4 };

    it('returns false when no selection is set', () => {
      const { result } = setup();
      expect(result.current.selectionContainsCell(3, 3)).toBe(false);
    });

    it('returns true for cells inside the rect', () => {
      const { result } = setup();
      act(() => result.current.setSelection(rect));
      expect(result.current.selectionContainsCell(3, 3)).toBe(true);
      expect(result.current.selectionContainsCell(2, 2)).toBe(true);
      expect(result.current.selectionContainsCell(4, 4)).toBe(true);
    });

    it('returns false for cells outside the rect', () => {
      const { result } = setup();
      act(() => result.current.setSelection(rect));
      expect(result.current.selectionContainsCell(1, 3)).toBe(false);
      expect(result.current.selectionContainsCell(5, 3)).toBe(false);
    });
  });

  describe('selectionContainsCell — ellipse shape', () => {
    const ellipse: PixelArtSelection = { shape: 'ellipse', x1: 0, y1: 0, x2: 4, y2: 4 };

    it('returns true for the centre cell', () => {
      const { result } = setup();
      act(() => result.current.setSelection(ellipse));
      expect(result.current.selectionContainsCell(2, 2)).toBe(true);
    });

    it('returns false for corner cells that fall outside the ellipse', () => {
      const { result } = setup();
      act(() => result.current.setSelection(ellipse));
      expect(result.current.selectionContainsCell(0, 0)).toBe(false);
      expect(result.current.selectionContainsCell(4, 4)).toBe(false);
    });
  });

  describe('selectionContainsCell — cells shape (wand)', () => {
    const wand: PixelArtSelection = {
      shape: 'cells',
      cells: new Set([0, 1, 10]),
      x1: 0, y1: 0, x2: 1, y2: 1,
    };

    it('returns true only for cells in the set', () => {
      const { result } = setup(10);
      act(() => result.current.setSelection(wand));
      // index = row * width + col; width = 10
      expect(result.current.selectionContainsCell(0, 0)).toBe(true); // idx 0
      expect(result.current.selectionContainsCell(1, 0)).toBe(true); // idx 1
      expect(result.current.selectionContainsCell(0, 1)).toBe(true); // idx 10
    });
  });

  describe('marching ants animation', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('does not advance offset when there is no selection', () => {
      const { result } = setup();
      act(() => { vi.advanceTimersByTime(500); });
      expect(result.current.marchingAntsOffset).toBe(0);
    });

    it('advances offset while a selection is active', () => {
      const { result } = setup();
      act(() => result.current.setSelection({ shape: 'rect', x1: 0, y1: 0, x2: 2, y2: 2 }));
      act(() => { vi.advanceTimersByTime(500); });
      expect(result.current.marchingAntsOffset).toBeGreaterThan(0);
    });

    it('stops advancing once selection clears', () => {
      const { result } = setup();
      act(() => result.current.setSelection({ shape: 'rect', x1: 0, y1: 0, x2: 2, y2: 2 }));
      act(() => { vi.advanceTimersByTime(500); });
      const offsetBefore = result.current.marchingAntsOffset;
      act(() => result.current.setSelection(null));
      act(() => { vi.advanceTimersByTime(500); });
      expect(result.current.marchingAntsOffset).toBe(offsetBefore);
    });
  });
});
