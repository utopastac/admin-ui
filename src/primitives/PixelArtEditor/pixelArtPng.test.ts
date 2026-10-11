import { pixelsToPngBlob } from './pixelArtPng';

interface FakeCtx {
  fillStyle: string;
  fillRectCalls: Array<[number, number, number, number, string]>;
  fillRect: (x: number, y: number, w: number, h: number) => void;
}

function installCanvasMocks(opts: { toBlobReturnsNull?: boolean } = {}) {
  const fakeContext: FakeCtx = {
    fillStyle: '',
    fillRectCalls: [],
    fillRect(x, y, w, h) {
      this.fillRectCalls.push([x, y, w, h, this.fillStyle]);
    },
  };

  const originalGetContext = HTMLCanvasElement.prototype.getContext;
  const originalToBlob = HTMLCanvasElement.prototype.toBlob;

  HTMLCanvasElement.prototype.getContext = function () {
    return fakeContext as unknown as CanvasRenderingContext2D;
  } as HTMLCanvasElement['getContext'];

  HTMLCanvasElement.prototype.toBlob = function (cb: BlobCallback, type?: string) {
    const blob = opts.toBlobReturnsNull
      ? null
      : new Blob(['fake-png'], { type: type ?? 'image/png' });
    cb(blob);
  } as HTMLCanvasElement['toBlob'];

  return {
    fakeContext,
    restore: () => {
      HTMLCanvasElement.prototype.getContext = originalGetContext;
      HTMLCanvasElement.prototype.toBlob = originalToBlob;
    },
  };
}

describe('pixelsToPngBlob', () => {
  it('returns a Blob with image/png MIME type', async () => {
    const mocks = installCanvasMocks();
    try {
      const pixels = ['#ff0000', '', '', '#0000ff'];
      const blob = await pixelsToPngBlob(pixels, 2, 2, 8);
      expect(blob).toBeInstanceOf(Blob);
      expect(blob.type).toBe('image/png');
    } finally {
      mocks.restore();
    }
  });

  it('sizes the canvas to width*scale x height*scale', async () => {
    const mocks = installCanvasMocks();
    const createSpy = vi.spyOn(document, 'createElement');
    try {
      const pixels = new Array(16).fill('');
      await pixelsToPngBlob(pixels, 4, 4, 10);
      const canvas = createSpy.mock.results[0].value as HTMLCanvasElement;
      expect(canvas.width).toBe(40);
      expect(canvas.height).toBe(40);
    } finally {
      createSpy.mockRestore();
      mocks.restore();
    }
  });

  it('only paints non-empty cells (empty cells left transparent)', async () => {
    const mocks = installCanvasMocks();
    try {
      // 2x2 grid: top-left red, bottom-right blue, others empty
      const pixels = ['#ff0000', '', '', '#0000ff'];
      await pixelsToPngBlob(pixels, 2, 2, 1);
      expect(mocks.fakeContext.fillRectCalls).toHaveLength(2);
      expect(mocks.fakeContext.fillRectCalls[0]).toEqual([0, 0, 1, 1, '#ff0000']);
      expect(mocks.fakeContext.fillRectCalls[1]).toEqual([1, 1, 1, 1, '#0000ff']);
    } finally {
      mocks.restore();
    }
  });

  it('applies scale to cell coordinates and size', async () => {
    const mocks = installCanvasMocks();
    try {
      // (1,0) cell in a 2x1 grid at scale 8 → fillRect(8, 0, 8, 8)
      await pixelsToPngBlob(['', '#00ff00'], 2, 1, 8);
      expect(mocks.fakeContext.fillRectCalls).toHaveLength(1);
      expect(mocks.fakeContext.fillRectCalls[0]).toEqual([8, 0, 8, 8, '#00ff00']);
    } finally {
      mocks.restore();
    }
  });

  it('rejects when toBlob returns null', async () => {
    const mocks = installCanvasMocks({ toBlobReturnsNull: true });
    try {
      await expect(pixelsToPngBlob(['#ff0000'], 1, 1, 4)).rejects.toThrow(
        /canvas\.toBlob returned null/,
      );
    } finally {
      mocks.restore();
    }
  });

  it('throws on invalid scale', async () => {
    await expect(pixelsToPngBlob([''], 1, 1, 0)).rejects.toThrow(/scale must be >= 1/);
    await expect(pixelsToPngBlob([''], 1, 1, NaN)).rejects.toThrow(/scale must be >= 1/);
  });
});
