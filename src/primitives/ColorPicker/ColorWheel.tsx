import React, { useRef, useEffect, useCallback } from 'react';

interface ColorWheelProps {
  hue: number;
  saturation: number;
  brightness: number;
  onChange: (h: number, s: number, v: number) => void;
  size?: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

const HUE_BAR_HEIGHT = 18;
const GAP = 8;

const ColorWheel: React.FC<ColorWheelProps> = ({
  hue,
  saturation,
  brightness,
  onChange,
  size = 200,
}) => {
  const svCanvasRef = useRef<HTMLCanvasElement>(null);
  const hueCanvasRef = useRef<HTMLCanvasElement>(null);
  const isDraggingRef = useRef<'sv' | 'hue' | null>(null);

  const svHeight = size;

  // Draw the saturation/brightness gradient area
  const drawSV = useCallback(() => {
    const canvas = svCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = svHeight * dpr;
    ctx.scale(dpr, dpr);

    // Base hue fill
    const [r, g, b] = hsvToRgb(hue / 360, 1, 1);
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, 0, size, svHeight);

    // White to transparent horizontal gradient (saturation)
    const whiteGrad = ctx.createLinearGradient(0, 0, size, 0);
    whiteGrad.addColorStop(0, 'rgba(255,255,255,1)');
    whiteGrad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = whiteGrad;
    ctx.fillRect(0, 0, size, svHeight);

    // Transparent to black vertical gradient (brightness)
    const blackGrad = ctx.createLinearGradient(0, 0, 0, svHeight);
    blackGrad.addColorStop(0, 'rgba(0,0,0,0)');
    blackGrad.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = blackGrad;
    ctx.fillRect(0, 0, size, svHeight);

    // Draw SV indicator
    const ix = saturation * size;
    const iy = (1 - brightness) * svHeight;
    ctx.beginPath();
    ctx.arc(ix, iy, 6, 0, Math.PI * 2);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(ix, iy, 7.5, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,0,0,0.25)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }, [hue, saturation, brightness, size, svHeight]);

  // Draw the hue bar
  const drawHue = useCallback(() => {
    const canvas = hueCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = HUE_BAR_HEIGHT * dpr;
    ctx.scale(dpr, dpr);

    // Rainbow gradient
    const grad = ctx.createLinearGradient(0, 0, size, 0);
    for (let i = 0; i <= 6; i++) {
      grad.addColorStop(i / 6, `hsl(${i * 60}, 100%, 50%)`);
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, HUE_BAR_HEIGHT);

    // Draw hue indicator
    const hx = (hue / 360) * size;
    const hy = HUE_BAR_HEIGHT / 2;
    ctx.beginPath();
    ctx.arc(hx, hy, 6, 0, Math.PI * 2);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(hx, hy, 7.5, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,0,0,0.25)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }, [hue, size]);

  useEffect(() => {
    drawSV();
  }, [drawSV]);

  useEffect(() => {
    drawHue();
  }, [drawHue]);

  const handleSVInteraction = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = svCanvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * size;
      const y = ((clientY - rect.top) / rect.height) * svHeight;
      const s = clamp(x / size, 0, 1);
      const v = clamp(1 - y / svHeight, 0, 1);
      onChange(hue, parseFloat(s.toFixed(3)), parseFloat(v.toFixed(3)));
    },
    [size, svHeight, hue, onChange],
  );

  const handleHueInteraction = useCallback(
    (clientX: number) => {
      const canvas = hueCanvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * size;
      const h = clamp((x / size) * 360, 0, 360);
      onChange(Math.round(h), saturation, brightness);
    },
    [size, saturation, brightness, onChange],
  );

  useEffect(() => {
    const svCanvas = svCanvasRef.current;
    const hueCanvas = hueCanvasRef.current;
    if (!svCanvas || !hueCanvas) return;

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (svCanvas.contains(e.target as Node)) {
        isDraggingRef.current = 'sv';
        handleSVInteraction(e.clientX, e.clientY);
      } else if (hueCanvas.contains(e.target as Node)) {
        isDraggingRef.current = 'hue';
        handleHueInteraction(e.clientX);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current === 'sv') {
        handleSVInteraction(e.clientX, e.clientY);
      } else if (isDraggingRef.current === 'hue') {
        handleHueInteraction(e.clientX);
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = null;
    };

    svCanvas.addEventListener('mousedown', handleMouseDown);
    hueCanvas.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      svCanvas.removeEventListener('mousedown', handleMouseDown);
      hueCanvas.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleSVInteraction, handleHueInteraction]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: GAP,
        width: size,
      }}
    >
      <div style={{ borderRadius: 8, overflow: 'hidden', lineHeight: 0 }}>
        <canvas
          ref={svCanvasRef}
          style={{ width: size, height: svHeight, cursor: 'crosshair', display: 'block' }}
        />
      </div>
      <div style={{ borderRadius: 6, overflow: 'hidden', lineHeight: 0 }}>
        <canvas
          ref={hueCanvasRef}
          style={{ width: size, height: HUE_BAR_HEIGHT, cursor: 'crosshair', display: 'block' }}
        />
      </div>
    </div>
  );
};

// HSV to RGB conversion
function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  let r: number, g: number, b: number;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    default: r = v; g = p; b = q; break;
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// Export utility functions for use by ColorPicker
export function hsvToHex(h: number, s: number, v: number): string {
  const rgb = hsvToRgb(h / 360, s, v);
  return '#' + rgb.map((c) => c.toString(16).padStart(2, '0')).join('');
}

export function hexToHsv(hex: string): { h: number; s: number; v: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  const v = max;
  const s = max === 0 ? 0 : d / max;
  let h = 0;
  if (d !== 0) {
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      default: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: parseFloat(s.toFixed(3)), v: parseFloat(v.toFixed(3)) };
}

export default ColorWheel;
