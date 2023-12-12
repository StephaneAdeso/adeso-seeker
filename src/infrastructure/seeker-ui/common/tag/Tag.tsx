import { ReactNode } from 'react';
import './Tag.css';

interface SkrTagProps {
  className?: string;
  text: string;
  /** text displayed when you hover the component with the mouse. By default, same as text */
  title?: string;
  /**  label displayed before the text*/
  SkrLabel?: ReactNode;
  id?: string;
  /** hexadecimal string color format */
  backgroundColor?: string;
  color?: string;
  /** default value = round */
  shape?: 'round' | 'square';
  /** default value = outline */
  type?: 'outline' | 'fill';
  onClick?: (value: any) => any;
  ariaLabel?: string;
}

export const SkrTag = ({
  className = '',
  text,
  title,
  SkrLabel,
  // eslint-disable-next-line no-unused-vars
  id = title,
  backgroundColor,
  color,
  shape = 'round',
  type = 'outline',
  onClick,
  ariaLabel = title
}: SkrTagProps): JSX.Element => {
  const buttonStyles: React.CSSProperties = {
    backgroundColor,
    color
  };

  return (
    <div
      title={title}
      onClick={onClick}
      className={`skr-tag__container ${
        shape === 'square'
          ? 'skr-tag__container--square'
          : 'skr-tag__container--round'
      }
      ${type === 'outline' && 'skr-tag__container--outline'}
      ${onClick && 'skr-tag__container--onclick'}
      ${className}`}
      style={
        type === 'outline'
          ? { color: backgroundColor, border: `1px solid ${backgroundColor}` }
          : buttonStyles
      }
      aria-label={ariaLabel}
    >
      {SkrLabel && <span className="skr-tag__label"> {SkrLabel}</span>}
      {text}
    </div>
  );
};
