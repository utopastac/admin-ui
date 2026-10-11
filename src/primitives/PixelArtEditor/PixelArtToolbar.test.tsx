import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PixelArtToolbar, { type PixelArtToolbarProps } from './PixelArtToolbar';
import type { PixelArtTool } from './PixelArtEditor';
import type { PixelArtBrushSize, PixelArtFillMode } from './pixelArtUtils';

type OverrideProps = Partial<PixelArtToolbarProps>;

function renderToolbar(overrides: OverrideProps = {}) {
  const captured = {
    activeTool: 'paint' as PixelArtTool,
    activeColor: '#ff0000',
    brushSize: 'sm' as PixelArtBrushSize,
    rectFillMode: 'outline' as PixelArtFillMode,
    circleFillMode: 'outline' as PixelArtFillMode,
    triangleFillMode: 'outline' as PixelArtFillMode,
    starFillMode: 'outline' as PixelArtFillMode,
    marqueeShape: 'rect' as 'rect' | 'ellipse' | 'wand',
    lastShape: 'rect' as 'rect' | 'circle' | 'triangle' | 'star',
    customColors: [] as string[],
    independentHue: null as number | null,
  };
  const onUndo = vi.fn();
  const onRedo = vi.fn();
  const onDownloadSvg = vi.fn();
  const onDownloadPng = vi.fn();
  const onClearCanvas = vi.fn();
  const onPickSize = vi.fn();
  const cancelPenPath = vi.fn();

  const Wrapper: React.FC = () => {
    const [activeTool, setActiveTool] = useState<PixelArtTool>(captured.activeTool);
    const [activeColor, setActiveColor] = useState(captured.activeColor);
    const [brushSize, setBrushSize] = useState<PixelArtBrushSize>(captured.brushSize);
    const [rectFillMode, setRectFillMode] = useState<PixelArtFillMode>(captured.rectFillMode);
    const [circleFillMode, setCircleFillMode] = useState<PixelArtFillMode>(captured.circleFillMode);
    const [triangleFillMode, setTriangleFillMode] = useState<PixelArtFillMode>(captured.triangleFillMode);
    const [starFillMode, setStarFillMode] = useState<PixelArtFillMode>(captured.starFillMode);
    const [marqueeShape, setMarqueeShape] = useState<'rect' | 'ellipse' | 'wand'>(captured.marqueeShape);
    const [lastShape, setLastShape] = useState<'rect' | 'circle' | 'triangle' | 'star'>(captured.lastShape);
    const [customColors, setCustomColors] = useState<string[]>(captured.customColors);
    const [independentHue, setIndependentHue] = useState<number | null>(captured.independentHue);

    captured.activeTool = activeTool;
    captured.activeColor = activeColor;

    return (
      <PixelArtToolbar
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        activeColor={activeColor}
        setActiveColor={setActiveColor}
        palette={['#000000', '#ffffff', '#ff0000']}
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
        canUndo={overrides.canUndo ?? false}
        canRedo={overrides.canRedo ?? false}
        onUndo={onUndo}
        onRedo={onRedo}
        onDownloadSvg={onDownloadSvg}
        onDownloadPng={onDownloadPng}
        onClearCanvas={onClearCanvas}
        sizes={overrides.sizes}
        currentSize={overrides.currentSize}
        onPickSize={onPickSize}
        cancelPenPath={cancelPenPath}
      />
    );
  };

  render(<Wrapper />);
  return { captured, onUndo, onRedo, onDownloadSvg, onDownloadPng, onClearCanvas, onPickSize, cancelPenPath };
}

describe('PixelArtToolbar', () => {
  it('renders all primary tool buttons with accessible names', () => {
    renderToolbar();
    expect(screen.getByRole('button', { name: 'Paint' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Eraser' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Fill' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Line' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pen' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Marquee selection' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Shapes' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Eyedropper' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Download' })).toBeInTheDocument();
  });

  it('clicking Fill switches active tool to fill', async () => {
    const user = userEvent.setup();
    const { captured, cancelPenPath } = renderToolbar();
    await user.click(screen.getByRole('button', { name: 'Fill' }));
    expect(captured.activeTool).toBe('fill');
    expect(cancelPenPath).toHaveBeenCalled();
  });

  it('clicking Pen does not invoke cancelPenPath', async () => {
    const user = userEvent.setup();
    const { captured, cancelPenPath } = renderToolbar();
    await user.click(screen.getByRole('button', { name: 'Pen' }));
    expect(captured.activeTool).toBe('pen');
    expect(cancelPenPath).not.toHaveBeenCalled();
  });

  it('undo button is disabled when canUndo is false', () => {
    renderToolbar({ canUndo: false });
    expect(screen.getByRole('button', { name: 'Undo' })).toBeDisabled();
  });

  it('undo button is enabled and fires onUndo when canUndo is true', async () => {
    const user = userEvent.setup();
    const { onUndo } = renderToolbar({ canUndo: true });
    await user.click(screen.getByRole('button', { name: 'Undo' }));
    expect(onUndo).toHaveBeenCalledTimes(1);
  });

  it('redo button is enabled and fires onRedo when canRedo is true', async () => {
    const user = userEvent.setup();
    const { onRedo } = renderToolbar({ canRedo: true });
    await user.click(screen.getByRole('button', { name: 'Redo' }));
    expect(onRedo).toHaveBeenCalledTimes(1);
  });

  it('download button does not fire download handlers directly', async () => {
    const user = userEvent.setup();
    const { onDownloadSvg, onDownloadPng } = renderToolbar();
    await user.click(screen.getByRole('button', { name: 'Download' }));
    expect(onDownloadSvg).not.toHaveBeenCalled();
    expect(onDownloadPng).not.toHaveBeenCalled();
  });

  it('download button opens a menu exposing SVG and PNG options', async () => {
    const user = userEvent.setup();
    renderToolbar();
    await user.click(screen.getByRole('button', { name: 'Download' }));
    expect(screen.getByRole('menuitem', { name: 'Download SVG' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Download PNG' })).toBeInTheDocument();
  });

  it('Download SVG menu item fires onDownloadSvg', async () => {
    const user = userEvent.setup();
    const { onDownloadSvg, onDownloadPng } = renderToolbar();
    await user.click(screen.getByRole('button', { name: 'Download' }));
    await user.click(screen.getByRole('menuitem', { name: 'Download SVG' }));
    expect(onDownloadSvg).toHaveBeenCalledTimes(1);
    expect(onDownloadPng).not.toHaveBeenCalled();
  });

  it('Download PNG menu item fires onDownloadPng', async () => {
    const user = userEvent.setup();
    const { onDownloadPng, onDownloadSvg } = renderToolbar();
    await user.click(screen.getByRole('button', { name: 'Download' }));
    await user.click(screen.getByRole('menuitem', { name: 'Download PNG' }));
    expect(onDownloadPng).toHaveBeenCalledTimes(1);
    expect(onDownloadSvg).not.toHaveBeenCalled();
  });

  it('clear canvas button fires onClearCanvas', async () => {
    const user = userEvent.setup();
    const { onClearCanvas } = renderToolbar();
    await user.click(screen.getByRole('button', { name: 'Clear canvas' }));
    expect(onClearCanvas).toHaveBeenCalledTimes(1);
  });

  it('does not render a clear-selection button', () => {
    renderToolbar();
    expect(screen.queryByRole('button', { name: 'Clear selection' })).not.toBeInTheDocument();
  });

  it('clicking a palette swatch sets active color', async () => {
    const user = userEvent.setup();
    const { captured } = renderToolbar();
    await user.click(screen.getByRole('button', { name: 'Select color #ffffff' }));
    expect(captured.activeColor).toBe('#ffffff');
  });

  it('toolbar is labelled as Pixel art tools', () => {
    renderToolbar();
    expect(screen.getByRole('toolbar', { name: 'Pixel art tools' })).toBeInTheDocument();
  });

  describe('grid size picker', () => {
    it('is not rendered when `sizes` prop is omitted', () => {
      renderToolbar();
      expect(screen.queryByRole('button', { name: 'Grid size' })).not.toBeInTheDocument();
    });

    it('is not rendered when `sizes` is an empty array', () => {
      renderToolbar({ sizes: [] });
      expect(screen.queryByRole('button', { name: 'Grid size' })).not.toBeInTheDocument();
    });

    it('renders a Grid size button when `sizes` is provided', () => {
      renderToolbar({ sizes: [8, 16, 32, 64] });
      expect(screen.getByRole('button', { name: 'Grid size' })).toBeInTheDocument();
    });

    it('opens a menu with all provided sizes on click', async () => {
      const user = userEvent.setup();
      renderToolbar({ sizes: [8, 16, 32, 64] });
      await user.click(screen.getByRole('button', { name: 'Grid size' }));
      expect(screen.getByRole('menuitemradio', { name: '8 × 8' })).toBeInTheDocument();
      expect(screen.getByRole('menuitemradio', { name: '16 × 16' })).toBeInTheDocument();
      expect(screen.getByRole('menuitemradio', { name: '32 × 32' })).toBeInTheDocument();
      expect(screen.getByRole('menuitemradio', { name: '64 × 64' })).toBeInTheDocument();
    });

    it('marks the current size as checked in the menu', async () => {
      const user = userEvent.setup();
      renderToolbar({ sizes: [8, 16, 32, 64], currentSize: 16 });
      await user.click(screen.getByRole('button', { name: 'Grid size' }));
      expect(screen.getByRole('menuitemradio', { name: '16 × 16' })).toHaveAttribute('aria-checked', 'true');
      expect(screen.getByRole('menuitemradio', { name: '8 × 8' })).toHaveAttribute('aria-checked', 'false');
    });

    it('fires onPickSize with the chosen size', async () => {
      const user = userEvent.setup();
      const { onPickSize } = renderToolbar({ sizes: [8, 16, 32, 64] });
      await user.click(screen.getByRole('button', { name: 'Grid size' }));
      await user.click(screen.getByRole('menuitemradio', { name: '32 × 32' }));
      expect(onPickSize).toHaveBeenCalledWith(32);
    });
  });
});
