import { useCallback, useEffect, useRef } from 'react';
import type React from 'react';
import {
  BRUSH_OFFSETS,
  applyBrush,
  bresenhamLine,
  constrainLineTo45,
  constrainToSquare,
  floodFill,
  floodSelect,
  getShapeCells,
  isShapeTool,
  maskToSelection,
  type PixelArtFillMode,
  type PixelArtBrushSize,
  type PixelArtSelection,
} from './pixelArtUtils';
import { drawPreview, drawAnchorDots } from './pixelArtCanvas';
import type { LiftedPixels } from './usePixelArtSelection';
import type { PixelArtTool } from './PixelArtEditor';

export interface FillModes {
  rect: PixelArtFillMode;
  circle: PixelArtFillMode;
  triangle: PixelArtFillMode;
  star: PixelArtFillMode;
}

export interface UsePixelArtPointerHandlersParams {
  // Base state
  disabled: boolean;
  activeTool: PixelArtTool;
  brushSize: PixelArtBrushSize;
  activeColor: string;
  fillModes: FillModes;
  marqueeShape: 'rect' | 'ellipse' | 'wand';

  // Tool + color setters (eyedropper switches to paint and picks a color)
  setActiveTool: (t: PixelArtTool) => void;
  setActiveColor: (c: string) => void;
  setIndependentHue: (h: number | null) => void;

  // Canvas geometry
  pixels: string[];
  width: number;
  height: number;
  cellSize: number;
  committedCanvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  previewCanvasRef: React.RefObject<HTMLCanvasElement | null>;

  // History ops
  commitPixels: (px: string[]) => void;
  dispatchPixels: (px: string[]) => void;
  emitChange: (px: string[]) => void;

  // Selection
  selection: PixelArtSelection | null;
  setSelection: React.Dispatch<React.SetStateAction<PixelArtSelection | null>>;
  selectionContainsCell: (col: number, row: number) => boolean;
  selectionDragMode: React.MutableRefObject<'draw' | 'move' | null>;
  selectionDragStart: React.MutableRefObject<[number, number] | null>;
  liftedPixels: React.MutableRefObject<LiftedPixels | null>;
  basePixelsAfterLift: React.MutableRefObject<string[] | null>;
  selectionMoveOffset: React.MutableRefObject<[number, number]>;
  strokeInsideSelection: React.MutableRefObject<boolean>;

  // Pen tool
  penAnchors: React.MutableRefObject<Array<[number, number]>>;
  setPenCursor: React.Dispatch<React.SetStateAction<[number, number] | null>>;
  penDblClickPending: React.MutableRefObject<boolean>;
  commitPenPath: (closeShape?: boolean) => void;

  /** Called on mousedown to dismiss any tool popovers (brush/shape/marquee). */
  closePopovers: () => void;
}

export interface UsePixelArtPointerHandlersResult {
  handleMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  handleMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  handleMouseUp: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  handleMouseLeave: () => void;
  handleDoubleClick: () => void;
}

/**
 * Owns the canvas pointer handlers: mouse down/move/up/leave and the pen-tool double-click.
 * This is the behavioural core of the editor — all tool branching (paint/eraser/fill/
 * eyedropper/shape/pen/marquee) lives here.
 */
export function usePixelArtPointerHandlers({
  disabled,
  activeTool,
  brushSize,
  activeColor,
  fillModes,
  marqueeShape,
  setActiveTool,
  setActiveColor,
  setIndependentHue,
  pixels,
  width,
  height,
  cellSize,
  committedCanvasRef,
  previewCanvasRef,
  commitPixels,
  dispatchPixels,
  emitChange,
  selection,
  setSelection,
  selectionContainsCell,
  selectionDragMode,
  selectionDragStart,
  liftedPixels,
  basePixelsAfterLift,
  selectionMoveOffset,
  strokeInsideSelection,
  penAnchors,
  setPenCursor,
  penDblClickPending,
  commitPenPath,
  closePopovers,
}: UsePixelArtPointerHandlersParams): UsePixelArtPointerHandlersResult {
  const isDragging = useRef(false);
  const dragStart = useRef<[number, number] | null>(null);
  // Last cell the cursor was over during a drag. Used by the shift key listener
  // to re-render the preview without requiring mouse movement.
  const lastHoverCell = useRef<[number, number] | null>(null);
  const { rect: rectFillMode, circle: circleFillMode, triangle: triangleFillMode, star: starFillMode } = fillModes;

  // Computes the current drag's end point based on whether shift is held and
  // which tool is active. Lines snap to 0°/45°/90°; shapes and rect/ellipse
  // selections snap to square.
  const applyShiftConstraint = useCallback(
    (start: [number, number], end: [number, number], shiftKey: boolean, tool: PixelArtTool): [number, number] => {
      if (!shiftKey) return end;
      if (tool === 'line') return constrainLineTo45(start, end);
      return constrainToSquare(start, end);
    },
    [],
  );

  // Re-renders the in-progress shape preview or selection rectangle for the
  // given cursor cell and shift state. Safe to call when no drag is in progress
  // (returns immediately).
  const renderShiftAwarePreview = useCallback(
    (col: number, row: number, shiftKey: boolean) => {
      if (!isDragging.current) return;
      if (activeTool === 'marquee' && selectionDragMode.current === 'draw' && selectionDragStart.current) {
        const [endCol, endRow] = shiftKey
          ? constrainToSquare(selectionDragStart.current, [col, row])
          : [col, row];
        setSelection(prev => prev ? { ...prev, x2: endCol, y2: endRow } : null);
        return;
      }
      if (isShapeTool(activeTool) && dragStart.current && previewCanvasRef.current) {
        const endPoint = applyShiftConstraint(dragStart.current, [col, row], shiftKey, activeTool);
        const cells = getShapeCells(activeTool, dragStart.current, endPoint, {
          rect: rectFillMode, circle: circleFillMode, triangle: triangleFillMode, star: starFillMode,
        });
        drawPreview(previewCanvasRef.current, cells, activeColor, cellSize);
      }
    },
    [
      activeTool, rectFillMode, circleFillMode, triangleFillMode, starFillMode,
      activeColor, cellSize, setSelection, previewCanvasRef,
      selectionDragMode, selectionDragStart, applyShiftConstraint,
    ],
  );

  // Re-render when shift is pressed or released mid-drag so the user doesn't
  // need to move the cursor to see the constraint apply/release.
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== 'Shift') return;
      const cell = lastHoverCell.current;
      if (!cell) return;
      renderShiftAwarePreview(cell[0], cell[1], e.type === 'keydown');
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('keyup', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('keyup', handleKey);
    };
  }, [renderShiftAwarePreview]);

  const getCellFromEvent = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>): [number, number] | null => {
      const canvas = committedCanvasRef.current;
      if (!canvas) return null;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const col = Math.floor(x / cellSize);
      const row = Math.floor(y / cellSize);
      if (col < 0 || col >= width || row < 0 || row >= height) return null;
      return [col, row];
    },
    [cellSize, width, height, committedCanvasRef],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (disabled) return;
      if (e.button !== 0) return;
      e.preventDefault();
      const cell = getCellFromEvent(e);
      if (!cell) return;
      const [col, row] = cell;

      closePopovers();

      if (activeTool === 'pen') {
        if (penDblClickPending.current) return;
        const anchors = penAnchors.current;
        if (anchors.length > 0) {
          const [fx, fy] = anchors[0];
          const dist = Math.abs(col - fx) + Math.abs(row - fy);
          if (dist <= 1) {
            commitPenPath(true);
            return;
          }
        }
        anchors.push([col, row]);
        setPenCursor([col, row]);
        return;
      }

      if (activeTool === 'marquee') {
        if (marqueeShape === 'wand') {
          const cells = floodSelect(pixels, width, height, col, row);
          if (cells.size > 0) {
            let mnX = Infinity, mnY = Infinity, mxX = -Infinity, mxY = -Infinity;
            for (const idx of cells) {
              const c = idx % width, r = Math.floor(idx / width);
              if (c < mnX) mnX = c; if (c > mxX) mxX = c;
              if (r < mnY) mnY = r; if (r > mxY) mxY = r;
            }
            setSelection({ shape: 'cells', cells, x1: mnX, y1: mnY, x2: mxX, y2: mxY });
          } else {
            setSelection(null);
          }
          isDragging.current = false;
          return;
        }

        if (selection && selectionContainsCell(col, row)) {
          selectionDragMode.current = 'move';
          selectionDragStart.current = [col, row];
          selectionMoveOffset.current = [0, 0];
          const minX = Math.min(selection.x1, selection.x2);
          const maxX = Math.max(selection.x1, selection.x2);
          const minY = Math.min(selection.y1, selection.y2);
          const maxY = Math.max(selection.y1, selection.y2);
          const colors: (string | undefined)[] = [];
          const next = [...pixels];
          for (let r = minY; r <= maxY; r++) {
            for (let c = minX; c <= maxX; c++) {
              if (selectionContainsCell(c, r)) {
                colors.push(pixels[r * width + c]);
                next[r * width + c] = '';
              } else {
                colors.push(undefined);
              }
            }
          }
          liftedPixels.current = { colors, x1: minX, y1: minY, x2: maxX, y2: maxY };
          basePixelsAfterLift.current = next;
          dispatchPixels(next);
        } else {
          selectionDragMode.current = 'draw';
          selectionDragStart.current = [col, row];
          setSelection({ shape: marqueeShape as 'rect' | 'ellipse', x1: col, y1: row, x2: col, y2: row });
          liftedPixels.current = null;
          basePixelsAfterLift.current = null;
        }
        isDragging.current = true;
        return;
      }

      isDragging.current = true;

      if (activeTool === 'paint') {
        strokeInsideSelection.current = selectionContainsCell(col, row);
        const next = maskToSelection(applyBrush(pixels, col, row, activeColor, brushSize, width, height), pixels, width, selection, strokeInsideSelection.current);
        commitPixels(next);
        emitChange(next);
      } else if (activeTool === 'eraser') {
        strokeInsideSelection.current = selectionContainsCell(col, row);
        const next = maskToSelection(applyBrush(pixels, col, row, '', brushSize, width, height), pixels, width, selection, strokeInsideSelection.current);
        commitPixels(next);
        emitChange(next);
      } else if (activeTool === 'fill') {
        if (selection) {
          if (selectionContainsCell(col, row)) {
            const minX = Math.min(selection.x1, selection.x2);
            const maxX = Math.max(selection.x1, selection.x2);
            const minY = Math.min(selection.y1, selection.y2);
            const maxY = Math.max(selection.y1, selection.y2);
            const next = [...pixels];
            for (let r = minY; r <= maxY; r++) {
              for (let c = minX; c <= maxX; c++) {
                if (selectionContainsCell(c, r)) next[r * width + c] = activeColor;
              }
            }
            commitPixels(next);
            emitChange(next);
          } else {
            const next = maskToSelection(floodFill(pixels, width, height, col, row, activeColor), pixels, width, selection, false);
            commitPixels(next);
            emitChange(next);
          }
        } else {
          const next = floodFill(pixels, width, height, col, row, activeColor);
          commitPixels(next);
          emitChange(next);
        }
        isDragging.current = false;
      } else if (activeTool === 'eyedropper') {
        const color = pixels[row * width + col];
        if (color) { setActiveColor(color); setIndependentHue(null); }
        setActiveTool('paint');
        isDragging.current = false;
      } else if (isShapeTool(activeTool)) {
        dragStart.current = [col, row];
        strokeInsideSelection.current = selectionContainsCell(col, row);
      }
    },
    [
      disabled, activeTool, brushSize, activeColor, pixels, width, height,
      getCellFromEvent, emitChange, commitPenPath, selection, selectionContainsCell,
      marqueeShape, closePopovers, setSelection, setActiveColor, setIndependentHue, setActiveTool,
      commitPixels, dispatchPixels, penAnchors, penDblClickPending, setPenCursor,
      selectionDragMode, selectionDragStart, selectionMoveOffset, liftedPixels,
      basePixelsAfterLift, strokeInsideSelection,
    ],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (disabled) return;
      const cell = getCellFromEvent(e);
      if (!cell) return;
      const [col, row] = cell;

      if (activeTool === 'pen') {
        setPenCursor([col, row]);
        const anchors = penAnchors.current;
        if (anchors.length > 0 && previewCanvasRef.current) {
          const cells: Array<[number, number]> = [];
          for (let i = 0; i < anchors.length - 1; i++) {
            cells.push(...bresenhamLine(anchors[i][0], anchors[i][1], anchors[i + 1][0], anchors[i + 1][1]));
          }
          const last = anchors[anchors.length - 1];
          cells.push(...bresenhamLine(last[0], last[1], col, row));
          drawPreview(previewCanvasRef.current, cells, activeColor, cellSize);
          drawAnchorDots(previewCanvasRef.current, anchors, cellSize);
        }
        return;
      }

      if (activeTool === 'paint' || activeTool === 'eraser') {
        const previewCells = BRUSH_OFFSETS[brushSize].map(
          ([dc, dr]) => [col + dc, row + dr] as [number, number],
        ).filter(([c, r]) => c >= 0 && c < width && r >= 0 && r < height);
        if (previewCanvasRef.current) {
          const previewColor = activeTool === 'eraser' ? '#ff000033' : activeColor;
          drawPreview(previewCanvasRef.current, previewCells, previewColor, cellSize);
        }
      }

      if (activeTool === 'marquee' && isDragging.current && selectionDragStart.current) {
        if (selectionDragMode.current === 'draw') {
          lastHoverCell.current = [col, row];
          renderShiftAwarePreview(col, row, e.shiftKey);
        } else if (selectionDragMode.current === 'move' && liftedPixels.current) {
          const [startCol, startRow] = selectionDragStart.current;
          const dx = col - startCol;
          const dy = row - startRow;
          selectionMoveOffset.current = [dx, dy];
          const lifted = liftedPixels.current;
          setSelection(prev => prev ? { ...prev, x1: lifted.x1 + dx, y1: lifted.y1 + dy, x2: lifted.x2 + dx, y2: lifted.y2 + dy } : null);
          if (previewCanvasRef.current) {
            const selW = lifted.x2 - lifted.x1 + 1;
            const ctx = previewCanvasRef.current.getContext('2d');
            if (ctx) {
              ctx.clearRect(0, 0, previewCanvasRef.current.width, previewCanvasRef.current.height);
              ctx.globalAlpha = 0.85;
              lifted.colors.forEach((color, i) => {
                if (color === undefined || !color) return;
                const localCol = i % selW;
                const localRow = Math.floor(i / selW);
                const destCol = lifted.x1 + localCol + dx;
                const destRow = lifted.y1 + localRow + dy;
                if (destCol >= 0 && destCol < width && destRow >= 0 && destRow < height) {
                  ctx.fillStyle = color;
                  ctx.fillRect(destCol * cellSize, destRow * cellSize, cellSize, cellSize);
                }
              });
              ctx.globalAlpha = 1;
            }
          }
        }
        return;
      }

      if (!isDragging.current) return;

      if (activeTool === 'paint') {
        const next = maskToSelection(applyBrush(pixels, col, row, activeColor, brushSize, width, height), pixels, width, selection, strokeInsideSelection.current);
        dispatchPixels(next);
        emitChange(next);
      } else if (activeTool === 'eraser') {
        const next = maskToSelection(applyBrush(pixels, col, row, '', brushSize, width, height), pixels, width, selection, strokeInsideSelection.current);
        dispatchPixels(next);
        emitChange(next);
      } else if (isShapeTool(activeTool) && dragStart.current && previewCanvasRef.current) {
        lastHoverCell.current = [col, row];
        renderShiftAwarePreview(col, row, e.shiftKey);
      }
    },
    [
      disabled, activeTool, rectFillMode, circleFillMode, triangleFillMode, starFillMode,
      brushSize, activeColor, pixels, width, height, getCellFromEvent, emitChange, cellSize,
      selection, setSelection, selectionDragStart, selectionDragMode, selectionMoveOffset,
      liftedPixels, strokeInsideSelection, dispatchPixels, penAnchors, setPenCursor,
      previewCanvasRef, renderShiftAwarePreview,
    ],
  );

  // Writes `cells` to the canvas in `activeColor`, constrained to the same side
  // of the selection as the stroke started on (tracked by strokeInsideSelection).
  const commitCells = useCallback(
    (cells: [number, number][]) => {
      const next = [...pixels];
      for (const [x, y] of cells) {
        if (x >= 0 && x < width && y >= 0 && y < height) next[y * width + x] = activeColor;
      }
      const masked = maskToSelection(next, pixels, width, selection, strokeInsideSelection.current);
      commitPixels(masked);
      emitChange(masked);
    },
    [pixels, width, height, activeColor, selection, emitChange, commitPixels, strokeInsideSelection],
  );

  const handleMouseUp = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDragging.current || disabled) return;

      if (activeTool === 'marquee') {
        isDragging.current = false;
        lastHoverCell.current = null;
        if (selectionDragMode.current === 'move' && liftedPixels.current) {
          const lifted = liftedPixels.current;
          const [dx, dy] = selectionMoveOffset.current;
          const selW = lifted.x2 - lifted.x1 + 1;
          const next = [...(basePixelsAfterLift.current ?? pixels)];
          lifted.colors.forEach((color, i) => {
            if (color === undefined || !color) return;
            const localCol = i % selW;
            const localRow = Math.floor(i / selW);
            const destCol = lifted.x1 + localCol + dx;
            const destRow = lifted.y1 + localRow + dy;
            if (destCol >= 0 && destCol < width && destRow >= 0 && destRow < height) {
              next[destRow * width + destCol] = color;
            }
          });
          commitPixels(next);
          emitChange(next);
          liftedPixels.current = null;
          basePixelsAfterLift.current = null;
          if (previewCanvasRef.current) {
            const ctx = previewCanvasRef.current.getContext('2d');
            ctx?.clearRect(0, 0, previewCanvasRef.current.width, previewCanvasRef.current.height);
          }
        } else if (selectionDragMode.current === 'draw') {
          const cell = getCellFromEvent(e);
          if (cell) {
            const [col, row] = cell;
            if (selectionDragStart.current &&
                selectionDragStart.current[0] === col &&
                selectionDragStart.current[1] === row) {
              setSelection(null);
            }
          }
        }
        selectionDragMode.current = null;
        selectionDragStart.current = null;
        return;
      }

      isDragging.current = false;

      const cell = getCellFromEvent(e);

      if (previewCanvasRef.current) {
        const ctx = previewCanvasRef.current.getContext('2d');
        ctx?.clearRect(0, 0, previewCanvasRef.current.width, previewCanvasRef.current.height);
      }

      if (!cell) {
        dragStart.current = null;
        return;
      }
      const [col, row] = cell;

      if (isShapeTool(activeTool) && dragStart.current) {
        const endPoint = applyShiftConstraint(dragStart.current, [col, row], e.shiftKey, activeTool);
        commitCells(getShapeCells(activeTool, dragStart.current, endPoint, {
          rect: rectFillMode, circle: circleFillMode, triangle: triangleFillMode, star: starFillMode,
        }));
      }

      dragStart.current = null;
      lastHoverCell.current = null;
    },
    [
      disabled, activeTool, rectFillMode, circleFillMode, triangleFillMode, starFillMode,
      getCellFromEvent, emitChange, pixels, width, height, commitCells, commitPixels,
      previewCanvasRef, setSelection, basePixelsAfterLift, liftedPixels, selectionDragMode,
      selectionDragStart, selectionMoveOffset, applyShiftConstraint,
    ],
  );

  const handleMouseLeave = useCallback(() => {
    if (activeTool === 'marquee' && isDragging.current && selectionDragMode.current === 'move' && liftedPixels.current) {
      const lifted = liftedPixels.current;
      const selW = lifted.x2 - lifted.x1 + 1;
      const next = [...(basePixelsAfterLift.current ?? pixels)];
      lifted.colors.forEach((color, i) => {
        if (color === undefined) return;
        const localCol = i % selW;
        const localRow = Math.floor(i / selW);
        next[(lifted.y1 + localRow) * width + (lifted.x1 + localCol)] = color;
      });
      dispatchPixels(next);
      liftedPixels.current = null;
      basePixelsAfterLift.current = null;
      setSelection(prev => prev ? { ...prev, x1: lifted.x1, y1: lifted.y1, x2: lifted.x2, y2: lifted.y2 } : null);
    }
    isDragging.current = false;
    selectionDragMode.current = null;
    lastHoverCell.current = null;

    if (previewCanvasRef.current) {
      const ctx = previewCanvasRef.current.getContext('2d');
      ctx?.clearRect(0, 0, previewCanvasRef.current.width, previewCanvasRef.current.height);
    }
  }, [
    activeTool, pixels, width, dispatchPixels, previewCanvasRef, setSelection,
    basePixelsAfterLift, liftedPixels, selectionDragMode,
  ]);

  const handleDoubleClick = useCallback(() => {
    if (activeTool !== 'pen') return;
    penDblClickPending.current = true;
    if (penAnchors.current.length > 1) {
      penAnchors.current = penAnchors.current.slice(0, -1);
    }
    commitPenPath(false);
    setTimeout(() => { penDblClickPending.current = false; }, 300);
  }, [activeTool, commitPenPath, penAnchors, penDblClickPending]);

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleDoubleClick,
  };
}
