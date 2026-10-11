import {
  bresenhamLine,
  constrainLineTo45,
  constrainToSquare,
  rectCells,
  ellipseCells,
  triangleCells,
  floodFill,
  applyBrush,
  parseSvgToPixels,
  pixelsToSvg,
  HEX_REGEX,
} from './pixelArtUtils';

// ---------------------------------------------------------------------------
// bresenhamLine
// ---------------------------------------------------------------------------

describe('bresenhamLine', () => {
  it('single point returns [[0,0]]', () => {
    expect(bresenhamLine(0, 0, 0, 0)).toEqual([[0, 0]]);
  });

  it('horizontal line (0,0 to 3,0) includes all four points', () => {
    const pts = bresenhamLine(0, 0, 3, 0);
    expect(pts).toContainEqual([0, 0]);
    expect(pts).toContainEqual([1, 0]);
    expect(pts).toContainEqual([2, 0]);
    expect(pts).toContainEqual([3, 0]);
    expect(pts).toHaveLength(4);
  });

  it('vertical line (0,0 to 0,3) includes all four points', () => {
    const pts = bresenhamLine(0, 0, 0, 3);
    expect(pts).toContainEqual([0, 0]);
    expect(pts).toContainEqual([0, 1]);
    expect(pts).toContainEqual([0, 2]);
    expect(pts).toContainEqual([0, 3]);
    expect(pts).toHaveLength(4);
  });

  it('diagonal line (0,0 to 2,2) returns [[0,0],[1,1],[2,2]]', () => {
    expect(bresenhamLine(0, 0, 2, 2)).toEqual([[0, 0], [1, 1], [2, 2]]);
  });

  it('always includes both endpoints', () => {
    const pts = bresenhamLine(1, 3, 7, 2);
    expect(pts[0]).toEqual([1, 3]);
    expect(pts[pts.length - 1]).toEqual([7, 2]);
  });

  it('works in reverse direction (3,0 to 0,0)', () => {
    const pts = bresenhamLine(3, 0, 0, 0);
    expect(pts[0]).toEqual([3, 0]);
    expect(pts[pts.length - 1]).toEqual([0, 0]);
    expect(pts).toHaveLength(4);
  });
});

// ---------------------------------------------------------------------------
// rectCells
// ---------------------------------------------------------------------------

describe('rectCells', () => {
  it('fill mode 3x3 rect returns 9 cells', () => {
    expect(rectCells(0, 0, 2, 2, 'fill')).toHaveLength(9);
  });

  it('outline mode 3x3 rect (0,0 to 2,2) returns only border cells (8)', () => {
    const cells = rectCells(0, 0, 2, 2, 'outline');
    // 3x3 border = 8 cells (perimeter of a 3x3 grid)
    expect(cells).toHaveLength(8);
    // Interior cell (1,1) must not be present
    expect(cells).not.toContainEqual([1, 1]);
  });

  it('outline mode contains all four corners', () => {
    const cells = rectCells(0, 0, 2, 2, 'outline');
    expect(cells).toContainEqual([0, 0]);
    expect(cells).toContainEqual([2, 0]);
    expect(cells).toContainEqual([0, 2]);
    expect(cells).toContainEqual([2, 2]);
  });

  it('handles reversed coordinates (x1 < x0)', () => {
    const forward = rectCells(0, 0, 2, 2, 'fill');
    const reversed = rectCells(2, 2, 0, 0, 'fill');
    expect(reversed).toHaveLength(forward.length);
  });

  it('single cell (same coords) returns 1 cell', () => {
    expect(rectCells(3, 3, 3, 3, 'fill')).toHaveLength(1);
    expect(rectCells(3, 3, 3, 3, 'outline')).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// ellipseCells
// ---------------------------------------------------------------------------

describe('ellipseCells', () => {
  it('fill mode returns more cells than outline mode for same bounds', () => {
    const fill = ellipseCells(0, 0, 8, 8, 'fill');
    const outline = ellipseCells(0, 0, 8, 8, 'outline');
    expect(fill.length).toBeGreaterThan(outline.length);
  });

  it('no duplicate cells in fill mode', () => {
    const cells = ellipseCells(0, 0, 8, 8, 'fill');
    const keys = cells.map(([x, y]) => `${x},${y}`);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('no duplicate cells in outline mode', () => {
    const cells = ellipseCells(0, 0, 8, 8, 'outline');
    const keys = cells.map(([x, y]) => `${x},${y}`);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('works with a square bounding box', () => {
    const cells = ellipseCells(0, 0, 6, 6, 'fill');
    expect(cells.length).toBeGreaterThan(0);
  });

  it('outline mode cells are all within the bounding box', () => {
    const cells = ellipseCells(0, 0, 6, 6, 'outline');
    for (const [x, y] of cells) {
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(6);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(6);
    }
  });
});

// ---------------------------------------------------------------------------
// triangleCells
// ---------------------------------------------------------------------------

describe('triangleCells', () => {
  it('fill mode returns cells covering the interior', () => {
    const cells = triangleCells(0, 0, 8, 8, 'fill');
    expect(cells.length).toBeGreaterThan(0);
    // The apex should be present
    expect(cells).toContainEqual([4, 0]); // centred apex at top
  });

  it('outline mode returns fewer cells than fill mode', () => {
    const fill = triangleCells(0, 0, 8, 8, 'fill');
    const outline = triangleCells(0, 0, 8, 8, 'outline');
    expect(outline.length).toBeLessThan(fill.length);
  });

  it('apex is centred horizontally at the top of the bounding box', () => {
    const cells = triangleCells(0, 0, 4, 4, 'fill');
    // apex = round((0+4)/2) = 2, y = 0
    expect(cells).toContainEqual([2, 0]);
  });

  it('no duplicate cells in fill mode', () => {
    const cells = triangleCells(0, 0, 6, 6, 'fill');
    const keys = cells.map(([x, y]) => `${x},${y}`);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('no duplicate cells in outline mode', () => {
    const cells = triangleCells(0, 0, 6, 6, 'outline');
    const keys = cells.map(([x, y]) => `${x},${y}`);
    expect(new Set(keys).size).toBe(keys.length);
  });
});

// ---------------------------------------------------------------------------
// floodFill
// ---------------------------------------------------------------------------

describe('floodFill', () => {
  it('fills connected empty cells', () => {
    const pixels = new Array(9).fill('');
    const result = floodFill(pixels, 3, 3, 0, 0, '#ff0000');
    expect(result.every(c => c === '#ff0000')).toBe(true);
  });

  it('stops at cells with a different colour', () => {
    // 3x3 grid with the right column set to blue
    const pixels = [
      '', '', '#0000ff',
      '', '', '#0000ff',
      '', '', '#0000ff',
    ];
    const result = floodFill(pixels, 3, 3, 0, 0, '#ff0000');
    // Left two columns should be filled
    expect(result[0]).toBe('#ff0000');
    expect(result[4]).toBe('#ff0000');
    // Right column should remain blue
    expect(result[2]).toBe('#0000ff');
    expect(result[5]).toBe('#0000ff');
  });

  it('returns a new array (does not mutate input)', () => {
    const pixels = new Array(4).fill('');
    const result = floodFill(pixels, 2, 2, 0, 0, '#ff0000');
    expect(result).not.toBe(pixels);
    expect(pixels[0]).toBe('');
  });

  it('returns array unchanged when start cell already has fillColor', () => {
    const pixels = ['#ff0000', '#ff0000', '#ff0000', '#ff0000'];
    const result = floodFill(pixels, 2, 2, 0, 0, '#ff0000');
    expect(result).toEqual(pixels);
  });

  it('only fills the connected region, not isolated same-colour islands', () => {
    // 3x3 with a wall dividing left from right
    const pixels = [
      '', '#000000', '',
      '', '#000000', '',
      '', '#000000', '',
    ];
    const result = floodFill(pixels, 3, 3, 0, 0, '#ff0000');
    // Left column filled
    expect(result[0]).toBe('#ff0000');
    expect(result[3]).toBe('#ff0000');
    // Right column not reached
    expect(result[2]).toBe('');
    expect(result[5]).toBe('');
  });
});

// ---------------------------------------------------------------------------
// applyBrush
// ---------------------------------------------------------------------------

describe('applyBrush', () => {
  const makeGrid = (w: number, h: number) => new Array(w * h).fill('');

  it('sm brush sets exactly 1 cell', () => {
    const pixels = makeGrid(5, 5);
    const result = applyBrush(pixels, 2, 2, '#ff0000', 'sm', 5, 5);
    const painted = result.filter(c => c !== '');
    expect(painted).toHaveLength(1);
    expect(result[2 * 5 + 2]).toBe('#ff0000');
  });

  it('md brush sets 4 cells (2x2)', () => {
    const pixels = makeGrid(5, 5);
    const result = applyBrush(pixels, 1, 1, '#00ff00', 'md', 5, 5);
    const painted = result.filter(c => c !== '');
    expect(painted).toHaveLength(4);
  });

  it('lg brush sets 9 cells (3x3)', () => {
    const pixels = makeGrid(5, 5);
    const result = applyBrush(pixels, 2, 2, '#0000ff', 'lg', 5, 5);
    const painted = result.filter(c => c !== '');
    expect(painted).toHaveLength(9);
  });

  it('clamps to grid edges — no out-of-bounds writes', () => {
    const pixels = makeGrid(3, 3);
    // lg brush centred at corner (0,0): only in-bounds offsets apply
    const result = applyBrush(pixels, 0, 0, '#ff0000', 'lg', 3, 3);
    // Only (0,0),(1,0),(0,1),(1,1) are in-bounds from the lg offsets at (0,0)
    expect(result).toHaveLength(9);
    expect(result[0]).toBe('#ff0000'); // (0,0)
    expect(result[1]).toBe('#ff0000'); // (1,0)
    expect(result[3]).toBe('#ff0000'); // (0,1)
    expect(result[4]).toBe('#ff0000'); // (1,1)
  });

  it('erasing works by passing empty string as color', () => {
    const pixels = makeGrid(3, 3).fill('#ff0000');
    const result = applyBrush(pixels, 1, 1, '', 'sm', 3, 3);
    expect(result[1 * 3 + 1]).toBe('');
    // Other cells untouched
    expect(result[0]).toBe('#ff0000');
  });

  it('does not mutate the input array', () => {
    const pixels = makeGrid(3, 3);
    applyBrush(pixels, 1, 1, '#ff0000', 'sm', 3, 3);
    expect(pixels[1 * 3 + 1]).toBe('');
  });
});

// ---------------------------------------------------------------------------
// parseSvgToPixels / pixelsToSvg
// ---------------------------------------------------------------------------

describe('parseSvgToPixels', () => {
  it('empty string returns array of empty strings with correct length', () => {
    const result = parseSvgToPixels('', 4, 4);
    expect(result).toHaveLength(16);
    expect(result.every(c => c === '')).toBe(true);
  });

  it('correctly reads rect elements with x/y/fill attributes', () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 3" width="3" height="3">
  <rect x="0" y="0" width="1" height="1" fill="#ff0000"/>
  <rect x="2" y="1" width="1" height="1" fill="#0000ff"/>
</svg>`;
    const result = parseSvgToPixels(svg, 3, 3);
    expect(result[0 * 3 + 0]).toBe('#ff0000');
    expect(result[1 * 3 + 2]).toBe('#0000ff');
    expect(result[0 * 3 + 1]).toBe('');
  });

  it('ignores rect elements outside grid bounds', () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2" width="2" height="2">
  <rect x="5" y="5" width="1" height="1" fill="#ff0000"/>
</svg>`;
    const result = parseSvgToPixels(svg, 2, 2);
    expect(result.every(c => c === '')).toBe(true);
  });
});

describe('pixelsToSvg', () => {
  it('produces a string containing <svg and </svg>', () => {
    const pixels = new Array(4).fill('');
    const result = pixelsToSvg(pixels, 2, 2);
    expect(result).toContain('<svg');
    expect(result).toContain('</svg>');
  });

  it('only emits rect elements for non-empty pixels', () => {
    const pixels = ['#ff0000', '', '', ''];
    const result = pixelsToSvg(pixels, 2, 2);
    const rectCount = (result.match(/<rect/g) ?? []).length;
    expect(rectCount).toBe(1);
  });

  it('round-trip: pixelsToSvg then parseSvgToPixels returns equivalent pixels', () => {
    const original = ['#ff0000', '', '#00ff00', '#0000ff', '', '', '#ffff00', '', ''];
    const svg = pixelsToSvg(original, 3, 3);
    const roundTrip = parseSvgToPixels(svg, 3, 3);
    expect(roundTrip).toEqual(original);
  });
});

// ---------------------------------------------------------------------------
// HEX_REGEX
// ---------------------------------------------------------------------------

describe('HEX_REGEX', () => {
  it('matches a valid 6-digit hex colour #ff0000', () => {
    expect(HEX_REGEX.test('#ff0000')).toBe(true);
  });

  it('matches #000000', () => {
    expect(HEX_REGEX.test('#000000')).toBe(true);
  });

  it('matches #abcdef (lowercase letters)', () => {
    expect(HEX_REGEX.test('#abcdef')).toBe(true);
  });

  it('matches #ABCDEF (uppercase letters)', () => {
    expect(HEX_REGEX.test('#ABCDEF')).toBe(true);
  });

  it('does not match 3-digit shorthand #fff', () => {
    expect(HEX_REGEX.test('#fff')).toBe(false);
  });

  it('does not match a hex string without a leading hash (ff0000)', () => {
    expect(HEX_REGEX.test('ff0000')).toBe(false);
  });

  it('does not match an 8-digit hex with alpha (#ff0000ff)', () => {
    expect(HEX_REGEX.test('#ff0000ff')).toBe(false);
  });

  it('does not match an empty string', () => {
    expect(HEX_REGEX.test('')).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// constrainToSquare
// ---------------------------------------------------------------------------

describe('constrainToSquare', () => {
  it('wider-than-tall drag expands height to match width (down-right)', () => {
    expect(constrainToSquare([2, 2], [10, 5])).toEqual([10, 10]);
  });

  it('taller-than-wide drag expands width to match height (down-right)', () => {
    expect(constrainToSquare([2, 2], [5, 10])).toEqual([10, 10]);
  });

  it('preserves up-left direction', () => {
    expect(constrainToSquare([10, 10], [8, 3])).toEqual([3, 3]);
  });

  it('preserves up-right direction', () => {
    expect(constrainToSquare([5, 10], [9, 2])).toEqual([13, 2]);
  });

  it('preserves down-left direction', () => {
    expect(constrainToSquare([10, 5], [2, 8])).toEqual([2, 13]);
  });

  it('returns start when end equals start', () => {
    expect(constrainToSquare([4, 4], [4, 4])).toEqual([4, 4]);
  });

  it('already-square drag is unchanged', () => {
    expect(constrainToSquare([0, 0], [5, 5])).toEqual([5, 5]);
  });
});

// ---------------------------------------------------------------------------
// constrainLineTo45
// ---------------------------------------------------------------------------

describe('constrainLineTo45', () => {
  it('snaps shallow drag to horizontal', () => {
    expect(constrainLineTo45([0, 0], [10, 1])).toEqual([10, 0]);
  });

  it('snaps steep drag to vertical', () => {
    expect(constrainLineTo45([0, 0], [1, 10])).toEqual([0, 10]);
  });

  it('snaps near-diagonal drag to 45° down-right', () => {
    expect(constrainLineTo45([0, 0], [8, 7])).toEqual([7, 7]);
  });

  it('snaps 45° up-left', () => {
    expect(constrainLineTo45([10, 10], [3, 2])).toEqual([3, 3]);
  });

  it('perfect diagonal stays on diagonal', () => {
    expect(constrainLineTo45([0, 0], [5, 5])).toEqual([5, 5]);
  });

  it('start equals end returns start', () => {
    expect(constrainLineTo45([3, 3], [3, 3])).toEqual([3, 3]);
  });

  it('pure horizontal drag stays horizontal', () => {
    expect(constrainLineTo45([0, 0], [10, 0])).toEqual([10, 0]);
  });

  it('pure vertical drag stays vertical', () => {
    expect(constrainLineTo45([0, 0], [0, 10])).toEqual([0, 10]);
  });
});
