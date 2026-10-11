import React, { useId } from 'react';
import FieldGroup from '../FieldGroup';
import styles from './Textarea.module.css';

export interface TextareaProps {
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  rows?: number;
  resize?: 'none' | 'vertical' | 'both';
  disabled?: boolean;
  id?: string;
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  value,
  defaultValue,
  onChange,
  placeholder,
  label,
  error,
  helperText,
  rows = 4,
  resize = 'vertical',
  disabled = false,
  id,
  className = '',
}) => {
  const generatedErrorId = useId();
  const generatedHelperId = useId();
  const errorId = error ? generatedErrorId : undefined;
  const helperId = helperText && !error ? generatedHelperId : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  return (
    <FieldGroup label={label} htmlFor={id} error={error} helperText={helperText} disabled={disabled} errorId={errorId} helperId={helperId}>
      <textarea
        id={id}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        style={{ resize }}
        className={`${styles.textarea} ${error ? styles.error : ''} ${className}`.trim()}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
      />
    </FieldGroup>
  );
};

export default Textarea;
