import React from 'react';
import FieldGroup from '../FieldGroup';
import FieldLabel from '../FieldLabel';

interface LabeledFieldProps {
  label?: string;
  labelPosition?: 'top' | 'left';
  labelWidth?: number | string;
  htmlFor?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  children: React.ReactNode;
}

const LabeledField: React.FC<LabeledFieldProps> = ({
  label,
  labelPosition,
  labelWidth,
  htmlFor,
  disabled,
  error,
  helperText,
  children,
}) => {
  if (labelPosition === 'left' && label) {
    return (
      <FieldLabel label={label} labelPosition="left" labelWidth={labelWidth} htmlFor={htmlFor} disabled={disabled}>
        {children}
      </FieldLabel>
    );
  }

  return (
    <FieldGroup label={label} htmlFor={htmlFor} error={error} helperText={helperText} disabled={disabled}>
      {children}
    </FieldGroup>
  );
};

export default LabeledField;
