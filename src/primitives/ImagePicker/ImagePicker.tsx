import React, { useRef, useState, useEffect } from 'react';
import FieldGroup from '../FieldGroup';
import FieldLabel from '../FieldLabel';
import InlineSearch from '../InlineSearch';
import Popover from '../Popover';
import styles from './ImagePicker.module.css';

// --- Types ---

export interface ImageOption {
  key: string;
  src: string;
  label: string;
}

export interface ImagePickerProps {
  value?: string;
  onChange: (key: string) => void;
  images: ImageOption[];
  label?: string;
  labelPosition?: 'top' | 'left';
  labelWidth?: number | string;
  id?: string;
}

// --- Component ---

const ImagePicker: React.FC<ImagePickerProps> = ({
  value,
  onChange,
  images,
  label,
  labelPosition = 'top',
  labelWidth,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const anchorRef = useRef<HTMLButtonElement>(null);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  const selectedImage = images.find((img) => img.key === value);

  const filteredImages = filter.trim()
    ? images.filter((img) => img.label.toLowerCase().includes(filter.toLowerCase()))
    : images;

  useEffect(() => {
    if (isOpen) {
      const input = searchWrapperRef.current?.querySelector('input');
      input?.focus();
    } else {
      setFilter('');
    }
  }, [isOpen]);

  const handleSelect = (key: string) => {
    onChange(key);
    setIsOpen(false);
  };

  const panel = (
    <div className={styles.panel}>
      <div className={styles.search} ref={searchWrapperRef}>
        <InlineSearch
          value={filter}
          onChange={setFilter}
          placeholder="Filter images…"
          icon="filter"
          clearable
        />
      </div>
      <div className={styles.list}>
        {filteredImages.length === 0 ? (
          <p className={styles.empty}>No images match</p>
        ) : (
          filteredImages.map((img) => (
            <button
              key={img.key}
              type="button"
              className={`${styles.item} ${img.key === value ? styles.itemSelected : ''}`}
              onClick={() => handleSelect(img.key)}
              aria-pressed={img.key === value}
            >
              <img src={img.src} alt={img.label} className={styles.itemImage} />
              <span className={styles.itemLabel}>{img.label}</span>
            </button>
          ))
        )}
      </div>
    </div>
  );

  const trigger = (
    <div className={styles.inputRow}>
      <button
        ref={anchorRef}
        className={styles.trigger}
        onClick={() => setIsOpen((o) => !o)}
        type="button"
        id={id}
        aria-label={selectedImage ? selectedImage.label : 'Select image'}
      >
        {selectedImage ? (
          <img src={selectedImage.src} alt={selectedImage.label} className={styles.thumbnail} />
        ) : (
          <span className={styles.placeholder} aria-hidden="true" />
        )}
        <span className={selectedImage ? styles.triggerLabel : styles.triggerLabelEmpty}>
          {selectedImage ? selectedImage.label : 'Select image'}
        </span>
      </button>
      <Popover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        anchorRef={anchorRef}
        className={styles.dropdown}
        role="dialog"
        aria-label="Image picker"
      >
        {panel}
      </Popover>
    </div>
  );

  if (label && labelPosition === 'left') {
    return (
      <FieldLabel label={label} labelPosition="left" labelWidth={labelWidth} htmlFor={id}>
        {trigger}
      </FieldLabel>
    );
  }

  return (
    <FieldGroup label={label} htmlFor={id}>
      {trigger}
    </FieldGroup>
  );
};

export default ImagePicker;
