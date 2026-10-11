/**
 * Pure geometry and pixel utility functions for the PixelArtEditor component.
 * Contains shape rasterisation, brush application, flood fill, and SVG
 * serialisation/deserialisation. Has no React dependency and no DOM access
 * except in `parseSvgToPixels`, which uses DOMParser.
 *
 * The pixels array used throughout this module is a flat, row-major array
 * where the index of cell (col, row) is: index = row * width + col.
 * An empty string at an index represents a transparent (unpainted) cell.
 */

/** Whether a shape tool paints every cell inside the bounds or only the edge cells. */
export type PixelArtFillMode = 'fill' | 'outline';

/** Named brush sizes controlling how many cells are painted per cursor position. */
export type PixelArtBrushSize = 'sm' | 'md' | 'lg';

/** Matches a valid 6-digit hex colour string (e.g. `#ff0000`). */
export const HEX_REGEX = /^#[0-9a-fA-F]{6}$/;

/**
 * The built-in colour palette shown in the editor toolbar.
 * Eight opinionated defaults covering black, white, and primary/secondary hues.
 */
export const DEFAULT_PALETTE = [
  '#000000',
  '#ffffff',
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ffff00',
  '#ff8800',
  '#8800ff',
];

/** The colour used to draw grid lines over the canvas. */
export const GRID_COLOR = '#e0e0e0';

export const BRUSH_RADIUS: Record<PixelArtBrushSize, number> = { sm: 0, md: 1, lg: 1 };

/**
 * Cell offsets (in [col, row] deltas) that each brush size paints relative to
 * the cursor position. `sm` paints only the cursor cell; `md` paints a 2×2
 * block; `lg` paints a 3×3 block.
 */
export const BRUSH_OFFSETS: Record<PixelArtBrushSize, Array<[number, number]>> = {
  sm: [[0, 0]],
  md: [[0, 0], [1, 0], [0, 1], [1, 1]],
  lg: [[-1,-1],[0,-1],[1,-1],[-1,0],[0,0],[1,0],[-1,1],[0,1],[1,1]],
};

/**
 * Returns a new pixels array with `color` applied at all cells covered by the
 * brush centred on (col, row). Cells that fall outside the grid bounds are
 * silently skipped.
 *
 * @param pixels - The current flat row-major pixel array.
 * @param col - Column index of the brush centre.
 * @param row - Row index of the brush centre.
 * @param color - Hex colour string to paint.
 * @param brushSize - Which brush preset to use.
 * @param gridWidth - Total number of columns in the grid.
 * @param gridHeight - Total number of rows in the grid.
 * @returns A new array with the painted cells updated.
 */
export function applyBrush(
  pixels: string[],
  col: number,
  row: number,
  color: string,
  brushSize: PixelArtBrushSize,
  gridWidth: number,
  gridHeight: number,
): string[] {
  const next = [...pixels];
  for (const [dc, dr] of BRUSH_OFFSETS[brushSize]) {
    const c = col + dc;
    const r = row + dr;
    if (c >= 0 && c < gridWidth && r >= 0 && r < gridHeight) {
      next[r * gridWidth + c] = color;
    }
  }
  return next;
}

/**
 * Parses an SVG string produced by `pixelsToSvg` and reconstructs the flat
 * pixel array. Each `<rect>` element's `x`/`y` attributes map to (col, row)
 * and its `fill` attribute provides the colour. Rects outside the grid bounds
 * are ignored.
 *
 * Uses `DOMParser` (available in browsers and jsdom). Returns an array of
 * empty strings on parse failure or if `svg` is empty.
 *
 * @param svg - SVG markup string to parse.
 * @param width - Grid width (number of columns).
 * @param height - Grid height (number of rows).
 * @returns Flat row-major pixel array of length width × height.
 */
export function parseSvgToPixels(svg: string, width: number, height: number): string[] {
  const pixels = new Array<string>(width * height).fill('');
  if (!svg) return pixels;

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, 'image/svg+xml');
    const rects = doc.querySelectorAll('rect');
    rects.forEach((rect) => {
      const x = parseInt(rect.getAttribute('x') ?? '0', 10);
      const y = parseInt(rect.getAttribute('y') ?? '0', 10);
      const fill = rect.getAttribute('fill') ?? '';
      if (x >= 0 && x < width && y >= 0 && y < height && fill) {
        pixels[y * width + x] = fill;
      }
    });
  } catch (err) {
    console.error('[PixelArtEditor] Failed to parse SVG value:', err);
  }
  return pixels;
}

/**
 * Serialises a flat pixel array to an SVG string. Each non-empty cell becomes
 * a `<rect>` with `x`/`y` equal to the cell's column/row and `width`/`height`
 * of 1. Empty cells (transparent) are omitted.
 *
 * @param pixels - Flat row-major pixel array.
 * @param width - Grid width (number of columns).
 * @param height - Grid height (number of rows).
 * @returns An SVG string with a `viewBox` of `0 0 width height`.
 */
export function pixelsToSvg(pixels: string[], width: number, height: number): string {
  const rects: string[] = [];
  for (let i = 0; i < pixels.length; i++) {
    const color = pixels[i];
    if (!color) continue;
    const col = i % width;
    const row = Math.floor(i / width);
    rects.push(`  <rect x="${col}" y="${row}" width="1" height="1" fill="${color}"/>`);
  }
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">`,
    ...rects,
    '</svg>',
  ].join('\n');
}

/**
 * Rasterises a straight line between two grid cells using Bresenham's
 * line algorithm. Always includes both endpoints.
 *
 * @param x0 - Column of the start cell.
 * @param y0 - Row of the start cell.
 * @param x1 - Column of the end cell.
 * @param y1 - Row of the end cell.
 * @returns Ordered array of [col, row] pairs from start to end (inclusive).
 */
export function bresenhamLine(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
): Array<[number, number]> {
  const points: Array<[number, number]> = [];
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  let cx = x0;
  let cy = y0;

  while (true) {
    points.push([cx, cy]);
    if (cx === x1 && cy === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      cx += sx;
    }
    if (e2 < dx) {
      err += dx;
      cy += sy;
    }
  }
  return points;
}

/**
 * Returns the set of grid cells that form a rectangle defined by two corner
 * cells. In `fill` mode all cells within the bounding box are included; in
 * `outline` mode only the four edges are included.
 *
 * @param x0 - Column of the first corner.
 * @param y0 - Row of the first corner.
 * @param x1 - Column of the opposite corner.
 * @param y1 - Row of the opposite corner.
 * @param fillMode - `'fill'` (default) or `'outline'`.
 * @returns Array of [col, row] pairs.
 */
export function rectCells(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  fillMode: PixelArtFillMode = 'fill',
): Array<[number, number]> {
  const minX = Math.min(x0, x1);
  const maxX = Math.max(x0, x1);
  const minY = Math.min(y0, y1);
  const maxY = Math.max(y0, y1);
  const cells: Array<[number, number]> = [];
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      if (fillMode === 'fill' || x === minX || x === maxX || y === minY || y === maxY) {
        cells.push([x, y]);
      }
    }
  }
  return cells;
}

/**
 * Returns the set of grid cells that form an ellipse fitted inside the
 * bounding box defined by two corner cells.
 *
 * In `fill` mode a full row-scan is used. In `outline` mode two passes are
 * performed — a row scan for left/right boundary cells and a column scan for
 * top/bottom boundary cells — to ensure the outline has no gaps at the
 * horizontal and vertical extremes.
 *
 * @param x0 - Column of the first corner.
 * @param y0 - Row of the first corner.
 * @param x1 - Column of the opposite corner.
 * @param y1 - Row of the opposite corner.
 * @param fillMode - `'fill'` (default) or `'outline'`.
 * @returns Deduplicated array of [col, row] pairs.
 */
export function ellipseCells(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  fillMode: PixelArtFillMode = 'fill',
): Array<[number, number]> {
  const minX = Math.min(x0, x1);
  const maxX = Math.max(x0, x1);
  const minY = Math.min(y0, y1);
  const maxY = Math.max(y0, y1);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const rx = (maxX - minX) / 2;
  const ry = (maxY - minY) / 2;

  const seen = new Set<number>();
  const cells: Array<[number, number]> = [];
  const add = (x: number, y: number) => {
    const key = y * 100000 + x;
    if (!seen.has(key)) { seen.add(key); cells.push([x, y]); }
  };

  // Scan each row for left/right boundary
  for (let row = minY; row <= maxY; row++) {
    const dy = ry === 0 ? 0 : (row - cy) / ry;
    if (Math.abs(dy) > 1) continue;
    const dxf = rx * Math.sqrt(Math.max(0, 1 - dy * dy));
    const lx = Math.round(cx - dxf);
    const rx2 = Math.round(cx + dxf);
    if (fillMode === 'fill') {
      for (let x = lx; x <= rx2; x++) add(x, row);
    } else {
      add(lx, row);
      if (rx2 !== lx) add(rx2, row);
    }
  }

  // For outline: also scan each column for top/bottom boundary to fill gaps
  if (fillMode === 'outline') {
    for (let col = minX; col <= maxX; col++) {
      const dx = rx === 0 ? 0 : (col - cx) / rx;
      if (Math.abs(dx) > 1) continue;
      const dyf = ry * Math.sqrt(Math.max(0, 1 - dx * dx));
      add(col, Math.round(cy - dyf));
      add(col, Math.round(cy + dyf));
    }
  }

  return cells;
}

/**
 * Returns the set of grid cells that form an isosceles triangle whose apex is
 * centred at the top of the bounding box and whose base spans the bottom edge.
 *
 * In `outline` mode the three edges are drawn with `bresenhamLine`; in `fill`
 * mode the interior is filled row by row using linear interpolation.
 *
 * @param x0 - Column of the first corner of the bounding box.
 * @param y0 - Row of the first corner of the bounding box.
 * @param x1 - Column of the opposite corner of the bounding box.
 * @param y1 - Row of the opposite corner of the bounding box.
 * @param fillMode - `'fill'` (default) or `'outline'`.
 * @returns Deduplicated array of [col, row] pairs.
 */
export function triangleCells(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  fillMode: PixelArtFillMode = 'fill',
): Array<[number, number]> {
  const minX = Math.min(x0, x1);
  const maxX = Math.max(x0, x1);
  const minY = Math.min(y0, y1);
  const maxY = Math.max(y0, y1);

  const apexX = Math.round((minX + maxX) / 2);
  const apexY = minY;
  const blX = minX, blY = maxY;
  const brX = maxX, brY = maxY;

  const seen = new Set<number>();
  const cells: Array<[number, number]> = [];
  const addUniq = (x: number, y: number) => {
    const k = y * 100000 + x;
    if (!seen.has(k)) { seen.add(k); cells.push([x, y]); }
  };

  if (fillMode === 'outline') {
    for (const [x, y] of bresenhamLine(apexX, apexY, blX, blY)) addUniq(x, y);
    for (const [x, y] of bresenhamLine(apexX, apexY, brX, brY)) addUniq(x, y);
    for (const [x, y] of bresenhamLine(blX, blY, brX, brY)) addUniq(x, y);
    return cells;
  }

  for (let y = minY; y <= maxY; y++) {
    const t = maxY === minY ? 0 : (y - minY) / (maxY - minY);
    const lx = Math.round(apexX + t * (blX - apexX));
    const rx = Math.round(apexX + t * (brX - apexX));
    for (let x = Math.min(lx, rx); x <= Math.max(lx, rx); x++) addUniq(x, y);
  }
  return cells;
}

/**
 * Returns the set of grid cells that form a 5-pointed star fitted inside the
 * bounding box defined by two corner cells.
 *
 * The star is computed from 10 alternating outer/inner vertices. The inner
 * radius is `outerR × 0.382` (the reciprocal of the golden ratio), which
 * produces a classic proportioned star. The outer radius is half the smaller
 * dimension of the bounding box.
 *
 * In `outline` mode the 10 edges between consecutive vertices are drawn with
 * `bresenhamLine`; in `fill` mode the interior is filled using a scanline
 * even-odd intersection algorithm.
 *
 * @param x0 - Column of the first corner of the bounding box.
 * @param y0 - Row of the first corner of the bounding box.
 * @param x1 - Column of the opposite corner of the bounding box.
 * @param y1 - Row of the opposite corner of the bounding box.
 * @param fillMode - `'fill'` (default) or `'outline'`.
 * @returns Deduplicated array of [col, row] pairs.
 */
export function starCells(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  fillMode: PixelArtFillMode = 'fill',
): Array<[number, number]> {
  const minX = Math.min(x0, x1);
  const maxX = Math.max(x0, x1);
  const minY = Math.min(y0, y1);
  const maxY = Math.max(y0, y1);

  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const outerR = Math.min(maxX - minX, maxY - minY) / 2;
  const innerR = outerR * 0.382;

  const pts: Array<[number, number]> = [];
  for (let i = 0; i < 10; i++) {
    const angle = (i * Math.PI / 5) - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    pts.push([Math.round(cx + r * Math.cos(angle)), Math.round(cy + r * Math.sin(angle))]);
  }

  const seen = new Set<number>();
  const cells: Array<[number, number]> = [];
  const addUniq = (x: number, y: number) => {
    const k = y * 100000 + x;
    if (!seen.has(k)) { seen.add(k); cells.push([x, y]); }
  };

  if (fillMode === 'outline') {
    for (let i = 0; i < pts.length; i++) {
      const [ax, ay] = pts[i];
      const [bx, by] = pts[(i + 1) % pts.length];
      for (const [x, y] of bresenhamLine(ax, ay, bx, by)) addUniq(x, y);
    }
    return cells;
  }

  const minPY = Math.min(...pts.map(([, y]) => y));
  const maxPY = Math.max(...pts.map(([, y]) => y));
  for (let y = minPY; y <= maxPY; y++) {
    const xs: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      const [ax, ay] = pts[i];
      const [bx, by] = pts[(i + 1) % pts.length];
      if ((ay <= y && by > y) || (by <= y && ay > y)) {
        xs.push(ax + ((y - ay) / (by - ay)) * (bx - ax));
      }
    }
    xs.sort((a, b) => a - b);
    for (let i = 0; i + 1 < xs.length; i += 2) {
      for (let x = Math.round(xs[i]); x <= Math.round(xs[i + 1]); x++) addUniq(x, y);
    }
  }
  return cells;
}

/**
 * Performs a 4-connected flood fill starting from (startCol, startRow),
 * replacing all contiguous cells that share the same colour as the start cell
 * with `fillColor`.
 *
 * Returns the input array unchanged if the start cell already contains
 * `fillColor` (no-op guard to prevent infinite loops).
 *
 * @param pixels - The current flat row-major pixel array.
 * @param width - Grid width (number of columns).
 * @param height - Grid height (number of rows).
 * @param startCol - Column of the seed cell.
 * @param startRow - Row of the seed cell.
 * @param fillColor - Hex colour string to flood with.
 * @returns A new array with affected cells updated, or the original array if
 *   `targetColor === fillColor`.
 */
export function floodFill(
  pixels: string[],
  width: number,
  height: number,
  startCol: number,
  startRow: number,
  fillColor: string,
): string[] {
  const next = [...pixels];
  const targetColor = next[startRow * width + startCol];
  if (targetColor === fillColor) return next;

  const queue: Array<[number, number]> = [[startCol, startRow]];
  const visited = new Set<number>();

  while (queue.length > 0) {
    const [col, row] = queue.shift()!;
    const idx = row * width + col;
    if (col < 0 || col >= width || row < 0 || row >= height) continue;
    if (visited.has(idx)) continue;
    if (next[idx] !== targetColor) continue;

    visited.add(idx);
    next[idx] = fillColor;

    queue.push([col + 1, row], [col - 1, row], [col, row + 1], [col, row - 1]);
  }

  return next;
}

// ── Marching ants animation constants ─────────────────────────────────────────

/** Number of animation positions in one marching-ants cycle (matches the total dash+gap length in drawSelectionOverlay). */
export const MARCHING_ANTS_STEPS = 8;

/** Milliseconds between each marching-ants animation tick. */
export const MARCHING_ANTS_INTERVAL_MS = 80;

// ── Selection type ─────────────────────────────────────────────────────────────

/** A selection in grid-cell coordinates. All variants carry a bounding box (x1/y1/x2/y2, inclusive). */
export type PixelArtSelection =
  | { shape: 'rect';    x1: number; y1: number; x2: number; y2: number }
  | { shape: 'ellipse'; x1: number; y1: number; x2: number; y2: number }
  | { shape: 'cells';   cells: ReadonlySet<number>; x1: number; y1: number; x2: number; y2: number };

/**
 * 4-connected flood select from (startCol, startRow). Returns a ReadonlySet of
 * flat pixel indices (row * width + col) that are contiguous with and share the
 * same colour as the start cell. The start cell is always included.
 */
export function floodSelect(
  pixels: string[],
  width: number,
  height: number,
  startCol: number,
  startRow: number,
): ReadonlySet<number> {
  const targetColor = pixels[startRow * width + startCol];
  const visited = new Set<number>();
  const queue: Array<[number, number]> = [[startCol, startRow]];
  while (queue.length > 0) {
    const [col, row] = queue.shift()!;
    if (col < 0 || col >= width || row < 0 || row >= height) continue;
    const idx = row * width + col;
    if (visited.has(idx)) continue;
    if (pixels[idx] !== targetColor) continue;
    visited.add(idx);
    queue.push([col + 1, row], [col - 1, row], [col, row + 1], [col, row - 1]);
  }
  return visited;
}

// ── Shape tool helpers ─────────────────────────────────────────────────────────

/** The tools that produce geometry from a drag (start → end). */
export const SHAPE_TOOLS = ['line', 'rect', 'circle', 'triangle', 'star'] as const;
export type PixelArtShapeTool = (typeof SHAPE_TOOLS)[number];

/** Type guard: returns true when `tool` is one of the shape tools. */
export function isShapeTool(tool: string): tool is PixelArtShapeTool {
  return (SHAPE_TOOLS as readonly string[]).includes(tool);
}

/**
 * Returns the grid cells that a shape tool would rasterise between `start` and
 * `end`. Used for both preview rendering and pixel commitment.
 */
export function getShapeCells(
  tool: PixelArtShapeTool,
  start: [number, number],
  end: [number, number],
  fillModes: { rect: PixelArtFillMode; circle: PixelArtFillMode; triangle: PixelArtFillMode; star: PixelArtFillMode },
): [number, number][] {
  const [sx, sy] = start;
  const [ex, ey] = end;
  switch (tool) {
    case 'line':     return bresenhamLine(sx, sy, ex, ey);
    case 'rect':     return rectCells(sx, sy, ex, ey, fillModes.rect);
    case 'circle':   return ellipseCells(sx, sy, ex, ey, fillModes.circle);
    case 'triangle': return triangleCells(sx, sy, ex, ey, fillModes.triangle);
    case 'star':     return starCells(sx, sy, ex, ey, fillModes.star);
  }
}

// ── Shift-key proportion constraints ──────────────────────────────────────────

/**
 * Adjusts `end` so the drag forms a square (equal |dx| and |dy|) while
 * preserving the original drag direction. Used when the user holds shift while
 * dragging a rect/circle/triangle/star or a rect/ellipse selection.
 */
export function constrainToSquare(
  start: [number, number],
  end: [number, number],
): [number, number] {
  const [sx, sy] = start;
  const [ex, ey] = end;
  const dx = ex - sx;
  const dy = ey - sy;
  const d = Math.max(Math.abs(dx), Math.abs(dy));
  const sxDir = dx >= 0 ? 1 : -1;
  const syDir = dy >= 0 ? 1 : -1;
  return [sx + d * sxDir, sy + d * syDir];
}

/**
 * Snaps a line from `start` to the nearest 0° / 45° / 90° increment, preserving
 * direction. Used when the user holds shift while dragging the line tool:
 * shallow drags become horizontal, steep drags become vertical, and near-diagonal
 * drags become 45°.
 */
export function constrainLineTo45(
  start: [number, number],
  end: [number, number],
): [number, number] {
  const [sx, sy] = start;
  const [ex, ey] = end;
  const dx = ex - sx;
  const dy = ey - sy;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);
  // Thresholds at tan(22.5°) ≈ 0.414 and tan(67.5°) ≈ 2.414 bisect the octants.
  const tan22_5 = Math.tan(Math.PI / 8);
  const tan67_5 = Math.tan((3 * Math.PI) / 8);
  if (absDx === 0 && absDy === 0) return [sx, sy];
  if (absDx === 0) return [sx, ey];
  const ratio = absDy / absDx;
  if (ratio < tan22_5) return [ex, sy];     // horizontal
  if (ratio > tan67_5) return [sx, ey];     // vertical
  const d = Math.min(absDx, absDy);         // 45°
  const sxDir = dx >= 0 ? 1 : -1;
  const syDir = dy >= 0 ? 1 : -1;
  return [sx + d * sxDir, sy + d * syDir];
}

// ── Selection masking ──────────────────────────────────────────────────────────

/**
 * Returns a new pixel array where changes made in `next` relative to `base` are
 * restricted to one side of `selection`. When `keepInside` is true only changes
 * inside the selection rectangle are retained; when false only changes outside
 * are retained. Returns `next` unchanged when `selection` is null.
 *
 * @param next       - Candidate pixel array (result of a draw operation).
 * @param base       - Original pixel array before the draw operation.
 * @param gridWidth  - Number of columns in the grid.
 * @param selection  - Active rectangular selection, or null for no constraint.
 * @param keepInside - True to keep only inside changes; false to keep only outside.
 */
export function maskToSelection(
  next: string[],
  base: string[],
  gridWidth: number,
  selection: PixelArtSelection | null,
  keepInside: boolean,
): string[] {
  if (!selection) return next;
  const result = [...next];

  if (selection.shape === 'cells') {
    for (let i = 0; i < result.length; i++) {
      const inside = selection.cells.has(i);
      if (inside !== keepInside) result[i] = base[i];
    }
    return result;
  }

  const minX = Math.min(selection.x1, selection.x2);
  const maxX = Math.max(selection.x1, selection.x2);
  const minY = Math.min(selection.y1, selection.y2);
  const maxY = Math.max(selection.y1, selection.y2);

  for (let i = 0; i < result.length; i++) {
    const c = i % gridWidth;
    const r = Math.floor(i / gridWidth);
    const inBounds = c >= minX && c <= maxX && r >= minY && r <= maxY;
    let inside: boolean;
    if (!inBounds) {
      inside = false;
    } else if (selection.shape === 'rect') {
      inside = true;
    } else {
      // ellipse
      const cx = (minX + maxX) / 2;
      const cy = (minY + maxY) / 2;
      const rx = (maxX - minX) / 2 + 0.5;
      const ry = (maxY - minY) / 2 + 0.5;
      const dx = c - cx, dy = r - cy;
      inside = rx <= 0 || ry <= 0 ? true : (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1;
    }
    if (inside !== keepInside) result[i] = base[i];
  }
  return result;
}
