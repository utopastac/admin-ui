import { useCallback, useEffect, useRef, useState } from 'react';
import type React from 'react';
import {
  MARCHING_ANTS_STEPS,
  MARCHING_ANTS_INTERVAL_MS,
  type PixelArtSelection,
} from './pixelArtUtils';
import { drawSelectionOverlay } from './pixelArtCanvas';

/** The rectangular slice of pixels lifted while a marquee selection is being moved. */
export interface LiftedPixels {
  colors: (string | undefined)[];
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface UsePixelArtSelectionParams {
  width: number;
  cellSize: number;
  selectionCanvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export interface UsePixelArtSelectionResult {
  selection: PixelArtSelection | null;
  setSelection: React.Dispatch<React.SetStateAction<PixelArtSelection | null>>;
  marchingAntsOffset: number;

  /** 'draw' while sizing a new marquee, 'move' while dragging a lifted selection. */
  selectionDragMode: React.MutableRefObject<'draw' | 'move' | null>;
  /** Cell where the current selection drag began. */
  selectionDragStart: React.MutableRefObject<[number, number] | null>;
  /** Pixels lifted out of the canvas for the duration of a selection move. */
  liftedPixels: React.MutableRefObject<LiftedPixels | null>;
  /** Pixel state with the lifted region cleared — the base for preview composites. */
  basePixelsAfterLift: React.MutableRefObject<string[] | null>;
  /** Running [dx, dy] offset of the in-progress selection move. */
  selectionMoveOffset: React.MutableRefObject<[number, number]>;
  /** Whether the current brush/shape stroke started inside the selection. */
  strokeInsideSelection: React.MutableRefObject<boolean>;

  /**
   * Geometric hit test — returns whether the given cell is inside the current selection.
   * Handles rect / ellipse / free-cells ("wand") selection shapes.
   */
  selectionContainsCell: (col: number, row: number) => boolean;
}

/**
 * Owns everything about the marquee selection: its shape, the marching-ants
 * animation, the drag-state refs used while resizing or moving it, and the
 * hit-test helper. Also redraws the selection overlay canvas when selection
 * geometry or marching-ants offset changes.
 */
export function usePixelArtSelection({
  width,
  cellSize,
  selectionCanvasRef,
}: UsePixelArtSelectionParams): UsePixelArtSelectionResult {
  const [selection, setSelection] = useState<PixelArtSelection | null>(null);
  const [marchingAntsOffset, setMarchingAntsOffset] = useState(0);

  const selectionDragMode = useRef<'draw' | 'move' | null>(null);
  const selectionDragStart = useRef<[number, number] | null>(null);
  const liftedPixels = useRef<LiftedPixels | null>(null);
  const basePixelsAfterLift = useRef<string[] | null>(null);
  const selectionMoveOffset = useRef<[number, number]>([0, 0]);
  const strokeInsideSelection = useRef(true);

  const selectionContainsCell = useCallback(
    (col: number, row: number) => {
      if (!selection) return false;
      const minX = Math.min(selection.x1, selection.x2);
      const maxX = Math.max(selection.x1, selection.x2);
      const minY = Math.min(selection.y1, selection.y2);
      const maxY = Math.max(selection.y1, selection.y2);
      if (col < minX || col > maxX || row < minY || row > maxY) return false;
      if (selection.shape === 'rect') return true;
      if (selection.shape === 'cells') return selection.cells.has(row * width + col);
      // ellipse
      const cx = (minX + maxX) / 2;
      const cy = (minY + maxY) / 2;
      const rx = (maxX - minX) / 2 + 0.5;
      const ry = (maxY - minY) / 2 + 0.5;
      if (rx <= 0 || ry <= 0) return true;
      const dx = col - cx, dy = row - cy;
      return (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1;
    },
    [selection, width],
  );

  // Marching ants animation — only runs while a selection exists.
  useEffect(() => {
    if (!selection) return;
    const id = setInterval(() => {
      setMarchingAntsOffset(prev => (prev + 1) % MARCHING_ANTS_STEPS);
    }, MARCHING_ANTS_INTERVAL_MS);
    return () => clearInterval(id);
  }, [selection]);

  // Redraw the selection overlay canvas when anything that affects it changes.
  useEffect(() => {
    if (!selectionCanvasRef.current) return;
    if (!selection) {
      const ctx = selectionCanvasRef.current.getContext('2d');
      ctx?.clearRect(0, 0, selectionCanvasRef.current.width, selectionCanvasRef.current.height);
      return;
    }
    drawSelectionOverlay(selectionCanvasRef.current, selection, cellSize, marchingAntsOffset, width);
  }, [selection, cellSize, marchingAntsOffset, width, selectionCanvasRef]);

  return {
    selection,
    setSelection,
    marchingAntsOffset,
    selectionDragMode,
    selectionDragStart,
    liftedPixels,
    basePixelsAfterLift,
    selectionMoveOffset,
    strokeInsideSelection,
    selectionContainsCell,
  };
}
