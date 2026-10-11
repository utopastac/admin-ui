import React, { useCallback, useRef, useState } from 'react';
import { Pencil, Eraser, PaintBucket, Pipette, Trash2, Download, Undo2, Redo2, PenTool, BoxSelect, Wand2, CircleDashed, FileCode, FileImage, Grid3x3, Check } from 'lucide-react';
import {
  DiagonalLine,
  RectFilled,
  RectOutline,
  CircleFilled,
  CircleOutline,
  TriangleFilled,
  TriangleOutline,
  StarFilled,
  StarOutline,
  BRUSH_ICONS,
} from './PixelArtIcons';
import ToolbarButton from '../ToolbarButton';
import ColorWheel, { hsvToHex, hexToHsv } from '../ColorPicker/ColorWheel';
import CompactInput from '../CompactInput';
import Popover from '../Popover';
import styles from './PixelArtEditor.module.css';
import {
  HEX_REGEX,
  type PixelArtFillMode,
  type PixelArtBrushSize,
} from './pixelArtUtils';
import { useLongPress } from './useLongPress';
import type { PixelArtTool } from './PixelArtEditor';

export interface PixelArtToolbarProps {
  // Tool state
  activeTool: PixelArtTool;
  setActiveTool: (t: PixelArtTool) => void;
  brushSize: PixelArtBrushSize;
  setBrushSize: (b: PixelArtBrushSize) => void;

  // Colors
  activeColor: string;
  setActiveColor: (c: string) => void;
  palette: string[];
  customColors: string[];
  setCustomColors: React.Dispatch<React.SetStateAction<string[]>>;
  independentHue: number | null;
  setIndependentHue: (h: number | null) => void;

  // Shapes
  rectFillMode: PixelArtFillMode;
  setRectFillMode: React.Dispatch<React.SetStateAction<PixelArtFillMode>>;
  circleFillMode: PixelArtFillMode;
  setCircleFillMode: React.Dispatch<React.SetStateAction<PixelArtFillMode>>;
  triangleFillMode: PixelArtFillMode;
  setTriangleFillMode: React.Dispatch<React.SetStateAction<PixelArtFillMode>>;
  starFillMode: PixelArtFillMode;
  setStarFillMode: React.Dispatch<React.SetStateAction<PixelArtFillMode>>;
  lastShape: 'rect' | 'circle' | 'triangle' | 'star';
  setLastShape: (s: 'rect' | 'circle' | 'triangle' | 'star') => void;

  // Marquee
  marqueeShape: 'rect' | 'ellipse' | 'wand';
  setMarqueeShape: (s: 'rect' | 'ellipse' | 'wand') => void;

  // History & file operations
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onDownloadSvg: () => void;
  onDownloadPng: () => void;
  onClearCanvas: () => void;

  /** Optional list of preset grid sizes. When provided, a picker button is rendered
   *  in the right-side toolbar cluster. When omitted, the picker is hidden. */
  sizes?: number[];
  /** The current grid size, used to indicate the active option in the picker menu. */
  currentSize?: number;
  /** Fired when the user picks a size from the picker menu. */
  onPickSize?: (size: number) => void;

  /** Fired whenever switching active tool — used to dismiss any in-progress pen path. */
  cancelPenPath: () => void;
}

/**
 * Tools row + colours row for PixelArtEditor. Owns all popover-open UI state
 * and the long-press handlers for tool buttons. Parents supply state and the
 * history/file operation callbacks.
 */
const PixelArtToolbar: React.FC<PixelArtToolbarProps> = ({
  activeTool,
  setActiveTool,
  brushSize,
  setBrushSize,
  activeColor,
  setActiveColor,
  palette,
  customColors,
  setCustomColors,
  independentHue,
  setIndependentHue,
  rectFillMode,
  setRectFillMode,
  circleFillMode,
  setCircleFillMode,
  triangleFillMode,
  setTriangleFillMode,
  starFillMode,
  setStarFillMode,
  lastShape,
  setLastShape,
  marqueeShape,
  setMarqueeShape,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onDownloadSvg,
  onDownloadPng,
  onClearCanvas,
  sizes,
  currentSize,
  onPickSize,
  cancelPenPath,
}) => {
  const [isBrushPopoverOpen, setIsBrushPopoverOpen] = useState(false);
  const [isShapePopoverOpen, setIsShapePopoverOpen] = useState(false);
  const [isMarqueePopoverOpen, setIsMarqueePopoverOpen] = useState(false);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const [isSizeMenuOpen, setIsSizeMenuOpen] = useState(false);

  const penAnchorRef = useRef<HTMLDivElement>(null);
  const eraserAnchorRef = useRef<HTMLDivElement>(null);
  const shapeAnchorRef = useRef<HTMLDivElement>(null);
  const marqueeAnchorRef = useRef<HTMLDivElement>(null);
  const colorPickerAnchorRef = useRef<HTMLDivElement>(null);
  const downloadAnchorRef = useRef<HTMLDivElement>(null);
  const sizeAnchorRef = useRef<HTMLDivElement>(null);

  const showSizePicker = Array.isArray(sizes) && sizes.length > 0;

  const closeAllToolPopovers = useCallback(() => {
    setIsBrushPopoverOpen(false);
    setIsShapePopoverOpen(false);
    setIsMarqueePopoverOpen(false);
  }, []);

  const paintLongPress = useLongPress(
    () => { cancelPenPath(); setActiveTool('paint'); closeAllToolPopovers(); },
    () => { cancelPenPath(); setActiveTool('paint'); setIsBrushPopoverOpen(true); setIsShapePopoverOpen(false); setIsMarqueePopoverOpen(false); },
  );

  const eraserLongPress = useLongPress(
    () => { cancelPenPath(); setActiveTool('eraser'); closeAllToolPopovers(); },
    () => { cancelPenPath(); setActiveTool('eraser'); setIsBrushPopoverOpen(true); setIsShapePopoverOpen(false); setIsMarqueePopoverOpen(false); },
  );

  const shapesShortPress = useCallback(() => {
    const isActiveToolShape = activeTool === 'rect' || activeTool === 'circle' || activeTool === 'triangle' || activeTool === 'star';
    if (isActiveToolShape) {
      if (activeTool === 'rect') setRectFillMode(f => f === 'fill' ? 'outline' : 'fill');
      else if (activeTool === 'circle') setCircleFillMode(f => f === 'fill' ? 'outline' : 'fill');
      else if (activeTool === 'triangle') setTriangleFillMode(f => f === 'fill' ? 'outline' : 'fill');
      else if (activeTool === 'star') setStarFillMode(f => f === 'fill' ? 'outline' : 'fill');
    } else {
      cancelPenPath();
      setActiveTool(lastShape);
      closeAllToolPopovers();
    }
  }, [activeTool, lastShape, cancelPenPath, setActiveTool, closeAllToolPopovers, setRectFillMode, setCircleFillMode, setTriangleFillMode, setStarFillMode]);

  const shapesLongPress = useLongPress(
    shapesShortPress,
    () => { setIsShapePopoverOpen(true); setIsBrushPopoverOpen(false); setIsMarqueePopoverOpen(false); },
  );

  const marqueeLongPress = useLongPress(
    () => { cancelPenPath(); setActiveTool('marquee'); closeAllToolPopovers(); },
    () => { cancelPenPath(); setActiveTool('marquee'); setIsMarqueePopoverOpen(true); setIsBrushPopoverOpen(false); setIsShapePopoverOpen(false); },
  );

  const handleColorPickerClose = useCallback(() => {
    setIsColorPickerOpen(false);
    if (
      HEX_REGEX.test(activeColor) &&
      !palette.includes(activeColor) &&
      !customColors.includes(activeColor)
    ) {
      setCustomColors(prev => [activeColor, ...prev]);
    }
  }, [activeColor, palette, customColors, setCustomColors]);

  return (
    <>
      {/* Tools row */}
      <div className={styles.toolsRow} role="toolbar" aria-label="Pixel art tools">
        <div className={styles.toolsScroll}>
          <div className={styles.brushAnchor}>
            <div ref={penAnchorRef} {...paintLongPress}>
              <ToolbarButton
                icon={Pencil}
                size="sm"
                selected={activeTool === 'paint'}
                aria-label="Paint"
                title="Paint"
              />
            </div>
            <div ref={eraserAnchorRef} {...eraserLongPress}>
              <ToolbarButton
                icon={Eraser}
                size="sm"
                selected={activeTool === 'eraser'}
                aria-label="Eraser"
                title="Eraser"
              />
            </div>
            <Popover
              isOpen={isBrushPopoverOpen && (activeTool === 'paint' || activeTool === 'eraser')}
              onClose={() => setIsBrushPopoverOpen(false)}
              anchorRef={activeTool === 'eraser' ? eraserAnchorRef : penAnchorRef}
              offsetX={-5}
              role="dialog"
              aria-label="Brush size"
            >
              <div className={styles.brushPopover}>
                {(['sm', 'md', 'lg'] as PixelArtBrushSize[]).map((bs) => (
                  <ToolbarButton
                    key={bs}
                    icon={BRUSH_ICONS[bs]}
                    size="sm"
                    selected={brushSize === bs}
                    onClick={() => { setBrushSize(bs); setIsBrushPopoverOpen(false); }}
                    aria-label={`Brush size ${bs}`}
                    title={`Brush ${bs}`}
                  />
                ))}
              </div>
            </Popover>
          </div>
          <ToolbarButton
            icon={PaintBucket}
            size="sm"
            selected={activeTool === 'fill'}
            onClick={() => { cancelPenPath(); setActiveTool('fill'); closeAllToolPopovers(); }}
            aria-label="Fill"
            title="Fill"
          />
          <ToolbarButton
            icon={DiagonalLine}
            size="sm"
            selected={activeTool === 'line'}
            onClick={() => { cancelPenPath(); setActiveTool('line'); closeAllToolPopovers(); }}
            aria-label="Line"
            title="Line"
          />
          <ToolbarButton
            icon={PenTool}
            size="sm"
            selected={activeTool === 'pen'}
            onClick={() => { setActiveTool('pen'); closeAllToolPopovers(); }}
            aria-label="Pen"
            title="Pen"
          />
          <div className={styles.brushAnchor}>
            <div ref={marqueeAnchorRef} {...marqueeLongPress}>
              <ToolbarButton
                icon={marqueeShape === 'ellipse' ? CircleDashed : marqueeShape === 'wand' ? Wand2 : BoxSelect}
                size="sm"
                selected={activeTool === 'marquee'}
                aria-label="Marquee selection"
                title="Marquee selection (long press for options)"
              />
            </div>
            <Popover
              isOpen={isMarqueePopoverOpen}
              onClose={() => setIsMarqueePopoverOpen(false)}
              anchorRef={marqueeAnchorRef}
              offsetX={-5}
              role="dialog"
              aria-label="Selection mode"
            >
              <div className={styles.brushPopover}>
                <ToolbarButton
                  icon={BoxSelect}
                  size="sm"
                  selected={marqueeShape === 'rect'}
                  onClick={() => { setMarqueeShape('rect'); setActiveTool('marquee'); setIsMarqueePopoverOpen(false); cancelPenPath(); }}
                  aria-label="Rectangular marquee"
                  title="Rectangular marquee"
                />
                <ToolbarButton
                  icon={CircleDashed}
                  size="sm"
                  selected={marqueeShape === 'ellipse'}
                  onClick={() => { setMarqueeShape('ellipse'); setActiveTool('marquee'); setIsMarqueePopoverOpen(false); cancelPenPath(); }}
                  aria-label="Elliptical marquee"
                  title="Elliptical marquee"
                />
                <ToolbarButton
                  icon={Wand2}
                  size="sm"
                  selected={marqueeShape === 'wand'}
                  onClick={() => { setMarqueeShape('wand'); setActiveTool('marquee'); setIsMarqueePopoverOpen(false); cancelPenPath(); }}
                  aria-label="Magic wand"
                  title="Magic wand"
                />
              </div>
            </Popover>
          </div>
          <div className={styles.brushAnchor}>
            <div ref={shapeAnchorRef} {...shapesLongPress}>
              <ToolbarButton
                icon={(() => {
                  const shape = (['rect', 'circle', 'triangle', 'star'] as const).includes(activeTool as 'rect')
                    ? (activeTool as 'rect' | 'circle' | 'triangle' | 'star')
                    : lastShape;
                  const fillMode = shape === 'rect' ? rectFillMode : shape === 'circle' ? circleFillMode : shape === 'triangle' ? triangleFillMode : starFillMode;
                  const icons = {
                    rect: fillMode === 'fill' ? RectFilled : RectOutline,
                    circle: fillMode === 'fill' ? CircleFilled : CircleOutline,
                    triangle: fillMode === 'fill' ? TriangleFilled : TriangleOutline,
                    star: fillMode === 'fill' ? StarFilled : StarOutline,
                  };
                  return icons[shape];
                })()}
                size="sm"
                selected={activeTool === 'rect' || activeTool === 'circle' || activeTool === 'triangle' || activeTool === 'star'}
                aria-label="Shapes"
                title="Shapes"
              />
            </div>
            <Popover
              isOpen={isShapePopoverOpen}
              onClose={() => setIsShapePopoverOpen(false)}
              anchorRef={shapeAnchorRef}
              offsetX={-5}
              role="dialog"
              aria-label="Shape picker"
            >
              <div className={styles.brushPopover}>
                {([
                  { shape: 'rect' as const, filledIcon: RectFilled, outlineIcon: RectOutline, fillMode: rectFillMode, setFillMode: setRectFillMode, label: 'Rectangle' },
                  { shape: 'circle' as const, filledIcon: CircleFilled, outlineIcon: CircleOutline, fillMode: circleFillMode, setFillMode: setCircleFillMode, label: 'Circle' },
                  { shape: 'triangle' as const, filledIcon: TriangleFilled, outlineIcon: TriangleOutline, fillMode: triangleFillMode, setFillMode: setTriangleFillMode, label: 'Triangle' },
                  { shape: 'star' as const, filledIcon: StarFilled, outlineIcon: StarOutline, fillMode: starFillMode, setFillMode: setStarFillMode, label: 'Star' },
                ]).map(({ shape, filledIcon, outlineIcon, fillMode, setFillMode, label }) => (
                  <ToolbarButton
                    key={shape}
                    icon={fillMode === 'fill' ? filledIcon : outlineIcon}
                    size="sm"
                    selected={activeTool === shape}
                    onClick={() => {
                      if (activeTool === shape) {
                        setFillMode((f: PixelArtFillMode) => f === 'fill' ? 'outline' : 'fill');
                      } else {
                        cancelPenPath();
                        setActiveTool(shape);
                        setLastShape(shape);
                      }
                      setIsShapePopoverOpen(false);
                    }}
                    aria-label={`${label} ${fillMode === 'fill' ? 'filled' : 'outline'}`}
                    title={`${label} (${fillMode === 'fill' ? 'filled' : 'outline'}, press again to toggle)`}
                  />
                ))}
              </div>
            </Popover>
          </div>

        </div>{/* end toolsScroll */}
        <div className={styles.clearFixed}>
          <ToolbarButton
            icon={Undo2}
            size="sm"
            onClick={onUndo}
            disabled={!canUndo}
            aria-label="Undo"
            title="Undo (Cmd+Z)"
          />
          <ToolbarButton
            icon={Redo2}
            size="sm"
            onClick={onRedo}
            disabled={!canRedo}
            aria-label="Redo"
            title="Redo (Cmd+Shift+Z)"
          />
          {showSizePicker && (
            <div ref={sizeAnchorRef} className={styles.brushAnchor}>
              <ToolbarButton
                icon={Grid3x3}
                size="sm"
                selected={isSizeMenuOpen}
                onClick={() => setIsSizeMenuOpen((prev) => !prev)}
                aria-label="Grid size"
                aria-haspopup="menu"
                aria-expanded={isSizeMenuOpen}
                title="Grid size"
              />
              <Popover
                isOpen={isSizeMenuOpen}
                onClose={() => setIsSizeMenuOpen(false)}
                anchorRef={sizeAnchorRef}
                offsetX={-5}
                role="menu"
                aria-label="Grid size"
              >
                <div className={styles.menuPopover}>
                  {sizes!.map((s) => (
                    <button
                      key={s}
                      type="button"
                      role="menuitemradio"
                      aria-checked={currentSize === s}
                      className={styles.menuItem}
                      onClick={() => { setIsSizeMenuOpen(false); onPickSize?.(s); }}
                    >
                      {currentSize === s
                        ? <Check size={14} aria-hidden="true" />
                        : <span className={styles.menuItemIconSlot} aria-hidden="true" />}
                      {s} × {s}
                    </button>
                  ))}
                </div>
              </Popover>
            </div>
          )}
          <div ref={downloadAnchorRef} className={styles.brushAnchor}>
            <ToolbarButton
              icon={Download}
              size="sm"
              selected={isDownloadMenuOpen}
              onClick={() => setIsDownloadMenuOpen((prev) => !prev)}
              aria-label="Download"
              aria-haspopup="menu"
              aria-expanded={isDownloadMenuOpen}
              title="Download"
            />
            <Popover
              isOpen={isDownloadMenuOpen}
              onClose={() => setIsDownloadMenuOpen(false)}
              anchorRef={downloadAnchorRef}
              offsetX={-5}
              role="menu"
              aria-label="Download format"
            >
              <div className={styles.menuPopover}>
                <button
                  type="button"
                  role="menuitem"
                  className={styles.menuItem}
                  onClick={() => { setIsDownloadMenuOpen(false); onDownloadSvg(); }}
                >
                  <FileCode size={14} aria-hidden="true" />
                  Download SVG
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className={styles.menuItem}
                  onClick={() => { setIsDownloadMenuOpen(false); onDownloadPng(); }}
                >
                  <FileImage size={14} aria-hidden="true" />
                  Download PNG
                </button>
              </div>
            </Popover>
          </div>
          <ToolbarButton
            icon={Trash2}
            size="sm"
            onClick={onClearCanvas}
            aria-label="Clear canvas"
            title="Clear canvas"
          />
        </div>
      </div>

      {/* Colours row */}
      <div className={styles.colorsRow}>
        <div className={styles.eyedropperFixed}>
          <ToolbarButton
            icon={Pipette}
            size="sm"
            selected={activeTool === 'eyedropper'}
            onClick={() => { cancelPenPath(); setActiveTool('eyedropper'); }}
            aria-label="Eyedropper"
            title="Eyedropper"
          />
        </div>

        <div className={styles.swatchScroll}>
          {customColors.map((color) => (
            <button
              key={`custom-${color}`}
              type="button"
              className={`${styles.swatch} ${activeColor === color ? styles.swatchActive : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => { setActiveColor(color); setIndependentHue(null); }}
              aria-label={`Select color ${color}`}
              title={color}
            />
          ))}
          {palette.map((color) => (
            <button
              key={color}
              type="button"
              className={`${styles.swatch} ${activeColor === color ? styles.swatchActive : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => { setActiveColor(color); setIndependentHue(null); }}
              aria-label={`Select color ${color}`}
              title={color}
            />
          ))}
        </div>

        <div className={styles.customSwatchFixed}>
          <div ref={colorPickerAnchorRef} className={styles.customSwatchWrapper}>
            <button
              type="button"
              className={`${styles.swatch} ${styles.swatchCustom} ${!palette.includes(activeColor) && !customColors.includes(activeColor) ? styles.swatchActive : ''}`}
              style={{ backgroundColor: HEX_REGEX.test(activeColor) ? activeColor : '#000000' }}
              onClick={() => setIsColorPickerOpen((prev) => !prev)}
              aria-label="Custom color"
              title="Custom color"
            />
            <Popover
              isOpen={isColorPickerOpen}
              onClose={handleColorPickerClose}
              anchorRef={colorPickerAnchorRef}
              role="dialog"
              className={styles.colorPickerPopover}
              aria-label="Color picker"
            >
              <div>
                <ColorWheel
                  hue={(() => {
                    const hsv = HEX_REGEX.test(activeColor) ? hexToHsv(activeColor) : { h: 0, s: 1, v: 1 };
                    return independentHue !== null ? independentHue : hsv.h;
                  })()}
                  saturation={HEX_REGEX.test(activeColor) ? hexToHsv(activeColor).s : 1}
                  brightness={HEX_REGEX.test(activeColor) ? hexToHsv(activeColor).v : 1}
                  onChange={(h, s, v) => {
                    setIndependentHue(h);
                    setActiveColor(hsvToHex(h, s, v));
                  }}
                />
                <CompactInput
                  prefix="#"
                  value={activeColor.replace(/^#/, '')}
                  onChange={(raw) => {
                    const hex = '#' + raw.replace(/^#/, '');
                    if (HEX_REGEX.test(hex)) {
                      setIndependentHue(null);
                      setActiveColor(hex.toLowerCase());
                    }
                  }}
                />
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
};

export default PixelArtToolbar;
