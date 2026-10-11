import React from 'react';
import { PixelArtBrushSize } from './pixelArtUtils';

export const DiagonalLine = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="3" y1="13" x2="13" y2="3" />
  </svg>
);
export const RectFilled = () => <svg width="16" height="16" viewBox="0 0 16 16"><rect x="3" y="3" width="10" height="10" fill="currentColor" /></svg>;
export const RectOutline = () => <svg width="16" height="16" viewBox="0 0 16 16"><rect x="3" y="3" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>;
export const CircleFilled = () => <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="5" fill="currentColor" /></svg>;
export const CircleOutline = () => <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>;
export const TriangleFilled = () => <svg width="16" height="16" viewBox="0 0 16 16"><polygon points="8,2 14,13 2,13" fill="currentColor" /></svg>;
export const TriangleOutline = () => <svg width="16" height="16" viewBox="0 0 16 16"><polygon points="8,2 14,13 2,13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>;
export const StarFilled = () => <svg width="16" height="16" viewBox="0 0 16 16"><polygon points="8,2 9.8,6.5 14.5,6.9 11,10.1 12.1,14.7 8,12.2 3.9,14.7 5,10.1 1.5,6.9 6.2,6.5" fill="currentColor" /></svg>;
export const StarOutline = () => <svg width="16" height="16" viewBox="0 0 16 16"><polygon points="8,2 9.8,6.5 14.5,6.9 11,10.1 12.1,14.7 8,12.2 3.9,14.7 5,10.1 1.5,6.9 6.2,6.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>;

export const BrushSm = () => <svg width="16" height="16" viewBox="0 0 16 16"><rect x="7" y="7" width="2" height="2" fill="currentColor" /></svg>;
export const BrushMd = () => <svg width="16" height="16" viewBox="0 0 16 16"><rect x="6" y="6" width="4" height="4" fill="currentColor" /></svg>;
export const BrushLg = () => <svg width="16" height="16" viewBox="0 0 16 16"><rect x="4" y="4" width="8" height="8" fill="currentColor" /></svg>;

export const BRUSH_ICONS: Record<PixelArtBrushSize, React.ComponentType> = { sm: BrushSm, md: BrushMd, lg: BrushLg };

