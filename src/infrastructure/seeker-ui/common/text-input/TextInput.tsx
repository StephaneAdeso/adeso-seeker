import * as React from 'react';
import './TextInput.css';

interface SkrTextInputProps {
  //TODO: add label prop and aria-label
  className?: string;
  value: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  borderColor?: string;
  textColor?: string;
  backgroundColor?: string;
}

export const SkrTextInput: React.FC<SkrTextInputProps> = ({
  className = '',
  value,
  onChange,
  onFocus,
  onBlur,
  borderColor,
  textColor,
  backgroundColor
}) => {
  const inputStyles: React.CSSProperties = {
    borderColor,
    color: textColor,
    backgroundColor
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value); // Llama a la función onChange con el nuevo valor
    }
  };

  return (
    <input
      className={`skr-text-input ${className}`}
      type="text"
      value={value}
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
      style={inputStyles}
    />
  );
};
