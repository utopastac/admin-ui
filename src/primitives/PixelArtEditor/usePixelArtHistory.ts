import { useCallback, useEffect, useReducer, useRef } from 'react';
import { historyReducer } from './pixelArtHistory';
import { parseSvgToPixels, pixelsToSvg } from './pixelArtUtils';

export interface UsePixelArtHistoryParams {
  width: number;
  height: number;
  value: string;
  onChange?: (svg: string) => void;
}

export interface UsePixelArtHistoryResult {
  pixels: string[];
  canUndo: boolean;
  canRedo: boolean;
  /** Set the present pixels without creating a history entry (mid-drag). */
  dispatchPixels: (px: string[]) => void;
  /** Commit the given pixels as a new undoable history entry. */
  commitPixels: (px: string[]) => void;
  /** Undo one step. Emits onChange with the restored pixels. No-op if at history head. */
  undo: () => void;
  /** Redo one step. Emits onChange with the restored pixels. No-op if nothing to redo. */
  redo: () => void;
  /** Serialize the given pixels to SVG and fire onChange. Exposed for consumers that commit directly. */
  emitChange: (nextPixels: string[]) => void;
}

/**
 * Owns the PixelArtEditor's undo/redo history, external value sync, and onChange emission.
 * The hook keeps `undo`/`redo` self-contained: they dispatch the reducer action AND emit
 * onChange with the resulting pixels, so callers don't need to thread both concerns.
 */
export function usePixelArtHistory({
  width,
  height,
  value,
  onChange,
}: UsePixelArtHistoryParams): UsePixelArtHistoryResult {
  const [history, dispatch] = useReducer(
    historyReducer,
    undefined,
    () => ({
      past: [] as string[][],
      present: parseSvgToPixels(value, width, height),
      future: [] as string[][],
    }),
  );

  const pixels = history.present;
  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  const dispatchPixels = useCallback((px: string[]) => dispatch({ type: 'set', pixels: px }), []);
  const commitPixels = useCallback((px: string[]) => dispatch({ type: 'commit', pixels: px }), []);

  const emitChange = useCallback(
    (nextPixels: string[]) => {
      if (onChange) onChange(pixelsToSvg(nextPixels, width, height));
    },
    [onChange, width, height],
  );

  // Sync pixels when external value changes (no history entry).
  const prevValue = useRef(value);
  useEffect(() => {
    if (value !== prevValue.current) {
      prevValue.current = value;
      dispatch({ type: 'set', pixels: parseSvgToPixels(value, width, height) });
    }
  }, [value, width, height]);

  const undo = useCallback(() => {
    if (history.past.length === 0) return;
    const newPresent = history.past[history.past.length - 1];
    dispatch({ type: 'undo' });
    if (onChange) onChange(pixelsToSvg(newPresent, width, height));
  }, [history, onChange, width, height]);

  const redo = useCallback(() => {
    if (history.future.length === 0) return;
    const newPresent = history.future[0];
    dispatch({ type: 'redo' });
    if (onChange) onChange(pixelsToSvg(newPresent, width, height));
  }, [history, onChange, width, height]);

  return { pixels, canUndo, canRedo, dispatchPixels, commitPixels, undo, redo, emitChange };
}
