import { useCallback, useRef, useState } from 'react';
import type React from 'react';
import { bresenhamLine, maskToSelection, type PixelArtSelection } from './pixelArtUtils';
import type { LiftedPixels } from './usePixelArtSelection';

export interface UsePenToolParams {
  width: number;
  height: number;
  pixels: string[];
  activeColor: string;
  selection: PixelArtSelection | null;
  selectionContainsCell: (col: number, row: number) => boolean;
  commitPixels: (px: string[]) => void;
  emitChange: (px: string[]) => void;
  previewCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  /** Selection-lift ref — cancelPenPath clears it to preserve the pre-refactor behaviour
   *  where switching tools via cancelPenPath also dropped any lifted marquee pixels. */
  liftedPixelsRef: React.MutableRefObject<LiftedPixels | null>;
}

export interface UsePenToolResult {
  /** Anchor cells placed so far (mutable by pointer handlers). */
  penAnchors: React.MutableRefObject<Array<[number, number]>>;
  /** Current cursor cell while hovering with pen active. Used only to trigger re-renders. */
  penCursor: [number, number] | null;
  setPenCursor: React.Dispatch<React.SetStateAction<[number, number] | null>>;
  /** True between the dblclick fire and the ~300ms debounce window. */
  penDblClickPending: React.MutableRefObject<boolean>;
  /** Drop the in-progress pen path and clear preview/cursor state. */
  cancelPenPath: () => void;
  /** Commit the in-progress pen path as bresenham lines, optionally closing back to the first anchor. */
  commitPenPath: (closeShape?: boolean) => void;
}

/**
 * Owns the pen-tool state: anchor list, cursor cell, double-click debounce, and
 * the commit/cancel operations that translate anchors into bresenham lines.
 */
export function usePenTool({
  width,
  height,
  pixels,
  activeColor,
  selection,
  selectionContainsCell,
  commitPixels,
  emitChange,
  previewCanvasRef,
  liftedPixelsRef,
}: UsePenToolParams): UsePenToolResult {
  const penAnchors = useRef<Array<[number, number]>>([]);
  const [penCursor, setPenCursor] = useState<[number, number] | null>(null);
  const penDblClickPending = useRef(false);

  const clearPreview = useCallback(() => {
    if (previewCanvasRef.current) {
      const ctx = previewCanvasRef.current.getContext('2d');
      ctx?.clearRect(0, 0, previewCanvasRef.current.width, previewCanvasRef.current.height);
    }
  }, [previewCanvasRef]);

  const cancelPenPath = useCallback(() => {
    penAnchors.current = [];
    setPenCursor(null);
    liftedPixelsRef.current = null;
    clearPreview();
  }, [clearPreview, liftedPixelsRef]);

  const commitPenPath = useCallback(
    (closeShape = false) => {
      const anchors = penAnchors.current;
      if (anchors.length < 2) {
        penAnchors.current = [];
        setPenCursor(null);
        clearPreview();
        return;
      }
      const segments = closeShape ? [...anchors, anchors[0]] : anchors;
      const keepInside = selectionContainsCell(anchors[0][0], anchors[0][1]);
      const next = [...pixels];
      for (let i = 0; i < segments.length - 1; i++) {
        const [x0, y0] = segments[i];
        const [x1, y1] = segments[i + 1];
        for (const [lx, ly] of bresenhamLine(x0, y0, x1, y1)) {
          if (lx >= 0 && lx < width && ly >= 0 && ly < height) {
            next[ly * width + lx] = activeColor;
          }
        }
      }
      const masked = maskToSelection(next, pixels, width, selection, keepInside);
      commitPixels(masked);
      emitChange(masked);
      penAnchors.current = [];
      setPenCursor(null);
      clearPreview();
    },
    [pixels, width, height, activeColor, emitChange, selection, selectionContainsCell, commitPixels, clearPreview],
  );

  return {
    penAnchors,
    penCursor,
    setPenCursor,
    penDblClickPending,
    cancelPenPath,
    commitPenPath,
  };
}
