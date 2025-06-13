import React from 'react';
import { styles } from '@/lib/styles/common';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export function FormField({
  label,
  error,
  helperText,
  className = '',
  required,
  type = 'text',
  ...props
}: FormFieldProps) {
  const inputId = React.useId();
  const errorId = React.useId();
  const helperId = React.useId();

  return (
    <div className="space-y-1">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <input
        id={inputId}
        type={type}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={`${error ? errorId : ''} ${helperText ? helperId : ''}`}
        className={`
          ${styles.input.base}
          ${error ? styles.input.states.error : ''}
          ${props.disabled ? styles.input.states.disabled : ''}
          ${className}
        `}
        {...props}
      />

      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p id={helperId} className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
} 