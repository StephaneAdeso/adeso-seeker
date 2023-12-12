import { IconType } from 'react-icons';
import './Label.css';
import { CSSProperties, createElement } from 'react';

export interface SkrLabelProps {
  className?: string;
  label: string;
  icon?: IconType;
  /** hexadecimal string color */
  color?: string;
  /** Example: 'normal', 'bold', 'bolder', 'lighter' and from 100 to 900 */
  fontWeight?: string;
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
  color,
  fontWeight,
  hideLabel = false,
  ariaLabel = label || '',
  onClick = () => {}
}: SkrLabelProps): JSX.Element => {
  const styleConfig: CSSProperties = { color, fontWeight };

  return (
    <span
      className={`skr-label__container ${className}`}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {icon && iconPosition === 'before' && <span>{createElement(icon)}</span>}
      {!hideLabel && <span style={styleConfig}>{label}</span>}

      {icon && iconPosition === 'after' && <span>{createElement(icon)}</span>}
    </span>
  );
};
