import React from 'react';
import { Search, ListFilter, X } from 'lucide-react';
import styles from './InlineSearch.module.css';

interface InlineSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: 'search' | 'filter';
  clearable?: boolean;
  id?: string;
  className?: string;
  onBlur?: () => void;
}

const InlineSearch: React.FC<InlineSearchProps> = ({
  value,
  onChange,
  placeholder,
  icon = 'search',
  clearable = true,
  id,
  className = '',
  onBlur,
}) => {
  const IconComponent = icon === 'filter' ? ListFilter : Search;

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <IconComponent size={14} className={styles.icon} />
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={styles.input}
        aria-label={placeholder ?? 'Search'}
      />
      {clearable && value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className={styles.clearButton}
          aria-label="Clear"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export default InlineSearch;
