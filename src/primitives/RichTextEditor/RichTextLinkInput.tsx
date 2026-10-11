import React, { useState } from 'react';
import styles from './RichTextLinkInput.module.css';

interface RichTextLinkInputProps {
  onSubmit: (url: string) => void;
  onCancel: () => void;
}

const RichTextLinkInput: React.FC<RichTextLinkInputProps> = ({ onSubmit, onCancel }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <form className={styles.linkForm} onSubmit={handleSubmit}>
      <input
        type="url"
        className={styles.urlInput}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="https://"
        autoFocus
        aria-label="Link URL"
      />
      <button type="submit" className={styles.confirmButton} disabled={!url.trim()}>
        Apply
      </button>
      <button type="button" className={styles.cancelButton} onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default RichTextLinkInput;
