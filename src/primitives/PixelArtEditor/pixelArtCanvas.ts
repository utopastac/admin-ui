/**
 * Canvas 2D drawing helpers for the PixelArtEditor grid. Each function accepts
 * an HTMLCanvasElement and renders a specific layer (committed pixels, in-progress
 * preview, or anchor markers). All functions gracefully no-op when
 * `canvas.getContext('2d')` returns null (e.g. in jsdom during tests).
 */

import { GRID_COLOR, type PixelArtSelection } from './pixelArtUtils';

/**
 * Redraws the committed pixel state onto the canvas, including the background,
 * all painted cells, and the grid lines. This is the base layer and should be
 * called whenever the committed pixel array changes.
 *
 * @param canvas - The canvas element to draw into.
 * @param pixels - Flat row-major pixel array; empty strings are treated as transparent.
 * @param logicalWidth - Grid width in cells.
 * @param logicalHeight - Grid height in cells.
 * @param cellSize - Pixel size of each grid cell on the canvas.
 */
export function drawCommitted(
  canvas: HTMLCanvasElement,
  pixels: string[],
  logicalWidth: number,
  logicalHeight: number,
  cellSize: number,
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw filled cells
  for (let i = 0; i < pixels.length; i++) {
    const color = pixels[i];
    if (!color) continue;
    const col = i % logicalWidth;
    const row = Math.floor(i / logicalWidth);
    ctx.fillStyle = color;
    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
  }

  // Draw grid lines
  ctx.strokeStyle = GRID_COLOR;
  ctx.lineWidth = 1;

  for (let col = 0; col <= logicalWidth; col++) {
    const x = col === logicalWidth ? canvas.width - 0.5 : col * cellSize + 0.5;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, logicalHeight * cellSize);
    ctx.stroke();
  }
  for (let row = 0; row <= logicalHeight; row++) {
    const y = row === logicalHeight ? canvas.height - 0.5 : row * cellSize + 0.5;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(logicalWidth * cellSize, y);
    ctx.stroke();
  }
}

/**
 * Draws a semi-transparent preview of cells that would be painted if the user
 * commits the current gesture (e.g. a shape being dragged out). Rendered at
 * `globalAlpha` 0.7 so the committed layer beneath remains visible.
 *
 * This function clears its canvas before drawing, so the preview canvas should
 * be a separate overlay element above the committed canvas.
 *
 * @param canvas - The overlay canvas element to draw into.
 * @param cells - Array of [col, row] pairs to preview.
 * @param color - Hex colour string to paint; falls back to `#000000` if empty.
 * @param cellSize - Pixel size of each grid cell on the canvas.
 */
export function drawPreview(
  canvas: HTMLCanvasElement,
  cells: Array<[number, number]>,
  color: string,
  cellSize: number,
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = color || '#000000';
  for (const [col, row] of cells) {
    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
  }
  ctx.globalAlpha = 1;
}

/**
 * Renders anchor point indicators for multi-point tools (e.g. the second
 * anchor of a line or shape). Each anchor cell is drawn as a white-filled
 * rectangle with a solid black border so it is visible against any background
 * colour.
 *
 * No-ops if there are no anchors to draw.
 *
 * @param canvas - The overlay canvas element to draw into.
 * @param anchors - Array of [col, row] pairs to mark as anchors.
 * @param cellSize - Pixel size of each grid cell on the canvas.
 */
/**
 * Draws a marching-ants selection overlay onto the given canvas. The canvas
 * should be a transparent overlay positioned above the committed and preview
 * canvases. Call this every animation frame (or on `marchingAntsOffset` tick)
 * to animate the ants.
 *
 * @param canvas - The overlay canvas element to draw into.
 * @param sel - Selection bounds in grid cell coordinates (inclusive).
 * @param cellSize - Pixel size of each grid cell on the canvas.
 * @param marchingAntsOffset - Dash offset used to animate the border (0–7).
 */
export function drawSelectionOverlay(
  canvas: HTMLCanvasElement,
  sel: PixelArtSelection,
  cellSize: number,
  marchingAntsOffset: number,
  gridWidth?: number,
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (sel.shape === 'cells') {
    const gw = gridWidth ?? Math.round(canvas.width / cellSize);
    // Semi-transparent fill
    ctx.fillStyle = 'rgba(100, 160, 255, 0.15)';
    for (const idx of sel.cells) {
      const col = idx % gw;
      const row = Math.floor(idx / gw);
      ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
    }
    // Helper: builds edge path for the entire cells boundary
    const buildEdgePath = () => {
      ctx.beginPath();
      for (const idx of sel.cells) {
        const col = idx % gw;
        const row = Math.floor(idx / gw);
        const px = col * cellSize, py = row * cellSize;
        // Top edge
        if (!sel.cells.has((row - 1) * gw + col)) {
          ctx.moveTo(px, py); ctx.lineTo(px + cellSize, py);
        }
        // Bottom edge
        if (!sel.cells.has((row + 1) * gw + col)) {
          ctx.moveTo(px, py + cellSize); ctx.lineTo(px + cellSize, py + cellSize);
        }
        // Left edge (guard against row-wrap)
        if (col === 0 || !sel.cells.has(row * gw + col - 1)) {
          ctx.moveTo(px, py); ctx.lineTo(px, py + cellSize);
        }
        // Right edge
        if (col === gw - 1 || !sel.cells.has(row * gw + col + 1)) {
          ctx.moveTo(px + cellSize, py); ctx.lineTo(px + cellSize, py + cellSize);
        }
      }
    };
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    buildEdgePath();
    ctx.stroke();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.lineDashOffset = -marchingAntsOffset;
    buildEdgePath();
    ctx.stroke();
    ctx.setLineDash([]);
    return;
  }

  const x = Math.min(sel.x1, sel.x2) * cellSize;
  const y = Math.min(sel.y1, sel.y2) * cellSize;
  const w = (Math.abs(sel.x2 - sel.x1) + 1) * cellSize;
  const h = (Math.abs(sel.y2 - sel.y1) + 1) * cellSize;

  if (sel.shape === 'ellipse') {
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(100, 160, 255, 0.15)';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.stroke();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.lineDashOffset = -marchingAntsOffset;
    ctx.stroke();
    ctx.setLineDash([]);
    return;
  }

  // rect (original logic)
  ctx.fillStyle = 'rgba(100, 160, 255, 0.15)';
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.setLineDash([]);
  ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 4]);
  ctx.lineDashOffset = -marchingAntsOffset;
  ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
  ctx.setLineDash([]);
}

export function drawAnchorDots(
  canvas: HTMLCanvasElement,
  anchors: Array<[number, number]>,
  cellSize: number,
) {
  const ctx = canvas.getContext('2d');
  if (!ctx || anchors.length === 0) return;
  for (const [col, row] of anchors) {
    const px = col * cellSize;
    const py = row * cellSize;
    // White fill with dark border so it's visible on any colour
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px, py, cellSize, cellSize);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.strokeRect(px + 0.5, py + 0.5, cellSize - 1, cellSize - 1);
  }
}
