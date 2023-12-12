import { ReactNode, useState } from 'react';
import './Tooltip.css';

export interface SkrTooltipProps {
  children?: ReactNode;
  className?: string;
  title?: string;
  titleSeparator?: boolean;
  text?: string;
  /** delay in milliseconds to activate the tooltip. default = 600 */
  delay?: number;
}

export const SkrTooltip = ({
  children,
  className = '',
  title,
  titleSeparator = false,
  delay = 600,
  text
}: SkrTooltipProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimerId(id);
  };

  const handleMouseLeave = () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className={`skr-tooltip__container ${className}`}>
          {title && <div className="skr-tooltip__title">{title}</div>}
          {title && titleSeparator && <hr className="skr-tooltip__separator" />}
          {text && <pre className="skr-tooltip__text">{text}</pre>}
        </div>
      )}
      {children && (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {children}
        </div>
      )}
    </>
  );
};

//TODO: Create z-index list in styles.css
