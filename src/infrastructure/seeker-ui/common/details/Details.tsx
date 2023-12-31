import React from 'react';
import { ReactNode, useState } from 'react';
import { VscChevronRight } from 'react-icons/vsc';
import './Details.css';

interface SkrDetailsProps {
  label: string;
  open?: boolean;
  classname?: string;
  children: ReactNode;
}

export const SkrDetails = ({
  label,
  open = false,
  classname = '',
  children
}: SkrDetailsProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(open);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${classname}`}>
      <div onClick={toggleDetails} className="skr-details-header">
        <span
          className={`skr-details-header__icon ${
            isOpen ? 'skr-details-header__icon--open' : ''
          }`}
        >
          {React.createElement(VscChevronRight)}
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
