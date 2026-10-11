import React from 'react';
import styles from './ButtonGroup.module.css';

interface ButtonGroupProps {
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  className?: string;
  /**
   * Describes the group's purpose, e.g. 'Text formatting'.
   * Useful when multiple button groups appear on the same page.
   */
  'aria-label'?: string;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  align = 'end',
  className = '',
  'aria-label': ariaLabel,
}) => {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={`${styles.buttonGroup} ${styles[align]} ${className}`}
    >
      {children}
    </div>
  );
};

export default ButtonGroup;
