import React from 'react';
import { IconType } from 'react-icons';
import './Label.css';

interface SkrLabelProps {
  className?: string;
  label: string;
  icon?: IconType;
  iconPosition?: 'before' | 'after';
  hideLabel?: boolean;
  ariaLabel?: string;
  onClick?: (value: any) => void;
}

export const SkrLabel = ({
  className = '',
  label = '',
  icon,
  iconPosition = 'after',
  hideLabel = false,
  ariaLabel = label || '',
  onClick = () => {}
}: SkrLabelProps) => {
  return (
    <span
      className={`skr-label__container ${className}`}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {icon && iconPosition === 'before' && (
        <span>{React.createElement(icon)}</span>
      )}

      {!hideLabel && label}

      {icon && iconPosition === 'after' && (
        <span>{React.createElement(icon)}</span>
      )}
    </span>
  );
};
