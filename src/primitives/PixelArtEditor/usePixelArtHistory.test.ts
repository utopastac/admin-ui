import { renderHook, act } from '@testing-library/react';
import { usePixelArtHistory } from './usePixelArtHistory';

const EMPTY_2x2 = ['', '', '', ''];
const RED_2x2 = ['#ff0000', '', '', ''];
const BLUE_2x2 = ['', '', '#0000ff', ''];

describe('usePixelArtHistory', () => {
  it('initializes with empty pixels when value is blank', () => {
    const { result } = renderHook(() => usePixelArtHistory({ width: 2, height: 2, value: '' }));
    expect(result.current.pixels).toEqual(EMPTY_2x2);
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
  });

  it('commitPixels pushes onto past and enables undo', () => {
    const { result } = renderHook(() => usePixelArtHistory({ width: 2, height: 2, value: '' }));
    act(() => result.current.commitPixels(RED_2x2));
    expect(result.current.pixels).toEqual(RED_2x2);
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(false);
  });

  it('dispatchPixels updates present without growing past', () => {
    const { result } = renderHook(() => usePixelArtHistory({ width: 2, height: 2, value: '' }));
    act(() => result.current.dispatchPixels(RED_2x2));
    expect(result.current.pixels).toEqual(RED_2x2);
    expect(result.current.canUndo).toBe(false);
  });

  it('undo restores the previous commit and enables redo', () => {
    const { result } = renderHook(() => usePixelArtHistory({ width: 2, height: 2, value: '' }));
    act(() => result.current.commitPixels(RED_2x2));
    act(() => result.current.commitPixels(BLUE_2x2));
    act(() => result.current.undo());
    expect(result.current.pixels).toEqual(RED_2x2);
    expect(result.current.canRedo).toBe(true);
  });

  it('redo restores the undone commit', () => {
    const { result } = renderHook(() => usePixelArtHistory({ width: 2, height: 2, value: '' }));
    act(() => result.current.commitPixels(RED_2x2));
    act(() => result.current.undo());
    act(() => result.current.redo());
    expect(result.current.pixels).toEqual(RED_2x2);
  });

  it('undo is a no-op when past is empty', () => {
    const { result } = renderHook(() => usePixelArtHistory({ width: 2, height: 2, value: '' }));
    const before = result.current.pixels;
    act(() => result.current.undo());
    expect(result.current.pixels).toBe(before);
  });

  it('emitChange fires onChange with serialized SVG', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => usePixelArtHistory({ width: 2, height: 2, value: '', onChange }));
    act(() => result.current.emitChange(RED_2x2));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toContain('<svg');
    expect(onChange.mock.calls[0][0]).toContain('#ff0000');
  });

  it('undo fires onChange with the restored pixels', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => usePixelArtHistory({ width: 2, height: 2, value: '', onChange }));
    act(() => result.current.commitPixels(RED_2x2));
    onChange.mockClear();
    act(() => result.current.undo());
    expect(onChange).toHaveBeenCalledTimes(1);
    // restored pixels are empty — serialized SVG should not contain any fill colours
    expect(onChange.mock.calls[0][0]).not.toContain('#ff0000');
  });

  it('redo fires onChange with the redone pixels', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => usePixelArtHistory({ width: 2, height: 2, value: '', onChange }));
    act(() => result.current.commitPixels(RED_2x2));
    act(() => result.current.undo());
    onChange.mockClear();
    act(() => result.current.redo());
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toContain('#ff0000');
  });

  it('external value change syncs pixels without creating a history entry', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePixelArtHistory({ width: 2, height: 2, value }),
      { initialProps: { value: '' } },
    );
    const nextSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2" shape-rendering="crispEdges"><rect x="0" y="0" width="1" height="1" fill="#ff0000"/></svg>';
    rerender({ value: nextSvg });
    expect(result.current.pixels[0]).toBe('#ff0000');
    expect(result.current.canUndo).toBe(false);
  });

  it('commit after undo clears future (redo no longer available)', () => {
    const { result } = renderHook(() => usePixelArtHistory({ width: 2, height: 2, value: '' }));
    act(() => result.current.commitPixels(RED_2x2));
    act(() => result.current.undo());
    expect(result.current.canRedo).toBe(true);
    act(() => result.current.commitPixels(BLUE_2x2));
    expect(result.current.canRedo).toBe(false);
  });
});
