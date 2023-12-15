import { ReactNode, createElement, useState } from 'react';
import { VscChevronRight } from 'react-icons/vsc';
import './Details.css';

interface SkrDetailsProps {
  label: string;
  /** used to initialize the component. true = open */
  open?: boolean;
  onToggle?: (isOpen: boolean) => void;
  classname?: string;
  children: ReactNode;
}

export const SkrDetails = ({
  label,
  open = false,
  classname = '',
  onToggle,
  children
}: SkrDetailsProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(open);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
    if (onToggle) {
      onToggle(!isOpen);
    }
  };

  return (
    <div className={`skr-details__container ${classname}`}>
      <div onClick={toggleDetails} className="skr-details-header">
        <span
          className={`skr-details-header__icon ${
            isOpen ? 'skr-details-header__icon--open' : ''
          }`}
        >
          {createElement(VscChevronRight)}
        </span>

        <span>{label}</span>
        <div className="skr-details-header__separator-container">
          <div className="skr-details-header__separator"></div>
        </div>
      </div>

      <div
        className={`skr-details-content ${
          isOpen ? 'skr-details-content--open' : ''
        }`}
      >
        {children}
      </div>
    </div>
  );
};
