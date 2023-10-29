import * as React from 'react';
import { IconType } from 'react-icons';
import './Button.css';

interface SkrButtonProps {
  className?: string;
  label: string;
  id?: string;
  icon?: IconType;
  iconPosition?: 'before' | 'after';
  backgroundColor?: string;
  color?: string;
  fontFamily?: string;
  onClick?: (value: any) => any;
  hideLabel?: boolean;
  ariaLabel?: string;
}

export const SkrButton: React.FC<SkrButtonProps> = ({
  className = '',
  label = '',
  // eslint-disable-next-line no-unused-vars
  id = label,
  icon,
  iconPosition = 'after',
  backgroundColor,
  color,
  fontFamily,
  onClick,
  hideLabel = false,
  ariaLabel = label || ''
}) => {
  const buttonStyles: React.CSSProperties = {
    backgroundColor,
    fontFamily,
    color
  };

  return (
    <a
      className={`skr-button ${className}`}
      style={buttonStyles}
      onClick={onClick}
      title={label}
    >
      {icon && iconPosition === 'before' && (
        <span
          className={`skr-button__icon ${
            hideLabel
              ? 'skr-button__icon--hidden-label'
              : 'skr-button__icon--before'
          }`}
          aria-label={ariaLabel + ' icon'}
        >
          {React.createElement(icon)}
        </span>
      )}

      {!hideLabel && (
        <span className="skr-button__label" aria-label={ariaLabel}>
          {label}
        </span>
      )}

      {icon && iconPosition === 'after' && (
        <span
          className={`skr-button__icon ${
            hideLabel
              ? 'skr-button__icon--hidden-label'
              : 'skr-button__icon--after'
          }`}
          aria-label={ariaLabel + ' icon'}
        >
          {React.createElement(icon)}
        </span>
      )}
    </a>
  );
};
