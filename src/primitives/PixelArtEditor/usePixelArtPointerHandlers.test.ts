import { renderHook, act } from '@testing-library/react';
import { useRef, useState } from 'react';
import type React from 'react';
import { usePixelArtPointerHandlers, type FillModes } from './usePixelArtPointerHandlers';
import type { LiftedPixels } from './usePixelArtSelection';
import type { PixelArtSelection, PixelArtBrushSize } from './pixelArtUtils';
import type { PixelArtTool } from './PixelArtEditor';

const CELL_SIZE = 10;
const WIDTH = 4;
const HEIGHT = 4;

function makeMouseEvent(col: number, row: number, button = 0): React.MouseEvent<HTMLCanvasElement> {
  return {
    clientX: col * CELL_SIZE + 1,
    clientY: row * CELL_SIZE + 1,
    button,
    preventDefault: vi.fn(),
  } as unknown as React.MouseEvent<HTMLCanvasElement>;
}

interface SetupOptions {
  initialPixels?: string[];
  activeTool?: PixelArtTool;
  activeColor?: string;
  brushSize?: PixelArtBrushSize;
  marqueeShape?: 'rect' | 'ellipse' | 'wand';
  disabled?: boolean;
  initialSelection?: PixelArtSelection | null;
  fillModes?: FillModes;
}

function setup(opts: SetupOptions = {}) {
  const commitPixels = vi.fn();
  const dispatchPixels = vi.fn();
  const emitChange = vi.fn();
  const setActiveTool = vi.fn();
  const setActiveColor = vi.fn();
  const setIndependentHue = vi.fn();
  const closePopovers = vi.fn();
  const commitPenPath = vi.fn();
  const selectionContainsCell = vi.fn<(c: number, r: number) => boolean>(() => false);

  const hook = renderHook(() => {
    const committedCanvas = document.createElement('canvas');
    committedCanvas.width = WIDTH * CELL_SIZE;
    committedCanvas.height = HEIGHT * CELL_SIZE;
    Object.defineProperty(committedCanvas, 'getBoundingClientRect', {
      value: () => ({ left: 0, top: 0, right: WIDTH * CELL_SIZE, bottom: HEIGHT * CELL_SIZE, width: WIDTH * CELL_SIZE, height: HEIGHT * CELL_SIZE, x: 0, y: 0, toJSON: () => ({}) }),
    });
    const previewCanvas = document.createElement('canvas');
    previewCanvas.width = WIDTH * CELL_SIZE;
    previewCanvas.height = HEIGHT * CELL_SIZE;

    const committedCanvasRef = useRef<HTMLCanvasElement | null>(committedCanvas);
    const previewCanvasRef = useRef<HTMLCanvasElement | null>(previewCanvas);

    const [selection, setSelection] = useState<PixelArtSelection | null>(opts.initialSelection ?? null);
    const selectionDragMode = useRef<'draw' | 'move' | null>(null);
    const selectionDragStart = useRef<[number, number] | null>(null);
    const liftedPixels = useRef<LiftedPixels | null>(null);
    const basePixelsAfterLift = useRef<string[] | null>(null);
    const selectionMoveOffset = useRef<[number, number]>([0, 0]);
    const strokeInsideSelection = useRef(true);

    const penAnchors = useRef<Array<[number, number]>>([]);
    const [, setPenCursor] = useState<[number, number] | null>(null);
    const penDblClickPending = useRef(false);

    return usePixelArtPointerHandlers({
      disabled: opts.disabled ?? false,
      activeTool: opts.activeTool ?? 'paint',
      brushSize: opts.brushSize ?? 'sm',
      activeColor: opts.activeColor ?? '#ff0000',
      fillModes: opts.fillModes ?? { rect: 'outline', circle: 'outline', triangle: 'outline', star: 'outline' },
      marqueeShape: opts.marqueeShape ?? 'rect',
      setActiveTool,
      setActiveColor,
      setIndependentHue,
      pixels: opts.initialPixels ?? new Array(WIDTH * HEIGHT).fill(''),
      width: WIDTH,
      height: HEIGHT,
      cellSize: CELL_SIZE,
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
  });

  return { hook, commitPixels, dispatchPixels, emitChange, setActiveTool, setActiveColor, setIndependentHue, closePopovers, commitPenPath, selectionContainsCell };
}

describe('usePixelArtPointerHandlers', () => {
  it('ignores mousedown when disabled', () => {
    const { hook, commitPixels, closePopovers } = setup({ disabled: true });
    act(() => hook.result.current.handleMouseDown(makeMouseEvent(1, 1)));
    expect(commitPixels).not.toHaveBeenCalled();
    expect(closePopovers).not.toHaveBeenCalled();
  });

  it('ignores non-left mouse buttons', () => {
    const { hook, commitPixels } = setup();
    act(() => hook.result.current.handleMouseDown(makeMouseEvent(1, 1, 2)));
    expect(commitPixels).not.toHaveBeenCalled();
  });

  it('closes popovers on valid mousedown', () => {
    const { hook, closePopovers } = setup();
    act(() => hook.result.current.handleMouseDown(makeMouseEvent(1, 1)));
    expect(closePopovers).toHaveBeenCalledTimes(1);
  });

  it('paint tool commits a new pixel on mousedown', () => {
    const { hook, commitPixels, emitChange } = setup({ activeTool: 'paint', activeColor: '#abcdef' });
    act(() => hook.result.current.handleMouseDown(makeMouseEvent(1, 1)));
    expect(commitPixels).toHaveBeenCalledTimes(1);
    expect(emitChange).toHaveBeenCalledTimes(1);
    const next = commitPixels.mock.calls[0][0];
    expect(next[1 * WIDTH + 1]).toBe('#abcdef');
  });

  it('eraser tool clears the pixel on mousedown', () => {
    const initialPixels = new Array(WIDTH * HEIGHT).fill('#ff0000');
    const { hook, commitPixels } = setup({ activeTool: 'eraser', initialPixels });
    act(() => hook.result.current.handleMouseDown(makeMouseEvent(2, 2)));
    const next = commitPixels.mock.calls[0][0];
    expect(next[2 * WIDTH + 2]).toBe('');
  });

  it('fill tool floods when no selection is active', () => {
    const { hook, commitPixels } = setup({ activeTool: 'fill', activeColor: '#00ff00' });
    act(() => hook.result.current.handleMouseDown(makeMouseEvent(0, 0)));
    const next = commitPixels.mock.calls[0][0];
    // empty canvas flood fills every cell
    expect(next.every((c: string) => c === '#00ff00')).toBe(true);
  });

  it('eyedropper picks color under cursor and switches to paint tool', () => {
    const initialPixels = new Array(WIDTH * HEIGHT).fill('');
    initialPixels[1 * WIDTH + 2] = '#123456';
    const { hook, setActiveColor, setActiveTool } = setup({ activeTool: 'eyedropper', initialPixels });
    act(() => hook.result.current.handleMouseDown(makeMouseEvent(2, 1)));
    expect(setActiveColor).toHaveBeenCalledWith('#123456');
    expect(setActiveTool).toHaveBeenCalledWith('paint');
  });

  it('wand marquee sets a cells-shape selection from flood-select', () => {
    const initialPixels = new Array(WIDTH * HEIGHT).fill('');
    initialPixels[0] = '#000000';
    initialPixels[1] = '#000000';
    // Give the hook a committed canvas and a wand click on (0,0)
    const commitPixels = vi.fn();
    const setSelectionSpy = { current: null as PixelArtSelection | null };

    const hook = renderHook(() => {
      const committedCanvas = document.createElement('canvas');
      Object.defineProperty(committedCanvas, 'getBoundingClientRect', {
        value: () => ({ left: 0, top: 0, right: 100, bottom: 100, width: 100, height: 100, x: 0, y: 0, toJSON: () => ({}) }),
      });
      const previewCanvas = document.createElement('canvas');
      const committedRef = useRef<HTMLCanvasElement | null>(committedCanvas);
      const previewRef = useRef<HTMLCanvasElement | null>(previewCanvas);

      const [selection, setSelection] = useState<PixelArtSelection | null>(null);
      const wrappedSet: typeof setSelection = (s) => { setSelectionSpy.current = typeof s === 'function' ? s(selection) : s; setSelection(s); };

      return usePixelArtPointerHandlers({
        disabled: false,
        activeTool: 'marquee',
        brushSize: 'sm',
        activeColor: '#ff0000',
        fillModes: { rect: 'outline', circle: 'outline', triangle: 'outline', star: 'outline' },
        marqueeShape: 'wand',
        setActiveTool: vi.fn(),
        setActiveColor: vi.fn(),
        setIndependentHue: vi.fn(),
        pixels: initialPixels,
        width: WIDTH,
        height: HEIGHT,
        cellSize: CELL_SIZE,
        committedCanvasRef: committedRef,
        previewCanvasRef: previewRef,
        commitPixels,
        dispatchPixels: vi.fn(),
        emitChange: vi.fn(),
        selection,
        setSelection: wrappedSet,
        selectionContainsCell: () => false,
        selectionDragMode: useRef<'draw' | 'move' | null>(null),
        selectionDragStart: useRef<[number, number] | null>(null),
        liftedPixels: useRef<LiftedPixels | null>(null),
        basePixelsAfterLift: useRef<string[] | null>(null),
        selectionMoveOffset: useRef<[number, number]>([0, 0]),
        strokeInsideSelection: useRef(true),
        penAnchors: useRef<Array<[number, number]>>([]),
        setPenCursor: vi.fn(),
        penDblClickPending: useRef(false),
        commitPenPath: vi.fn(),
        closePopovers: vi.fn(),
      });
    });

    act(() => hook.result.current.handleMouseDown(makeMouseEvent(0, 0)));
    expect(setSelectionSpy.current).not.toBeNull();
    expect(setSelectionSpy.current?.shape).toBe('cells');
  });

  it('pen tool adds first anchor on mousedown', () => {
    const { hook, commitPenPath } = setup({ activeTool: 'pen' });
    act(() => hook.result.current.handleMouseDown(makeMouseEvent(1, 1)));
    // Not enough anchors to commit; commitPenPath should not fire
    expect(commitPenPath).not.toHaveBeenCalled();
  });

  it('handleMouseLeave clears drag state and preview', () => {
    const { hook } = setup({ activeTool: 'paint' });
    act(() => hook.result.current.handleMouseDown(makeMouseEvent(1, 1)));
    act(() => hook.result.current.handleMouseLeave());
    // Follow-up move should not commit because drag state is cleared
    const { hook: hook2, commitPixels: cp2 } = setup({ activeTool: 'paint' });
    act(() => hook2.result.current.handleMouseDown(makeMouseEvent(1, 1)));
    const beforeCalls = cp2.mock.calls.length;
    act(() => hook2.result.current.handleMouseLeave());
    act(() => hook2.result.current.handleMouseMove(makeMouseEvent(2, 2)));
    expect(cp2.mock.calls.length).toBe(beforeCalls);
  });

  it('handleDoubleClick commits pen path when pen tool is active', () => {
    const { hook, commitPenPath } = setup({ activeTool: 'pen' });
    act(() => hook.result.current.handleDoubleClick());
    expect(commitPenPath).toHaveBeenCalledWith(false);
  });

  it('handleDoubleClick is a no-op when pen tool is not active', () => {
    const { hook, commitPenPath } = setup({ activeTool: 'paint' });
    act(() => hook.result.current.handleDoubleClick());
    expect(commitPenPath).not.toHaveBeenCalled();
  });

  it('shape tool stores dragStart on mousedown without committing', () => {
    const { hook, commitPixels } = setup({ activeTool: 'rect' });
    act(() => hook.result.current.handleMouseDown(makeMouseEvent(1, 1)));
    expect(commitPixels).not.toHaveBeenCalled();
  });

  it('shape tool commits cells on mouseup after a drag', () => {
    const { hook, commitPixels } = setup({ activeTool: 'rect' });
    act(() => hook.result.current.handleMouseDown(makeMouseEvent(1, 1)));
    act(() => hook.result.current.handleMouseUp(makeMouseEvent(3, 3)));
    expect(commitPixels).toHaveBeenCalled();
  });
});
