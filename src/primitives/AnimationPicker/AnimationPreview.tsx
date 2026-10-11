import React, { useRef, useEffect, useCallback } from 'react';
import { RotateCcw } from 'lucide-react';
import ToolbarButton from '../ToolbarButton';
import styles from './AnimationPreview.module.css';

interface AnimationPreviewProps {
  duration: number;
  timingFunction: string;
}

const AnimationPreview: React.FC<AnimationPreviewProps> = ({ duration, timingFunction }) => {
  const boxRef = useRef<HTMLDivElement>(null);

  const replay = useCallback(() => {
    const box = boxRef.current;
    if (!box) return;
    // Snap back to start with no transition
    box.style.transition = 'none';
    box.style.left = 'var(--admin-space-xs)';
    // Force reflow so the browser commits the snap before the next style change
    void box.getBoundingClientRect();
    // Now animate forward
    box.style.transition = `left ${duration}ms ${timingFunction}`;
    box.style.left = 'calc(100% - var(--admin-space-xl))';
  }, [duration, timingFunction]);

  useEffect(() => {
    const id = setTimeout(replay, 300);
    return () => clearTimeout(id);
  }, [replay]);

  return (
    <div className={styles.previewContainer}>
      <div className={styles.previewTrack}>
        <div ref={boxRef} className={styles.previewBox} />
      </div>
      <ToolbarButton icon={RotateCcw} onClick={replay} size="sm" aria-label="Replay preview" />
    </div>
  );
};

export default AnimationPreview;
