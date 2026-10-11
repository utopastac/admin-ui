import React from 'react';
import styles from './Radio.module.css';
import Radio from './Radio';

export interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; disabled?: boolean }[];
  name?: string;
  disabled?: boolean;
  direction?: 'vertical' | 'horizontal';
  inputPosition?: 'left' | 'right';
  className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  onChange,
  options,
  name,
  disabled = false,
  direction = 'vertical',
  inputPosition = 'left',
  className = '',
}) => {
  return (
    <div
      role="radiogroup"
      className={`${styles.group} ${styles[direction]} ${className}`}
    >
      {options.map((option) => (
        <Radio
          key={option.value}
          checked={value === option.value}
          onChange={() => onChange(option.value)}
          label={option.label}
          disabled={disabled || option.disabled}
          name={name}
          value={option.value}
          inputPosition={inputPosition}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
