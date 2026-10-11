import { renderHook, act } from '@testing-library/react';
import { useRef } from 'react';
import { usePenTool } from './usePenTool';
import type { LiftedPixels } from './usePixelArtSelection';

function setup(opts?: {
  pixels?: string[];
  width?: number;
  height?: number;
  activeColor?: string;
  selectionContainsCell?: (col: number, row: number) => boolean;
  commitPixels?: (px: string[]) => void;
  emitChange?: (px: string[]) => void;
}) {
  const width = opts?.width ?? 4;
  const height = opts?.height ?? 4;
  const pixels = opts?.pixels ?? new Array(width * height).fill('');
  const activeColor = opts?.activeColor ?? '#ff0000';
  const selectionContainsCell = opts?.selectionContainsCell ?? (() => true);
  const commitPixels = opts?.commitPixels ?? vi.fn();
  const emitChange = opts?.emitChange ?? vi.fn();
  return renderHook(() => {
    const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const liftedPixelsRef = useRef<LiftedPixels | null>(null);
    return {
      pen: usePenTool({
        width,
        height,
        pixels,
        activeColor,
        selection: null,
        selectionContainsCell,
        commitPixels,
        emitChange,
        previewCanvasRef,
        liftedPixelsRef,
      }),
      liftedPixelsRef,
    };
  });
}

describe('usePenTool', () => {
  it('starts with no anchors and null cursor', () => {
    const { result } = setup();
    expect(result.current.pen.penAnchors.current).toEqual([]);
    expect(result.current.pen.penCursor).toBeNull();
    expect(result.current.pen.penDblClickPending.current).toBe(false);
  });

  it('cancelPenPath clears anchors, cursor, and lifted pixels', () => {
    const { result } = setup();
    act(() => {
      result.current.pen.penAnchors.current = [[1, 1], [2, 2]];
      result.current.pen.setPenCursor([3, 3]);
      result.current.liftedPixelsRef.current = {
        colors: [], x1: 0, y1: 0, x2: 0, y2: 0,
      };
    });
    act(() => result.current.pen.cancelPenPath());
    expect(result.current.pen.penAnchors.current).toEqual([]);
    expect(result.current.pen.penCursor).toBeNull();
    expect(result.current.liftedPixelsRef.current).toBeNull();
  });

  it('commitPenPath with fewer than 2 anchors only clears state (no commit)', () => {
    const commitPixels = vi.fn();
    const emitChange = vi.fn();
    const { result } = setup({ commitPixels, emitChange });
    act(() => { result.current.pen.penAnchors.current = [[1, 1]]; });
    act(() => result.current.pen.commitPenPath(false));
    expect(commitPixels).not.toHaveBeenCalled();
    expect(emitChange).not.toHaveBeenCalled();
    expect(result.current.pen.penAnchors.current).toEqual([]);
  });

  it('commitPenPath with 2 anchors draws a bresenham line and commits', () => {
    const commitPixels = vi.fn();
    const emitChange = vi.fn();
    const { result } = setup({ width: 4, height: 4, commitPixels, emitChange, activeColor: '#0000ff' });
    act(() => { result.current.pen.penAnchors.current = [[0, 0], [3, 0]]; });
    act(() => result.current.pen.commitPenPath(false));
    expect(commitPixels).toHaveBeenCalledTimes(1);
    expect(emitChange).toHaveBeenCalledTimes(1);
    const next = commitPixels.mock.calls[0][0];
    // Row 0 should be fully painted #0000ff (0,0)->(3,0)
    expect(next[0]).toBe('#0000ff');
    expect(next[1]).toBe('#0000ff');
    expect(next[2]).toBe('#0000ff');
    expect(next[3]).toBe('#0000ff');
    // Anchors cleared after commit
    expect(result.current.pen.penAnchors.current).toEqual([]);
  });

  it('commitPenPath with closeShape=true connects last anchor back to first', () => {
    const commitPixels = vi.fn();
    const { result } = setup({ width: 4, height: 4, commitPixels, activeColor: '#00ff00' });
    act(() => {
      result.current.pen.penAnchors.current = [[0, 0], [3, 0], [3, 3]];
    });
    act(() => result.current.pen.commitPenPath(true));
    const next = commitPixels.mock.calls[0][0];
    // Close-segment from (3,3) back to (0,0) should paint the diagonal
    expect(next[0]).toBe('#00ff00'); // (0,0)
    expect(next[4 * 3 + 3]).toBe('#00ff00'); // (3,3)
  });
});
