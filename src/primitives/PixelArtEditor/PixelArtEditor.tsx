import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { Trash2, FileCode, FileImage, Undo2, Redo2, BoxSelect } from 'lucide-react';
import ContextMenu from '@/overlays/ContextMenu';
import Popover from '../Popover';
import styles from './PixelArtEditor.module.css';
import {
  DEFAULT_PALETTE,
  pixelsToSvg,
  type PixelArtFillMode,
  type PixelArtBrushSize,
} from './pixelArtUtils';
import { drawCommitted } from './pixelArtCanvas';
import { pixelsToPngBlob } from './pixelArtPng';
import { usePixelArtHistory } from './usePixelArtHistory';
import { usePixelArtSelection } from './usePixelArtSelection';
import { usePenTool } from './usePenTool';
import { usePixelArtPointerHandlers } from './usePixelArtPointerHandlers';
import PixelArtToolbar from './PixelArtToolbar';

export type PixelArtTool = 'paint' | 'eraser' | 'fill' | 'eyedropper' | 'line' | 'rect' | 'circle' | 'triangle' | 'star' | 'pen' | 'marquee';
export type { PixelArtFillMode, PixelArtBrushSize } from './pixelArtUtils';

export interface PixelArtEditorProps {
  /** Logical canvas width in pixels (number of columns) */
  width: number;
  /** Logical canvas height in pixels (number of rows) */
  height: number;
  /** Current SVG string value */
  value?: string;
  /** Called with full SVG string on every edit */
  onChange?: (svg: string) => void;
  /** Colour swatches shown in toolbar */
  palette?: string[];
  /** If true, renders as a popover trigger instead of inline */
  popover?: boolean;
  /** Width in px for the popover editor panel */
  popoverWidth?: number;
  /** Height in px for the popover trigger preview image (width scales proportionally) */
  triggerHeight?: number;
  disabled?: boolean;
  className?: string;
  offsetX?: number;
  offsetY?: number;
  /** If true, opens the popover immediately on mount */
  defaultOpen?: boolean;
  /** Integer scale factor applied when exporting to PNG. Each logical pixel becomes
   *  `pngExportScale` × `pngExportScale` raster pixels. Defaults to 8. */
  pngExportScale?: number;
  /** Optional list of preset square grid sizes. When provided, a picker button is
   *  rendered in the toolbar; selecting a size resizes the grid to `size × size`
   *  and clears the canvas. The component manages its own size after mount when
   *  this prop is set — `width` seeds the initial size and `height` is ignored.
   *  When omitted, the picker is hidden and `width`/`height` props remain the
   *  source of truth. */
  sizes?: number[];
  /** Fired when the grid size changes via the picker. Consumers that want to
   *  persist the size can observe this callback. */
  onSizeChange?: (width: number, height: number) => void;
}

const PixelArtEditor: React.FC<PixelArtEditorProps> = ({
  width: widthProp,
  height: heightProp,
  value = '',
  onChange,
  palette = DEFAULT_PALETTE,
  popover = false,
  popoverWidth,
  triggerHeight,
  disabled = false,
  className = '',
  offsetX = 0,
  offsetY = 0,
  defaultOpen = false,
  pngExportScale = 8,
  sizes,
  onSizeChange,
}) => {
  // When `sizes` is provided, the component manages grid size internally (seeded
  // from initial width; height is ignored — grids are square in managed mode).
  // When `sizes` is not provided, props are the source of truth (existing API).
  const sizesEnabled = Array.isArray(sizes) && sizes.length > 0;
  const [managedSize, setManagedSize] = useState<number>(widthProp);
  const width = sizesEnabled ? managedSize : widthProp;
  const height = sizesEnabled ? managedSize : heightProp;
  // ── Tool & color state ─────────────────────────────────────────────────────
  const [activeTool, setActiveTool] = useState<PixelArtTool>('paint');
  const [brushSize, setBrushSize] = useState<PixelArtBrushSize>('sm');
  const [lastShape, setLastShape] = useState<'rect' | 'circle' | 'triangle' | 'star'>('rect');
  const [rectFillMode, setRectFillMode] = useState<PixelArtFillMode>('outline');
  const [circleFillMode, setCircleFillMode] = useState<PixelArtFillMode>('outline');
  const [triangleFillMode, setTriangleFillMode] = useState<PixelArtFillMode>('outline');
  const [starFillMode, setStarFillMode] = useState<PixelArtFillMode>('outline');
  const [activeColor, setActiveColor] = useState<string>(palette[0] ?? '#000000');
  const [independentHue, setIndependentHue] = useState<number | null>(null);
  const [customColors, setCustomColors] = useState<string[]>([]);
  const [marqueeShape, setMarqueeShape] = useState<'rect' | 'ellipse' | 'wand'>('rect');

  const [isPopoverOpen, setIsPopoverOpen] = useState(defaultOpen);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  // ── Canvas refs & sizing ────────────────────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(16);
  const committedCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const selectionCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasMounted, setCanvasMounted] = useState(false);
  const committedCanvasCallbackRef = useCallback((el: HTMLCanvasElement | null) => {
    committedCanvasRef.current = el;
    setCanvasMounted(el !== null);
  }, []);

  const triggerRef = useRef<HTMLButtonElement>(null);

  // ── Composition hooks ───────────────────────────────────────────────────────
  const { pixels, canUndo, canRedo, dispatchPixels, commitPixels, undo, redo, emitChange } =
    usePixelArtHistory({ width, height, value, onChange });

  const {
    selection,
    setSelection,
    selectionDragMode,
    selectionDragStart,
    liftedPixels,
    basePixelsAfterLift,
    selectionMoveOffset,
    strokeInsideSelection,
    selectionContainsCell,
  } = usePixelArtSelection({ width, cellSize, selectionCanvasRef });

  const {
    penAnchors,
    setPenCursor,
    penDblClickPending,
    cancelPenPath,
    commitPenPath,
  } = usePenTool({
    width,
    height,
    pixels,
    activeColor,
    selection,
    selectionContainsCell,
    commitPixels,
    emitChange,
    previewCanvasRef,
    liftedPixelsRef: liftedPixels,
  });

  const closePopovers = useCallback(() => { /* toolbar owns its own popover state */ }, []);

  const { handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave, handleDoubleClick } =
    usePixelArtPointerHandlers({
      disabled,
      activeTool,
      brushSize,
      activeColor,
      fillModes: { rect: rectFillMode, circle: circleFillMode, triangle: triangleFillMode, star: starFillMode },
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
    });

  // ── Component-level operations ──────────────────────────────────────────────
  const downloadBlob = useCallback((blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const downloadSvg = useCallback(() => {
    const svg = pixelsToSvg(pixels, width, height);
    downloadBlob(new Blob([svg], { type: 'image/svg+xml' }), 'pixel-art.svg');
  }, [pixels, width, height, downloadBlob]);

  const downloadPng = useCallback(async () => {
    const blob = await pixelsToPngBlob(pixels, width, height, pngExportScale);
    downloadBlob(blob, 'pixel-art.png');
  }, [pixels, width, height, pngExportScale, downloadBlob]);

  const clearSelection = useCallback(() => {
    if (!selection) return;
    const minX = Math.min(selection.x1, selection.x2);
    const maxX = Math.max(selection.x1, selection.x2);
    const minY = Math.min(selection.y1, selection.y2);
    const maxY = Math.max(selection.y1, selection.y2);
    const next = [...pixels];
    for (let row = minY; row <= maxY; row++) {
      for (let col = minX; col <= maxX; col++) {
        if (selectionContainsCell(col, row)) next[row * width + col] = '';
      }
    }
    commitPixels(next);
    emitChange(next);
  }, [selection, pixels, width, emitChange, selectionContainsCell, commitPixels]);

  const clearCanvas = useCallback(() => {
    const next = new Array<string>(width * height).fill('');
    commitPixels(next);
    emitChange(next);
  }, [width, height, commitPixels, emitChange]);

  const handlePickSize = useCallback((next: number) => {
    if (!sizesEnabled || next === managedSize) return;
    setManagedSize(next);
    // Proactively scale cellSize inversely with the grid change so the canvas
    // footprint stays stable in the same render — otherwise a transient frame at
    // old cellSize × new grid size would push the wrapper wider and the
    // ResizeObserver would lock in that oversized width.
    setCellSize((prev) => (prev * managedSize) / next);
    const emptyPixels = new Array<string>(next * next).fill('');
    commitPixels(emptyPixels);
    if (onChange) onChange(pixelsToSvg(emptyPixels, next, next));
    onSizeChange?.(next, next);
  }, [sizesEnabled, managedSize, commitPixels, onChange, onSizeChange]);

  // ── Effects ─────────────────────────────────────────────────────────────────

  // Open popover when defaultOpen flips to true
  useEffect(() => {
    if (defaultOpen) setIsPopoverOpen(true);
  }, [defaultOpen]);

  // Resize observer — cell size driven by container width divided by the grid size.
  // When `sizes` is provided, the denominator is the largest grid in the list (with
  // cellSize scaled up for smaller grids), so the canvas footprint stays constant
  // as the user switches between preset sizes.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: cw } = entry.contentRect;
        if (sizesEnabled && sizes && sizes.length > 0) {
          const maxSize = Math.max(...sizes, widthProp);
          const baseUnit = Math.max(1, Math.floor(cw / maxSize));
          setCellSize((baseUnit * maxSize) / width);
        } else {
          setCellSize(Math.max(1, Math.floor(cw / width)));
        }
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [width, widthProp, canvasMounted, sizesEnabled, sizes]);

  // Resize all canvases when dimensions change (setting .width/.height clears the canvas)
  useEffect(() => {
    const cw = cellSize * width;
    const ch = cellSize * height;
    if (committedCanvasRef.current) {
      committedCanvasRef.current.width = cw;
      committedCanvasRef.current.height = ch;
    }
    if (previewCanvasRef.current) {
      previewCanvasRef.current.width = cw;
      previewCanvasRef.current.height = ch;
    }
    if (selectionCanvasRef.current) {
      selectionCanvasRef.current.width = cw;
      selectionCanvasRef.current.height = ch;
    }
  }, [cellSize, width, height, canvasMounted]);

  // Redraw committed canvas when pixels change
  useEffect(() => {
    if (!committedCanvasRef.current) return;
    drawCommitted(committedCanvasRef.current, pixels, width, height, cellSize);
  }, [pixels, cellSize, width, height, canvasMounted]);

  // Keyboard shortcuts: undo/redo, pen enter/escape, marquee escape/delete, cmd+d
  useEffect(() => {
    if (disabled) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;
      if (e.key === 'Enter' && activeTool === 'pen') {
        e.preventDefault();
        commitPenPath(false);
        return;
      }
      if (e.key === 'Escape') {
        if (activeTool === 'pen') {
          e.preventDefault();
          cancelPenPath();
        } else if (activeTool === 'marquee') {
          e.preventDefault();
          setSelection(null);
          liftedPixels.current = null;
        }
        return;
      }
      if ((e.key === 'Delete' || e.key === 'Backspace') && activeTool === 'marquee') {
        e.preventDefault();
        if (e.altKey && selection) {
          const minX = Math.min(selection.x1, selection.x2);
          const maxX = Math.max(selection.x1, selection.x2);
          const minY = Math.min(selection.y1, selection.y2);
          const maxY = Math.max(selection.y1, selection.y2);
          const next = [...pixels];
          for (let row = minY; row <= maxY; row++) {
            for (let col = minX; col <= maxX; col++) {
              if (selectionContainsCell(col, row)) next[row * width + col] = activeColor;
            }
          }
          commitPixels(next);
          emitChange(next);
        } else {
          clearSelection();
        }
        return;
      }
      const isMac = /mac/i.test(navigator.userAgent);
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;
      if (!ctrlOrCmd) return;
      if (e.key === 'd') {
        e.preventDefault();
        setSelection(null);
        liftedPixels.current = null;
        return;
      }
      if (e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.key === 'z' && e.shiftKey) || e.key === 'y') {
        e.preventDefault();
        redo();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [disabled, activeTool, commitPenPath, cancelPenPath, clearSelection, selection, pixels, activeColor, width, selectionContainsCell, undo, redo, setSelection, liftedPixels, commitPixels, emitChange]);

  // ── Editor JSX ──────────────────────────────────────────────────────────────

  const editor = (
    <div
      className={`${styles.wrapper} ${popover ? styles.wrapperPopover : ''} ${!popover ? className : ''}`}
      style={popover && popoverWidth ? { width: popoverWidth } : undefined}
    >
      <PixelArtToolbar
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        activeColor={activeColor}
        setActiveColor={setActiveColor}
        palette={palette}
        customColors={customColors}
        setCustomColors={setCustomColors}
        independentHue={independentHue}
        setIndependentHue={setIndependentHue}
        rectFillMode={rectFillMode}
        setRectFillMode={setRectFillMode}
        circleFillMode={circleFillMode}
        setCircleFillMode={setCircleFillMode}
        triangleFillMode={triangleFillMode}
        setTriangleFillMode={setTriangleFillMode}
        starFillMode={starFillMode}
        setStarFillMode={setStarFillMode}
        lastShape={lastShape}
        setLastShape={setLastShape}
        marqueeShape={marqueeShape}
        setMarqueeShape={setMarqueeShape}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
        onDownloadSvg={downloadSvg}
        onDownloadPng={downloadPng}
        onClearCanvas={clearCanvas}
        sizes={sizes}
        currentSize={sizesEnabled ? managedSize : undefined}
        onPickSize={handlePickSize}
        cancelPenPath={cancelPenPath}
      />

      {/* Canvas area */}
      <div ref={containerRef} className={styles.canvasContainer}>
        <div className={styles.canvasInner} style={{ width: cellSize * width, height: cellSize * height }}>
          <canvas
            ref={committedCanvasCallbackRef}
            className={styles.canvas}
            style={{ cursor: disabled ? 'not-allowed' : 'crosshair' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onDoubleClick={handleDoubleClick}
            onContextMenu={(e) => { e.preventDefault(); setContextMenu({ x: e.clientX, y: e.clientY }); }}
          />
          <canvas
            ref={previewCanvasRef}
            className={`${styles.canvas} ${styles.canvasPreview}`}
            style={{ pointerEvents: 'none' }}
          />
          <canvas
            ref={selectionCanvasRef}
            className={`${styles.canvas} ${styles.canvasPreview}`}
            style={{ pointerEvents: 'none' }}
          />
        </div>
      </div>

      <ContextMenu
        open={contextMenu !== null}
        position={contextMenu ?? undefined}
        onClose={() => setContextMenu(null)}
        items={[
          {
            label: 'Undo',
            icon: Undo2,
            disabled: !canUndo,
            onClick: () => { undo(); setContextMenu(null); },
          },
          {
            label: 'Redo',
            icon: Redo2,
            disabled: !canRedo,
            onClick: () => { redo(); setContextMenu(null); },
          },
          { separator: true, label: '' },
          {
            label: 'Download SVG',
            icon: FileCode,
            onClick: () => { downloadSvg(); setContextMenu(null); },
          },
          {
            label: 'Download PNG',
            icon: FileImage,
            onClick: () => { downloadPng(); setContextMenu(null); },
          },
          ...(selection
            ? [
                { separator: true as const, label: '' },
                {
                  label: 'Deselect',
                  icon: BoxSelect,
                  onClick: () => {
                    setSelection(null);
                    liftedPixels.current = null;
                    setContextMenu(null);
                  },
                },
              ]
            : []),
          { separator: true, label: '' },
          {
            label: 'Clear canvas',
            icon: Trash2,
            variant: 'destructive' as const,
            onClick: () => { clearCanvas(); setContextMenu(null); },
          },
        ]}
      />
    </div>
  );

  if (!popover) {
    return editor;
  }

  // ── Popover mode ────────────────────────────────────────────────────────────

  return (
    <div className={`${styles.popoverContainer} ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.popoverTrigger} ${isPopoverOpen ? styles.popoverTriggerOpen : ''}`}
        onClick={() => setIsPopoverOpen((prev) => !prev)}
        disabled={disabled}
        aria-label="Open pixel art editor"
      >
        <img
          src={`data:image/svg+xml,${encodeURIComponent(pixelsToSvg(pixels, width, height))}`}
          width={width}
          height={height}
          className={styles.miniPreview}
          style={triggerHeight !== undefined ? { height: triggerHeight, width: 'auto' } : undefined}
          alt=""
        />
      </button>
      <Popover
        isOpen={isPopoverOpen}
        onClose={() => setIsPopoverOpen(false)}
        anchorRef={triggerRef}
        overlap
        role="dialog"
        aria-label="Pixel art editor"
        offsetX={offsetX}
        offsetY={offsetY}
        className={styles.editorPopover}
      >
        {editor}
      </Popover>
    </div>
  );
};

export default PixelArtEditor;
